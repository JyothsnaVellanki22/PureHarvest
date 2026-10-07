import { test, describe } from "node:test";
import assert from "node:assert/strict";

class CircuitBreaker {
  constructor(options = {}) {
    this.state = "CLOSED";
    this.failureCount = 0;
    this.successCount = 0;
    this.lastFailureTime = 0;
    this.failureThreshold = options.failureThreshold ?? 3;
    this.cooldownPeriodMs = options.cooldownPeriodMs ?? 100;
    this.successThreshold = options.successThreshold ?? 2;
  }

  getState() {
    if (this.state === "OPEN") {
      const now = Date.now();
      if (now - this.lastFailureTime >= this.cooldownPeriodMs) {
        this.state = "HALF_OPEN";
        this.successCount = 0;
      }
    }
    return this.state;
  }

  async execute(action) {
    const currentState = this.getState();
    if (currentState === "OPEN") {
      throw new Error("Circuit breaker is OPEN");
    }

    try {
      const result = await action();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    if (this.state === "HALF_OPEN") {
      this.successCount++;
      if (this.successCount >= this.successThreshold) {
        this.state = "CLOSED";
        this.failureCount = 0;
        this.successCount = 0;
      }
    } else if (this.state === "CLOSED") {
      this.failureCount = 0;
    }
  }

  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    if (this.state === "HALF_OPEN" || this.failureCount >= this.failureThreshold) {
      this.state = "OPEN";
    }
  }

  reset() {
    this.state = "CLOSED";
    this.failureCount = 0;
    this.successCount = 0;
  }
}

async function withRetry(operation, options = {}) {
  const maxRetries = options.maxRetries ?? 2;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      return await operation(attempt);
    } catch (error) {
      attempt++;
      if (attempt > maxRetries) throw error;
      await new Promise((r) => setTimeout(r, 10));
    }
  }
}

describe("Resilience & Fault Tolerance Suite", () => {
  describe("withRetry", () => {
    test("succeeds on first attempt without retrying", async () => {
      let calls = 0;
      const res = await withRetry(async () => {
        calls++;
        return "success";
      });
      assert.equal(res, "success");
      assert.equal(calls, 1);
    });

    test("retries and succeeds when subsequent attempt works", async () => {
      let calls = 0;
      const res = await withRetry(async (attempt) => {
        calls++;
        if (attempt === 0) throw new Error("Transient error");
        return "recovered";
      }, { maxRetries: 2 });

      assert.equal(res, "recovered");
      assert.equal(calls, 2);
    });

    test("throws after exceeding maxRetries", async () => {
      let calls = 0;
      await assert.rejects(async () => {
        await withRetry(async () => {
          calls++;
          throw new Error("Persistent failure");
        }, { maxRetries: 2 });
      }, /Persistent failure/);

      assert.equal(calls, 3); // 1 initial + 2 retries
    });
  });

  describe("CircuitBreaker", () => {
    test("starts in CLOSED state and allows requests", async () => {
      const cb = new CircuitBreaker();
      assert.equal(cb.getState(), "CLOSED");
      const res = await cb.execute(async () => "ok");
      assert.equal(res, "ok");
    });

    test("transitions to OPEN after hitting failure threshold", async () => {
      const cb = new CircuitBreaker({ failureThreshold: 2 });

      // First failure
      await assert.rejects(async () => {
        await cb.execute(async () => { throw new Error("Fail 1"); });
      });
      assert.equal(cb.getState(), "CLOSED");

      // Second failure - should trigger OPEN
      await assert.rejects(async () => {
        await cb.execute(async () => { throw new Error("Fail 2"); });
      });
      assert.equal(cb.getState(), "OPEN");

      // Subsequent call rejected immediately by circuit breaker
      await assert.rejects(async () => {
        await cb.execute(async () => "never reached");
      }, /Circuit breaker is OPEN/);
    });

    test("transitions from OPEN to HALF_OPEN after cooldown", async () => {
      const cb = new CircuitBreaker({ failureThreshold: 1, cooldownPeriodMs: 50 });
      await assert.rejects(async () => {
        await cb.execute(async () => { throw new Error("Fail"); });
      });
      assert.equal(cb.getState(), "OPEN");

      // Wait for cooldown
      await new Promise((resolve) => setTimeout(resolve, 60));
      assert.equal(cb.getState(), "HALF_OPEN");
    });
  });
});

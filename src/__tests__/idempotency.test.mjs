import { test, describe } from "node:test";
import assert from "node:assert/strict";

class IdempotencyManager {
  constructor(defaultTtlMs = 1000) {
    this.cache = new Map();
    this.defaultTtlMs = defaultTtlMs;
  }

  get(key) {
    const record = this.cache.get(key);
    if (!record) return null;
    if (Date.now() > record.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return record;
  }

  set(key, response, statusCode = 200, ttlMs) {
    const now = Date.now();
    this.cache.set(key, {
      key,
      response,
      statusCode,
      createdAt: now,
      expiresAt: now + (ttlMs ?? this.defaultTtlMs),
    });
  }

  clear() {
    this.cache.clear();
  }
}

describe("Idempotency Suite", () => {
  test("returns null for unseen idempotency keys", () => {
    const manager = new IdempotencyManager();
    assert.equal(manager.get("unique-key-1"), null);
  });

  test("stores and retrieves identical response for duplicate requests", () => {
    const manager = new IdempotencyManager();
    const payload = { subscriptionId: "sub_123", amount: 45 };

    manager.set("req-key-abc", payload, 201);
    const retrieved = manager.get("req-key-abc");

    assert.ok(retrieved !== null);
    assert.equal(retrieved.statusCode, 201);
    assert.deepEqual(retrieved.response, payload);
  });

  test("expires cached records after TTL", async () => {
    const manager = new IdempotencyManager(50);
    manager.set("expiring-key", { status: "ok" });

    assert.ok(manager.get("expiring-key") !== null);

    await new Promise((r) => setTimeout(r, 60));
    assert.equal(manager.get("expiring-key"), null);
  });
});

export type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

export interface CircuitBreakerOptions {
  failureThreshold?: number; // Number of failures before opening
  cooldownPeriodMs?: number; // Time in ms to stay OPEN before HALF_OPEN probe
  successThreshold?: number; // Number of consecutive successes in HALF_OPEN to close
}

export class CircuitBreaker {
  private state: CircuitState = "CLOSED";
  private failureCount: number = 0;
  private successCount: number = 0;
  private lastFailureTime: number = 0;

  private readonly failureThreshold: number;
  private readonly cooldownPeriodMs: number;
  private readonly successThreshold: number;

  constructor(options: CircuitBreakerOptions = {}) {
    this.failureThreshold = options.failureThreshold ?? 5;
    this.cooldownPeriodMs = options.cooldownPeriodMs ?? 10000;
    this.successThreshold = options.successThreshold ?? 2;
  }

  public getState(): CircuitState {
    if (this.state === "OPEN") {
      const now = Date.now();
      if (now - this.lastFailureTime >= this.cooldownPeriodMs) {
        this.state = "HALF_OPEN";
        this.successCount = 0;
      }
    }
    return this.state;
  }

  public async execute<T>(action: () => Promise<T>): Promise<T> {
    const currentState = this.getState();

    if (currentState === "OPEN") {
      throw new Error("Circuit breaker is OPEN: service temporarily unavailable");
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

  private onSuccess(): void {
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

  private onFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.state === "HALF_OPEN" || this.failureCount >= this.failureThreshold) {
      this.state = "OPEN";
    }
  }

  public reset(): void {
    this.state = "CLOSED";
    this.failureCount = 0;
    this.successCount = 0;
    this.lastFailureTime = 0;
  }
}

export interface RateLimiterOptions {
  windowMs?: number;
  maxRequests?: number;
}

export class SlidingWindowRateLimiter {
  private timestamps: Map<string, number[]> = new Map();
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(options: RateLimiterOptions = {}) {
    this.windowMs = options.windowMs ?? 60000; // 1 minute window
    this.maxRequests = options.maxRequests ?? 60; // 60 requests per minute
  }

  public isAllowed(key: string): { allowed: boolean; remaining: number; resetMs: number } {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    const currentTimestamps = this.timestamps.get(key) || [];
    const validTimestamps = currentTimestamps.filter((ts) => ts > windowStart);

    if (validTimestamps.length >= this.maxRequests) {
      const oldestValid = validTimestamps[0];
      const resetMs = Math.max(0, this.windowMs - (now - oldestValid));
      this.timestamps.set(key, validTimestamps);
      return { allowed: false, remaining: 0, resetMs };
    }

    validTimestamps.push(now);
    this.timestamps.set(key, validTimestamps);

    return {
      allowed: true,
      remaining: this.maxRequests - validTimestamps.length,
      resetMs: this.windowMs,
    };
  }

  public reset(key?: string): void {
    if (key) {
      this.timestamps.delete(key);
    } else {
      this.timestamps.clear();
    }
  }
}

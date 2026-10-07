export interface IdempotencyRecord<T = unknown> {
  key: string;
  response: T;
  statusCode: number;
  createdAt: number;
  expiresAt: number;
}

export class IdempotencyManager {
  private cache: Map<string, IdempotencyRecord> = new Map();
  private readonly defaultTtlMs: number;

  constructor(defaultTtlMs: number = 24 * 60 * 60 * 1000) {
    this.defaultTtlMs = defaultTtlMs;
  }

  public get<T>(key: string): IdempotencyRecord<T> | null {
    const record = this.cache.get(key) as IdempotencyRecord<T> | undefined;
    if (!record) {
      return null;
    }

    if (Date.now() > record.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return record;
  }

  public set<T>(key: string, response: T, statusCode: number = 200, ttlMs?: number): void {
    const now = Date.now();
    const expiresAt = now + (ttlMs ?? this.defaultTtlMs);

    this.cache.set(key, {
      key,
      response,
      statusCode,
      createdAt: now,
      expiresAt,
    });
  }

  public clear(): void {
    this.cache.clear();
  }
}

export const idempotencyManager = new IdempotencyManager();

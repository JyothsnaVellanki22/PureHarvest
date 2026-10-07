export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  backoffFactor?: number;
  shouldRetry?: (error: unknown) => boolean;
}

const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  initialDelayMs: 200,
  maxDelayMs: 3000,
  backoffFactor: 2,
  shouldRetry: () => true,
};

export async function withRetry<T>(
  operation: (attempt: number) => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const config = { ...DEFAULT_RETRY_OPTIONS, ...options };
  let attempt = 0;

  while (attempt <= config.maxRetries) {
    try {
      return await operation(attempt);
    } catch (error) {
      attempt++;
      if (attempt > config.maxRetries || !config.shouldRetry(error)) {
        throw error;
      }

      // Calculate exponential backoff with jitter to prevent thundering herd
      const exponentialDelay = config.initialDelayMs * Math.pow(config.backoffFactor, attempt - 1);
      const cappedDelay = Math.min(exponentialDelay, config.maxDelayMs);
      const jitter = Math.random() * 0.3 * cappedDelay;
      const totalDelay = Math.floor(cappedDelay + jitter);

      await new Promise((resolve) => setTimeout(resolve, totalDelay));
    }
  }

  throw new Error("Retry operation exceeded maximum attempts");
}

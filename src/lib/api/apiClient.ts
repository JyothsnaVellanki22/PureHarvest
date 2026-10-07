import { ApiResponse } from "@/types";
import { withRetry } from "@/lib/resilience/retry";
import { CircuitBreaker } from "@/lib/resilience/circuitBreaker";
import { logger } from "@/lib/logger/logger";

const defaultCircuitBreaker = new CircuitBreaker({
  failureThreshold: 5,
  cooldownPeriodMs: 15000,
});

export interface RequestOptions extends RequestInit {
  timeoutMs?: number;
  maxRetries?: number;
  correlationId?: string;
  useCircuitBreaker?: boolean;
}

export async function resilientFetch<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    timeoutMs = 8000,
    maxRetries = 2,
    correlationId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    useCircuitBreaker = true,
    ...fetchOptions
  } = options;

  const headers = new Headers(fetchOptions.headers);
  headers.set("Content-Type", "application/json");
  headers.set("X-Correlation-ID", correlationId);

  const executeFetch = async (): Promise<ApiResponse<T>> => {
    return withRetry(
      async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), timeoutMs);

        try {
          const response = await fetch(endpoint, {
            ...fetchOptions,
            headers,
            signal: controller.signal,
          });

          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
          }

          return (await response.json()) as ApiResponse<T>;
        } finally {
          clearTimeout(timeout);
        }
      },
      {
        maxRetries,
        shouldRetry: (error: unknown) => {
          // Retry on network errors or timeouts, but not 4xx client errors
          if (error instanceof Error && error.name === "AbortError") return true;
          return true;
        },
      }
    );
  };

  try {
    if (useCircuitBreaker) {
      return await defaultCircuitBreaker.execute(executeFetch);
    }
    return await executeFetch();
  } catch (error) {
    logger.error(`Resilient fetch failed for ${endpoint}`, error, { endpoint }, correlationId);
    throw error;
  }
}

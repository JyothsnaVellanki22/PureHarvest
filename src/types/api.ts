export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    timestamp: string;
  };
  correlationId: string;
}

export interface HealthCheckResponse {
  status: "healthy" | "degraded" | "unhealthy";
  version: string;
  uptimeSeconds: number;
  timestamp: string;
  environment: string;
}

import { NextResponse } from "next/server";
import { HealthCheckResponse, ApiResponse } from "@/types";

const startTime = Date.now();

export async function GET() {
  const correlationId = `health_${Date.now()}`;
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);

  const healthData: HealthCheckResponse = {
    status: "healthy",
    version: "0.1.0",
    uptimeSeconds,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  };

  const response: ApiResponse<HealthCheckResponse> = {
    success: true,
    data: healthData,
    correlationId,
  };

  return NextResponse.json(response, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Correlation-ID": correlationId,
    },
  });
}

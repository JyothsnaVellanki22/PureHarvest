import { NextRequest, NextResponse } from "next/server";
import { farmService } from "@/services/farmService";
import { ApiResponse, Farm } from "@/types";
import { logger } from "@/lib/logger/logger";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const correlationId = request.headers.get("x-correlation-id") || `api_farm_${id}_${Date.now()}`;

  try {
    const farm = await farmService.getFarmById(id, correlationId);

    if (!farm) {
      const notFoundResponse: ApiResponse = {
        success: false,
        error: {
          code: "FARM_NOT_FOUND",
          message: `Farm with identifier '${id}' was not found`,
        },
        correlationId,
      };
      return NextResponse.json(notFoundResponse, { status: 404 });
    }

    const response: ApiResponse<Farm> = {
      success: true,
      data: farm,
      correlationId,
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "X-Correlation-ID": correlationId,
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    logger.error(`Error retrieving farm ${id}`, error, { farmId: id }, correlationId);
    const errorResponse: ApiResponse = {
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to retrieve farm information.",
      },
      correlationId,
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

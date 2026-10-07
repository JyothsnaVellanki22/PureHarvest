import { NextRequest, NextResponse } from "next/server";
import { farmService } from "@/services/farmService";
import { ApiResponse, Farm, PaginatedResult } from "@/types";
import { parsePaginationParams } from "@/lib/security/validator";
import { logger } from "@/lib/logger/logger";

export async function GET(request: NextRequest) {
  const correlationId = request.headers.get("x-correlation-id") || `api_farms_${Date.now()}`;
  const searchParams = request.nextUrl.searchParams;

  const searchQuery = searchParams.get("search") || undefined;
  const category = searchParams.get("category") || undefined;
  const district = searchParams.get("district") || undefined;
  const { page, limit } = parsePaginationParams({
    page: searchParams.get("page"),
    limit: searchParams.get("limit"),
  });

  try {
    const result = await farmService.getFarms(
      { searchQuery, category, district },
      { page, limit },
      correlationId
    );

    const response: ApiResponse<PaginatedResult<Farm>> = {
      success: true,
      data: result,
      meta: {
        page: result.page,
        limit,
        total: result.total,
        timestamp: new Date().toISOString(),
      },
      correlationId,
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "X-Correlation-ID": correlationId,
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    logger.error("Failed to query farms API", error, undefined, correlationId);
    const errorResponse: ApiResponse = {
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "An unexpected error occurred while fetching farms.",
      },
      correlationId,
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

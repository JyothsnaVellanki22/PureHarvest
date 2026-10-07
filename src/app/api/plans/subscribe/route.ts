import { NextRequest, NextResponse } from "next/server";
import { planService } from "@/services/planService";
import { ApiResponse, PlanSubscriptionRequest, PlanSubscriptionResponse } from "@/types";
import { logger } from "@/lib/logger/logger";

export async function POST(request: NextRequest) {
  const correlationId = request.headers.get("x-correlation-id") || `sub_${Date.now()}`;
  const idempotencyKey =
    request.headers.get("idempotency-key") ||
    request.headers.get("x-idempotency-key") ||
    "";

  try {
    const body = await request.json();
    const subscriptionRequest: PlanSubscriptionRequest = {
      planId: body.planId,
      farmId: body.farmId,
      subscriberEmail: body.subscriberEmail,
      subscriberName: body.subscriberName,
      paymentMethodId: body.paymentMethodId || "pm_default",
      idempotencyKey,
    };

    const result = await planService.subscribeToPlan(subscriptionRequest, correlationId);

    const response: ApiResponse<PlanSubscriptionResponse> = {
      success: true,
      data: result,
      correlationId,
    };

    return NextResponse.json(response, {
      status: 201,
      headers: {
        "X-Correlation-ID": correlationId,
        ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Subscription failed";
    logger.warn(`Subscription failed: ${errorMessage}`, { error: errorMessage }, correlationId);

    const errorResponse: ApiResponse = {
      success: false,
      error: {
        code: "SUBSCRIPTION_ERROR",
        message: errorMessage,
      },
      correlationId,
    };

    return NextResponse.json(errorResponse, { status: 400 });
  }
}

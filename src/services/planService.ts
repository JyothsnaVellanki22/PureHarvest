import { PlanSubscriptionRequest, PlanSubscriptionResponse } from "@/types";
import { idempotencyManager } from "@/lib/idempotency/idempotencyManager";
import { isValidEmail, isValidIdentifier, sanitizeString } from "@/lib/security/validator";
import { logger } from "@/lib/logger/logger";

export class PlanService {
  public async subscribeToPlan(
    request: PlanSubscriptionRequest,
    correlationId?: string
  ): Promise<PlanSubscriptionResponse> {
    const { idempotencyKey, planId, farmId, subscriberEmail, subscriberName } = request;

    // 1. Idempotency Check: Return previously processed result if available
    if (idempotencyKey) {
      const cached = idempotencyManager.get<PlanSubscriptionResponse>(idempotencyKey);
      if (cached) {
        logger.info(
          `Idempotency match found for key: ${idempotencyKey}. Replaying cached response.`,
          { idempotencyKey },
          correlationId
        );
        return cached.response;
      }
    }

    // 2. Security & Input Validation
    if (!isValidEmail(subscriberEmail)) {
      throw new Error("Invalid subscriber email address provided");
    }

    if (!isValidIdentifier(planId) || !isValidIdentifier(farmId)) {
      throw new Error("Invalid plan or farm identifier");
    }

    const cleanName = sanitizeString(subscriberName);
    if (!cleanName) {
      throw new Error("Subscriber name is required");
    }

    // 3. Process subscription (Stateless business operation)
    const subscriptionId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const response: PlanSubscriptionResponse = {
      subscriptionId,
      planId,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      amount: 45, // default plan standard amount
      idempotencyKey,
    };

    // 4. Cache response for idempotency replay
    if (idempotencyKey) {
      idempotencyManager.set(idempotencyKey, response);
    }

    logger.info("Plan subscription processed successfully", { subscriptionId, planId, farmId }, correlationId);
    return response;
  }
}

export const planService = new PlanService();

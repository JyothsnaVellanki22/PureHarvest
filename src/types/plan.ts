export interface HarvestPlan {
  id: string;
  farmId: string;
  name: string;
  price: number;
  period: string;
  desc: string;
  includes: string[];
  spots: number;
  popular?: boolean;
}

export interface PlanSubscriptionRequest {
  planId: string;
  farmId: string;
  subscriberEmail: string;
  subscriberName: string;
  paymentMethodId: string;
  idempotencyKey: string;
}

export interface PlanSubscriptionResponse {
  subscriptionId: string;
  planId: string;
  status: "confirmed" | "pending" | "failed";
  createdAt: string;
  amount: number;
  idempotencyKey: string;
}

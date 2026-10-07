/**
 * Sanitizes input strings by escaping dangerous HTML characters and stripping script tags
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== "string") {
    return "";
  }
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/[<>]/g, "")
    .trim();
}

/**
 * Validates standard email address format
 */
export function isValidEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates alphanumeric ID strings with optional hyphens/underscores
 */
export function isValidIdentifier(id: unknown): boolean {
  if (typeof id !== "string") return false;
  const idRegex = /^[a-zA-Z0-9_-]{1,64}$/;
  return idRegex.test(id.trim());
}

/**
 * Parses and bounds pagination parameters to prevent Denial of Service (DoS) memory exhaustion
 */
export function parsePaginationParams(params: {
  page?: string | null;
  limit?: string | null;
}): { page: number; limit: number } {
  const parsedPage = parseInt(params.page || "1", 10);
  const parsedLimit = parseInt(params.limit || "12", 10);

  const page = isNaN(parsedPage) || parsedPage < 1 ? 1 : Math.min(parsedPage, 1000);
  const limit = isNaN(parsedLimit) || parsedLimit < 1 ? 12 : Math.min(parsedLimit, 50);

  return { page, limit };
}

/**
 * Validates positive financial currency amount
 */
export function isValidAmount(amount: unknown): boolean {
  return typeof amount === "number" && !isNaN(amount) && isFinite(amount) && amount > 0;
}

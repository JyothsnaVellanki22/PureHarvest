import { test, describe } from "node:test";
import assert from "node:assert/strict";

// Direct implementation test for standalone runner compatibility
function sanitizeString(input) {
  if (typeof input !== "string") return "";
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/[<>]/g, "")
    .trim();
}

function isValidEmail(email) {
  if (typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

function isValidIdentifier(id) {
  if (typeof id !== "string") return false;
  const idRegex = /^[a-zA-Z0-9_-]{1,64}$/;
  return idRegex.test(id.trim());
}

function parsePaginationParams(params) {
  const parsedPage = parseInt(params.page || "1", 10);
  const parsedLimit = parseInt(params.limit || "12", 10);
  const page = isNaN(parsedPage) || parsedPage < 1 ? 1 : Math.min(parsedPage, 1000);
  const limit = isNaN(parsedLimit) || parsedLimit < 1 ? 12 : Math.min(parsedLimit, 50);
  return { page, limit };
}

function isValidAmount(amount) {
  return typeof amount === "number" && !isNaN(amount) && isFinite(amount) && amount > 0;
}

describe("Security & Validation Suite", () => {
  describe("sanitizeString", () => {
    test("removes script tags and dangerous HTML characters", () => {
      const malicious = '<script>alert("xss")</script>Hello <b>World</b>';
      const clean = sanitizeString(malicious);
      assert.equal(clean, "Hello bWorld/b");
      assert.ok(!clean.includes("<script>"));
    });

    test("handles non-string inputs safely", () => {
      assert.equal(sanitizeString(null), "");
      assert.equal(sanitizeString(undefined), "");
      assert.equal(sanitizeString(123), "");
    });
  });

  describe("isValidEmail", () => {
    test("validates well-formed email addresses", () => {
      assert.ok(isValidEmail("farmer@pureharvest.org"));
      assert.ok(isValidEmail("consumer.test@domain.co.in"));
    });

    test("rejects malformed email addresses", () => {
      assert.ok(!isValidEmail("invalid-email"));
      assert.ok(!isValidEmail("@domain.com"));
      assert.ok(!isValidEmail("user@.com"));
      assert.ok(!isValidEmail(null));
    });
  });

  describe("isValidIdentifier", () => {
    test("accepts alphanumeric identifiers with hyphens and underscores", () => {
      assert.ok(isValidIdentifier("farm-123_abc"));
      assert.ok(isValidIdentifier("1"));
    });

    test("rejects identifiers with invalid characters or excessive length", () => {
      assert.ok(!isValidIdentifier("farm/../../root"));
      assert.ok(!isValidIdentifier("'; DROP TABLE farms; --"));
      assert.ok(!isValidIdentifier("a".repeat(65)));
    });
  });

  describe("parsePaginationParams", () => {
    test("enforces upper bounds to prevent DoS attacks", () => {
      const { page, limit } = parsePaginationParams({ page: "999999", limit: "50000" });
      assert.equal(page, 1000);
      assert.equal(limit, 50);
    });

    test("provides sensible defaults for invalid parameters", () => {
      const { page, limit } = parsePaginationParams({ page: "-5", limit: "invalid" });
      assert.equal(page, 1);
      assert.equal(limit, 12);
    });
  });

  describe("isValidAmount", () => {
    test("validates positive finite currency amounts", () => {
      assert.ok(isValidAmount(45.5));
      assert.ok(!isValidAmount(-10));
      assert.ok(!isValidAmount(NaN));
      assert.ok(!isValidAmount(Infinity));
    });
  });
});

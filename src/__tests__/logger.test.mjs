import { test, describe } from "node:test";
import assert from "node:assert/strict";

const LOG_LEVEL_PRIORITY = {
  DEBUG: 10,
  INFO: 20,
  WARN: 30,
  ERROR: 40,
};

class TestLogger {
  constructor(level = "INFO") {
    this.currentLevel = level;
    this.buffer = [];
  }

  shouldLog(level) {
    return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.currentLevel];
  }

  log(level, message, context, correlationId) {
    if (this.shouldLog(level)) {
      this.buffer.push({
        level,
        message,
        timestamp: new Date().toISOString(),
        context,
        correlationId,
      });
    }
  }

  debug(msg, ctx, cid) { this.log("DEBUG", msg, ctx, cid); }
  info(msg, ctx, cid) { this.log("INFO", msg, ctx, cid); }
  warn(msg, ctx, cid) { this.log("WARN", msg, ctx, cid); }
  error(msg, ctx, cid) { this.log("ERROR", msg, ctx, cid); }
}

describe("Structured Logger Suite", () => {
  test("filters out debug logs when level is INFO", () => {
    const logger = new TestLogger("INFO");
    logger.debug("hidden debug message");
    logger.info("visible info message");

    assert.equal(logger.buffer.length, 1);
    assert.equal(logger.buffer[0].level, "INFO");
    assert.equal(logger.buffer[0].message, "visible info message");
  });

  test("records error logs with context and correlationId", () => {
    const logger = new TestLogger("INFO");
    logger.error("DB connection failed", { host: "db.local" }, "corr_456");

    assert.equal(logger.buffer.length, 1);
    const entry = logger.buffer[0];
    assert.equal(entry.level, "ERROR");
    assert.equal(entry.message, "DB connection failed");
    assert.deepEqual(entry.context, { host: "db.local" });
    assert.equal(entry.correlationId, "corr_456");
  });
});

export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  correlationId?: string;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  DEBUG: 10,
  INFO: 20,
  WARN: 30,
  ERROR: 40,
};

class Logger {
  private currentLevel: LogLevel;

  constructor() {
    const envLevel = (process.env.LOG_LEVEL || "INFO").toUpperCase() as LogLevel;
    this.currentLevel = LOG_LEVEL_PRIORITY[envLevel] !== undefined ? envLevel : "INFO";
  }

  public setLevel(level: LogLevel): void {
    this.currentLevel = level;
  }

  public getLevel(): LogLevel {
    return this.currentLevel;
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.currentLevel];
  }

  private formatEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
    error?: Error,
    correlationId?: string
  ): LogEntry {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
    };

    if (context && Object.keys(context).length > 0) {
      entry.context = context;
    }

    if (correlationId) {
      entry.correlationId = correlationId;
    }

    if (error) {
      entry.error = {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      };
    }

    return entry;
  }

  private write(entry: LogEntry): void {
    const output = JSON.stringify(entry);
    switch (entry.level) {
      case "ERROR":
        console.error(output);
        break;
      case "WARN":
        console.warn(output);
        break;
      case "INFO":
        console.info(output);
        break;
      case "DEBUG":
        console.debug(output);
        break;
    }
  }

  public debug(message: string, context?: Record<string, unknown>, correlationId?: string): void {
    if (this.shouldLog("DEBUG")) {
      this.write(this.formatEntry("DEBUG", message, context, undefined, correlationId));
    }
  }

  public info(message: string, context?: Record<string, unknown>, correlationId?: string): void {
    if (this.shouldLog("INFO")) {
      this.write(this.formatEntry("INFO", message, context, undefined, correlationId));
    }
  }

  public warn(message: string, context?: Record<string, unknown>, correlationId?: string): void {
    if (this.shouldLog("WARN")) {
      this.write(this.formatEntry("WARN", message, context, undefined, correlationId));
    }
  }

  public error(
    message: string,
    error?: Error | unknown,
    context?: Record<string, unknown>,
    correlationId?: string
  ): void {
    if (this.shouldLog("ERROR")) {
      const err = error instanceof Error ? error : error ? new Error(String(error)) : undefined;
      this.write(this.formatEntry("ERROR", message, context, err, correlationId));
    }
  }
}

export const logger = new Logger();

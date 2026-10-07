# Contributing to PureHarvest

Thank you for contributing to PureHarvest. We follow strict engineering standards to ensure high reliability, security, and scalability.

## 1. Architectural Guidelines
- **Modular Domains**: Keep presentation, service/business logic, and data access layers cleanly separated.
- **Stateless Backend**: API handlers in `src/app/api/` must remain stateless to support horizontal scaling.
- **Idempotency**: All mutation endpoints (e.g., plan subscriptions, payment confirmations) must support idempotency keys to protect data integrity during network failures.

## 2. Code Quality & Standards
- **Naming Conventions**: Use descriptive names (`findFarmsByCriteria`, `resilientFetch`) instead of cryptic abbreviations.
- **Single Responsibility Principle**: Decompose large functions into small, testable helpers.
- **Strict Typing**: Avoid `any` types; define domain types in `src/types/`.

## 3. Testing & QA
- All business logic and critical utilities must include automated unit tests under `src/__tests__/`.
- Run tests before pushing:
  ```bash
  npm test
  ```

## 4. Logging & Operations
- Never use raw `console.log`. Always use `logger` from `@/lib/logger/logger`:
  - `logger.debug()` for diagnostic info
  - `logger.info()` for significant lifecycle milestones
  - `logger.warn()` for recoverable anomalies
  - `logger.error()` for unexpected failures with error objects and context
- Include `correlationId` when logging API requests.

## 5. Security Protocols
- **Never commit secrets**: Verify `.env*` files are ignored (only `.env.example` is committed).
- **Validate Inputs**: Always sanitize external inputs using `@/lib/security/validator`.
- Security headers are enforced in `next.config.ts`.

## 6. Peer Code Review Process
- All contributions require a pull request review from a senior engineer.
- Fill out all sections of `.github/pull_request_template.md`.
- Automated CI pipeline must pass before merge.

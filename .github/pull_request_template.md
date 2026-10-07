# Pull Request Description

## Overview
Briefly describe the change and the motivation behind it.

## Architectural Changes & Standards Compliance
- [ ] **Modularization**: Changes follow domain layering (Types -> Data Access -> Services -> Presentation/API).
- [ ] **Statelessness**: Backend route handlers remain strictly stateless.
- [ ] **Idempotency**: State-mutating operations implement or respect idempotency keys.
- [ ] **Single Responsibility**: Modules and functions are cohesive and focused on a single task.

## Security & Secrets
- [ ] No secrets, API keys, private credentials, or environment tokens are committed.
- [ ] All external inputs are validated and sanitized (`validator.ts`).
- [ ] Security headers and CORS policies are respected.

## Quality Assurance & Testing
- [ ] Automated unit tests added or updated in `src/__tests__/`.
- [ ] All tests pass locally (`npm test`).
- [ ] Code is free of lint and type errors (`npm run lint`, `npm run type-check`).

## Checklist for Reviewers
- [ ] Architecture aligns with system design principles.
- [ ] Logging uses explicit severity levels (`logger.ts`) with correlation IDs.
- [ ] Resilient patterns (circuit breakers, exponential backoff) applied where external dependencies are called.

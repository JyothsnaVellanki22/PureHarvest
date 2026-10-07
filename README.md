# PureHarvest

> **Empowering Direct Farm-to-Consumer Agriculture Across Andhra Pradesh & Telangana**

PureHarvest is a production-grade, sustainable agriculture platform designed to bridge consumers directly with local farmers. By eliminating traditional intermediaries, PureHarvest ensures fair earnings for farmers and fresh, transparent, traceable harvests for households.

---

## Architecture & System Design

PureHarvest follows modern enterprise standards for scalability, maintainability, and resilience:

### Key Architectural Tenets
1. **Modular Layering**: Strict boundaries between Presentation, Business Logic (`services/`), Data Access (`lib/data/`), and Domain Contracts (`types/`).
2. **Stateless Backend**: Route handlers (`/api/farms`, `/api/health`, `/api/plans/subscribe`) are entirely stateless, enabling zero-friction horizontal scaling.
3. **Idempotency**: Critical operations support `Idempotency-Key` headers to ensure network retries never cause duplicate subscriptions or duplicate charges.
4. **Resilience & Fault Tolerance**: Built-in circuit breakers and exponential backoff with jitter protect the application from cascading failures and traffic spikes.
5. **Differentiated Logging**: Explicit log levels (`DEBUG`, `INFO`, `WARN`, `ERROR`) with correlation tracking and structured JSON formatting.

---

## Security Standards

- **Zero-Secret Guarantee**: No hardcoded API keys, private certificates, or secrets exist in the codebase.
- **Strict Environment Isolation**: Excludes all `.env*` files via `.gitignore` while providing a sanitized `.env.example` blueprint.
- **Input Sanitization**: All query parameters, strings, and inputs are sanitized to eliminate XSS and injection vulnerabilities.
- **HTTP Security Headers**: Enforces `HSTS`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and restrictive `Permissions-Policy`.

---

## Getting Started

### Prerequisites
- Node.js 20.x or 22.x
- npm 10.x+

### Setup & Local Execution
```bash
# 1. Clone repository
git clone git@github.com:JyothsnaVellanki22/PureHarvest.git
cd PureHarvest

# 2. Install dependencies
npm ci # or npm install

# 3. Configure environment variables
cp .env.example .env.local

# 4. Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## Testing & Quality Assurance

Run the automated unit test suite:
```bash
npm test
```

Type checking & linting:
```bash
npm run type-check
npm run lint
```

---

## CI/CD & Peer Review

- **CI Pipeline**: Automated GitHub Actions workflow (`.github/workflows/ci.yml`) validates builds, runs security audits, and executes the complete test suite on every pull request.
- **Peer Code Reviews**: All submissions require approval following our [Contribution Guidelines](CONTRIBUTING.md) and [PR Template](.github/pull_request_template.md).
- **Security Policy**: See [SECURITY.md](SECURITY.md) for vulnerability reporting.

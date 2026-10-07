# Security Policy

## Supported Versions
Only the latest release of PureHarvest is actively supported with security patches.

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Security Standards & Safeguards

### 1. Secret Management
- Secrets must **NEVER** be committed to the version control system.
- Environment variables are managed via local `.env.local` files (excluded via `.gitignore`) or cloud secret managers.
- An sanitized `.env.example` file is provided as an environment blueprint.

### 2. Input Sanitization & Validation
- All HTTP input parameters (query strings, body payloads, headers) are validated and sanitized to guard against Cross-Site Scripting (XSS), SQL injection, and path traversal attacks.
- Pagination parameters are bound to prevent Denial of Service (DoS) memory exhaustion.

### 3. HTTP Security Headers
The application enforces strict HTTP security headers via `next.config.ts`:
- `X-Frame-Options: DENY` (Clickjacking prevention)
- `X-Content-Type-Options: nosniff` (MIME-sniffing prevention)
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `poweredByHeader: false` (Suppresses server disclosure)

## Reporting a Vulnerability
If you discover a security vulnerability within PureHarvest, please do **NOT** open a public issue. Instead, report it privately to:
- **Email**: jyothsnavellanki8122@gmail.com
- **Response SLA**: Vulnerability reports will be acknowledged within 48 hours.

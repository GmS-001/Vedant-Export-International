# Security

## 1. Purpose

This document defines the security requirements for the Vedant Exports International website.

The Phase 1 security strategy should focus on:

* Protecting company and buyer data
* Securing API endpoints
* Protecting the inquiry workflow
* Preventing common web attacks
* Keeping secrets out of the frontend
* Maintaining secure deployment practices

The goal is **simple, reliable security without unnecessary complexity**.

---

# 2. Security Architecture

The application consists of:

```text
Browser
   ↓ HTTPS
Next.js Frontend
   ↓ HTTPS API
FastAPI Backend
   ↓
PostgreSQL
```

The backend is the authoritative security boundary.

The frontend must never be trusted for security-sensitive validation.

---

# 3. HTTPS

Production traffic must use HTTPS.

Requirements:

* HTTPS only in production
* Secure API communication
* No sensitive information transmitted over HTTP
* Production cookies, if introduced later, must use `Secure`

---

# 4. Environment Variables & Secrets

Secrets must never be committed to GitHub.

Sensitive values include:

* Database credentials
* API keys
* Email provider keys
* WhatsApp provider credentials
* Cloudinary/S3 credentials
* Authentication secrets if introduced later

Use environment variables.

Example:

```text
DATABASE_URL=
EMAIL_API_KEY=
WHATSAPP_API_KEY=
STORAGE_API_KEY=
```

Frontend variables must only contain values safe for public exposure.

Never expose:

```text
DATABASE_URL
API_SECRET
PRIVATE_API_KEY
```

through `NEXT_PUBLIC_*` variables.

---

# 5. API Security

All backend endpoints must validate incoming requests.

FastAPI/Pydantic should validate:

* Required fields
* Data types
* String lengths
* Email format
* Quantity values
* Dates
* Allowed values

The backend must not trust frontend validation.

---

# 6. Request Quote Security

The inquiry endpoint is publicly accessible and therefore requires additional protection.

```text
POST /api/v1/inquiries
```

The backend should:

* Validate all fields
* Reject malformed requests
* Limit input lengths
* Sanitize stored/displayed content where necessary
* Apply rate limiting
* Prevent excessively large requests
* Log suspicious activity

The inquiry should only be stored after successful validation.

---

# 7. Spam & Abuse Protection

The public inquiry endpoint should have basic anti-abuse controls.

Recommended:

* Rate limiting
* Request size limits
* Basic spam detection
* Optional CAPTCHA if spam becomes significant
* IP/request logging where appropriate

Do not introduce CAPTCHA by default if simpler protection is sufficient.

---

# 8. CORS

The backend must use an explicit CORS configuration.

Production should allow only the official frontend origin.

Avoid:

```text
allow_origins=["*"]
```

for production APIs unless there is a specific justified requirement.

Development origins may be allowed separately.

---

# 9. Database Security

The database must never be directly accessible from the browser.

Only the backend should communicate with PostgreSQL.

Requirements:

* Use environment-based credentials
* Use parameterized queries through SQLAlchemy
* Do not construct SQL using raw user input
* Restrict database network access where possible
* Use least-privilege database credentials

---

# 10. SQL Injection

Database queries must use SQLAlchemy's parameterized mechanisms.

Never construct queries by concatenating user-provided strings.

User input must never become executable SQL.

---

# 11. XSS Protection

User-submitted inquiry content must not be rendered as trusted HTML.

Examples include:

* Name
* Company name
* Message
* Contact information

The frontend should escape rendered user-generated content.

The backend should store data safely without treating it as executable HTML.

---

# 12. Security Headers

Production responses should include appropriate security headers where applicable.

Recommended headers include:

* `Content-Security-Policy`
* `X-Content-Type-Options`
* `Referrer-Policy`
* `Strict-Transport-Security`
* `X-Frame-Options` or equivalent CSP `frame-ancestors`

Headers should be configured carefully so they do not break legitimate application functionality.

---

# 13. Authentication

Phase 1 does **not** require:

* Buyer authentication
* Admin authentication
* User accounts
* Password management

Therefore, authentication infrastructure should not be added prematurely.

If buyer/admin accounts are introduced later, authentication must be designed as a separate security layer.

---

# 14. Authorization

There are no authenticated user roles in Phase 1.

Public users should only have access to public functionality.

Internal/company operations should not be exposed through public APIs.

Future roles such as:

```text
Admin
Sales
Buyer
Operations
```

should be introduced only when the corresponding platform features are implemented.

---

# 15. File & Image Security

Product images should be stored through the approved external storage/CDN architecture.

Uploaded files, if introduced later, must have:

* File type validation
* File size limits
* Safe filenames
* Malware/security scanning where appropriate
* Restricted storage permissions

Phase 1 should avoid unnecessary user file uploads.

---

# 16. Logging & Monitoring

The backend should log important security and operational events.

Examples:

* Failed API requests
* Validation failures
* Rate-limit violations
* Unexpected server errors
* Inquiry creation
* External notification failures

Logs must not contain:

* Passwords
* API keys
* Database credentials
* Sensitive secrets

---

# 17. Error Handling

Production APIs must not expose internal implementation details.

Avoid returning:

```text
Database connection failed at /app/services/inquiry.py line 84
```

Instead return a safe message such as:

```text
Unable to process your request. Please try again.
```

Detailed errors should remain in server logs.

---

# 18. Dependency Security

Dependencies should be:

* Pinned or version-controlled
* Regularly updated
* Reviewed for known vulnerabilities
* Removed when no longer required

Avoid adding packages without a clear need.

---

# 19. Deployment Security

Production deployment must ensure:

* Secrets are stored in platform environment variables
* Debug mode is disabled
* HTTPS is enabled
* Database credentials are not exposed
* CORS is restricted
* Production error responses are safe
* Dependencies are installed from controlled requirements

---

# 20. Security Checklist

Before production:

* [ ] HTTPS enabled
* [ ] Secrets removed from source code
* [ ] `.env` excluded from Git
* [ ] Production CORS configured
* [ ] Inquiry validation implemented
* [ ] Rate limiting implemented
* [ ] Database not publicly exposed
* [ ] SQL injection protection verified
* [ ] XSS protection verified
* [ ] Security headers configured
* [ ] Debug mode disabled
* [ ] Safe production error handling
* [ ] Dependencies reviewed
* [ ] Logs do not expose secrets

---

# 21. Core Security Principle

> **Keep Phase 1 secure, simple and maintainable. Protect the public inquiry workflow, company infrastructure and buyer data without introducing unnecessary authentication or enterprise security complexity.**

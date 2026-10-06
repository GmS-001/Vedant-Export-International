# Backend Architecture

## 1. Purpose

This document defines the backend architecture for the Vedant Exports International website.

The backend is responsible for:

* Serving the frontend through a controlled API
* Validating incoming requests
* Managing product data
* Receiving and storing buyer inquiries
* Triggering buyer and company notifications
* Providing a secure boundary around business data
* Supporting future expansion into a larger B2B export platform

The Phase 1 backend should remain intentionally simple.

The goal is:

> **Build a reliable backend for the current business workflow without prematurely building a complex platform.**

---

# 2. Backend Architecture Principles

The backend follows these principles.

## 2.1 KISS

Keep the backend as simple as possible.

Do not introduce infrastructure, services, libraries, or abstractions unless they solve a real requirement.

---

## 2.2 Separation of Concerns

Each layer should have a clear responsibility.

```text
API Route
    ↓
Schema Validation
    ↓
Service Layer
    ↓
Repository Layer
    ↓
PostgreSQL
```

External integrations should remain separate:

```text
Service Layer
    ├── Email Service
    ├── WhatsApp Service
    └── Storage Service
```

---

## 2.3 Modular Monolith

Phase 1 should use a **modular monolith**.

Do not use microservices.

The backend is currently small, has a limited number of workflows, and has one primary business process:

```text
Buyer
  ↓
Product Discovery
  ↓
Request Quote
  ↓
Inquiry
  ↓
Persistence
  ↓
Notification
  ↓
Human Follow-up
```

A modular monolith provides:

* Simple deployment
* Simple debugging
* Low operational complexity
* Clear module boundaries
* Easy future expansion

Future modules can be introduced without converting the Phase 1 application into microservices.

---

## 2.4 Future-Ready, Not Future-Heavy

The architecture should provide sensible extension points for:

* Buyer accounts
* RFQs
* Quotations
* Orders
* Documents
* Shipment tracking
* Buyer portal
* Payments

However, these features must not be implemented in Phase 1.

---

## 2.5 Provider Abstraction

External providers should not be tightly coupled to business logic.

For example:

```text
InquiryService
      ↓
EmailService
      ↓
Email Provider
```

Instead of:

```text
InquiryService
      ↓
Direct Resend-specific implementation
```

This allows the provider to be replaced later without rewriting business logic.

---

# 3. Technology Stack

| Area           | Technology                                        |
| -------------- | ------------------------------------------------- |
| Language       | Python                                            |
| Framework      | FastAPI                                           |
| Validation     | Pydantic                                          |
| ORM            | SQLAlchemy                                        |
| Database       | PostgreSQL                                        |
| Migrations     | Alembic                                           |
| API Style      | REST                                              |
| API Version    | `/api/v1/`                                        |
| Email          | Resend or equivalent provider                     |
| WhatsApp       | WhatsApp provider                                 |
| Storage        | Cloudinary / S3-compatible storage where required |
| Testing        | Pytest                                            |
| Deployment     | Render / Railway / Fly.io                         |
| Source Control | GitHub                                            |

---

# 4. Backend Responsibilities

The backend is the authoritative server-side boundary for business data.

It is responsible for:

1. API routing
2. Request validation
3. Business validation
4. Product retrieval
5. Inquiry creation
6. Database interaction
7. Inquiry reference generation
8. Transactional email workflows
9. WhatsApp communication where configured
10. Error handling
11. Logging
12. Security controls
13. Health checks
14. Future business APIs

The backend must not be responsible for:

* Rendering the website UI
* UI animations
* Frontend layout
* SEO presentation
* Client-side navigation
* Browser-only interaction logic

---

# 5. High-Level Architecture

```text
                    International Buyer
                           │
                           ▼
                    Next.js Frontend
                           │
                     HTTPS REST API
                           │
                           ▼
                     FastAPI Backend
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
       Pydantic Schemas            Core Services
              │                         │
              └────────────┬────────────┘
                           ▼
                     Service Layer
                           │
                 ┌─────────┴─────────┐
                 ▼                   ▼
        Repository Layer       External Services
                 │             ├── Email
                 ▼             ├── WhatsApp
            PostgreSQL         └── Storage
```

---

# 6. Backend Folder Structure

Recommended structure:

```text
backend/
│
├── app/
│   │
│   ├── api/
│   │   └── v1/
│   │       ├── products.py
│   │       ├── inquiries.py
│   │       └── health.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── logging.py
│   │
│   ├── models/
│   │   ├── product.py
│   │   ├── product_category.py
│   │   ├── inquiry.py
│   │   └── inquiry_item.py
│   │
│   ├── schemas/
│   │   ├── product.py
│   │   ├── inquiry.py
│   │   └── common.py
│   │
│   ├── services/
│   │   ├── product_service.py
│   │   ├── inquiry_service.py
│   │   ├── email_service.py
│   │   ├── whatsapp_service.py
│   │   └── storage_service.py
│   │
│   ├── repositories/
│   │   ├── product_repository.py
│   │   ├── product_category_repository.py
│   │   └── inquiry_repository.py
│   │
│   ├── db/
│   │   ├── session.py
│   │   └── base.py
│   │
│   └── main.py
│
├── migrations/
│
├── tests/
│   ├── api/
│   ├── services/
│   └── repositories/
│
├── alembic.ini
├── requirements.txt
├── .env.example
└── README.md
```

The exact structure may evolve during implementation, but responsibilities must remain separated.

---

# 7. Application Entry Point

`app/main.py` is the backend entry point.

Responsibilities:

* Create the FastAPI application
* Configure application-level middleware
* Configure CORS
* Register API routers
* Configure startup/shutdown behavior if required
* Configure global exception handling

Conceptually:

```text
FastAPI Application
       │
       ├── /api/v1/products
       ├── /api/v1/inquiries
       └── /api/v1/health
```

`main.py` should remain small.

Business logic must not be placed directly inside `main.py`.

---

# 8. API Architecture

All APIs must use versioning:

```text
/api/v1/
```

Initial endpoints:

```text
GET  /api/v1/products
GET  /api/v1/products/{slug}

POST /api/v1/inquiries

GET  /api/v1/health
```

Future API modules may include:

```text
/api/v1/auth
/api/v1/buyers
/api/v1/rfqs
/api/v1/quotes
/api/v1/orders
/api/v1/documents
/api/v1/shipments
/api/v1/payments
```

These are future extension points and are not Phase 1 requirements.

---

# 9. API Layer

The API layer handles HTTP concerns.

Responsibilities:

* Receive HTTP requests
* Parse request payloads
* Invoke Pydantic validation
* Call the appropriate service
* Return response schemas
* Map known errors to HTTP responses

The API layer should **not** contain substantial business logic.

Example:

```text
POST /api/v1/inquiries
        ↓
Inquiry Route
        ↓
Inquiry Schema
        ↓
Inquiry Service
```

The route should not directly perform SQL queries.

---

# 10. Schema Layer

Pydantic schemas define the API contract.

They are responsible for:

* Request validation
* Response validation
* Serialization
* Field constraints
* Input normalization where appropriate

Example:

```text
InquiryCreate
InquiryResponse
ProductResponse
ProductListResponse
```

Frontend validation is useful for user experience, but it must never replace backend validation.

The backend is the final validation boundary.

---

# 11. Service Layer

The service layer contains business workflows.

Initial services:

```text
ProductService
InquiryService
EmailService
WhatsAppService
StorageService
```

### ProductService

Responsible for:

* Retrieving products
* Retrieving product categories
* Handling product-related business logic

### InquiryService

Responsible for:

* Processing buyer inquiries
* Validating business rules
* Creating inquiry records
* Generating inquiry references
* Coordinating inquiry notifications

### EmailService

Responsible for:

* Company inquiry notifications
* Buyer confirmation emails
* Email provider communication

### WhatsAppService

Responsible for:

* WhatsApp notifications where configured
* Provider-specific WhatsApp communication

### StorageService

Responsible for storage-provider interaction where backend-side storage operations are required.

---

# 12. Repository Layer

Repositories isolate database operations from business logic.

Initial repositories:

```text
ProductRepository
ProductCategoryRepository
InquiryRepository
```

Repositories are responsible for:

* Database queries
* Inserts
* Updates
* Retrieval
* Persistence operations

Repositories should not decide business workflows.

For example:

```text
Repository:
    "Find product by slug"

Service:
    "Determine whether this product can be returned"
```

Business decisions belong in services.

---

# 13. Database Layer

PostgreSQL is the primary relational database.

SQLAlchemy is used as the ORM.

Alembic is used for database migrations.

The database should remain intentionally small during Phase 1.

Initial entities:

```text
product_categories
products
inquiries
inquiry_items
```

The detailed database schema is defined in:

```text
docs/06-database-design.md
```

The backend architecture should not duplicate the complete database specification.

---

# 14. Database Session Management

Database sessions should be managed centrally.

Conceptually:

```text
API Request
     ↓
Database Dependency
     ↓
SQLAlchemy Session
     ↓
Repository
     ↓
PostgreSQL
```

Repositories should receive the appropriate database session rather than creating uncontrolled database connections.

Connections must be properly released after requests.

---

# 15. Transaction Management

Database operations that belong to one business transaction should be handled atomically.

For an inquiry:

```text
Create Inquiry
      +
Create Inquiry Items
      ↓
Commit
```

If the database transaction fails:

```text
Inquiry
+
Inquiry Items
```

should not be left partially persisted.

The database write is the core persistence operation.

External notifications are separate operations.

---

# 16. Request Quote Flow

The primary backend workflow is the buyer inquiry.

```text
Buyer
  ↓
Next.js Request Quote Form
  ↓
POST /api/v1/inquiries
  ↓
Pydantic Validation
  ↓
Inquiry Service
  ↓
Inquiry Repository
  ↓
PostgreSQL
  ↓
Generate Inquiry Reference
  ↓
Notification Services
  ├── Email to Vedant
  ├── Confirmation Email to Buyer
  └── WhatsApp where configured
  ↓
API Response
  ↓
Frontend Confirmation
```

---

# 17. Inquiry Payload

The Phase 1 inquiry captures:

```text
Product
Quantity
Destination Country
Packaging
Required Date
Message
Name
Company Name
Email
Phone / WhatsApp
```

Future fields may include:

```text
Destination Port
Incoterm
Grade
Product Specifications
Additional Requirements
```

Future fields should not be required in Phase 1 unless business requirements change.

---

# 18. Inquiry Processing Rules

A successful inquiry must:

1. Pass frontend validation.
2. Pass backend/Pydantic validation.
3. Pass business validation.
4. Be stored in PostgreSQL.
5. Receive a unique inquiry reference.
6. Trigger a Vedant notification.
7. Trigger a buyer confirmation.
8. Trigger WhatsApp communication where configured.
9. Return a useful response to the frontend.

Example reference:

```text
VEI-2026-000001
```

The internal database UUID remains separate from the human-readable reference.

---

# 19. Notification Architecture

Notifications must not be tightly coupled to the inquiry route.

Use:

```text
InquiryService
      │
      ├── EmailService
      │
      └── WhatsAppService
```

The inquiry should first be persisted successfully.

Then notification workflows should be executed.

The system must distinguish:

```text
Inquiry persistence failure
```

from:

```text
Notification failure
```

A notification failure must not silently cause loss of the inquiry.

---

# 20. Email Architecture

The backend should support two primary email workflows.

### 20.1 Vedant Notification

When a buyer submits an inquiry:

```text
Buyer
  ↓
Inquiry API
  ↓
Database
  ↓
Vedant notification email
```

The email should contain:

* Inquiry reference
* Buyer name
* Company
* Email
* Phone
* Product
* Quantity
* Destination
* Packaging
* Required date
* Message

---

### 20.2 Buyer Confirmation

After successful inquiry persistence:

```text
Inquiry
  ↓
Buyer confirmation email
```

The confirmation should communicate:

* Inquiry received
* Inquiry reference
* Basic submitted information
* Expected manual follow-up

The backend should not promise an automated quotation.

---

# 21. WhatsApp Architecture

WhatsApp is an additional communication channel.

Conceptually:

```text
InquiryService
      ↓
WhatsAppService
      ↓
WhatsApp Provider
```

Provider-specific implementation must remain inside the WhatsApp integration layer.

The core inquiry logic must not depend directly on a specific WhatsApp provider.

If WhatsApp is unavailable or not configured, inquiry persistence must continue normally.

---

# 22. Product API Architecture

Products are primarily read-oriented in Phase 1.

```text
GET /api/v1/products
```

Returns active products suitable for public presentation.

```text
GET /api/v1/products/{slug}
```

Returns a specific product.

Conceptually:

```text
Frontend
   ↓
Product API
   ↓
Product Schema
   ↓
Product Service
   ↓
Product Repository
   ↓
PostgreSQL
```

Only active/public products should be exposed through public product APIs.

---

# 23. Health Check

The backend should expose:

```text
GET /api/v1/health
```

The endpoint should provide a simple indication that the API is operational.

Example:

```json
{
  "status": "ok"
}
```

The health endpoint should remain lightweight.

If database health checks are added, they should be intentionally designed rather than making the endpoint unnecessarily expensive.

---

# 24. Error Handling

The backend should return predictable HTTP responses.

Common cases:

| Situation                           | Expected Response |
| ----------------------------------- | ----------------- |
| Invalid request                     | `422`             |
| Resource not found                  | `404`             |
| Unauthorized access when applicable | `401`             |
| Forbidden access when applicable    | `403`             |
| Rate limited                        | `429`             |
| Unexpected server failure           | `500`             |

Validation errors should provide useful field-level information where appropriate.

Internal implementation details and secrets must never be exposed to the client.

---

# 25. Validation

Validation happens at multiple levels.

```text
Frontend
   ↓
User Experience Validation
   ↓
Backend
   ↓
Pydantic Validation
   ↓
Business Validation
   ↓
Database Constraints
```

The frontend must never be considered a trusted source.

The backend must validate all important inputs independently.

Examples:

* Required fields
* Valid email
* Valid quantity
* Valid product
* Valid destination country
* Valid date
* Valid string lengths
* Allowed values where applicable

---

# 26. Security Architecture

The backend must follow basic production security practices.

Required:

* HTTPS
* Environment-based secrets
* Server-side validation
* SQL injection protection through SQLAlchemy/query parameterization
* CORS configuration
* Rate limiting
* Spam/bot protection
* Secure HTTP headers
* Email abuse prevention
* Error logging
* No secrets in GitHub

The inquiry endpoint is publicly accessible and therefore requires special protection against spam and abuse.

---

# 27. CORS

The backend must explicitly configure allowed frontend origins.

Do not use unrestricted CORS in production.

Development may allow local frontend origins.

Production should allow only the actual website origin(s).

Example concept:

```text
Development:
http://localhost:3000

Production:
https://www.vedantexportsinternational.com
```

The final production domain should come from environment configuration rather than being hardcoded throughout the application.

---

# 28. Rate Limiting and Spam Protection

The inquiry endpoint is a high-value public endpoint and should not be completely open to automated submissions.

Protection may include:

* IP-based rate limiting
* Request frequency limits
* Honeypot fields
* CAPTCHA/Turnstile where necessary
* Payload size limits
* Basic abuse detection

Do not add complicated anti-spam infrastructure unless actual abuse requires it.

---

# 29. Authentication

Authentication is **not required in Phase 1**.

There are no:

* Buyer accounts
* Admin accounts
* Buyer dashboards
* Admin dashboards

Therefore, do not introduce JWT/session authentication merely for architectural completeness.

Authentication can be introduced when buyer/admin functionality is actually implemented.

---

# 30. Environment Configuration

Sensitive configuration must be provided through environment variables.

Example:

```text
DATABASE_URL=
RESEND_API_KEY=
WHATSAPP_API_KEY=
WHATSAPP_PHONE_NUMBER_ID=
CORS_ORIGINS=
ENVIRONMENT=
```

Additional environment variables should be introduced only when required.

Never commit real secrets to GitHub.

Use:

```text
.env
```

locally and:

```text
.env.example
```

as a safe configuration template.

---

# 31. Configuration Management

Application configuration should be centralized.

Recommended:

```text
app/core/config.py
```

Configuration should include:

* Environment
* Database URL
* External service credentials
* CORS origins
* Application settings
* Notification settings

Application code should not repeatedly read raw environment variables throughout the codebase.

---

# 32. Logging

The backend should use structured and meaningful logging.

Important events include:

* Application startup
* Application shutdown
* API errors
* Database errors
* Inquiry creation
* Notification failures
* External provider failures

Logs must not contain:

* API keys
* Passwords
* Sensitive credentials
* Unnecessary personal information

Inquiry logging should be designed carefully because inquiry data contains buyer contact information.

---

# 33. API Response Design

Responses should be predictable and consistent.

Successful response example:

```json
{
  "success": true,
  "data": {
    "reference": "VEI-2026-000001"
  }
}
```

Error response example:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid inquiry data"
  }
}
```

The exact response envelope should remain consistent with the API specification document.

---

# 34. Dependency Injection

FastAPI dependency injection should be used where it improves:

* Database session management
* Authentication in future modules
* Service dependencies
* Configuration
* Testing

Do not create unnecessary dependency abstractions.

The goal is clear, testable code rather than maximum abstraction.

---

# 35. External Service Interfaces

External services should be accessed through application-level services.

Example:

```text
app/services/email_service.py
```

The business layer should interact with:

```text
EmailService
```

rather than directly importing provider-specific implementation everywhere.

This makes provider replacement easier.

Example:

```text
InquiryService
      ↓
EmailService Interface
      ↓
Resend Implementation
```

---

# 36. Database and Business Logic Boundary

Business logic belongs in services.

Database operations belong in repositories.

Example:

```text
Route
  ↓
Service
  ↓
Repository
  ↓
Database
```

Avoid:

```text
Route
  ↓
SQL Query
  ↓
Email API
  ↓
Business Logic
```

This makes the backend difficult to test and maintain.

---

# 37. Backend Request Flow

## Product Request

```text
GET /api/v1/products/{slug}
        ↓
Product Route
        ↓
Product Schema
        ↓
Product Service
        ↓
Product Repository
        ↓
PostgreSQL
        ↓
Product Response
        ↓
Frontend
```

## Inquiry Request

```text
POST /api/v1/inquiries
        ↓
Inquiry Route
        ↓
Pydantic Validation
        ↓
Inquiry Service
        ↓
Inquiry Repository
        ↓
PostgreSQL
        ↓
Inquiry Reference
        ↓
Email / WhatsApp Services
        ↓
Inquiry Response
        ↓
Frontend
```

---

# 38. API-to-Database Rule

API routes must not directly access SQLAlchemy models for complex business operations.

Use:

```text
Route → Service → Repository → Database
```

This keeps the architecture consistent across future modules.

---

# 39. Testing Architecture

The backend should be testable at multiple levels.

## 39.1 API Tests

Test:

* Endpoint availability
* Request validation
* Response structure
* HTTP status codes
* Error handling

---

## 39.2 Service Tests

Test:

* Inquiry workflow
* Business validation
* Inquiry reference generation
* Notification orchestration

---

## 39.3 Repository Tests

Test:

* Product retrieval
* Inquiry persistence
* Database interactions

---

## 39.4 Integration Tests

Important integration flows should verify:

```text
API
 ↓
Service
 ↓
Repository
 ↓
Database
```

External providers should generally be mocked during automated tests.

---

# 40. Performance

Phase 1 does not require complex backend optimization.

Priorities:

* Efficient database queries
* Proper indexes
* Connection management
* Small API payloads
* Avoid unnecessary queries
* Avoid N+1 query patterns
* Appropriate response serialization

The backend should remain lightweight because the website is primarily a public information and inquiry-generation platform.

---

# 41. Caching

Caching should be introduced only where it provides measurable value.

Potential future candidates:

* Product catalog
* Frequently accessed product data
* Static configuration

Do not introduce Redis or another caching system in Phase 1 unless actual requirements justify it.

---

# 42. Background Processing

The inquiry workflow contains external notifications.

If notification processing eventually needs asynchronous/background execution, it may be introduced through an appropriate task mechanism.

However:

> Do not introduce Celery, Redis, message queues, or distributed workers merely for future-proofing.

Phase 1 should remain simple.

---

# 43. API Documentation

FastAPI automatically provides API documentation.

Development endpoints should expose:

```text
/docs
/redoc
```

Production exposure should be evaluated as part of the security/deployment configuration.

API documentation should remain synchronized with Pydantic schemas and actual endpoint behavior.

---

# 44. Deployment Architecture

The backend is independently deployed from the frontend.

Recommended:

```text
GitHub
   ↓
Backend Hosting
   ↓
FastAPI
   ↓
Managed PostgreSQL
```

Potential backend hosting:

* Render
* Railway
* Fly.io

Frontend:

```text
GitHub
   ↓
Vercel
   ↓
Next.js
```

Database:

```text
Managed PostgreSQL
```

The database should not be manually hosted on the same server as the FastAPI application.

---

# 45. Domain Architecture

The frontend and backend should remain independently deployable.

Preferred future structure:

```text
www.vedantexportsinternational.com
        ↓
Next.js Frontend


api.vedantexportsinternational.com
        ↓
FastAPI Backend
```

The final domain may differ depending on the company's selected domain.

---

# 46. Database Migration Strategy

Alembic should manage database schema changes.

Example workflow:

```text
Change SQLAlchemy Model
        ↓
Create Alembic Migration
        ↓
Review Migration
        ↓
Apply Migration
        ↓
PostgreSQL
```

Never rely on manually modifying production database tables.

---

# 47. Backend Modules and Future Expansion

The backend should eventually be capable of expanding toward:

```text
backend/
│
├── products
├── inquiries
├── buyers
├── rfqs
├── quotes
├── orders
├── documents
├── shipments
└── payments
```

However, only the required Phase 1 modules should initially exist.

The architecture should evolve based on actual business requirements.

---

# 48. What the Backend Should NOT Become

Phase 1 backend should not become:

* An e-commerce backend
* A CRM
* An ERP
* A payment platform
* A shipment tracking platform
* A supplier management system
* A complex authentication platform
* A microservice ecosystem
* A large event-driven architecture
* A generic enterprise framework

The backend exists primarily to support:

```text
Website
   ↓
Product Data
   ↓
Buyer Inquiry
   ↓
Reliable Persistence
   ↓
Reliable Notification
```

---

# 49. Backend Acceptance Criteria

The backend is considered ready for Phase 1 when:

### Architecture

* FastAPI is used.
* Backend follows modular-monolith architecture.
* API, schemas, services, repositories and models are separated.
* API versioning uses `/api/v1/`.

### Product APIs

* Product list endpoint works.
* Product detail endpoint works.
* Only active/public products are exposed.

### Inquiry

* Inquiry endpoint works.
* Pydantic validation works.
* Business validation works.
* Inquiry is persisted reliably.
* Inquiry reference is generated.
* Inquiry data follows the database design.

### Notifications

* Vedant receives inquiry notification.
* Buyer receives confirmation.
* WhatsApp integration works where configured.
* Notification failures are handled explicitly.

### Security

* Secrets are environment-based.
* CORS is configured.
* Input validation is enforced.
* Inquiry endpoint has abuse protection.
* Production errors do not expose internal details.

### Operations

* Health endpoint works.
* Logging is implemented.
* Database migrations are managed through Alembic.
* Backend can be deployed independently.

### Testing

* API tests exist.
* Core inquiry workflow is tested.
* Repository/database behavior is tested where appropriate.
* External providers are mockable.

---

# 50. Source-of-Truth Hierarchy

When backend implementation decisions conflict, use this order:

```text
requirements.md
      ↓
system-design.md
      ↓
05-backend-architecture.md
      ↓
06-database-design.md
      ↓
07-api-specification.md
      ↓
implementation
```

Where a more specific document defines a detail, that document should be followed.

The backend architecture should not override business requirements.

---

# 51. Core Backend Principle

The backend should follow one central principle:

> **Keep the backend small, reliable, secure and modular enough to support the current export website while creating a clean foundation for Vedant's future B2B platform.**

The Phase 1 backend should optimize for **reliability and clarity, not complexity**.

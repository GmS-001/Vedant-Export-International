# System Design — Vedant Exports International

## 1. Purpose

This document defines the implementation-oriented system design for the Phase 1 Vedant Exports International website and establishes the technical foundation for its future evolution into a B2B export platform.

The design follows the project architecture established in `docs/architecture.md`, the requirements defined in `docs/requirements.md`, and the functional workflow specified in `docs/functional-spec.md`.

The primary objective is to keep Phase 1 simple, maintainable, secure, and realistic for a small business while preserving clean boundaries for future expansion.

---

## 2. Scope

### 2.1 Phase 1 scope

Phase 1 consists of:

- Public company website
- Product catalog
- Dedicated product pages
- Product-driven Request a Quote workflow
- Structured buyer inquiry
- Frontend validation
- FastAPI validation and business logic
- PostgreSQL persistence
- Email notification to Vedant
- Buyer confirmation email
- WhatsApp communication
- Basic analytics
- SEO foundations
- Responsive UI
- Production deployment

### 2.2 Phase 1 exclusions

The following are explicitly out of scope:

- Buyer accounts
- Admin dashboard
- Online payments
- Order management
- Shipment tracking
- Buyer portal
- Internal CRM
- Automated quotation engine
- Inventory management
- Supplier portal
- ERP integration
- Full CMS
- Complex authentication and authorization

The architecture must not implement these features prematurely.

---

## 3. System Context

Vedant Exports International is an Indian agricultural sourcing and export company backed by a family agricultural trading business with 20+ years of domestic agricultural trading experience. Vedant Exports International itself is the newer international/export division and has approximately 1.5+ years of international/export business experience.

The website serves international B2B buyers including:

- Importers
- Wholesalers
- Distributors
- Food-processing companies
- Supermarket and retail chains
- Traders
- Sourcing agents
- Other exporters

Initial target markets include the United States, European Union, Australia, and Hong Kong, with the architecture remaining open to additional markets.

The central business flow is:

```text
Product Discovery
      ↓
Product Page
      ↓
Request a Quote
      ↓
Buyer Inquiry
      ↓
Validation
      ↓
Persistence
      ↓
Vedant Notification
      ↓
Buyer Confirmation
      ↓
Human Follow-up
```

---

## 4. Architectural Principles

The system follows these principles:

### KISS

Keep the implementation as simple as possible.

### Separation of concerns

Frontend, API, business logic, persistence, and external integrations have clear responsibilities.

### DRY

Shared functionality should not be unnecessarily duplicated.

### YAGNI

Only currently required functionality should be implemented.

### Future-ready, not future-heavy

The architecture should provide sensible extension points without implementing the future platform prematurely.

### Modular monolith

The Phase 1 backend is a modular monolith rather than a microservice architecture.

This is appropriate because:

- The application is initially small.
- There is one primary business workflow.
- Operational complexity should remain low.
- Deployment and debugging are simpler.
- Future modules can be introduced inside clear application boundaries.

### Provider abstraction

External services such as email, WhatsApp, and media storage should be accessed through application-level service interfaces rather than being tightly coupled to provider-specific implementation details.

---

# 5. High-Level Architecture

```mermaid
flowchart TB
    Buyer["International B2B Buyer"]

    subgraph Frontend["Frontend — Vercel"]
        Next["Next.js + TypeScript"]
        UI["Tailwind CSS + shadcn/ui"]
        SEO["SEO / Metadata"]
    end

    subgraph Backend["Backend — Render / Railway / Fly.io"]
        API["FastAPI"]
        Schemas["Pydantic Schemas"]
        Services["Service Layer"]
        Repositories["Repository Layer"]
    end

    DB[("Managed PostgreSQL")]

    subgraph External["External Services"]
        Email["Resend"]
        WhatsApp["WhatsApp Provider"]
        Storage["Cloudinary / S3-compatible Storage"]
        Analytics["Analytics"]
    end

    Buyer --> Next
    Next --> UI
    Next --> SEO

    Next -->|HTTPS REST API| API
    API --> Schemas
    Schemas --> Services
    Services --> Repositories
    Repositories --> DB

    Services --> Email
    Services --> WhatsApp
    Next --> Storage
    Next --> Analytics
```

---

# 6. Component Responsibilities

## 6.1 Next.js frontend

The frontend is responsible for:

- Public page rendering
- Routing
- Product presentation
- Responsive UI
- Request Quote interface
- Client-side interaction
- Form-level validation
- SEO metadata
- Open Graph metadata
- Analytics events
- Communication CTAs such as WhatsApp, email, and phone

The frontend must not contain secrets.

Public environment variables may be exposed only when they are intentionally designed to be public, such as the backend base URL.

---

## 6.2 FastAPI backend

The FastAPI backend is responsible for:

- API routing
- Request validation
- Business validation
- Product retrieval APIs where needed
- Inquiry creation
- Database interaction through application layers
- Transactional email workflows
- WhatsApp integration
- Future business APIs

The backend is the authoritative boundary for persisted business data and server-side validation.

---

## 6.3 Pydantic schemas

Pydantic models define:

- Request payloads
- Response payloads
- Field validation
- Business input constraints
- Serialization boundaries

Frontend validation improves user experience, but backend validation remains mandatory.

---

## 6.4 Service layer

The service layer contains business workflows.

Examples:

```text
InquiryService
ProductService
EmailService
WhatsAppService
StorageService
```

The service layer should orchestrate business operations without directly embedding HTTP-route concerns.

Example:

```text
POST /api/v1/inquiries
        ↓
Inquiry API Route
        ↓
Inquiry Pydantic Schema
        ↓
Inquiry Service
        ↓
Inquiry Repository
        ↓
PostgreSQL
        ↓
Notification Services
```

---

## 6.5 Repository layer

Repositories isolate persistence operations from business logic.

For example:

```text
InquiryRepository
ProductRepository
ProductCategoryRepository
```

Repositories should handle database queries and persistence concerns.

Business decisions should remain in services.

---

## 6.6 PostgreSQL

PostgreSQL is the primary relational database.

Phase 1 data should remain intentionally small and normalized.

Initial entities:

```text
products
product_categories
inquiries
inquiry_items
```

---

# 7. Frontend Architecture

Recommended frontend structure:

```text
frontend/
├── app/
│   ├── about/
│   ├── products/
│   │   └── [slug]/
│   ├── sourcing/
│   ├── cold-storage/
│   ├── quality/
│   ├── certifications/
│   ├── export-process/
│   ├── markets/
│   ├── industries/
│   ├── contact/
│   ├── request-a-quote/
│   ├── faq/
│   └── insights/
│
├── components/
├── features/
│   ├── products/
│   └── inquiries/
├── lib/
├── hooks/
├── types/
└── public/
```

The exact folder structure may evolve during implementation, but responsibilities should remain separated.

---

# 8. Backend Architecture

Recommended backend structure:

```text
backend/
├── app/
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
│   ├── schemas/
│   ├── services/
│   ├── repositories/
│   └── main.py
│
├── tests/
└── ...
```

The backend should remain a modular monolith.

---

# 9. Request Flow

## 9.1 Product discovery

```mermaid
sequenceDiagram
    participant B as Buyer
    participant F as Next.js
    participant API as FastAPI
    participant DB as PostgreSQL

    B->>F: Open product page
    F->>API: Request product data
    API->>DB: Query product
    DB-->>API: Product record
    API-->>F: Product response
    F-->>B: Render product page
```

For SEO-critical product pages, Next.js should use server-side rendering or static generation where appropriate.

---

## 9.2 Request Quote flow

```mermaid
sequenceDiagram
    participant B as Buyer
    participant F as Next.js
    participant API as FastAPI
    participant V as Pydantic
    participant S as Inquiry Service
    participant R as Inquiry Repository
    participant DB as PostgreSQL
    participant E as Resend
    participant W as WhatsApp

    B->>F: Submit inquiry
    F->>F: Client-side validation
    F->>API: POST /api/v1/inquiries
    API->>V: Validate payload
    V-->>API: Validated data
    API->>S: Create inquiry
    S->>R: Persist inquiry
    R->>DB: INSERT inquiry
    DB-->>R: Saved inquiry
    R-->>S: Inquiry reference
    S->>E: Notify Vedant
    S->>E: Send buyer confirmation
    S->>W: Trigger WhatsApp communication where configured
    S-->>API: Inquiry result
    API-->>F: Success response
    F-->>B: Confirmation + reference
```

---

# 10. Inquiry Domain Design

The primary business entity in Phase 1 is the buyer inquiry.

The initial inquiry form captures:

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

Potential future fields:

```text
Destination Port
Incoterm
Grade
Product Specifications
Additional Requirements
```

These future fields should not be required in Phase 1 unless business requirements change.

---

## 10.1 Inquiry processing rules

A successful inquiry must:

1. Pass frontend validation.
2. Pass backend/Pydantic validation.
3. Be stored in PostgreSQL.
4. Generate a Vedant notification.
5. Send a buyer confirmation.
6. Return a useful reference when appropriate.

The database write should be treated as the core persistence operation.

External notification failures must be handled explicitly rather than causing silent data loss.

---

# 11. Failure Handling

The system must distinguish between:

### Validation failure

Example:

```text
Missing email
Invalid email
Missing product
Invalid quantity
```

Response:

```text
HTTP 422
```

The frontend should show actionable validation feedback.

### Business failure

A request can be syntactically valid but fail a business rule.

The service layer should return a controlled application error.

### External service failure

Examples:

- Resend API unavailable or rate-limited
- WhatsApp provider (Twilio / Meta) network timeout
- Cloudinary / media storage service unavailable

The inquiry must never be discarded or rolled back merely because an external notification or media provider failed.

Where practical:

```text
Persist inquiry in PostgreSQL
      ↓
Commit database transaction
      ↓
Dispatch background notification tasks (FastAPI BackgroundTasks)
      ↓
Attempt notifications with isolated retry loop & backoff
      ↓
Record channel statuses ('sent' / 'failed') & errors in DB
      ↓
Enable operational retry for failed channels
```

---

## 11.1 Retry Mechanism & Notification Resilience

The notification system implements durable, fault-isolated asynchronous execution:

### 1. Database Durability First

The inquiry record is committed to PostgreSQL **before** any notification attempt. Even if both Resend and WhatsApp are completely offline:
- The inquiry is permanently preserved with its unique reference ID.
- The HTTP response to the buyer succeeds with status `201 Created`.
- Initial delivery statuses are recorded as `'pending'`.

### 2. Asynchronous Execution via FastAPI BackgroundTasks

Notifications are executed asynchronously using FastAPI's `BackgroundTasks` (or an equivalent async task runner). This ensures:
- The buyer's HTTP response is never blocked by external provider network latency or rate limits.
- Third-party provider outages do not cause HTTP 500 errors to the buyer.

### 3. Fault Isolation Across Channels

Each notification channel runs in its own isolated execution block:
- `Company Email` (Resend)
- `Buyer Email` (Resend)
- `Company WhatsApp` (Twilio)
- `Buyer WhatsApp` (Twilio)

A failure in WhatsApp dispatch never interrupts email delivery, and vice versa.

### 4. Exponential Backoff Retry Loop

For transient errors (e.g. HTTP 429, 502, 503, 504, or network socket timeouts), each channel executes an internal retry loop:

| Attempt | Timing | Action |
| --- | --- | --- |
| Attempt 1 | Immediate (T = 0s) | Initial dispatch attempt |
| Attempt 2 | Delay: 2s (T = 2s) | First retry on transient network or API error |
| Attempt 3 | Delay: 4s (T = 6s) | Final retry attempt |

Configurable via `NOTIFICATION_MAX_RETRIES` (default: 3) and `NOTIFICATION_RETRY_BACKOFF_SECONDS` (default: 2).

### 5. Error Logging & Status Persistence

If all retry attempts for a channel are exhausted:
- The channel status in PostgreSQL (`company_email_status`, `buyer_email_status`, `company_whatsapp_status`, or `buyer_whatsapp_status`) is updated to `'failed'`.
- The `retry_count` is incremented.
- The exact error timestamp, provider response code, and error message are appended to `notification_error_log` (JSONB column).
- A structured warning is emitted to server logs for monitoring.

### 6. Operational Retry Interface

The `NotificationService` exposes an idempotent operational method:

```python
async def retry_failed_notifications(inquiry_id: UUID) -> dict[str, str]:
    """Inspects an inquiry, re-attempts delivery only for channels in 'failed' status,
    and updates database statuses accordingly."""
```

This enables manual or scheduled re-dispatch of failed alerts without generating duplicate notifications for already-sent channels.

---

# 12. API Design

All APIs use versioning:

```text
/api/v1/
```

Initial endpoints:

```http
GET  /api/v1/products
GET  /api/v1/products/{slug}

POST /api/v1/inquiries

GET  /api/v1/health
```

---

## 12.1 Inquiry Endpoint Implementation (`POST /api/v1/inquiries`)

The primary conversion endpoint processes buyer quote requests.

### Endpoint Definition

- **URL**: `/api/v1/inquiries`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Rate Limit**: 5 requests per minute per IP (configurable)

### Request Schema (`InquiryCreate`)

Pydantic validation model matching the form requirements in `docs/functional-spec.md`:

```python
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from uuid import UUID
from datetime import date
from decimal import Decimal

class InquiryCreate(BaseModel):
    # Buyer Contact Details
    full_name: str = Field(..., min_length=2, max_length=100, description="Buyer's full name")
    company_name: str = Field(..., min_length=2, max_length=100, description="Buyer's registered company")
    email: EmailStr = Field(..., description="Valid business email address")
    phone: str = Field(..., min_length=6, max_length=30, description="International phone or WhatsApp number with country code")
    country: str = Field(..., min_length=2, max_length=100, description="Destination or business country")
    city: Optional[str] = Field(None, max_length=100, description="Destination city or region")
    destination_port: Optional[str] = Field(None, max_length=100, description="Destination discharge port if known")

    # Requirement Information
    product_name: str = Field(..., min_length=2, max_length=100, description="Requested product name")
    product_id: Optional[UUID] = Field(None, description="Optional foreign key if selected from product page")
    quantity: Decimal = Field(..., gt=0, description="Requested order volume")
    unit: str = Field(..., min_length=1, max_length=20, description="Unit of measurement (e.g. kg, MT, packets)")
    grade_specification: Optional[str] = Field(None, max_length=255, description="Grade, mesh size, or specification requirements")
    packaging: Optional[str] = Field(None, max_length=100, description="Packaging preference (e.g. 25kg bags, bulk, private label)")
    required_date: Optional[date] = Field(None, description="Requested delivery or shipment date")
    message: Optional[str] = Field(None, max_length=2000, description="Additional buyer notes, certifications, or Incoterm preferences")
```

### Response Schemas

#### Success: `HTTP 201 Created`

```json
{
  "success": true,
  "reference": "VEI-261006-A8K2",
  "message": "Inquiry submitted successfully",
  "data": {
    "id": "e4b1c8e2-63dc-4c8d-8fd6-bfb291d98d24",
    "reference": "VEI-261006-A8K2",
    "created_at": "2026-10-06T00:30:00Z"
  }
}
```

#### Validation Error: `HTTP 422 Unprocessable Entity`

```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

#### Rate Limit Exceeded: `HTTP 429 Too Many Requests`

```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many inquiry submissions. Please wait a moment before trying again."
}
```

#### Server Error: `HTTP 500 Internal Server Error`

Returned only when core database persistence fails:

```json
{
  "error": "internal_server_error",
  "message": "We could not save your inquiry at this moment. Please contact us directly via WhatsApp or email."
}
```

### Controller Execution Flow

```text
POST /api/v1/inquiries
        ↓
FastAPI parses & validates payload with InquiryCreate
        ↓
Generate unique inquiry reference (e.g., VEI-YYMMDD-XXXX)
        ↓
InquiryRepository.create_inquiry() in PostgreSQL transaction
        ↓
BackgroundTasks.add_task(NotificationService.dispatch_all, inquiry_id)
        ↓
Return HTTP 201 Created immediately with reference
```

Future modules may include:

```text
/api/v1/auth
/api/v1/buyers
/api/v1/rfqs
/api/v1/quotes
/api/v1/orders
/api/v1/documents
/api/v1/shipments
```

These future endpoints are architectural extension points only and should not be implemented in Phase 1.

See `docs/07-api-specification.md` for detailed API contracts.

---

# 13. Product Architecture

Products are data-driven.

A product should conceptually contain:

```text
Product
├── identity
├── category
├── description
├── specifications
├── grades / variants
├── packaging
├── applications
├── MOQ
├── images
├── availability
├── quality information
├── sourcing information
└── quote CTA
```

Products should not have public fixed prices by default.

Pricing depends on:

- Quantity
- Grade
- Season
- Destination
- Packaging
- Logistics
- Market conditions
- Incoterms
- Buyer requirements

Therefore the primary conversion is:

```text
Request a Quote
```

---

# 14. Media Architecture

Production product images should not be stored directly inside Git.

Preferred media storage:

```text
Cloudinary
      OR
S3-compatible object storage
```

Conceptual flow:

```text
Product Record
      ↓
Image URL / Media Reference
      ↓
Cloud Storage/CDN
      ↓
Next.js Image Rendering
```

The database should store references/URLs rather than binary production image data unless a future requirement explicitly requires another strategy.

---

# 15. Email Architecture

Resend is the preferred initial transactional email service, accessed via the `resend-py` SDK or REST API (`https://api.resend.com/emails`).

Email functionality is decoupled through an application-level `EmailServiceInterface` and concrete `ResendEmailAdapter`:

```text
Inquiry Service
      ↓
Email Service Interface
      ↓
Resend Adapter (resend-py)
      ↓
Resend REST API
```

This keeps core business logic independent of any specific transactional email vendor.

---

## 15.1 Email Templates & Payload Specifications

The system implements two distinct transactional email workflows:

### 1. Company Inquiry Notification Email

- **Trigger**: Dispatched asynchronously after successful inquiry persistence in PostgreSQL.
- **Sender**: Configured `EMAIL_FROM` (e.g. `inquiries@vedantexports.com`).
- **Recipient**: Configured `COMPANY_NOTIFICATION_EMAIL` (e.g. `vedantexportsofficial@gmail.com`).
- **Reply-To**: Set directly to the buyer's submitted `email`, enabling one-click reply directly to the buyer.
- **Subject**: `[New Quote Request] {reference} — {product_name} ({quantity} {unit}) - {company_name}`
- **Content**:
  - Structured HTML table and clean plain-text fallback.
  - Complete buyer profile: Full Name, Company, Email, Phone/WhatsApp, Country, City.
  - Full requirement details: Product, Quantity & Unit, Grade/Specification, Packaging, Delivery Date, Port.
  - Buyer message / notes.
  - Timestamp and unique reference ID for auditability.

### 2. Buyer Confirmation Email

- **Trigger**: Dispatched asynchronously alongside company notification.
- **Sender**: Configured `EMAIL_FROM`.
- **Recipient**: Buyer's submitted `email`.
- **Subject**: `Inquiry Received — Vedant Exports International ({reference})`
- **Content**:
  - Professional, international B2B branded HTML template.
  - Clear acknowledgment that the inquiry has been received.
  - Summary of submitted requirement details for their records.
  - Clear explanation of next steps: Vedant's export team will review specifications and follow up manually with a formal quotation.
  - Direct WhatsApp and telephone contact options for urgent requirements.
  - **Constraint**: The email must never promise automated pricing, delivery guarantees, or response timelines.

---

## 15.2 Delivery Tracking & Error Handling

- Upon API response, Resend returns an email ID (`re_123456789`).
- Status updates:
  - Success: `company_email_status = 'sent'` / `buyer_email_status = 'sent'`.
  - Failure / Rate Limit: Status set to `'failed'`, error logged with code and message in `notification_error_log`.
- Failures do not propagate to the HTTP response or abort other notifications.

---

# 16. WhatsApp Architecture & Notification Service

WhatsApp provides immediate, high-priority mobile engagement for both internal operations and international buyer acknowledgment. It acts as an ephemeral notification channel, with PostgreSQL remaining the authoritative source of truth.

---

## 16.1 WhatsApp Provider Integration

The system uses the **Twilio WhatsApp Business API** (or Meta Cloud API) via a decoupled provider adapter:

```text
Notification Service
         ↓
WhatsApp Service Interface
         ↓
Twilio WhatsApp Adapter
         ↓
Twilio REST API (https://api.twilio.com/2010-04-01/Accounts/{SID}/Messages.json)
```

### Authentication & Provider Details

- **Protocol**: HTTPS REST API with HTTP Basic Auth (`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`).
- **Sender Number**: Configured `TWILIO_WHATSAPP_NUMBER` (e.g. `whatsapp:+14155238886`).
- **Recipient Formats**: E.164 international format (e.g. `whatsapp:+919876543210`).

---

## 16.2 WhatsApp Message Specifications

### 1. Company WhatsApp Alert

Sent to `COMPANY_NOTIFICATION_WHATSAPP` immediately after inquiry persistence:

```text
🔔 *New Quote Request — Vedant Exports*

*Ref:* {reference}
*Buyer:* {full_name} ({company_name})
*Product:* {product_name}
*Quantity:* {quantity} {unit}
*Destination:* {country}{", " + city if city else ""}
*Port:* {destination_port or "Not specified"}
*Packaging:* {packaging or "Standard"}
*Required Date:* {required_date or "Flexible"}

*Contact:*
• Email: {email}
• WhatsApp: {phone}

*Message:*
{message or "No additional notes"}
```

### 2. Buyer WhatsApp Confirmation

Sent to buyer's validated `phone` number:

```text
Hello {full_name},

Thank you for your inquiry to *Vedant Exports International*. We have received your request successfully.

*Reference:* {reference}
*Product:* {product_name}
*Quantity:* {quantity} {unit}

Our export team will review your specifications and contact you shortly with quotation details.

For urgent inquiries, feel free to reply directly to this chat.

Best regards,
*Vedant Exports International*
```

---

## 16.3 NotificationService Orchestration

The backend `NotificationService` coordinates both Email and WhatsApp channels:

```python
class NotificationService:
    def __init__(
        self,
        email_service: EmailServiceInterface,
        whatsapp_service: WhatsAppServiceInterface,
        repo: InquiryRepository
    ):
        self.email_service = email_service
        self.whatsapp_service = whatsapp_service
        self.repo = repo

    async def dispatch_all(self, inquiry_id: UUID) -> None:
        inquiry = await self.repo.get_by_id(inquiry_id)
        if not inquiry:
            return

        # 1. Company Email Notification
        await self._dispatch_with_retry(
            channel="company_email",
            inquiry_id=inquiry.id,
            coro=lambda: self.email_service.send_company_notification(inquiry)
        )

        # 2. Buyer Email Confirmation
        await self._dispatch_with_retry(
            channel="buyer_email",
            inquiry_id=inquiry.id,
            coro=lambda: self.email_service.send_buyer_confirmation(inquiry)
        )

        # 3. Company WhatsApp Alert
        await self._dispatch_with_retry(
            channel="company_whatsapp",
            inquiry_id=inquiry.id,
            coro=lambda: self.whatsapp_service.send_company_alert(inquiry)
        )

        # 4. Buyer WhatsApp Confirmation
        await self._dispatch_with_retry(
            channel="buyer_whatsapp",
            inquiry_id=inquiry.id,
            coro=lambda: self.whatsapp_service.send_buyer_confirmation(inquiry)
        )
```

Each dispatch is wrapped with the exponential retry loop, updating PostgreSQL statuses independently (`company_whatsapp_status`, `buyer_whatsapp_status`).

---

# 17. Security Architecture

The production system should implement:

- HTTPS
- Secure environment variables
- Backend input validation
- SQL injection protection through SQLAlchemy/database parameterization
- Appropriate CORS configuration
- Rate limiting
- Spam protection
- Bot protection
- Secure HTTP headers
- Controlled error responses
- Logging
- Email abuse prevention

Secrets must never be committed to GitHub.

Examples:

```text
DATABASE_URL
RESEND_API_KEY
WHATSAPP_API_KEY
NEXT_PUBLIC_API_URL
```

`NEXT_PUBLIC_*` values must be treated as public and must never contain secrets.

---

# 18. CORS

CORS should allow only known frontend origins in production.

Development may allow a local frontend origin.

Production configuration should not use unrestricted:

```text
*
```

for credentialed or sensitive API behavior.

---

# 19. Rate Limiting and Spam Protection

The Request Quote endpoint is a high-value abuse target.

The production implementation should protect it using appropriate controls such as:

- Rate limiting
- Request size limits
- Server-side validation
- Bot protection
- Honeypot or equivalent anti-spam mechanism
- Email validation
- Abuse monitoring

The exact provider/mechanism is an implementation decision and should avoid unnecessary infrastructure in Phase 1.

---

# 20. SEO Architecture

Important product pages must have unique:

- Title
- Meta description
- Canonical URL
- Open Graph metadata
- Semantic headings
- Structured data where appropriate
- Descriptive URLs
- Optimized images
- Internal links

Example:

```text
/products/potatoes
/products/onions
/products/moringa-powder
/products/turmeric-powder
```

The architecture should support genuine B2B search intent rather than keyword stuffing.

---

# 21. Performance Architecture

The system should prioritize:

- Fast initial rendering
- Optimized images
- Responsive images
- CDN delivery
- Lazy loading
- Appropriate caching
- Minimal client-side JavaScript
- Efficient fonts
- Limited third-party scripts
- Good Core Web Vitals

Next.js server rendering/static generation should be used where it provides clear SEO or performance benefits.

Animations must remain subtle and should never compromise performance.

---

# 22. Analytics Architecture

Potential analytics providers:

- Google Analytics
- Plausible

Important events include:

```text
product_view
quote_button_click
inquiry_started
inquiry_submitted
whatsapp_click
email_click
phone_click
```

Analytics should be implemented as a supporting capability and must not dominate application architecture.

---

# 23. Environment Configuration

Configuration is strictly environment-driven via standard environment variables. Secrets must never be committed to source control.

---

## 23.1 Configuration Variables Matrix

| Category | Variable | Type | Required | Description / Example |
| --- | --- | --- | --- | --- |
| **Database** | `DATABASE_URL` | String | Yes | `postgresql://user:pass@host:5432/vei_db?sslmode=require` |
| | `DB_POOL_SIZE` | Integer | No | SQLAlchemy connection pool size (default: `5`) |
| | `DB_MAX_OVERFLOW` | Integer | No | Max overflow connections (default: `10`) |
| **Email (Resend)** | `RESEND_API_KEY` | String | Yes | API key from Resend dashboard (`re_...`) |
| | `EMAIL_FROM` | String | Yes | Verified sender (`Vedant Exports <inquiries@vedantexports.com>`) |
| | `COMPANY_NOTIFICATION_EMAIL` | String | Yes | Owner/sales recipient (`vedantexportsofficial@gmail.com`) |
| **WhatsApp (Twilio)** | `WHATSAPP_PROVIDER` | String | Yes | Provider selector (`twilio` or `meta_cloud`) |
| | `TWILIO_ACCOUNT_SID` | String | Yes | Twilio Account SID (`AC...`) |
| | `TWILIO_AUTH_TOKEN` | String | Yes | Twilio Auth Token |
| | `TWILIO_WHATSAPP_NUMBER` | String | Yes | Twilio sender number (`+14155238886`) |
| | `COMPANY_NOTIFICATION_WHATSAPP` | String | Yes | Company recipient WhatsApp with country code (`+919876543210`) |
| **Retry & Resilience** | `NOTIFICATION_MAX_RETRIES` | Integer | No | Max retry attempts per channel (default: `3`) |
| | `NOTIFICATION_RETRY_BACKOFF_SECONDS` | Integer | No | Initial backoff delay in seconds (default: `2`) |
| **Core Backend** | `ENVIRONMENT` | String | Yes | `development`, `staging`, or `production` |
| | `CORS_ORIGINS` | String | Yes | Comma-separated allowed origins (e.g. `https://vedantexports.com`) |
| | `RATE_LIMIT_INQUIRIES_PER_MINUTE` | Integer | No | Max quote requests per IP per minute (default: `5`) |
| | `LOG_LEVEL` | String | No | Logging level: `INFO`, `DEBUG`, `WARNING` (default: `INFO`) |
| **Frontend** | `NEXT_PUBLIC_API_URL` | String | Yes | Backend base URL (e.g. `https://api.vedantexports.com`) |
| | `NEXT_PUBLIC_COMPANY_WHATSAPP` | String | Yes | Direct WhatsApp chat link phone (`919876543210`) |

---

## 23.2 Environments

Recommended deployment environments:

- **Development**: Local PostgreSQL, mock or test API keys, console logging.
- **Staging / Preview**: Preview database, test email domain, staging WhatsApp sandbox.
- **Production**: Managed PostgreSQL with SSL, production Resend verified domain, production WhatsApp Business number, strict CORS.

---

# 24. Deployment Architecture

Recommended deployment:

```mermaid
flowchart LR
    User["Buyer"]

    Vercel["Vercel
Next.js Frontend"]
    Backend["Render / Railway / Fly.io
FastAPI Backend"]
    DB["Managed PostgreSQL"]
    Email["Resend"]
    WA["WhatsApp Provider"]
    Storage["Cloudinary / S3"]

    User --> Vercel
    Vercel --> Backend
    Backend --> DB
    Backend --> Email
    Backend --> WA
    Vercel --> Storage
```

GitHub acts as the source-control and CI/CD foundation.

---

# 25. Database Design Direction

Initial database model:

```mermaid
erDiagram
    PRODUCT_CATEGORY ||--o{ PRODUCT : contains
    PRODUCT ||--o{ INQUIRY_ITEM : requested_in
    INQUIRY ||--o{ INQUIRY_ITEM : contains

    PRODUCT_CATEGORY {
        uuid id PK
        string name
        string slug UK
    }

    PRODUCT {
        uuid id PK
        uuid category_id FK
        string name
        string slug UK
        text description
        jsonb specifications
        string availability
        boolean is_active
    }

    INQUIRY {
        uuid id PK
        string reference UK
        string full_name
        string company_name
        string email
        string phone
        string country
        string city
        string destination_port
        string product_name
        uuid product_id FK
        decimal quantity
        string unit
        string grade_specification
        string packaging
        date required_date
        text message
        string status
        string company_email_status
        string buyer_email_status
        string company_whatsapp_status
        string buyer_whatsapp_status
        int retry_count
        jsonb notification_error_log
        timestamp created_at
        timestamp updated_at
    }

    INQUIRY_ITEM {
        uuid id PK
        uuid inquiry_id FK
        uuid product_id FK
        decimal quantity
        string unit
    }
```

---

## 25.1 Technical PostgreSQL Schema DDL

The database is the system of record. Every submitted quote inquiry is durably committed using the following PostgreSQL DDL schema:

```sql
-- Inquiries Table
CREATE TABLE inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference VARCHAR(32) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    destination_port VARCHAR(100),
    product_name VARCHAR(100) NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    quantity NUMERIC(12, 2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    grade_specification VARCHAR(255),
    packaging VARCHAR(100),
    required_date DATE,
    message TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'NEW',
    
    -- Channel Notification Delivery Statuses
    company_email_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    buyer_email_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    company_whatsapp_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    buyer_whatsapp_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    retry_count INTEGER NOT NULL DEFAULT 0,
    notification_error_log JSONB DEFAULT '[]'::jsonb,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Inquiry Line Items (for multi-product RFQs or item-level expansion)
CREATE TABLE inquiry_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_id UUID NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(100) NOT NULL,
    quantity NUMERIC(12, 2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance & Lookup Indexes
CREATE INDEX idx_inquiries_reference ON inquiries(reference);
CREATE INDEX idx_inquiries_email ON inquiries(email);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX idx_inquiry_items_inquiry_id ON inquiry_items(inquiry_id);
```

### Column Constraints & Defaults

- **`reference`**: Unique human-readable code generated at submission (e.g. `VEI-261006-A8K2`).
- **`status`**: Domain status (`NEW`, `CONTACTED`, `IN_PROGRESS`, `QUOTED`, `CLOSED`).
- **`*_status`**: Delivery state per channel (`pending`, `sent`, `failed`).
- **`notification_error_log`**: JSONB array storing error objects (`[{"channel": "buyer_whatsapp", "error": "...", "timestamp": "..."}]`) for post-mortem debugging and retry tracking.

---

# 26. Inquiry Status

Phase 1 does not require a full CRM workflow.

A minimal status model may be sufficient:

```text
new
contacted
closed
```

However, the exact operational status model is an:

> **OPEN DECISION**

because the business has not yet specified how inquiries will be managed operationally without an admin dashboard.

Do not introduce a complex workflow until the business process is defined.

---

# 27. Caching Strategy

Caching should be introduced only where it provides clear value.

Good candidates include:

- Public product data
- Static website content
- Images
- SEO assets

Inquiry creation must not be served from stale caches.

Product cache invalidation should remain simple in Phase 1.

---

# 28. Observability

The system should provide enough logging to diagnose production issues.

At minimum:

```text
Request logs
Application errors
Database errors
External-service failures
Inquiry creation events
Email failures
WhatsApp failures
```

Logs must not contain sensitive secrets.

Where possible, requests should have a correlation/request ID so a buyer inquiry can be traced across API processing and external notifications.

---

# 29. Testing Boundaries

The architecture should allow testing at multiple levels.

### Frontend

- Component tests where valuable
- Form validation tests
- Critical user-flow tests
- Responsive/manual verification

### Backend

- Pydantic validation tests
- Service-layer unit tests
- Repository/database tests
- API integration tests

### End-to-end

At minimum, the critical flow should be testable:

```text
Product Page
    ↓
Request Quote
    ↓
Submit Inquiry
    ↓
API
    ↓
Database
    ↓
Confirmation
```

Detailed testing strategy belongs in `docs/12-testing-strategy.md`.

---

# 30. Future Platform Extension

The Phase 1 system should provide clear extension points for:

```text
Buyer Accounts
      ↓
RFQs
      ↓
Quotes
      ↓
Orders
      ↓
Commercial Documents
      ↓
Shipment Tracking
      ↓
Buyer Portal
```

Potential future entities:

```text
buyers
companies
buyer_users
rfqs
quotes
orders
order_items
documents
shipments
shipment_events
payments
communications
```

These are future architectural considerations, not Phase 1 implementation requirements.

---

# 31. Evolution Strategy

The system should evolve incrementally.

### Phase 1

```text
Website
+
Catalog
+
Inquiry
+
Notifications
+
Database
```

### Phase 2

Potentially introduce:

```text
Admin operations
Inquiry management
Buyer/company records
```

### Phase 3

Potentially introduce:

```text
Buyer accounts
RFQs
Quotes
```

### Phase 4

Potentially introduce:

```text
Orders
Documents
Shipment tracking
Buyer portal
```

The exact roadmap remains a business decision.

---

# 32. Key Architectural Decisions

| Decision | Choice | Reason |
|---|---|---|
| Frontend | Next.js + TypeScript | SEO, routing, performance, maintainability |
| Styling | Tailwind CSS | Consistent responsive styling |
| UI components | shadcn/ui | Reusable accessible primitives with customization |
| Backend | FastAPI + Python | Simple, typed, performant API layer |
| Database | PostgreSQL | Reliable relational foundation |
| ORM | SQLAlchemy | Separation between application and database operations |
| Validation | Pydantic | Strong API and business input validation |
| Architecture | Modular monolith | Appropriate Phase 1 complexity |
| Email | Resend | Transactional email capability |
| Media | Cloudinary / S3-compatible storage | Production media management |
| Frontend deployment | Vercel | Next.js deployment |
| Backend deployment | Render / Railway / Fly.io | Suitable managed application hosting |
| Source control | GitHub | Version control and CI/CD foundation |
| API versioning | `/api/v1` | Stable future evolution |
| Public pricing | Not displayed | Export pricing is requirement-dependent |
| Primary conversion | Request a Quote | Matches B2B export workflow |

---

# 33. Trade-offs

## Modular monolith vs microservices

A modular monolith is preferred.

Microservices would introduce unnecessary:

- Deployment complexity
- Network boundaries
- Monitoring requirements
- Operational overhead
- Failure modes

There is currently no demonstrated need for independently deployed services.

## PostgreSQL vs NoSQL

PostgreSQL is preferred because the current domain is relational:

```text
Products
Categories
Inquiries
Inquiry Items
```

The future platform will also contain strongly related business entities such as RFQs, quotes, orders, documents, and shipments.

## API backend vs direct frontend database access

The frontend should not directly access PostgreSQL.

FastAPI provides:

- Validation
- Business rules
- Security boundary
- External integration orchestration
- Stable API contracts

---

# 34. Assumptions

> **ASSUMPTION**

The website will initially be operated by the business owner without a dedicated internal software operations team.

> **ASSUMPTION**

Product data can initially be managed through controlled application/database processes rather than a CMS or admin dashboard.

> **ASSUMPTION**

Inquiry follow-up is initially human-driven after notification.

> **ASSUMPTION**

Public product pricing is intentionally omitted.

> **ASSUMPTION**

Managed PostgreSQL will be used rather than self-hosting the database.

---

# 35. Open Decisions

> **OPEN DECISION**

### Product content management

Who will update product descriptions, specifications, images, availability, and categories after launch?

### Inquiry operations

How will the business owner track and update inquiry status without an admin dashboard?

### WhatsApp provider

Which WhatsApp integration/provider will be used for production communication?

### Analytics provider

Whether to use Google Analytics, Plausible, or another solution.

### Anti-spam provider

Whether basic application-level controls are sufficient or an external bot-protection service is required.

### Email domain configuration

The production sender domain and exact Resend configuration need to be established before deployment.

### Media provider

Cloudinary versus an S3-compatible storage provider remains an implementation choice.

---

# 36. Out of Scope

The following should not be added merely because the architecture can support them:

- Microservices
- Kubernetes
- Event-driven infrastructure
- Message queues
- Complex authentication
- Full CRM
- ERP integrations
- Inventory management
- Payment processing
- Automated quotation calculation
- Buyer portal
- Supplier portal
- Shipment tracking
- Advanced workflow engines

Any such addition requires a new business or technical requirement.

---

# 37. Related Documents

The system design should remain consistent with:

```text
docs/01-architecture.md
docs/02-requirements.md
docs/functional-spec.md
docs/04-frontend-architecture.md
docs/05-backend-architecture.md
docs/06-database-design.md
docs/07-api-specification.md
docs/08-ui-ux-design-system.md
docs/09-seo-strategy.md
docs/10-security.md
docs/11-deployment.md
docs/12-testing-strategy.md
docs/14-future-platform-roadmap.md
docs/15-project-roadmap.md
```

The hierarchy is:

```text
Business Requirements
        ↓
Functional Requirements
        ↓
System Architecture
        ↓
Database Design
        ↓
API Design
        ↓
Frontend Architecture
        ↓
Implementation
        ↓
Testing
        ↓
Deployment
```

Lower-level documents must not silently change higher-level business decisions.

---

# 38. Final Design Summary

The Phase 1 system is intentionally a small, modular web application:

```text
                    INTERNATIONAL BUYER
                           │
                           ▼
                 ┌───────────────────┐
                 │ Next.js Frontend  │
                 │ TypeScript        │
                 │ Tailwind/shadcn   │
                 └─────────┬─────────┘
                           │ HTTPS
                           ▼
                 ┌───────────────────┐
                 │ FastAPI Backend   │
                 ├───────────────────┤
                 │ API               │
                 │ Pydantic          │
                 │ Services          │
                 │ Repositories      │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │ PostgreSQL        │
                 │ Products          │
                 │ Categories        │
                 │ Inquiries         │
                 │ Inquiry Items     │
                 └───────────────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
           Resend       WhatsApp      Storage
```

The architecture is deliberately:

**simple → modular → maintainable → secure → scalable**

It solves the immediate business problem—generating and managing qualified B2B export inquiries—without prematurely implementing the complete future export platform.

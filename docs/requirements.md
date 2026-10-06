# Requirements Specification

## Vedant Exports International Website

**Document:** 02 — Requirements Specification
**Version:** 1.0
**Status:** Approved Baseline
**Project Phase:** Phase 1 — Company Website + Product Catalog + Buyer Inquiry

---

# 1. Purpose

This document defines the functional and non-functional requirements for the first production version of the **Vedant Exports International** website.

The purpose of Phase 1 is to create a professional B2B export website that:

* Establishes trust with international buyers.
* Presents Vedant's products and capabilities.
* Generates qualified buyer inquiries.
* Provides a structured Request a Quote workflow.
* Stores inquiries reliably.
* Notifies Vedant of new inquiries.
* Automatically acknowledges buyers.
* Creates a technical foundation for future expansion into a complete B2B export platform.

This document translates the high-level architecture into concrete product and engineering requirements.

---

# 2. Project Context

Vedant Exports International is an Indian agricultural sourcing and export company backed by a family business with **20+ years of agricultural trading experience**.

Vedant Exports International itself represents the newer international/export division and has approximately 1.5+ years of international/export business experience.

The company currently works with products including:

### Fresh agricultural products

* Potatoes
* Onions
* Green chilies
* Tomatoes

### Expanding product categories

* Moringa powder
* Turmeric powder
* Amla powder
* Dehydrated vegetable powders
* Spices
* Other agricultural/food powders

The company has:

* Agricultural sourcing networks across North India.
* Cold-storage infrastructure in Agra.
* Approximately 3 lakh packets of potato storage capacity.
* Buyer-specific sourcing capabilities.
* Export documentation and logistics coordination capabilities.
* Relevant Indian registrations/certifications.

The website will target international B2B customers in markets including:

* United States
* European Union
* Australia
* Hong Kong

---

# 3. Product Vision

The website should communicate:

> **Established agricultural experience, reliable sourcing, quality-focused operations, and professional international export execution.**

The website should not present Vedant as merely a product listing company.

It should demonstrate the complete value chain:

```text
Buyer Requirement
       ↓
Sourcing
       ↓
Quality Coordination
       ↓
Packaging
       ↓
Export Preparation
       ↓
Logistics
       ↓
International Buyer
```

---

# 4. Goals

## 4.1 Primary Goals

### G-01 — Establish credibility

The website must communicate enough information for a new international buyer to understand why Vedant is a credible supplier/export partner.

### G-02 — Generate inquiries

The primary conversion objective is generating qualified B2B inquiries.

### G-03 — Showcase products

Every major product should have a dedicated, professional product page.

### G-04 — Communicate capabilities

The website should communicate:

* Sourcing
* Storage
* Quality
* Packaging
* Export capabilities
* Documentation
* Logistics coordination

### G-05 — Provide a scalable foundation

The Phase 1 implementation should allow future development of:

* Buyer accounts
* RFQs
* Quotations
* Orders
* Documents
* Shipment tracking
* Buyer portal

without requiring a complete architectural rewrite.

---

# 5. Non-Goals

The following are explicitly outside Phase 1.

## NG-01 — E-commerce

The website will not operate as a consumer e-commerce store.

There will be no:

* Shopping cart
* Checkout
* Online product purchasing
* Consumer payment flow

---

## NG-02 — Buyer accounts

No buyer registration or login will exist initially.

---

## NG-03 — Admin dashboard

No administrative dashboard will be implemented in Phase 1.

---

## NG-04 — Automated quotations

The system will not automatically calculate or generate final commercial quotations.

Pricing depends on factors such as:

* Quantity
* Product grade
* Season
* Destination
* Packaging
* Logistics
* Market conditions
* Incoterms

---

## NG-05 — Shipment tracking

No live shipment tracking will exist in Phase 1.

---

## NG-06 — Order management

No complete order-management workflow will exist.

---

## NG-07 — Payment processing

No online payment gateway will be integrated.

---

## NG-08 — Supplier management

No supplier portal or supplier management system will be built.

---

## NG-09 — ERP

No ERP integration will be implemented initially.

---

# 6. Target Users

## 6.1 International Buyer

The primary user.

Potential users include:

* Importers
* Wholesalers
* Distributors
* Food processors
* Supermarket procurement teams
* Retail chains
* Traders
* Sourcing agents
* Exporters

### Buyer goals

The buyer should be able to:

1. Understand the company.
2. Explore products.
3. Evaluate credibility.
4. Understand sourcing and quality capabilities.
5. Submit product requirements.
6. Contact Vedant through WhatsApp/email.
7. Receive confirmation that the inquiry was received.

---

## 6.2 Company Owner

The primary internal user.

The owner needs to:

* Receive inquiries.
* Receive inquiry notifications.
* Respond to buyers.
* Review inquiry information.
* Manage business communication manually.

Phase 1 does not require a dedicated dashboard.

---

# 7. Information Architecture

The website should support the following primary routes:

```text
/
├── about
├── products
│   ├── potatoes
│   ├── onions
│   ├── green-chilies
│   ├── tomatoes
│   ├── moringa-powder
│   ├── turmeric-powder
│   ├── spices
│   ├── amla-powder
│   ├── dehydrated-vegetable-powders
│   └── ...
│
├── sourcing
├── cold-storage
├── quality
├── certifications
├── export-process
├── markets
├── industries
├── contact
├── request-a-quote
├── faq
└── insights
```

Not every route needs to be implemented as an independent page on the first release if content can be more effectively combined.

However, the architecture must support future separation.

---

# 8. Functional Requirements

## FR-001 — Homepage

The system shall provide a homepage that introduces:

* Vedant Exports International
* Core business positioning
* Product categories
* Sourcing capabilities
* Operational capabilities
* Quality/certification credentials
* International focus
* Request Quote CTA

The homepage shall prioritize buyer trust and conversion.

---

## FR-002 — About Page

The system shall provide an About page describing:

* Agricultural roots
* 20+ years of family agricultural trading experience
* Evolution into international exports
* Vedant Exports International
* Current international business
* Future expansion vision

The wording must clearly distinguish family business experience from Vedant's export-company history.

---

## FR-003 — Product Listing

The system shall provide a product listing page.

Products shall be organized by category.

Example:

```text
Fresh Produce
    Potatoes
    Onions
    Green Chilies
    Tomatoes

Powders
    Moringa Powder
    Turmeric Powder
    Amla Powder
    Dehydrated Vegetable Powders

Spices
    Individual spice products
```

The architecture shall support additional products.

---

## FR-004 — Dedicated Product Pages

Every major product shall have its own URL.

Example:

```text
/products/potatoes
/products/onions
/products/moringa-powder
```

Product pages shall support:

* Product description
* Product specifications
* Variants/grades
* Packaging
* Applications
* Sourcing information
* Quality information
* Images
* Availability
* Request Quote CTA

---

## FR-005 — Product Searchability

Product URLs shall be:

* Human-readable
* SEO-friendly
* Stable
* Based on slugs

Example:

```text
/products/moringa-powder
```

not:

```text
/products?id=17
```

---

## FR-006 — Product Categories

Products shall support categories.

The system must not hard-code the website around the current product list.

New categories and products should be addable with minimal architectural changes.

---

## FR-007 — Product Images

Each product shall support one or more images.

Images shall be:

* Optimized
* Responsive
* CDN-delivered where applicable
* Properly alt-tagged
* Lazy-loaded where appropriate

---

## FR-008 — Request Quote CTA

Product pages shall provide a prominent Request a Quote action.

The CTA should be visible without requiring the buyer to navigate back to the Contact page.

---

# 9. Request a Quote Requirements

## FR-009 — Request a Quote

Buyers must be able to submit product inquiries through the website. Submitted inquiries must be persistently stored and trigger notifications to both the company and buyer through configured email and WhatsApp channels.

* Detailed end-to-end behavior (entry points, form fields, client and server validation, submission sequence, notification templates, failure handling, and acceptance criteria) is specified in [`docs/functional-spec.md`](functional-spec.md).
* Technical backend implementation (FastAPI endpoints, Pydantic schemas, PostgreSQL schema, notification services, Resend email provider, WhatsApp provider, retry mechanisms, and environment variables) is defined in [`docs/system-design.md`](system-design.md).

---

# 10. Notification Requirements

## FR-010 — Inquiry Notifications

Submitted inquiries must trigger notifications to both the company and buyer through configured email and WhatsApp channels without risking inquiry loss if an external notification channel fails.

* Detailed notification triggers, delivery expectations, and acknowledgement message formats are specified in [`docs/functional-spec.md`](functional-spec.md).
* Backend notification service architecture, provider adapters, background dispatch, delivery status tracking, and retry mechanisms are defined in [`docs/system-design.md`](system-design.md).

---

# 11. Contact Requirements

## FR-024 — Contact Page

The Contact page shall provide:

* Company information
* Email
* Phone
* WhatsApp
* Location/business information where appropriate
* Request Quote CTA

---

## FR-025 — WhatsApp CTA

The website shall provide prominent WhatsApp contact options.

The CTA should work particularly well on mobile devices.

---

## FR-026 — Direct Contact

The website should support direct:

* Email
* Phone
* WhatsApp

contact methods.

---

# 12. Trust & Credibility Requirements

## FR-027 — Experience

The website shall communicate:

> 20+ years of agricultural trading experience

with appropriate context explaining that this comes from the family's agricultural business background.

---

## FR-028 — Sourcing Network

The website shall explain Vedant's North Indian sourcing network.

---

## FR-029 — Cold Storage

The website shall communicate the existence and relevant capabilities of the Agra cold-storage facility.

Where the approximately 3 lakh packet capacity is displayed, it should be clearly contextualized as storage capacity.

---

## FR-030 — Certifications

The website shall provide a dedicated certification/quality section.

The implementation shall support displaying verified certifications.

No unverified certificate information may be fabricated.

---

## FR-031 — Quality

The website shall explain quality-related processes at a high level.

The content should avoid unsupported guarantees such as:

* "100% guaranteed quality"
* "Zero defects"
* "Always on-time delivery"

unless such claims are actually substantiated.

---

# 13. Internationalization Requirements

## FR-032 — Language

Phase 1 language:

**English**

The architecture should allow future localization.

---

## FR-033 — Currency

The system shall be architected to support multiple currencies.

Potential currencies:

* USD
* EUR
* INR
* AUD
* HKD

Public pricing is not required in Phase 1.

Currency functionality primarily prepares the system for future commercial features.

---

# 14. SEO Requirements

## FR-034 — Metadata

Every indexable page shall support:

* Title
* Meta description
* Canonical URL
* Open Graph metadata

---

## FR-035 — Product SEO

Every product page shall have unique SEO metadata.

Product pages should target genuine buyer search intent.

---

## FR-036 — Semantic Structure

Pages shall use:

* Proper HTML semantics
* Logical heading hierarchy
* Descriptive links
* Accessible image alt text

---

## FR-037 — Structured Data

Where appropriate, the system should support structured data such as:

* Organization
* Product
* BreadcrumbList
* FAQ

Only applicable schema should be used.

---

# 15. Performance Requirements

## NFR-001 — Page Performance

The website should load quickly on modern desktop and mobile devices.

---

## NFR-002 — Image Optimization

Images shall be:

* Compressed
* Responsive
* Properly sized
* Served through an appropriate image/CDN system

---

## NFR-003 — JavaScript

Client-side JavaScript should be minimized where server rendering/static rendering can achieve the same result.

---

## NFR-004 — Third-party Scripts

Third-party scripts should be limited to those providing meaningful business value.

---

## NFR-005 — Caching

Appropriate caching should be used for:

* Static assets
* Product data where applicable
* Images
* API responses where safe

---

# 16. Responsive Requirements

## NFR-006 — Mobile

All major functionality shall work on mobile.

---

## NFR-007 — Tablet

The website shall support tablet layouts.

---

## NFR-008 — Desktop

The website shall support modern desktop resolutions.

---

## NFR-009 — Inquiry UX

The Request Quote workflow must be easy to complete on mobile.

---

# 17. Accessibility Requirements

The website should target good accessibility practices.

Requirements include:

* Keyboard navigation
* Visible focus states
* Sufficient contrast
* Semantic HTML
* Accessible forms
* Form labels
* Error messages
* Alternative text for meaningful images
* Reduced-motion support where practical

Animations must not prevent users from understanding or using the website.

---

# 18. Security Requirements

## NFR-010 — HTTPS

All production traffic must use HTTPS.

---

## NFR-011 — Secrets

Secrets must be stored through environment variables.

No API keys or credentials may be committed to GitHub.

---

## NFR-012 — Input Validation

All external input must be validated.

---

## NFR-013 — Database Security

The application must use parameterized queries/ORM mechanisms to prevent SQL injection.

---

## NFR-014 — CORS

FastAPI CORS must be configured explicitly for trusted frontend origins.

---

## NFR-015 — Rate Limiting

The inquiry endpoint should have rate limiting or equivalent abuse protection.

---

## NFR-016 — Spam Protection

The inquiry form should have an anti-spam mechanism.

Possible approaches include:

* CAPTCHA
* Turnstile
* Honeypot
* Rate limiting
* Combination of mechanisms

The final mechanism can be selected during implementation.

---

## NFR-017 — Error Exposure

Production APIs must not expose:

* Stack traces
* Database credentials
* Internal implementation details
* Secret configuration

---

# 19. Reliability Requirements

## NFR-018 — Inquiry Durability

Once an inquiry is successfully stored, failure of email or WhatsApp notifications must not delete it.

---

## NFR-019 — Error Handling

The website should provide user-friendly error states.

Examples:

* Form submission failure
* Network failure
* Product unavailable
* API unavailable

---

## NFR-020 — Logging

Backend systems should log important errors and operational events.

Logs should not contain sensitive information unnecessarily.

---

# 20. Analytics Requirements

Analytics should support tracking:

```text
product_view
quote_button_click
inquiry_started
inquiry_submitted
whatsapp_click
email_click
phone_click
```

The analytics system should also help identify:

* Most viewed products
* Most engaged markets
* Traffic sources
* Inquiry conversion rate

Potential tools:

* Google Analytics
* Plausible

The final analytics provider is an implementation decision.

---

# 21. Design Requirements

## NFR-021 — Visual Style

The website shall feel:

* Minimal
* Premium
* Modern
* Professional
* International
* Trustworthy

---

## NFR-022 — Typography

Typography should prioritize:

* Readability
* Hierarchy
* Premium appearance
* Consistency

---

## NFR-023 — Color

The color palette should remain restrained.

Agricultural references can be present but the site should not look excessively green or rustic.

---

## NFR-024 — Components

UI components should be reusable and consistent.

---

## NFR-025 — Animations

Animations should be subtle and purposeful.

They must not significantly affect:

* Performance
* Accessibility
* Mobile usability

---

# 22. Content Requirements

The content should be:

* Professional
* Concise
* Buyer-focused
* Factually accurate
* Internationally understandable

Avoid:

* Excessive marketing language
* Unsupported claims
* Generic AI-style copy
* Keyword stuffing
* Overly technical agricultural terminology unless useful to buyers

---

# 23. Product Content Requirements

Every product should ideally provide:

```text
Product Name
Short Description
Detailed Description
Product Category
Specifications
Available Grades
Packaging
Applications
MOQ
Quality Information
Sourcing Information
Images
Request Quote CTA
```

Fields should be optional where a particular product does not require them.

---

# 24. Data Requirements

## Product

A product should support at least:

```text
id
name
slug
category
short_description
description
specifications
packaging_options
applications
minimum_order_quantity
featured
active
created_at
updated_at
```

---

## Inquiry

An inquiry should support:

```text
id
product
quantity
quantity_unit
destination_country
packaging
required_date
message
buyer_name
company_name
email
phone
status
created_at
updated_at
```

The exact database schema will be finalized in the database-design document.

---

# 25. API Requirements

Initial API requirements:

```text
GET  /api/v1/products
GET  /api/v1/products/{slug}

POST /api/v1/inquiries

GET /api/v1/health
```

The API should:

* Validate requests.
* Return predictable response formats.
* Use appropriate HTTP status codes.
* Handle errors consistently.
* Avoid exposing internal errors.
* Support future versioning.

---

# 26. Frontend Requirements

The frontend shall:

* Use Next.js.
* Use TypeScript.
* Use Tailwind CSS.
* Use customized shadcn/ui components where appropriate.
* Be responsive.
* Be SEO-friendly.
* Provide loading states.
* Provide error states.
* Provide form validation.
* Communicate with FastAPI through the API layer.
* Avoid exposing backend secrets.

---

# 27. Backend Requirements

The backend shall:

* Use FastAPI.
* Use Pydantic.
* Use SQLAlchemy.
* Use PostgreSQL.
* Separate routes from business logic.
* Isolate external services.
* Validate all incoming data.
* Provide structured errors.
* Log relevant failures.

---

# 28. Storage Requirements

Product and company media should be stored using:

* Cloudinary
* S3-compatible storage

The exact provider can be selected during implementation.

The Git repository should not contain large production media files.

---

# 29. Deployment Requirements

## Frontend

Target:

**Vercel**

## Backend

Target:

* Render
* Railway
* Fly.io

## Database

Target:

**Managed PostgreSQL**

## Source Control

**GitHub**

---

# 30. Environment Requirements

Production secrets should include configuration such as:

```text
DATABASE_URL
RESEND_API_KEY
WHATSAPP_API_KEY
NEXT_PUBLIC_API_URL
```

The exact variable list will be defined during implementation.

---

# 31. Browser Requirements

The website should support current versions of major browsers, including:

* Chrome
* Safari
* Firefox
* Edge

Particular attention should be given to Safari because of the expected Apple-inspired visual design and likely Mac/iPhone visitors.

---

# 32. Error States

The system should define clear UX for:

### Product not found

Display a useful 404/product-not-found state.

### API unavailable

Display a friendly retry message.

### Inquiry validation failure

Show field-level errors.

### Inquiry submission failure

Tell the user that submission failed and provide an alternative contact option.

### Inquiry success

Show confirmation and inquiry reference.

---

# 33. SEO-Friendly URL Requirements

URLs should remain simple.

Examples:

```text
/products
/products/potatoes
/products/onions
/products/moringa-powder
/about
/sourcing
/quality
/contact
/request-a-quote
```

Avoid unnecessarily deep URLs.

---

# 34. Future Requirements

The architecture should eventually support:

## Buyer Accounts

Buyers may create accounts.

## RFQ Management

Buyers may create and track RFQs.

## Quotations

Vedant may provide quotations through the platform.

## Orders

Accepted quotations may become orders.

## Documents

Relevant export/commercial documents may be associated with orders.

## Shipment Tracking

Buyers may track shipment progress.

## Buyer Portal

Buyers may eventually manage:

* RFQs
* Quotes
* Orders
* Documents
* Shipments
* Communications

These are future requirements, not Phase 1 implementation requirements.

---

# 35. Acceptance Criteria

Phase 1 will be considered functionally complete when:

### Website

* [ ] Homepage is complete.
* [ ] About page is complete.
* [ ] Product listing works.
* [ ] Every launch product has a dedicated page.
* [ ] Contact page works.
* [ ] Quality/certification content is available.
* [ ] Sourcing/capability content is available.
* [ ] Website is responsive.

### Product system

* [ ] Products are represented through structured data.
* [ ] Product slugs are stable.
* [ ] Product images load correctly.
* [ ] Request Quote CTA exists.
* [ ] Product pages have SEO metadata.

### Inquiry system

* [ ] Buyer can submit an inquiry.
* [ ] Product can be preselected.
* [ ] Required fields are validated.
* [ ] Server validates all submitted data.
* [ ] Inquiry is stored in PostgreSQL.
* [ ] Vedant receives notification.
* [ ] Buyer receives confirmation.
* [ ] Failure handling exists.
* [ ] Spam protection exists.

### Technical

* [ ] Frontend deployed.
* [ ] Backend deployed.
* [ ] PostgreSQL connected.
* [ ] Domain configured.
* [ ] HTTPS active.
* [ ] Secrets stored securely.
* [ ] GitHub repository organized.

### Quality

* [ ] No critical console errors.
* [ ] No broken primary navigation.
* [ ] No broken product URLs.
* [ ] Mobile layout works.
* [ ] Forms work correctly.
* [ ] Loading states exist.
* [ ] Error states exist.
* [ ] Accessibility basics are implemented.

---

# 36. Assumptions

The following assumptions apply to this requirements baseline:

1. Phase 1 will be managed by one primary business owner.
2. English is sufficient for the initial launch.
3. Public product pricing is not required.
4. Buyers will primarily request quotations rather than directly purchase products.
5. WhatsApp is an important communication channel.
6. Product information will initially be maintained without an admin dashboard.
7. The initial website does not require buyer authentication.
8. PostgreSQL is sufficient for Phase 1 and future early-stage growth.
9. The backend will initially remain a modular monolith.
10. External services may be replaced later without changing core business logic.

---

# 37. Open Decisions

The following decisions should be finalized during implementation/design:

### OD-001 — Final domain

The exact production domain has not yet been finalized.

### OD-002 — Email provider

Resend is the preferred initial provider.

### OD-003 — WhatsApp provider

The exact WhatsApp API/provider needs to be selected.

### OD-004 — Media provider

Cloudinary vs S3-compatible storage.

### OD-005 — Anti-spam mechanism

Possible options:

* Cloudflare Turnstile
* reCAPTCHA
* Honeypot
* Rate limiting
* Combination

### OD-006 — Analytics

Google Analytics vs Plausible.

### OD-007 — Backend hosting

Render vs Railway vs Fly.io.

### OD-008 — Product content management

Phase 1 may use code/database-managed content.

The exact mechanism should be finalized in the implementation architecture.

---

# 38. Requirements Traceability

The primary business goals map to system capabilities as follows:

| Business Goal                | System Requirement                                       |
| ---------------------------- | -------------------------------------------------------- |
| Build trust                  | About, Quality, Certifications, Sourcing, Infrastructure |
| Showcase products            | Product catalog + dedicated product pages                |
| Generate leads               | Request Quote workflow                                   |
| Capture buyer requirements   | Structured inquiry form                                  |
| Respond quickly              | Email + WhatsApp notification                            |
| Confirm inquiry              | Automated buyer email                                    |
| Store leads                  | PostgreSQL                                               |
| Support international buyers | Multi-market + multi-currency-ready architecture         |
| Improve discoverability      | SEO architecture                                         |
| Scale later                  | Modular backend + extensible database                    |
| Become a B2B platform        | Future buyer/RFQ/order architecture                      |

---

# 39. Phase 1 Priority

Requirements should be prioritized as:

## P0 — Must Have

* Homepage
* Product catalog
* Product pages
* Request Quote
* Inquiry database
* Buyer confirmation email
* Vedant notification
* Responsive design
* SEO basics
* Security basics
* Production deployment

## P1 — Important

* WhatsApp notification
* Analytics
* Certification presentation
* Sourcing page
* Cold-storage page
* Export-process page
* Advanced product metadata
* Enhanced SEO

## P2 — Later

* Buyer accounts
* RFQs
* Quotations
* Orders
* Documents
* Shipment tracking
* Buyer portal
* Admin dashboard

---

# 40. Final Requirement Statement

The Phase 1 website must achieve the following:

> **A potential international buyer should be able to discover Vedant Exports International, understand what the company does, evaluate its credibility and capabilities, explore relevant products, and submit a detailed purchasing requirement within a few minutes.**

At the same time, Vedant should receive the inquiry reliably through its preferred communication channels and be able to respond manually.

The implementation should remain intentionally simple while establishing a solid foundation for the future evolution of Vedant Exports International into a larger B2B export platform.

---

## Related Documents

This requirements document should be considered alongside:

```text
docs/01-architecture.md
docs/functional-spec.md
docs/03-system-design.md
docs/04-frontend-architecture.md
docs/05-backend-architecture.md
docs/06-database-design.md
docs/07-api-specification.md
docs/08-ui-ux-design-system.md
docs/09-seo-strategy.md
docs/10-security.md
docs/11-deployment.md
docs/12-testing-strategy.md
docs/13-development-guidelines.md
docs/14-future-platform-roadmap.md
docs/15-project-roadmap.md
```

The system-design document should translate the requirements defined here into concrete technical architecture.

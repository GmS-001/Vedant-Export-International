# Website Architecture & System Specification

## Vedant Exports International

**Document:** 01 — Website Architecture
**Version:** 1.0
**Status:** Initial Architecture
**Primary Objective:** Production-ready B2B export website
**Phase:** Phase 1 — Company Website + Products + Buyer Inquiry

---

# 1. Project Overview

Vedant Exports International is being developed as a modern B2B export and sourcing company focused on agricultural and food products.

The company has:

* 20+ years of agricultural trading experience through the family's domestic business.
* 1.5+ years of international/export business experience.
* Existing trade in potatoes, onions, green chilies, and tomatoes.
* Existing export activity with nearby international markets.
* A cold-storage facility in Agra with a capacity of approximately 3 lakh packets of potatoes.
* A strong agricultural sourcing network across North India.
* The ability to source products according to buyer requirements.
* Relevant Indian registrations and certifications, including FSSAI, APEDA, EIC and other applicable certifications.

Vedant Exports International is positioned as the **international/export division of an established agricultural trading background**, rather than claiming that the export company itself has existed for 20+ years.

The website should communicate:

> **Established agricultural experience + modern international export capability + reliable sourcing + professional execution.**

---

# 2. Website Objectives

The website's primary objectives are:

### 2.1 Build buyer trust

The website should establish credibility before a buyer contacts the company.

It should clearly communicate:

* Experience
* Product capabilities
* Sourcing network
* Storage capabilities
* Quality practices
* Certifications
* Export capabilities
* International markets
* Professional communication

### 2.2 Generate B2B inquiries

The website should be designed primarily around generating qualified buyer inquiries.

The main conversion should be:

**Product → Request a Quote → Buyer submits requirements → Vedant responds**

### 2.3 Showcase products

Every major product should have its own dedicated page.

Product pages should provide enough information for a potential importer, distributor, wholesaler or processor to understand the product and submit an inquiry.

### 2.4 Establish an international brand

The website should not feel like:

* A generic agricultural website
* A WordPress template
* An AI-generated landing page
* A local trader's basic website

It should feel like a professionally developed international B2B company website.

---

# 3. Target Audience

The primary audience consists of B2B buyers.

### Buyer categories

* Importers
* Wholesalers
* Distributors
* Food-processing companies
* Supermarket and retail chains
* Agricultural traders
* Sourcing agents
* Other exporters

### Target markets

Initial international focus includes:

* United States
* European Union
* Australia
* Hong Kong

Additional markets can be added later without requiring architectural changes.

---

# 4. Brand Positioning

The website should position Vedant Exports International as:

> **A modern international sourcing and export company backed by deep agricultural trading experience and a strong North Indian supply network.**

The company should not be presented simply as a reseller.

The key differentiation is:

### Sourcing + Quality + Storage + Export Execution

Vedant should communicate that it can:

1. Understand buyer requirements.
2. Source suitable products.
3. Coordinate quality and packaging.
4. Arrange storage where applicable.
5. Coordinate export logistics and documentation.
6. Deliver according to agreed buyer requirements.

---

# 5. Website Design Philosophy

The design direction combines three references:

### Reference 1 — Digital Buddha

Used primarily as inspiration for:

* Modern UI
* Subtle animations
* Interactive sections
* Visual storytelling
* Smooth transitions
* Strong typography
* Contemporary layout

The website should take inspiration from the quality of interaction, **not copy the design**.

### Reference 2 — Earthpot

Used as inspiration for:

* Agricultural/export positioning
* Product presentation
* International business feel
* Product-focused storytelling

### Reference 3 — Apple

Used as inspiration for:

* Minimalism
* Typography
* Spacing
* Content hierarchy
* Premium visual language
* Restrained color usage
* Product-focused layouts

### Overall design principle

**Modern international exporter + minimal corporate design + subtle agricultural identity.**

Animations should support the content rather than become the content.

Avoid:

* Excessive parallax
* Constant moving elements
* Large numbers of animated cards
* Excessive gradients
* Generic glassmorphism
* Template-like sections
* Artificial-looking AI-generated visuals
* Overloaded navigation
* Excessive decorative elements

---

# 6. Technology Architecture

## Frontend

**Next.js + TypeScript**

Responsibilities:

* Website UI
* Routing
* SEO
* Product pages
* Inquiry forms
* Responsive design
* Animations
* Content presentation
* API communication

---

## Styling

**Tailwind CSS**

Used for:

* Design system
* Responsive layouts
* Spacing
* Typography
* Colors
* Components
* Consistency

---

## UI Components

**shadcn/ui**

Used selectively.

The website should not look like a collection of default shadcn components.

Components should be customized to match the Vedant brand.

---

## Backend

**FastAPI**

The backend will initially be deliberately small.

Responsibilities:

* Inquiry API
* Buyer inquiry validation
* Database operations
* Email triggering
* WhatsApp notification integration
* Automated buyer response
* Future authentication
* Future RFQ/order functionality

FastAPI should not initially become a large business-management backend.

---

## Database

**PostgreSQL**

The database should initially store:

* Products
* Product categories
* Buyer inquiries
* Inquiry status
* Buyer contact information
* Destination information
* Packaging requirements
* Requested quantities
* Required dates
* Inquiry timestamps

The database structure should be designed so future entities can be added without restructuring the entire system.

---

## ORM

**SQLAlchemy**

Used as the database abstraction layer between FastAPI and PostgreSQL.

---

## Validation

**Pydantic**

Used for:

* API request validation
* Response schemas
* Inquiry validation
* Internal data validation

---

# 7. High-Level System Architecture

```text
                         ┌──────────────────────┐
                         │       Buyer          │
                         │  Importer / Trader   │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      Next.js         │
                         │      Frontend        │
                         └──────────┬───────────┘
                                    │
                         HTTPS / REST API
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       FastAPI        │
                         │       Backend        │
                         └──────┬───────┬───────┘
                                │       │
                   ┌────────────┘       └──────────────┐
                   ▼                                   ▼
          ┌──────────────────┐                ┌──────────────────┐
          │   PostgreSQL     │                │ Email / WhatsApp │
          │    Database      │                │   Notifications  │
          └──────────────────┘                └──────────────────┘
```

---

# 8. Website Information Architecture

The initial website should contain the following major routes:

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

Some pages can initially be combined into larger sections if the content does not justify separate pages.

The architecture should nevertheless support individual pages later.

---

# 9. Core Website Pages

## 9.1 Home

The homepage is the primary trust-building and conversion page.

It should communicate:

1. What Vedant does.
2. What products it supplies.
3. Where it operates.
4. Why buyers should trust it.
5. Its sourcing capabilities.
6. Its agricultural background.
7. Its export capabilities.
8. How a buyer can start an inquiry.

Suggested high-level structure:

```text
Hero
↓
Company positioning
↓
Key capabilities
↓
Featured products
↓
Sourcing network
↓
Cold storage / infrastructure
↓
Quality & certifications
↓
Markets served
↓
Why Vedant
↓
Buyer inquiry CTA
```

---

# 10. About Us

The About page should explain the company's story.

The narrative should distinguish between:

### Family agricultural business

20+ years of agricultural trading experience.

### Vedant Exports International

The newer international/export division built upon that existing agricultural network and experience.

This provides credibility without making misleading claims.

The story should emphasize:

* Agricultural roots
* Family experience
* Transition into international markets
* Existing export activity
* Expansion into new product categories
* Long-term international vision

---

# 11. Products Architecture

Every important product should have its own dedicated page.

## Product categories

### Fresh Agricultural Products

* Potatoes
* Onions
* Green Chilies
* Tomatoes

### Powders / Processed Products

* Moringa Powder
* Turmeric Powder
* Amla Powder
* Dehydrated Vegetable Powders
* Other food/agricultural powders

### Spices

Individual spice products can be added as the product portfolio expands.

---

# 12. Product Page Structure

Every product page should follow a consistent architecture.

```text
Product Hero
↓
Product Overview
↓
Product Specifications
↓
Available Grades / Variants
↓
Packaging Options
↓
Quality Information
↓
Sourcing Information
↓
Applications / Suitable Buyers
↓
Export Availability
↓
Request Quote
```

Not every section needs to appear if it is irrelevant to that product.

For example, fresh onions and moringa powder should not be forced into exactly the same content structure.

The underlying component architecture should remain reusable while allowing product-specific content.

---

# 13. Product Data Model

The initial product model should support fields such as:

```text
Product
├── id
├── name
├── slug
├── category
├── short_description
├── description
├── specifications
├── packaging_options
├── available_variants
├── applications
├── minimum_order_quantity
├── image(s)
├── country_availability
├── featured
├── active
└── created_at / updated_at
```

Additional fields can be introduced as the product portfolio becomes more sophisticated.

---

# 14. Pricing Architecture

Product prices should **not be publicly displayed by default**.

B2B agricultural/export prices vary according to:

* Quantity
* Grade
* Season
* Destination
* Packaging
* Logistics
* Market conditions
* Incoterms
* Order requirements

Therefore, the primary CTA should be:

> **Request a Quote**

The system should support multiple currencies for future pricing functionality.

Initial supported currencies can include:

* USD
* EUR
* INR
* AUD
* HKD

Currency support should be architected so additional currencies can be added later.

---

# 15. Request a Quote System

This is one of the most important components of Phase 1.

The buyer should be able to submit a structured inquiry.

### Required information

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

Additional fields can include:

* Port of destination
* Preferred Incoterm
* Product specifications
* Grade
* Additional requirements

These should not make the initial form unnecessarily complicated.

---

# 16. Inquiry Flow

The complete initial flow should be:

```text
Buyer
  ↓
Product Page
  ↓
Request a Quote
  ↓
Inquiry Form
  ↓
Frontend Validation
  ↓
FastAPI
  ↓
Pydantic Validation
  ↓
PostgreSQL
  ↓
Inquiry Saved
  ↓
 ┌───────────────┬────────────────┐
 ▼               ▼                ▼
Email            WhatsApp         Buyer Email
to Vedant        notification     confirmation
```

The buyer should receive an automated confirmation after successful submission.

Example:

> Thank you for your inquiry. Our team has received your requirements and will get back to you shortly.

The company should simultaneously receive the complete inquiry details.

---

# 17. WhatsApp Integration

WhatsApp should be an important communication channel.

The website should provide:

* WhatsApp CTA
* WhatsApp contact option
* Inquiry notification where technically appropriate
* Mobile-friendly WhatsApp interaction

The exact WhatsApp automation provider can be decided during implementation.

The architecture should avoid hard-coding the WhatsApp provider into the business logic.

---

# 18. Email Architecture

**Resend** can initially be used for transactional email.

Two primary email flows are required.

### Buyer → Vedant

When an inquiry is submitted:

> New inquiry received

Containing all buyer requirements.

### Vedant → Buyer

Automatically:

> We received your inquiry

Containing:

* Product
* Quantity
* Destination
* Required date
* Inquiry reference
* Expected response message

The automated response should be professional but should not promise a specific quotation or delivery time unless explicitly configured.

---

# 19. Database Architecture — Phase 1

Initial entities:

```text
products
product_categories
inquiries
inquiry_items
```

Depending on implementation, `inquiry_items` may be unnecessary for a single-product inquiry initially, but the schema should be capable of supporting multiple products later.

Potential future entities:

```text
buyers
buyer_users
companies
rfqs
quotes
orders
order_items
documents
shipments
shipment_events
payments
```

These should **not** be implemented in Phase 1 unless required.

---

# 20. No Admin Dashboard in Phase 1

There will be **no admin dashboard initially**.

This is intentional.

The first version should avoid spending development time building:

* CMS dashboards
* User management
* Admin roles
* Internal CRM
* Complex content management

The initial website can use structured content stored in the codebase/database.

However, the backend and database should be designed so an admin dashboard can be added later without rebuilding the application.

---

# 21. Authentication

Authentication is **not required in Phase 1**.

There will be:

* No buyer login
* No account creation
* No admin login
* No buyer portal

Future authentication should be supported when the platform evolves into:

```text
Buyer Account
      ↓
RFQs
      ↓
Quotes
      ↓
Orders
      ↓
Documents
      ↓
Shipment Tracking
```

---

# 22. Future Platform Architecture

The website should eventually evolve from a company website into a B2B export platform.

### Phase 1

```text
Company Website
+
Products
+
Inquiry System
```

### Phase 2

```text
Buyer Accounts
+
RFQs
+
Quotation Management
```

### Phase 3

```text
Orders
+
Commercial Documents
+
Order Status
```

### Phase 4

```text
Shipment Tracking
+
Logistics Information
+
Shipment Documents
```

### Phase 5

```text
Buyer Portal
+
Order History
+
Documents
+
Communication
+
Account Management
```

The architecture should therefore follow a **modular approach**.

---

# 23. SEO Architecture

Next.js should be used to create SEO-friendly pages.

Each product should have its own indexable URL.

Example:

```text
/products/potatoes
/products/onions
/products/moringa-powder
/products/turmeric-powder
```

Each page should have:

* Unique title
* Meta description
* Canonical URL
* Open Graph metadata
* Structured data where appropriate
* Proper heading hierarchy
* Optimized images
* Descriptive URLs

The website should target searches related to:

* Indian agricultural exporters
* Potato exporters from India
* Onion exporters from India
* Moringa powder exporters
* Turmeric powder suppliers
* Indian agricultural suppliers
* Bulk agricultural products
* Food ingredient suppliers

SEO content should remain natural and buyer-focused rather than keyword-stuffed.

---

# 24. Media Architecture

Product and company images should be stored separately from the application server.

Preferred options:

* Cloudinary
* S3-compatible storage

Images should support:

* Responsive formats
* Compression
* CDN delivery
* Multiple resolutions
* Product galleries
* Future image management

The frontend should never depend on storing large images directly inside the Git repository.

---

# 25. Responsive Architecture

The website must be designed mobile-first.

Required:

* Desktop
* Laptop
* Tablet
* Mobile

The inquiry process should be especially optimized for mobile because international buyers may contact the company through mobile devices and WhatsApp.

---

# 26. Animation Architecture

Animations should be subtle and purposeful.

Potential animations:

* Page transitions
* Scroll reveal
* Image transitions
* Product hover states
* Number/stat animations
* Subtle hero interactions
* Navigation transitions

Avoid animation for the sake of animation.

The core rule:

> **If removing an animation makes the website better or clearer, remove it.**

Animation should never significantly affect:

* Page speed
* Accessibility
* SEO
* Mobile usability

---

# 27. Performance Requirements

The website should prioritize:

* Fast initial load
* Optimized images
* Minimal JavaScript where possible
* Server-side rendering/static generation where appropriate
* Lazy loading
* CDN delivery
* Proper caching
* Optimized fonts
* Minimal third-party scripts

Analytics and tracking scripts should not unnecessarily slow down the site.

---

# 28. Deployment Architecture

### Frontend

**Vercel**

```text
GitHub
   ↓
Vercel
   ↓
Next.js Website
```

### Backend

Initially one of:

* Render
* Railway
* Fly.io

```text
GitHub
   ↓
Backend hosting
   ↓
FastAPI
```

### Database

Managed PostgreSQL.

The database should not be hosted manually on the same server as the FastAPI application.

---

# 29. Domain Architecture

The primary domain should represent the company brand.

Potential structure:

```text
www.vedantexportsinternational.com
```

or the final selected company domain.

Future backend architecture can use:

```text
api.domain.com
```

Example:

```text
Website:
www.domain.com

API:
api.domain.com
```

This keeps the frontend and backend independently deployable.

---

# 30. Environment Configuration

Sensitive configuration must never be committed to GitHub.

Environment variables should include items such as:

```text
DATABASE_URL
RESEND_API_KEY
WHATSAPP_API_KEY
NEXT_PUBLIC_API_URL
```

Additional secrets should be introduced only when required.

`.env` files containing secrets must be excluded through `.gitignore`.

---

# 31. Git Architecture

GitHub should be the source-control system.

Recommended structure:

```text
vedant-exports/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   └── ...
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── ...
│   └── ...
│
├── docs/
│
└── README.md
```

The `docs` directory should eventually contain the architecture and product-development documents created during the project.

---

# 32. API Architecture

Initial API endpoints should remain small.

Example:

```text
GET    /api/v1/products
GET    /api/v1/products/{slug}

POST   /api/v1/inquiries
GET    /api/v1/health
```

Future API modules:

```text
/auth
/buyers
/rfqs
/quotes
/orders
/documents
/shipments
/payments
```

The API should use versioning from the beginning:

```text
/api/v1/
```

This makes future breaking changes easier to manage.

---

# 33. Backend Service Architecture

FastAPI should be separated into logical layers.

```text
API Route
   ↓
Schema Validation
   ↓
Service Layer
   ↓
Repository / Database Layer
   ↓
PostgreSQL
```

External integrations should also be isolated:

```text
Email Service
WhatsApp Service
Storage Service
```

This prevents the core business logic from becoming tightly coupled to a specific third-party provider.

---

# 34. Security Principles

The website should follow basic production security practices.

Required:

* HTTPS
* Environment-based secrets
* Input validation
* SQL injection protection through ORM/query parameterization
* Rate limiting on inquiry endpoints
* Spam/bot protection
* CORS configuration
* Secure HTTP headers
* Server-side validation
* Email abuse prevention
* Logging of important backend errors

The inquiry API should not be left completely open to automated spam.

---

# 35. Analytics

Analytics should initially track:

* Visitors
* Countries
* Traffic sources
* Product page visits
* Request-a-quote clicks
* Inquiry submissions
* WhatsApp clicks
* Contact clicks

Potential tools:

* Google Analytics
* Plausible

The architecture should keep analytics implementation isolated so it can be replaced later.

---

# 36. Conversion Tracking

Important conversion events:

```text
product_view
quote_button_click
inquiry_started
inquiry_submitted
whatsapp_click
email_click
phone_click
```

This will eventually allow Vedant to understand:

> Which products and countries generate the most buyer interest?

That information can become valuable for deciding which products and markets to expand into.

---

# 37. Content Architecture

The website content should be structured around buyer questions.

A buyer should quickly understand:

### Who are you?

Vedant Exports International.

### What do you supply?

Fresh agricultural products, spices, powders and other products.

### Can you source according to requirements?

Yes.

### Can you handle export requirements?

Yes, subject to the specific product/order requirements.

### Why should I trust you?

20+ years of agricultural trading experience, established sourcing network, storage infrastructure, certifications and international trading experience.

### How do I buy?

Submit an inquiry/request a quote.

---

# 38. Certifications & Compliance

A dedicated quality/certification section should communicate relevant credentials.

Potential credentials include:

* FSSAI
* APEDA
* EIC
* IEC
* CMC
* Other applicable certifications

The exact certificates displayed should be verified before publishing.

Certificates should be presented professionally rather than as a cluttered collection of logos.

Where appropriate, each certification can have:

* Certification name
* Issuing authority
* Certificate number
* Validity
* Short explanation

Sensitive information should not be publicly exposed unnecessarily.

---

# 39. Infrastructure & Sourcing

The website should have a dedicated section explaining the company's operational strengths.

Potential sections:

### North India sourcing network

Explain access to agricultural supply networks.

### Cold storage

Explain the Agra facility and its approximate capacity.

### Demand-based sourcing

Explain that buyers can approach Vedant with specific product requirements and sourcing can be arranged where feasible.

### Quality coordination

Explain the company's process for ensuring products meet agreed specifications.

The goal is to show operational capability without making exaggerated claims.

---

# 40. International Markets

The website should communicate the company's international orientation.

Initial target markets:

* USA
* European Union
* Australia
* Hong Kong

The market architecture should be expandable.

For example:

```text
/markets
/markets/usa
/markets/europe
/markets/australia
/markets/hong-kong
```

These pages do not necessarily need to exist on Day 1.

---

# 41. Request Flow — Buyer Perspective

The intended buyer journey is:

```text
Google / Referral / Direct Visit
             ↓
          Homepage
             ↓
        Explore Products
             ↓
       Product Detail Page
             ↓
       Request a Quote
             ↓
        Inquiry Form
             ↓
        Submit Inquiry
             ↓
   Confirmation + Reference
             ↓
 Vedant receives notification
             ↓
      Human follow-up
```

The website's architecture should optimize this journey.

---

# 42. What Phase 1 Will NOT Include

To keep the first version focused, Phase 1 will not include:

* Buyer accounts
* Admin dashboard
* Online payments
* Order management
* Shipment tracking
* Buyer portal
* Internal CRM
* Complex CMS
* Automated quotations
* Automated pricing engine
* Inventory management
* ERP integration
* Supplier portal
* Complex AI features

These can be added later.

---

# 43. Phase 1 Definition of Done

The first production version should be considered complete when:

### Website

* Responsive website is live.
* Main pages are complete.
* Product pages are functional.
* SEO metadata is implemented.
* Mobile experience is polished.
* Design is consistent.

### Products

* Every launch product has a dedicated page.
* Product information is accurate.
* Product images are optimized.
* Request Quote CTA is available.

### Inquiry

* Buyer can submit structured inquiry.
* Inquiry is validated.
* Inquiry is saved in PostgreSQL.
* Vedant receives notification.
* Buyer receives confirmation.
* WhatsApp workflow works.
* Spam protection exists.

### Infrastructure

* Frontend deployed.
* Backend deployed.
* PostgreSQL deployed.
* Domain connected.
* HTTPS active.
* Environment secrets configured.
* GitHub repository organized.

### Quality

* No obvious console errors.
* No broken links.
* Mobile layout works.
* Forms handle errors correctly.
* Loading states exist.
* Success/failure states exist.
* Basic accessibility requirements are met.

---

# 44. Architectural Principle

The most important principle for this project is:

> **Build a simple Phase 1 product on top of a clean architecture that can grow into a B2B export platform.**

We should not build the entire future platform today.

Instead:

```text
Simple today
       ↓
Modular architecture
       ↓
Easy expansion
       ↓
B2B export platform
```

The website should initially feel like a **premium international export company website**, while the underlying technical architecture should quietly prepare for the much larger system Vedant may eventually become.

---

# 45. Final Architecture

### Phase 1

```text
                   BUYER
                     │
                     ▼
              ┌─────────────┐
              │   Next.js   │
              │ TypeScript  │
              └──────┬──────┘
                     │
                  REST API
                     │
                     ▼
              ┌─────────────┐
              │   FastAPI   │
              └──────┬──────┘
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
   ┌──────────────┐      ┌───────────────┐
   │ PostgreSQL   │      │ External APIs │
   │              │      │ Email/WhatsApp│
   └──────────────┘      └───────────────┘
```

### Future

```text
                         BUYERS
                            │
                            ▼
                     ┌────────────┐
                     │  Next.js   │
                     │ Web +      │
                     │ Buyer      │
                     │ Portal     │
                     └─────┬──────┘
                           │
                           ▼
                     ┌────────────┐
                     │  FastAPI   │
                     │ API Layer  │
                     └─────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
      RFQs              Orders            Shipments
        │                  │                  │
        ▼                  ▼                  ▼
     Quotes            Documents         Tracking
        │                  │                  │
        └──────────────────┼──────────────────┘
                           ▼
                     PostgreSQL
```

---

# 46. Architecture Decision Summary

| Area                   | Phase 1 Decision                                                        |
| ---------------------- | ----------------------------------------------------------------------- |
| Frontend               | Next.js + TypeScript                                                    |
| Styling                | Tailwind CSS                                                            |
| UI                     | Customized shadcn/ui                                                    |
| Backend                | FastAPI                                                                 |
| Database               | PostgreSQL                                                              |
| ORM                    | SQLAlchemy                                                              |
| Validation             | Pydantic                                                                |
| Authentication         | Not required initially                                                  |
| Admin dashboard        | Not required initially                                                  |
| Product pages          | Dedicated page for every product                                        |
| Pricing                | Primarily Request a Quote                                               |
| Currency               | Multi-currency ready                                                    |
| Inquiry                | Structured B2B inquiry                                                  |
| Email                  | Resend                                                                  |
| WhatsApp               | Integrated communication channel                                        |
| Image storage          | Cloudinary/S3-compatible                                                |
| Analytics              | Google Analytics/Plausible                                              |
| Frontend deployment    | Vercel                                                                  |
| Backend deployment     | Render/Railway/Fly.io                                                   |
| Version control        | GitHub                                                                  |
| Language               | English                                                                 |
| SEO                    | Built into Next.js architecture                                         |
| Initial business model | Exporter + sourcing company                                             |
| Future platform        | Buyer accounts → RFQs → quotes → orders → documents → shipment tracking |

---

# 47. Guiding Statement

The website should ultimately communicate one simple message:

> **Vedant Exports International connects international buyers with reliable Indian agricultural products through established sourcing, quality-focused operations, and professional export execution.**

The design should feel **confident, minimal, modern and international**.

The technology should feel **simple, modular and maintainable**.

And the architecture should leave enough room for Vedant to evolve from a company website into a **full B2B export platform** without having to rebuild the entire system.

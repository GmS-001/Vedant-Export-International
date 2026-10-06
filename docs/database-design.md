# Database Design

**Document:** 06 — Database Design
**Project:** Vedant Exports International Website
**Phase:** Phase 1 — Company Website + Product Catalog + Buyer Inquiry
**Database:** PostgreSQL
**ORM:** SQLAlchemy
**Status:** Approved Baseline

---

# 1. Purpose

This document defines the database structure for Phase 1 of the Vedant Exports International website.

The database should remain **simple, reliable and easy to maintain**.

The website is primarily a B2B company presentation and product catalog. It is **not an e-commerce platform**.

The main database operation is:

> Store and manage buyer inquiries submitted through the Request a Quote workflow.

There should be no unnecessary database complexity in Phase 1.

---

# 2. Database Technology

Use:

* PostgreSQL
* SQLAlchemy ORM
* Alembic for migrations

The database connection must be configured through environment variables.

Example:

```text
DATABASE_URL
```

Database credentials must never be committed to GitHub or exposed to the frontend.

---

# 3. Phase 1 Database Scope

The initial database contains four core entities:

```text
product_categories
        │
        ▼
products
        │
        ▼
inquiry_items
        │
        ▼
inquiries
```

### Core tables

```text
product_categories
products
inquiries
inquiry_items
```

No other business entities are required for Phase 1.

---

# 4. Product Categories

## Table: `product_categories`

Stores product categories used to organize the product catalog.

### Fields

| Field       | Type         | Required | Description                |
| ----------- | ------------ | -------: | -------------------------- |
| id          | UUID         |      Yes | Primary key                |
| name        | VARCHAR(100) |      Yes | Category name              |
| slug        | VARCHAR(120) |      Yes | SEO-friendly unique slug   |
| description | TEXT         |       No | Category description       |
| active      | BOOLEAN      |      Yes | Whether category is active |
| created_at  | TIMESTAMP    |      Yes | Creation timestamp         |
| updated_at  | TIMESTAMP    |      Yes | Last update timestamp      |

### Constraints

* `id` is the primary key.
* `slug` must be unique.
* `active` defaults to `true`.

---

# 5. Products

## Table: `products`

Stores structured product information used by product listing and product detail pages.

The product model should support fields such as:

```text
id
name
slug
category
short_description
description
specifications
packaging_options
available_variants
applications
minimum_order_quantity
image(s)
country_availability
featured
active
created_at
updated_at
```

This follows the existing product architecture.

### Fields

| Field                  | Type         | Required | Description                         |
| ---------------------- | ------------ | -------: | ----------------------------------- |
| id                     | UUID         |      Yes | Primary key                         |
| category_id            | UUID         |      Yes | Foreign key to `product_categories` |
| name                   | VARCHAR(150) |      Yes | Product name                        |
| slug                   | VARCHAR(180) |      Yes | Unique SEO-friendly URL slug        |
| short_description      | TEXT         |      Yes | Short product description           |
| description            | TEXT         |      Yes | Full product description            |
| specifications         | JSONB        |       No | Product specifications              |
| packaging_options      | JSONB        |       No | Available packaging options         |
| available_variants     | JSONB        |       No | Product variants                    |
| applications           | JSONB        |       No | Product applications/use cases      |
| minimum_order_quantity | VARCHAR(100) |       No | MOQ information                     |
| image_urls             | JSONB        |       No | Product image URLs                  |
| country_availability   | JSONB        |       No | Markets/countries where applicable  |
| featured               | BOOLEAN      |      Yes | Whether product is featured         |
| active                 | BOOLEAN      |      Yes | Whether product is visible          |
| created_at             | TIMESTAMP    |      Yes | Creation timestamp                  |
| updated_at             | TIMESTAMP    |      Yes | Last update timestamp               |

### Constraints

* `id` is the primary key.
* `slug` must be unique.
* `category_id` references `product_categories.id`.
* `active` defaults to `true`.
* `featured` defaults to `false`.

### Important

Product images should **not** be stored directly inside PostgreSQL.

Only image URLs/references should be stored.

Actual media should use the selected external storage provider, such as Cloudinary or S3-compatible storage.

---

# 6. Buyer Inquiries

## Table: `inquiries`

This is the **most important Phase 1 database table**.

Every Request a Quote / buyer inquiry should create one inquiry record.

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

This matches the existing inquiry requirements.

### Fields

| Field               | Type         | Required | Description                      |
| ------------------- | ------------ | -------: | -------------------------------- |
| id                  | UUID         |      Yes | Internal primary key             |
| reference           | VARCHAR(30)  |      Yes | Human-readable inquiry reference |
| name                | VARCHAR(150) |      Yes | Buyer name                       |
| company_name        | VARCHAR(200) |       No | Buyer company                    |
| email               | VARCHAR(255) |      Yes | Buyer email                      |
| phone               | VARCHAR(50)  |      Yes | Buyer phone/WhatsApp             |
| destination_country | VARCHAR(100) |      Yes | Destination country              |
| packaging           | VARCHAR(255) |       No | Required packaging               |
| quantity            | VARCHAR(100) |      Yes | Requested quantity               |
| required_date       | DATE         |       No | Required delivery/supply date    |
| message             | TEXT         |       No | Additional buyer message         |
| status              | VARCHAR(30)  |      Yes | Inquiry status                   |
| created_at          | TIMESTAMP    |      Yes | Submission timestamp             |
| updated_at          | TIMESTAMP    |      Yes | Last update timestamp            |

### Inquiry status

Phase 1 should keep status simple:

```text
new
contacted
closed
```

Default:

```text
new
```

The status is primarily for future internal management and does not require an admin dashboard in Phase 1.

---

# 7. Inquiry Items

## Table: `inquiry_items`

This table connects an inquiry with the requested product.

Although Phase 1 may commonly contain one product per inquiry, using a separate table keeps the structure flexible for future multi-product inquiries.

### Fields

| Field      | Type         | Required | Description                |
| ---------- | ------------ | -------: | -------------------------- |
| id         | UUID         |      Yes | Primary key                |
| inquiry_id | UUID         |      Yes | Foreign key to `inquiries` |
| product_id | UUID         |      Yes | Foreign key to `products`  |
| quantity   | VARCHAR(100) |      Yes | Requested quantity         |
| packaging  | VARCHAR(255) |       No | Requested packaging        |
| created_at | TIMESTAMP    |      Yes | Creation timestamp         |

### Relationships

```text
Inquiry
   │
   └──< Inquiry Items >── Product
```

An inquiry can contain one or more products.

A product can appear in many inquiries.

---

# 8. Relationships

The complete Phase 1 relationship model:

```text
product_categories
        │
        │ 1:N
        ▼
products
        │
        │ 1:N
        ▼
inquiry_items
        ▲
        │ N:1
        │
inquiries
```

More explicitly:

```text
product_categories
    1 ─────────── N
                  products

products
    1 ─────────── N
                  inquiry_items

inquiries
    1 ─────────── N
                  inquiry_items
```

---

# 9. Inquiry Submission Flow

The database is part of the following workflow:

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
┌───────────────────────┐
│                       │
▼                       ▼
Vedant Notification   Buyer Confirmation
Email + WhatsApp      Email
```

A successful inquiry must be stored before the notification workflow is considered complete.

The existing architecture explicitly requires PostgreSQL storage followed by company notification and buyer confirmation.

---

# 10. Inquiry Reference

Every inquiry should receive a unique human-readable reference.

Example:

```text
VEI-2026-000001
```

The reference should:

* Be unique.
* Be safe to show to the buyer.
* Be included in the confirmation email.
* Be included in the internal notification.
* Not expose the database UUID.

The UUID remains the internal database identifier.

---

# 11. Indexes

Only create indexes that support actual Phase 1 queries.

Recommended indexes:

```text
products.slug
products.category_id
products.active

product_categories.slug
product_categories.active

inquiries.reference
inquiries.email
inquiries.created_at
inquiries.status

inquiry_items.inquiry_id
inquiry_items.product_id
```

Do not add unnecessary indexes.

---

# 12. Database Read/Write Requirements

The website has very limited database activity.

### Reads

Primarily:

```text
GET /api/v1/products
GET /api/v1/products/{slug}
```

and related category/product queries.

### Writes

Primarily:

```text
POST /api/v1/inquiries
```

The inquiry workflow is the primary write operation.

There is no requirement for complex reporting, analytics, dashboards, real-time feeds or high-volume transactional workloads in Phase 1.

---

# 13. Transactions

Inquiry creation should use a database transaction.

The basic operation should be:

```text
BEGIN TRANSACTION

Create inquiry
Create inquiry item(s)

COMMIT
```

If database creation fails:

```text
ROLLBACK
```

The API should not report a successful inquiry if the database transaction failed.

---

# 14. Validation

Database constraints are the final layer of data integrity.

Validation should happen at multiple levels:

```text
Frontend validation
        ↓
Pydantic validation
        ↓
Database constraints
```

The backend must never trust frontend validation alone.

---

# 15. Security

The database implementation must follow these principles:

* Never expose database credentials to the frontend.
* Use environment variables for credentials.
* Use SQLAlchemy rather than constructing raw SQL from user input.
* Validate all incoming inquiry data.
* Protect the inquiry endpoint with rate limiting/spam protection.
* Do not store unnecessary personal information.
* Do not log sensitive information unnecessarily.
* Use HTTPS in production.
* Restrict database network access where supported.
* Use a least-privilege database user for the application.

---

# 16. No Admin Dashboard in Phase 1

There is **no admin dashboard** in Phase 1.

Do not create:

```text
admins
admin_users
roles
permissions
admin_sessions
```

The business owner will initially manage inquiries through email, WhatsApp and direct communication.

This is explicitly outside the Phase 1 scope.

---

# 17. No Buyer Accounts in Phase 1

Do not create buyer authentication tables.

There will be no:

```text
users
buyer_accounts
buyer_sessions
passwords
```

in Phase 1.

Buyer accounts are a future feature.

---

# 18. Future Database Expansion

The database should be structured so that future modules can be added without redesigning the existing core.

Potential future entities include:

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
```

These are **future entities only** and must not be implemented unnecessarily in Phase 1.

Possible future architecture:

```text
Buyer
  ↓
RFQ
  ↓
Quote
  ↓
Order
  ↓
Documents
  ↓
Shipment
  ↓
Payment
```

---

# 19. Database Migration

Use **Alembic** for database schema migrations.

Migrations should be committed to GitHub.

Example structure:

```text
backend/
├── alembic/
│   ├── versions/
│   └── env.py
├── app/
│   ├── models/
│   ├── schemas/
│   ├── repositories/
│   └── services/
```

Never modify the production database schema manually without creating the corresponding migration.

---

# 20. Backup and Reliability

The production database should use a managed PostgreSQL provider with automated backups where available.

The application should not depend on local database files.

Development and production databases should be separate.

---

# 21. Database Design Principles

The following principles apply:

1. **Keep the database simple.**
2. Store only information required by the website.
3. Avoid premature entities.
4. Avoid unnecessary relationships.
5. Use UUIDs for internal IDs.
6. Use human-readable references for buyer-facing inquiry IDs.
7. Normalize relational data where useful.
8. Use JSONB only for flexible product attributes that do not justify separate tables.
9. Store media externally and save only URLs/references.
10. Use migrations for schema changes.
11. Keep future expansion possible without implementing future functionality prematurely.

---

# 22. Phase 1 Database Acceptance Criteria

The database implementation is complete when:

* [ ] PostgreSQL is connected successfully.
* [ ] SQLAlchemy models are implemented.
* [ ] Alembic migrations are configured.
* [ ] `product_categories` exists.
* [ ] `products` exists.
* [ ] `inquiries` exists.
* [ ] `inquiry_items` exists.
* [ ] Product slugs are unique.
* [ ] Inquiry references are unique.
* [ ] Inquiry data is validated before storage.
* [ ] Buyer inquiries are persisted successfully.
* [ ] Database transactions are handled correctly.
* [ ] Database errors are handled gracefully.
* [ ] No database credentials are exposed.
* [ ] No unnecessary Phase 2/future entities are implemented.

---

# 23. Source of Truth

This document is the source of truth for the **Phase 1 database structure**.

Implementation should follow this document together with:

```text
requirements.md
architecture.md
system-design.md
functional-spec.md
content.md
08-ui-ux-design-system.md
```

If a future feature requires a database change:

1. Update this document first.
2. Define the required schema change.
3. Create an Alembic migration.
4. Implement the change.
5. Update related technical documentation if necessary.

Do not introduce new database entities simply because they may be useful in the future.

---

# 24. Core Principle

> **The Phase 1 database should be boring, small and reliable.**

The website's primary purpose is to present Vedant Exports International professionally and generate qualified B2B inquiries.

The database should support that purpose without becoming an unnecessary business-management system.

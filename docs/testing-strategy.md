# Testing Strategy

## 1. Purpose

This document defines the testing approach for the Vedant Exports International website.

The goal is to ensure that the Phase 1 system is:

* Reliable
* Functional
* Secure
* Responsive
* Ready for production

Testing should remain practical and avoid unnecessary complexity.

---

# 2. Testing Levels

The project should use four main testing levels:

```text
Unit Tests
    ↓
API / Integration Tests
    ↓
Frontend Tests
    ↓
End-to-End Tests
```

---

# 3. Backend Testing

Backend tests should cover:

### Unit Tests

Test individual:

* Services
* Validation logic
* Utility functions
* Business rules

### API Tests

Test:

* `GET /api/v1/products`
* `GET /api/v1/products/{slug}`
* `POST /api/v1/inquiries`
* `GET /api/v1/health`

Verify:

* Valid requests
* Invalid requests
* Missing fields
* Invalid data
* Expected response formats
* Correct HTTP status codes

---

# 4. Inquiry Workflow Testing

The Request Quote workflow is a critical business flow.

Test:

```text
Submit Form
    ↓
Frontend Validation
    ↓
API Request
    ↓
Backend Validation
    ↓
Database Creation
    ↓
Notifications
    ↓
Success Response
```

Verify that:

* Valid inquiries are stored correctly
* Invalid inquiries are rejected
* Inquiry and inquiry items are created atomically
* Reference numbers are generated correctly
* Notification failures do not corrupt the inquiry transaction

---

# 5. Frontend Testing

Test important UI behavior:

* Navigation
* Product listing
* Product detail pages
* Request Quote form
* Form validation
* Loading states
* Error states
* Success states
* Mobile navigation
* Responsive layouts

Focus testing on user-critical flows rather than every visual detail.

---

# 6. End-to-End Testing

At least one complete production-like flow should be tested:

```text
Homepage
   ↓
Products
   ↓
Product Detail
   ↓
Request a Quote
   ↓
Submit Inquiry
   ↓
Success
```

The test should verify that the complete system works together.

---

# 7. Responsive Testing

Test the website on:

* Mobile
* Tablet
* Laptop
* Desktop

Verify:

* No horizontal scrolling
* Navigation works
* Forms remain usable
* Images scale correctly
* CTAs remain accessible
* Text remains readable

---

# 8. Security Testing

Basic security tests should verify:

* API validation
* Rate limiting
* CORS configuration
* SQL injection protection
* XSS protection
* Authentication boundaries if introduced later
* No secrets exposed in frontend
* Safe production error responses

---

# 9. SEO Testing

Verify:

* Page titles
* Meta descriptions
* Canonical URLs
* Sitemap
* Robots.txt
* H1 structure
* Open Graph metadata
* Structured data
* Product URLs
* Internal links

Important pages must be crawlable and indexable.

---

# 10. Performance Testing

Check:

* Initial page load
* Image optimization
* API response time
* Core Web Vitals
* Mobile performance
* Unnecessary JavaScript
* Large assets

Performance problems should be fixed before production where practical.

---

# 11. Test Environments

Use:

```text
Development
    ↓
Staging / Preview
    ↓
Production
```

Production should not be used for development testing.

Test data should be separated from real business data.

---

# 12. CI Testing

Before merging or deploying significant changes, automated tests should run where practical.

Minimum checks:

```text
Lint
Type Check
Backend Tests
Build
```

Critical API and inquiry tests should fail the deployment if they fail.

---

# 13. Production Smoke Test

After deployment, verify:

* Homepage loads
* Products load
* Product detail page works
* Request Quote form opens
* Inquiry submission works
* Email/WhatsApp notification flow works
* Mobile layout works
* No critical console/API errors

---

# 14. Testing Principle

> **Test the business-critical paths first.**

For Phase 1, the highest-priority areas are:

1. Product discovery
2. Product pages
3. Request Quote workflow
4. Backend APIs
5. Responsive behavior
6. Security
7. SEO
8. Performance

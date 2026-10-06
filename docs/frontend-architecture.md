# Frontend Architecture

**Document:** 04 — Frontend Architecture
**Project:** Vedant Exports International Website
**Phase:** Phase 1 — Company Website + Product Catalog + Buyer Inquiry
**Frontend:** Next.js + TypeScript
**Styling:** Tailwind CSS
**UI Components:** Customized shadcn/ui
**Deployment:** Vercel
**Status:** Approved Baseline

---

# 1. Purpose

This document defines the frontend architecture for the Vedant Exports International website.

The frontend should provide:

* A professional international B2B website.
* Product discovery and product detail pages.
* Company and capability presentation.
* SEO-friendly pages.
* Responsive layouts.
* Request a Quote workflow.
* Communication with the FastAPI backend.
* Fast and accessible user experience.

The frontend should remain **simple, modular and maintainable**.

---

# 2. Frontend Technology

The Phase 1 frontend stack is:

| Area            | Technology                         |
| --------------- | ---------------------------------- |
| Framework       | Next.js                            |
| Language        | TypeScript                         |
| Styling         | Tailwind CSS                       |
| UI Components   | Customized shadcn/ui               |
| Deployment      | Vercel                             |
| API             | FastAPI                            |
| Image Storage   | Cloudinary / S3-compatible storage |
| Version Control | GitHub                             |

These decisions are established in the overall architecture.

---

# 3. Frontend Responsibilities

The frontend is responsible for:

* Website UI.
* Page routing.
* Product pages.
* Product catalog.
* Company content presentation.
* SEO metadata.
* Responsive design.
* Inquiry forms.
* API communication.
* Loading states.
* Error states.
* User interactions.
* Animations.
* Accessibility.

The frontend must **not** contain business logic that belongs to the backend.

---

# 4. Application Structure

Recommended frontend structure:

```text
frontend/
│
├── app/
│   ├── page.tsx
│   ├── about/
│   ├── products/
│   │   ├── page.tsx
│   │   └── [slug]/
│   ├── sourcing/
│   ├── quality/
│   ├── markets/
│   ├── insights/
│   ├── contact/
│   └── request-a-quote/
│
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── footer/
│   ├── sections/
│   ├── products/
│   ├── forms/
│   ├── ui/
│   └── animations/
│
├── lib/
│   ├── api/
│   ├── utils/
│   └── constants/
│
├── public/
│
├── styles/
│
└── types/
```

The exact folder structure may evolve slightly during implementation, but the frontend should remain logically separated by responsibility.

---

# 5. Routing Architecture

Use Next.js App Router.

Primary routes:

```text
/
 /about
 /products
 /products/[slug]
 /sourcing
 /quality
 /markets
 /insights
 /contact
 /request-a-quote
```

Product pages must use stable SEO-friendly slugs.

Examples:

```text
/products/potatoes
/products/onions
/products/moringa-powder
/products/turmeric-powder
```

Each major product should have a dedicated page.

---

# 6. Page Architecture

Pages should be composed from reusable sections and components.

Example:

```text
Page
 │
 ├── Header
 │
 ├── Hero
 │
 ├── Content Sections
 │
 ├── Supporting Sections
 │
 ├── CTA
 │
 └── Footer
```

Do not create completely independent implementations for visually similar sections.

Reusable components should be preferred.

---

# 7. Layout Architecture

The global layout should provide:

* Header/navigation.
* Main content area.
* Footer.
* Global typography.
* Global background behavior.
* Global responsive behavior.

The layout should remain consistent across the website.

Page-specific layouts should only be introduced when the content genuinely requires them.

---

# 8. Component Architecture

Components should be divided into logical categories.

## UI Components

Generic reusable components:

```text
Button
Input
Textarea
Select
Modal
Badge
Card
Container
```

These may use shadcn/ui as a foundation but must be customized to match the Vedant design system.

The website should not look like a default shadcn/ui website.

---

## Layout Components

Examples:

```text
Header
Footer
Navbar
MobileNavigation
PageContainer
Section
```

---

## Product Components

Examples:

```text
ProductCard
ProductGrid
ProductGallery
ProductSpecifications
ProductCTA
RelatedProducts
```

---

## Form Components

Examples:

```text
InquiryForm
FormField
FormError
FormSuccess
SubmitButton
```

---

## Section Components

Examples:

```text
HeroSection
TrustSection
CapabilitiesSection
MarketsSection
ProcessSection
CTASection
```

The exact component list should evolve based on actual reuse requirements.

---

# 9. Component Design Principle

Components should be:

* Reusable.
* Small enough to understand.
* Focused on one responsibility.
* Type-safe.
* Accessible.
* Consistent with the design system.

Avoid creating extremely large page components containing the entire page implementation.

Avoid creating abstractions that are used only once unless they provide clear structural value.

---

# 10. Data Architecture

The frontend should distinguish between:

### Static/content data

Examples:

* Company information.
* Page copy.
* Navigation.
* Product descriptions where appropriate.
* FAQs.
* Markets.
* Export process content.

### Dynamic/backend data

Examples:

* Product data retrieved through API.
* Inquiry submission.
* Inquiry submission status.
* API responses.

The frontend should not duplicate backend business logic.

---

# 11. API Communication

The frontend communicates with the FastAPI backend through versioned API endpoints.

Initial endpoints:

```text
GET  /api/v1/products
GET  /api/v1/products/{slug}

POST /api/v1/inquiries

GET  /api/v1/health
```

The API version prefix must be used from the beginning.

---

# 12. API Client

API communication should be centralized.

Recommended conceptual structure:

```text
lib/
└── api/
    ├── client.ts
    ├── products.ts
    └── inquiries.ts
```

Components should not repeatedly implement raw API requests themselves.

For example:

```text
ProductPage
      ↓
product API function
      ↓
FastAPI
```

and:

```text
InquiryForm
      ↓
inquiry API function
      ↓
FastAPI
```

---

# 13. Request a Quote Architecture

The primary conversion flow is:

```text
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
Database
      ↓
Notification Services
      ↓
Success Response
      ↓
Buyer Confirmation
```

The frontend should only collect, validate and submit the buyer's information.

Email, WhatsApp and database operations must be handled by the backend.

---

# 14. Form State

The inquiry form should support:

```text
idle
submitting
success
error
```

During submission:

* Disable duplicate submission.
* Show clear loading feedback.
* Preserve entered information where practical.

On success:

* Show confirmation.
* Show the inquiry reference returned by the backend.

On failure:

* Show a clear error.
* Allow retry.
* Provide an alternative contact option such as WhatsApp/email.

---

# 15. Loading States

Pages and components that depend on API data should have appropriate loading states.

Examples:

```text
Product loading
Product not found
API unavailable
Inquiry submitting
Inquiry submitted
```

Loading states should be visually subtle and consistent with the UI design system.

---

# 16. Error Handling

Frontend error states should be understandable to buyers.

Examples:

### Product not found

Show a useful not-found page and navigation back to products.

### API unavailable

Show a friendly retry message.

### Inquiry validation error

Show field-level validation errors.

### Inquiry submission failure

Explain that the inquiry could not be submitted and provide an alternative contact method.

These states are part of the Phase 1 requirements.

---

# 17. Responsive Architecture

The frontend must be **mobile-first**.

Supported layouts:

```text
Mobile
   ↓
Tablet
   ↓
Laptop
   ↓
Desktop
```

Requirements:

* No horizontal scrolling.
* Responsive typography.
* Responsive grids.
* Responsive images.
* Touch-friendly controls.
* Mobile navigation.
* Single-column forms on mobile.
* Clear CTAs.
* Easy access to WhatsApp/contact options.

The inquiry process deserves particular attention because buyers may primarily use mobile devices.

---

# 18. Design System Integration

The frontend must follow:

```text
docs/08-ui-ux-design-system.md
```

This document is the source of truth for:

* Typography.
* Colors.
* Spacing.
* Buttons.
* Cards.
* Forms.
* Navigation.
* Footer.
* Border radius.
* Shadows.
* Icons.
* Image treatment.
* Animation.
* Responsive behavior.

Developers and AI coding agents must not independently introduce new visual patterns without updating the design system first.

---

# 19. Navigation

Desktop navigation should remain minimal.

Primary navigation:

```text
Products
About
Sourcing
Quality
Markets
Insights
Request a Quote
```

The Request a Quote CTA should receive stronger visual emphasis.

Mobile navigation should use a clean menu/drawer and keep the quote action easily accessible.

Avoid overloaded navigation.

---

# 20. SEO Architecture

Next.js should provide the foundation for SEO.

Each indexable page should have:

* Unique title.
* Meta description.
* Canonical URL.
* Open Graph metadata.
* Appropriate structured data.
* Correct heading hierarchy.
* Descriptive URL.
* Optimized images.

Product pages must be independently indexable.

SEO should remain natural and buyer-focused rather than keyword-stuffed.

---

# 21. Image Architecture

Images should be served from external storage/CDN rather than being stored as large production assets inside GitHub.

Preferred options:

```text
Cloudinary
S3-compatible storage
```

Images should support:

* Responsive formats.
* Compression.
* CDN delivery.
* Multiple resolutions.
* Product galleries.

The frontend should use optimized image loading wherever possible.

---

# 22. Animation Architecture

Animations should be:

* Subtle.
* Purposeful.
* Fast.
* Accessible.

Potential uses:

```text
Page transitions
Scroll reveal
Image transitions
Product hover
Navigation transitions
Subtle hero interactions
Meaningful number/stat animations
```

Core rule:

> **If removing an animation makes the website better or clearer, remove it.**

Animations must never significantly harm:

* Page speed.
* Accessibility.
* SEO.
* Mobile usability.

Respect:

```text
prefers-reduced-motion
```

---

# 23. Performance Architecture

Performance is a priority.

The frontend should use:

* Server-side rendering where appropriate.
* Static generation where appropriate.
* Optimized images.
* Lazy loading.
* CDN delivery.
* Proper caching.
* Optimized fonts.
* Minimal JavaScript.
* Minimal third-party scripts.

Avoid adding libraries unless they provide meaningful value.

Analytics and tracking must not unnecessarily slow down the website.

---

# 24. Server vs Client Components

Prefer **Server Components by default**.

Use Client Components only when browser-side interactivity is actually required.

Client Components are appropriate for:

* Interactive forms.
* Navigation menus.
* Animations requiring client state.
* Interactive product galleries.
* Other browser-dependent interactions.

Do not make entire pages client-rendered unnecessarily.

---

# 25. TypeScript

TypeScript should be used throughout the frontend.

Avoid:

```text
any
```

unless there is a clear technical reason.

Define shared types for:

```text
Product
ProductCategory
Inquiry
InquiryItem
API responses
API errors
```

API response types should remain consistent with the backend schemas.

---

# 26. Accessibility

The frontend must provide basic accessibility.

Required:

* Semantic HTML.
* Proper heading hierarchy.
* Accessible navigation.
* Keyboard navigation.
* Visible focus states.
* Form labels.
* Understandable validation errors.
* Appropriate image alt text.
* Sufficient color contrast.
* Touch-friendly controls.
* Reduced-motion support.

Accessibility should be considered during component development rather than added at the end.

---

# 27. Security Boundaries

The frontend must never contain:

* Database credentials.
* API secrets.
* Email provider keys.
* WhatsApp provider keys.
* Private backend configuration.

Only values explicitly intended for browser use may use `NEXT_PUBLIC_` environment variables.

The frontend should treat all user-provided data as untrusted.

Backend validation remains mandatory.

---

# 28. Content Architecture

Content should not be scattered unnecessarily throughout components.

Where content is static and structured, prefer organized content/data structures.

Examples:

```text
Company content
Product content
FAQ content
Navigation data
Market data
```

This makes future content updates easier without changing the visual architecture.

The frontend should follow `content.md` for approved website content.

---

# 29. Deployment

Frontend deployment target:

```text
GitHub
   ↓
Vercel
   ↓
Next.js
```

The frontend and backend should remain independently deployable.

The backend API URL should be configured through environment variables.

Example:

```text
NEXT_PUBLIC_API_URL
```

The final production domain remains a separate deployment decision.

---

# 30. Frontend Environment Variables

Frontend environment variables should contain only configuration that is safe for browser exposure.

Example:

```text
NEXT_PUBLIC_API_URL
```

Never expose:

```text
DATABASE_URL
RESEND_API_KEY
WHATSAPP_API_KEY
```

or any other private credentials.

---

# 31. Frontend Folder Principles

The frontend codebase should remain understandable to a developer joining the project later.

General rules:

1. Keep pages focused on page composition.
2. Keep reusable UI in components.
3. Keep API calls in the API layer.
4. Keep shared types centralized.
5. Keep utility functions centralized.
6. Avoid unnecessary global state.
7. Avoid unnecessary dependencies.
8. Prefer simple solutions over premature abstractions.

---

# 32. State Management

Phase 1 does **not** require a large global state-management library.

Prefer:

* React component state.
* Server-side data fetching.
* URL state where appropriate.
* Local form state.

Introduce a global state library only if a real requirement appears.

There is no requirement for complex client-side application state in Phase 1.

---

# 33. Analytics

Analytics may be integrated later or during Phase 1 depending on implementation priority.

Potential providers include:

```text
Google Analytics
Plausible
```

Analytics must:

* Respect privacy requirements.
* Have minimal performance impact.
* Not interfere with core website functionality.

---

# 34. Future Extensibility

The frontend should allow future development of:

```text
Buyer Accounts
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
      ↓
Buyer Portal
```

These features are **not Phase 1 frontend requirements**.

The current frontend should not implement them prematurely.

The architecture should simply avoid making future expansion unnecessarily difficult.

---

# 35. What the Frontend Should NOT Become

Phase 1 should not become:

* An e-commerce frontend.
* A buyer dashboard.
* An admin dashboard.
* A CRM.
* An ERP.
* A complex SPA.
* A highly animated marketing experiment.

The frontend's primary job is:

> **Present Vedant professionally → build buyer trust → showcase products → generate qualified inquiries.**

---

# 36. Frontend Acceptance Criteria

The frontend architecture is considered correctly implemented when:

* [ ] Next.js + TypeScript is used.
* [ ] App Router is used.
* [ ] Routes are structured correctly.
* [ ] Product pages use stable slugs.
* [ ] Components are reusable.
* [ ] Tailwind CSS is used consistently.
* [ ] shadcn/ui is customized rather than used as-is.
* [ ] Design follows `08-ui-ux-design-system.md`.
* [ ] Frontend communicates with FastAPI through `/api/v1/`.
* [ ] Request a Quote workflow works.
* [ ] Loading states exist.
* [ ] Error states exist.
* [ ] Success states exist.
* [ ] Website is fully responsive.
* [ ] SEO metadata exists.
* [ ] Images are optimized.
* [ ] Animations remain subtle.
* [ ] Accessibility basics are implemented.
* [ ] No secrets are exposed.
* [ ] Performance is prioritized.
* [ ] Frontend can be deployed independently to Vercel.

---

# 37. Source of Truth

Frontend implementation must be guided by:

```text
docs/01-architecture.md
docs/02-requirements.md
docs/03-system-design.md
docs/04-frontend-architecture.md
docs/06-database-design.md
docs/07-api-specification.md
docs/08-ui-ux-design-system.md
docs/content.md
```

Priority:

```text
Requirements
     ↓
System Architecture
     ↓
Frontend Architecture
     ↓
UI/UX Design System
     ↓
Implementation
```

If a frontend implementation decision conflicts with a higher-level approved requirement, do not silently override the requirement.

---

# 38. Core Principle

> **Keep the frontend simple, fast, reusable and visually refined.**

The website should feel:

**Minimal → Premium → Modern → Trustworthy → International**

while the implementation remains:

**Simple → Modular → Type-safe → Maintainable → Performant**

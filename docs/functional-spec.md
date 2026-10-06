# Request a Quote — Contact & Notification Workflow

## 1. Purpose

The Request a Quote workflow is the primary buyer conversion workflow of the website.

A buyer should be able to submit a product inquiry through the website and receive confirmation through email and WhatsApp, while the company receives the same inquiry through email and WhatsApp and the complete inquiry is permanently stored in the database.

The workflow must be reliable, mobile-friendly, and designed for manual follow-up by the company.

---

## 2. Buyer Entry Points

A buyer can access the Request a Quote workflow from:

* Main navigation → `Request a Quote`
* Product listing → `Request a Quote`
* Individual product page → `Request a Quote`
* Relevant CTA sections across the website

When a buyer opens Request a Quote from a product page, the selected product should be pre-filled in the inquiry form.

---

## 3. Request a Quote Form

The form should collect the following information:

### Buyer Information

* Full Name
* Company Name
* Business Email
* WhatsApp / Phone Number
* Country
* City / Destination

### Requirement Information

* Product
* Quantity
* Unit of Quantity
* Required Grade / Specification
* Packaging Requirement
* Required Delivery Date
* Destination / Port
* Additional Message / Requirements

The form may include additional fields where required by the business, but unnecessary fields should be avoided.

---

## 4. Client-Side Validation

Before submission, the frontend must validate the form.

Required fields must be clearly identified.

Validation should include:

* Required field validation
* Valid email format
* Valid phone / WhatsApp number
* Valid quantity
* Product selection
* Appropriate message length
* Basic input sanitization

Validation errors must be displayed next to the relevant fields.

The buyer should not lose already entered information when a validation error occurs.

---

## 5. Inquiry Submission

When the buyer clicks **Submit Request**:

```text
Buyer
  ↓
Request Quote Form
  ↓
Client-side Validation
  ↓
POST /api/v1/inquiries
  ↓
Backend Validation
  ↓
Create Inquiry Record
  ↓
Database Storage
  ↓
Notification Services
  ├── Company Email
  ├── Buyer Email
  ├── Company WhatsApp
  └── Buyer WhatsApp
  ↓
Return Inquiry Reference
  ↓
Show Success Message
```

The inquiry must be submitted to the backend rather than directly from the browser to third-party notification services.

---

## 6. Database Storage

Every successfully submitted inquiry must be stored in the database.

The inquiry record should contain, at minimum:

* Unique Inquiry ID / Reference Number
* Submission Timestamp
* Buyer Name
* Company Name
* Email
* Phone / WhatsApp
* Country
* City / Destination
* Product
* Quantity
* Unit
* Grade / Specification
* Packaging
* Required Date
* Destination / Port
* Buyer Message
* Inquiry Status
* Notification Status
* Created At
* Updated At

The database record is the source of truth for the inquiry.

The inquiry must be stored before or as part of the notification workflow so that a temporary email or WhatsApp failure does not cause the inquiry to be lost.

---

## 7. Company Notification

After an inquiry is successfully created, the company must receive the inquiry through:

### Email

Send an inquiry notification to the company's configured business email address.

The email should contain:

* Inquiry Reference Number
* Buyer information
* Company information
* Product
* Quantity
* Specifications
* Packaging
* Destination
* Required date
* Buyer message
* Buyer email
* Buyer WhatsApp / phone

The company email should clearly indicate that this is a new website inquiry requiring follow-up.

### WhatsApp

Send a WhatsApp notification to the company's configured WhatsApp number.

The WhatsApp message should contain a concise summary:

```text
New Quote Request

Inquiry: {INQUIRY_ID}
Buyer: {BUYER_NAME}
Company: {COMPANY_NAME}
Product: {PRODUCT}
Quantity: {QUANTITY}
Destination: {DESTINATION}
Required Date: {REQUIRED_DATE}

Email: {BUYER_EMAIL}
WhatsApp: {BUYER_PHONE}

Message:
{BUYER_MESSAGE}
```

---

## 8. Buyer Confirmation

After successful submission, the buyer must receive confirmation through both email and WhatsApp.

### Buyer Email

The buyer should receive a confirmation email containing:

* Thank-you message
* Inquiry Reference Number
* Product requested
* Quantity
* Destination
* Summary of submitted requirements
* Confirmation that the company has received the inquiry
* Expected next step: company representative will review the requirement and contact the buyer

The system must not promise a quotation price automatically.

### Buyer WhatsApp

The buyer should receive a WhatsApp confirmation containing:

```text
Hello {BUYER_NAME},

Thank you for your inquiry to Vedant Exports International.

We have received your request successfully.

Inquiry Reference: {INQUIRY_ID}
Product: {PRODUCT}
Quantity: {QUANTITY}
Destination: {DESTINATION}

Our team will review your requirement and contact you shortly.

Thank you.
Vedant Exports International
```

---

## 9. Notification Architecture

The notification workflow should be handled by backend services.

```text
                    ┌──────────────────┐
                    │   Buyer Browser  │
                    └────────┬─────────┘
                             │
                             │ Submit Inquiry
                             ▼
                    ┌──────────────────┐
                    │   Backend API    │
                    │ /api/v1/inquiries│
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │ Validate Request │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │     Database     │
                    │ Store Inquiry    │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        Company Email   WhatsApp       Buyer Email
              │         Company             │
              │              │              │
              └──────────────┼──────────────┘
                             │
                             ▼
                      Buyer WhatsApp
```

Notification providers must be configurable through environment variables or backend configuration and must not expose credentials in frontend code.

---

## 10. Failure Handling

Notification failure must not delete or invalidate the inquiry.

For example:

```text
Inquiry submitted
      ↓
Database successfully stores inquiry
      ↓
Email succeeds
      ↓
Company WhatsApp fails
      ↓
Inquiry remains stored
      ↓
Failure recorded in notification status/log
```

The backend should record the status of each notification independently where practical:

* `company_email_status`
* `buyer_email_status`
* `company_whatsapp_status`
* `buyer_whatsapp_status`

Possible statuses:

* `pending`
* `sent`
* `failed`

A notification failure should be logged for later investigation or retry.

---

## 11. Success State

After the inquiry has been successfully stored, the buyer should see a clear confirmation page/message.

Example:

```text
Request Submitted Successfully

Thank you for contacting Vedant Exports International.

Your inquiry has been received successfully.

Inquiry Reference: VEI-XXXXXX

Our team will review your requirement and contact you shortly.

A confirmation has also been sent to your email and WhatsApp.
```

The buyer should have options to:

* Return to Homepage
* Continue Browsing Products
* Contact the company through WhatsApp

---

## 12. Submission Failure

If the inquiry cannot be stored in the database, the buyer must receive a clear error message.

Example:

```text
We couldn't submit your request right now.

Please try again or contact us directly through WhatsApp or email.
```

The buyer's entered form information should be preserved where possible.

If the database submission fails, the system must not display a false success message.

---

## 13. Spam Protection and Rate Limiting

The Request a Quote endpoint must include basic abuse protection.

Requirements include:

* Server-side validation
* Rate limiting
* Bot / spam protection
* Input sanitization
* Protection against duplicate submissions where appropriate

The exact anti-spam technology may be selected during implementation.

---

## 14. Security Requirements

* Notification provider credentials must never be exposed to the frontend.
* API keys and secrets must be stored as environment variables or secure server-side configuration.
* Buyer information must be transmitted over HTTPS.
* Server-side validation is mandatory even if frontend validation exists.
* Database queries must use safe parameterization / ORM mechanisms.
* Sensitive logs must not expose unnecessary personal information.

---

## 15. Phase 1 Scope

### Included

* Request Quote form
* Product pre-selection
* Client-side validation
* Server-side validation
* Inquiry API
* Database storage
* Unique inquiry reference
* Company email notification
* Buyer email confirmation
* Company WhatsApp notification
* Buyer WhatsApp confirmation
* Success state
* Error handling
* Notification status tracking
* Spam protection
* Rate limiting

### Not Included

* Automatic quotation generation
* Automatic pricing calculation
* Online payment
* Buyer account / login
* Buyer dashboard
* CRM dashboard
* Automatic order creation
* Shipment tracking
* Contract generation
* Automated negotiation

The company will manually review each inquiry and respond with the appropriate commercial quotation.

---

## 16. Acceptance Criteria

The workflow is considered complete when:

1. A buyer can open Request a Quote from any relevant website entry point.
2. The buyer can submit all required information.
3. Invalid submissions are rejected with clear validation errors.
4. A valid inquiry is sent to the backend.
5. The inquiry is stored in the database.
6. A unique inquiry reference is generated.
7. The company receives an email notification.
8. The buyer receives an email confirmation.
9. The company receives a WhatsApp notification.
10. The buyer receives a WhatsApp confirmation.
11. A failure in one notification channel does not delete the inquiry.
12. The buyer receives a clear success or failure state.
13. Notification failures are logged.
14. The workflow works correctly on mobile devices.
15. No API keys or notification credentials are exposed to the frontend.

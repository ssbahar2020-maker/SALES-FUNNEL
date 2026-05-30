# S S Accounting & Tax Services — Sales Funnel Master Deliverable
**The S-Corp Tax Savings Playbook**
*Complete digital book sales funnel — GitHub + Hostinger deployment*

---

## 1. FUNNEL STRATEGY SUMMARY

The funnel is built on an educational credibility model, not a hype model. This is intentional and compliant.

**Funnel Flow:**
Facebook Ad → Landing Page (index.html) → Pricing Section → Payment Processor (Payhip or Stripe) → Thank-You Page → Email Delivery → Optional Consultation CTA

**Why this works:**
1. **Facebook Ad** targets S-Corp owners, LLC owners, and small business owners with educational copy — no guaranteed savings claims.
2. **Landing page** builds trust via credentials (CPA Exam Qualified, FCMA, CIMA Finalist), a clear problem/solution narrative, and a transparent pricing structure.
3. **Three pricing tiers** ($27 / $47 / $97) anchor the buyer toward the middle "Most Popular" option.
4. **No fake testimonials or exaggerated guarantees** — this protects against FTC and Meta policy violations while building long-term brand credibility.
5. **Educational disclaimer** appears twice — once in the solution section and once as a full disclaimer section — ensuring compliance.
6. **Thank-you page** delivers the purchase confirmation and optional consultation CTA, converting buyers into potential professional service clients.

**Primary conversion metric:** Click-to-purchase rate on the $47 "Book + Checklists" tier (Most Popular).
**Secondary conversion metric:** Bundle upgrade rate ($97 Complete Bundle).
**Downstream revenue:** Consultation bookings from book buyers who have professional tax needs.

---

## 2. WEBSITE FILE STRUCTURE

```
sales-funnel/
├── index.html                  ← Main landing page (Facebook ad destination)
├── thank-you.html              ← Post-purchase confirmation + download instructions
├── privacy-policy.html         ← Required for Meta ad compliance and email collection
├── terms-of-use.html           ← Covers digital product license and disclaimers
├── refund-policy.html          ← Protects against chargebacks; required for Stripe/Payhip
├── contact.html                ← Support + professional services inquiry page
├── styles.css                  ← Complete responsive stylesheet (Inter font, navy/gold)
├── script.js                   ← FAQ accordion, pixel events, smooth scroll, mobile CTA
└── assets/
    ├── images/
    │   ├── book-cover.jpg      ← REPLACE with actual book cover (recommended: 600x800px)
    │   ├── author-photo.jpg    ← REPLACE with actual author photo (recommended: 400x400px)
    │   └── og-image.jpg        ← Facebook Open Graph image (required: 1200x630px)
    └── documents/              ← DO NOT store PDFs here — use Payhip or Stripe for delivery
```

**Important:** Never store your sellable PDF books in the `assets/documents` folder. Host them through your payment processor (Payhip handles file delivery automatically; Stripe requires a redirect to a hosted file URL).

---

## 3. PAYMENT INTEGRATION RECOMMENDATION

### Comparison of Options

| Platform | File Delivery | Meta Pixel | Apple/Google Pay | Monthly Fee | Transaction Fee | Beginner Rating |
|---|---|---|---|---|---|---|
| **Payhip** | Automatic | Yes (native) | Yes (Stripe-powered) | $0 | 5% (free plan) / 2% ($29/mo) / 0% ($99/mo) | ⭐⭐⭐⭐⭐ |
| **Gumroad** | Automatic | Limited | Yes | $0 | 10% flat | ⭐⭐⭐⭐ |
| **Lemon Squeezy** | Automatic | Yes (webhook) | Yes | $0 | 5%+$0.50 | ⭐⭐⭐⭐ |
| **Stripe (Payment Links)** | Manual redirect | Yes (native) | Yes | $0 | 2.9%+$0.30 | ⭐⭐⭐ |
| **PayPal Button** | Manual/redirect | Limited | No (PayPal only) | $0 | 3.49%+$0.49 | ⭐⭐ |

### RECOMMENDATION: Payhip

**Why Payhip is the best choice for this setup:**
- Upload your PDF books directly to Payhip — it handles secure delivery automatically
- Native Meta Pixel integration (add your Pixel ID in Payhip dashboard settings)
- Accept credit cards, debit cards, Apple Pay, Google Pay, and PayPal
- No monthly fee on the free plan (5% transaction fee until you scale)
- Generates unique, expiring download links for each purchase
- Built-in order management, buyer email capture, and download page
- Works with any custom domain

**Setup Steps for Payhip:**
1. Create a free account at payhip.com
2. Click "Add Product" → "Digital Download"
3. Upload your PDF book file, set the price ($27, $47, or $97), and fill in the product details
4. In Payhip Settings → Integrations → paste your Facebook Pixel ID
5. Enable your custom thank-you page redirect to `thank-you.html` on your domain
6. Copy the checkout link for each product
7. Paste each checkout link into `script.js` CONFIG object:
   ```javascript
   paymentLinks: {
     single:  'https://payhip.com/b/XXXXX',
     popular: 'https://payhip.com/b/YYYYY',
     bundle:  'https://payhip.com/b/ZZZZZ'
   }
   ```
8. Test with a real purchase to confirm delivery works end-to-end

**For the Purchase pixel event on thank-you.html:** Payhip supports a redirect URL after payment. Set the redirect to:
`https://YOURDOMAIN.COM/thank-you.html?value=47&plan=popular`
The `thank-you.html` file already reads these URL parameters to fire the correct Purchase pixel value.

---

## 4. META PIXEL TRACKING PLAN

### Where to Set Your Pixel ID
Open `script.js` and update line 5:
```javascript
pixelId: 'YOUR_FACEBOOK_PIXEL_ID',  // Replace with your 15-digit Pixel ID
```

### Event Map

| Event | File | Trigger | Code (in script.js) |
|---|---|---|---|
| **PageView** | script.js | Fires immediately on every page load (no DOM needed) | `fbq('track', 'PageView')` — line ~52 |
| **ViewContent** | script.js | Fires inside DOMContentLoaded (after page loads) | `fbq('track', 'ViewContent', {...})` — end of DOMContentLoaded |
| **Lead** | script.js | User clicks any `.hero-cta` button (Get Instant Access in hero) | `fbq('track', 'Lead', {...})` — hero CTA handler |
| **AddToCart** | script.js | User clicks any `.pricing-cta-btn` (pricing section buttons) | `fbq('track', 'AddToCart', {...})` — pricing CTA handler |
| **InitiateCheckout** | script.js | 300ms before redirect to payment link (same click as AddToCart) | `fbq('track', 'InitiateCheckout', {...})` — pricing CTA handler |
| **Purchase** | thank-you.html | On thank-you page load, reads `value` and `plan` from URL params | `fbq('track', 'Purchase', {...})` — in `<script>` in `<head>` |

### Verifying Events
1. Install the **Facebook Pixel Helper** Chrome extension
2. Visit your live page — it should show PageView and ViewContent
3. Click a pricing button — should show AddToCart and InitiateCheckout
4. Complete a test purchase — visit `thank-you.html?value=27&plan=single` to verify Purchase event

---

## 5. THANK-YOU PAGE COPY

**Page Title:** Thank You for Your Purchase | S S Accounting & Tax Services

**Headline:** Thank You for Your Purchase!

**Confirmation Message:**
Your order is confirmed. You are one step closer to a clearer understanding of how your business taxes work. We appreciate your trust in S S Accounting & Tax Services.

**Download Steps:**
1. Check your email inbox — a confirmation email with your secure download link has been sent to the address you provided at checkout.
2. Click the download link in the email — the link will take you directly to your PDF file. If you do not see the email within 5 minutes, please check your spam or junk folder.
3. Save the PDF to your device — save it to your phone, tablet, laptop, or cloud storage so you always have access.
4. Open with any PDF reader — Adobe Acrobat Reader, Apple Preview, your browser, or any PDF app.

**Support:** Call 470-455-5515 or email [your support email]. We typically respond within one business day.

**Consultation CTA:** "If the book raises questions about your specific tax situation, our team is here to help. S S Accounting & Tax Services offers professional tax preparation, bookkeeping, payroll, and tax planning for businesses in all 50 states."

---

## 6. EMAIL CONFIRMATION TEMPLATE

**Subject Line:** Your Digital Book Download — S S Accounting & Tax Services

---

Dear [First Name],

Thank you for your purchase. We are glad to have you as a customer and hope this guide helps you build a stronger understanding of how your business is taxed.

**Your Order:**
The S-Corp Tax Savings Playbook (PDF Digital Book)
Order Amount: $[AMOUNT] | Order #: [ORDER_ID]

**How to Access Your Download:**

1. Click the secure download link below
2. Save the PDF to your device or preferred cloud storage
3. Open with any PDF reader — no special software required
4. Your download link is active for [X days — set in Payhip dashboard]

---
**[ CLICK HERE TO DOWNLOAD YOUR BOOK ]**
[SECURE DOWNLOAD LINK — Generated automatically by Payhip/your payment processor]
---

**Need Help?**
If you experience any issues accessing your download, call us at **470-455-5515** or reply to this email. We are happy to help.

*Please note: This book is for general educational purposes only and does not constitute tax, legal, or financial advice. Consult a qualified professional for guidance specific to your situation.*

---
**Ready for Professional Help?**
If reading the book raises questions about your specific tax situation, business structure, or how professional services might help, we welcome the conversation. Call **470-455-5515** and mention that you purchased the book.

---
S. S. Bahar
S S Accounting & Tax Services
5725 Buford Hwy NE, Suite 206, Atlanta, GA 30340
Phone: 470-455-5515
Serving clients in all 50 U.S. states

---

## 7. HOSTING THROUGH GITHUB AND HOSTINGER

### Step 1 — Organize Your Files Locally
Create a folder on your computer (e.g., `ss-sales-funnel`). Place all these files in it:
- `index.html`, `thank-you.html`, `privacy-policy.html`, `terms-of-use.html`, `refund-policy.html`, `contact.html`
- `styles.css`, `script.js`
- `assets/images/` folder (with your book cover, author photo, og-image.jpg)

### Step 2 — Upload to GitHub
**Option A — Drag and Drop (easiest for beginners):**
1. Go to github.com and create a free account
2. Click "New Repository" → name it `ss-sales-funnel` → set to Public → click "Create"
3. On the repository page, click "uploading an existing file"
4. Drag all your project files and folders into the upload area
5. Scroll down, write a commit message ("initial upload"), click "Commit changes"

**Option B — Git Command Line:**
```bash
git init
git add .
git commit -m "initial upload"
git remote add origin https://github.com/YOURUSERNAME/ss-sales-funnel.git
git push -u origin main
```

### Step 3 — Connect GitHub to Hostinger
1. Log in to Hostinger → go to **hPanel**
2. Select your hosting plan → click **Advanced** → **Git**
3. Enter your GitHub repository URL
4. Set the branch to `main`
5. Set the deployment path to `public_html/`
6. Enable **Auto Deploy** so every GitHub push updates your live site automatically
7. Click **Deploy Now**

### Step 4 — Connect Your Custom Domain
1. In Hostinger → **Domains** → **DNS Zone Editor**
2. If your domain is registered with Hostinger: it connects automatically
3. If your domain is elsewhere (GoDaddy, Namecheap, etc.):
   - Copy Hostinger's nameservers (e.g., `ns1.dns-parking.com`, `ns2.dns-parking.com`)
   - Log in to your domain registrar → find "Nameservers" → replace with Hostinger's
   - Allow 24-48 hours for DNS propagation

### Step 5 — Enable SSL (HTTPS)
1. In Hostinger hPanel → **Security** → **SSL**
2. Select your domain → click **Install** (free Let's Encrypt certificate)
3. Enable **Auto-Renew** so SSL never expires
4. Your site will now load at `https://YOURDOMAIN.COM`

### Step 6 — Update Your Files With the Real Domain
Before going live, replace all instances of `YOURDOMAIN.COM` in your files:
- `index.html` — `og:url` and `canonical` tags
- `thank-you.html` — support email placeholder
- `privacy-policy.html` — email placeholder
- `refund-policy.html` — email placeholder
- `contact.html` — email placeholder

### Step 7 — Testing Checklist Before Going Live

| Test | How to Test | Pass Criteria |
|---|---|---|
| Mobile layout | Chrome DevTools (F12 → phone icon) | All sections stack cleanly, text readable |
| All CTA buttons | Click every "Get Instant Access" button | Redirects to correct payment link |
| FAQ accordion | Click each question | Opens/closes smoothly |
| Payment link | Complete a test purchase | Receive email, access download |
| Thank-you page | Visit `thank-you.html?value=47&plan=popular` | Pixel fires Purchase event |
| Meta Pixel | Install Pixel Helper Chrome extension, visit site | PageView and ViewContent show green |
| Page speed | Google PageSpeed Insights | Score 70+ on mobile |
| SSL | Check browser shows padlock icon | HTTPS active, no mixed-content warnings |
| Footer links | Click Privacy, Terms, Refund, Contact | All pages load correctly |

---

## 8. COMPLIANCE NOTES

### 1. Educational Disclaimer Placement
The disclaimer appears in two places on `index.html`:
- Below the "Solution" section (inline, brief)
- As a dedicated "Educational Disclaimer" section with a gold-bordered box
It is also present on `thank-you.html`, `terms-of-use.html`, and the footer of every page.

### 2. Prohibited vs. Approved Language

| Prohibited | Approved Alternative |
|---|---|
| "Save $5,000 in taxes" | "Learn how S-Corp owners can better understand tax planning" |
| "Cut your tax bill by 30%" | "Understand common deductions and how to track them" |
| "The IRS doesn't want you to know..." | "Tax concepts explained in plain language" |
| "Guaranteed tax savings" | "Educational guide to help you make more informed decisions" |
| "Stop overpaying the IRS" | "Many business owners pay more than necessary due to limited planning knowledge" |

### 3. Privacy Policy Requirements
Your Privacy Policy must disclose:
- What personal data you collect (name, email, phone)
- How it is used (order fulfillment, email delivery, support)
- That the Meta Pixel and Google Analytics are in use
- That you do not sell personal data
- How users can request data deletion

This is required to run Facebook/Meta ads that collect leads, and to comply with CAN-SPAM and CCPA (California Consumer Privacy Act).

### 4. FTC Disclosure
The FTC requires clear and conspicuous disclosure if you make any earnings or income-related claims in connection with a product. This funnel uses educational language with no earnings claims, so standard FTC disclosure language is not required. However, the educational disclaimer covers this.

### 5. No Earnings Claims Rule
Never state or imply that purchasing the book will result in a specific tax savings, refund, or income increase. This funnel complies with this rule throughout. Meta's advertising policies independently prohibit such claims — a violation can cause your ad account to be suspended.

---

## 9. FACEBOOK AD COPY

### PRIMARY TEXT OPTION 1
Running an S-Corp or LLC and not totally sure how the tax side works?

You are not alone. Thousands of small business owners file their taxes every year without fully understanding how their business structure affects what they owe — or what they could be doing differently.

The S-Corp Tax Savings Playbook is a plain-language digital guide written by S. S. Bahar, CPA Exam Qualified, FCMA, and CIMA Finalist. It is designed to help business owners like you develop a working knowledge of S-Corp taxation, salary versus distributions, reasonable compensation, common deductions, bookkeeping, and year-end planning.

This is not a magic solution. It is practical education — written for business owners, not accountants.

What you will learn:
→ How S-Corp taxation works and why it differs from an LLC
→ The salary vs. distribution structure and what the IRS expects
→ Common deductions and the documentation required to support them
→ A year-end tax planning checklist you can use before December 31

Digital PDF. Instant download. Starting at $27.

This book is for educational purposes only and is not personalized tax advice.

[Get Instant Access]

---

### PRIMARY TEXT OPTION 2
If you own an S-Corp or LLC, here is one of the most common things I hear from business owners:

"I didn't know that was a deductible expense."
"I had no idea the salary requirement worked that way."
"My accountant explained it, but I didn't fully understand it until I read more."

The problem isn't that business owners aren't smart. The problem is that S-Corp taxation has layers that don't get explained clearly anywhere outside of a professional's office — and by the time you're in that office, the tax year is already over.

The S-Corp Tax Savings Playbook is here to change that. Written by a CPA Exam Qualified accounting professional with years of experience working with small business owners, this digital guide walks you through the fundamentals of S-Corp taxation in language that actually makes sense.

Understand before the year ends. Download today. Starting at $27.

For educational purposes only. Not a substitute for professional tax advice.

[Download the Guide]

---

### PRIMARY TEXT OPTION 3
Thinking about making the S-Corp election for your LLC?

Before you do — or even if you already have — it is worth taking the time to understand exactly how S-Corp taxation works and what obligations come with it.

The S-Corp Tax Savings Playbook breaks down the key concepts every business owner should understand: the difference between salary and distributions, what "reasonable compensation" means and why the IRS cares about it, how to track the right expenses, and when to bring in a tax professional.

This is educational content — not personalized advice. But it is designed to make you a more informed, more prepared business owner every time you sit down with your accountant.

Digital PDF. Nine chapters. Five bonus checklists available with the $47 package.

Instant download. Available now.

[Get the Guide — Starting at $27]

---

### PRIMARY TEXT OPTION 4
The biggest mistake S-Corp owners make is not about the tax return itself.

It is everything that happens — or doesn't happen — during the year.

Missing deductible expenses. Inconsistent bookkeeping. Unclear salary and distribution strategy. Waiting until April to think about the tax year that ended in December.

The S-Corp Tax Savings Playbook was written to help you understand the planning concepts that matter before year-end, not after. Written by S. S. Bahar — CPA Exam Qualified, FCMA (ICMAB), CIMA Finalist (UK) — this guide gives you the educational foundation to make better-informed decisions and have more productive conversations with your tax professional.

Nine chapters. Practical. Plain language. Starting at $27 for the digital PDF.

Educational purposes only. Individual results vary.

[Start Learning Today]

---

### PRIMARY TEXT OPTION 5
Running a small business is one thing. Understanding how it's taxed is another.

Most business owners know they should pay quarterly estimated taxes, maintain records, and file on time. But fewer understand the finer points — like why S-Corp owners are required to pay themselves a reasonable salary, how that salary affects their overall tax picture, or which expenses are actually deductible and which ones aren't.

The S-Corp Tax Savings Playbook is a digital educational guide covering everything from S-Corp structure and deductions to bookkeeping, payroll compliance, and year-end planning.

The Complete Bundle ($97) includes four additional books on small business tax, AI skills for business, and communication skills for professionals — a full educational library for business owners who take their growth seriously.

Not tax advice. Pure business education. Download today.

[Get Instant Access]

---

### 5 HEADLINE OPTIONS

| # | Headline | Characters |
|---|---|---|
| 1 | Understand Your S-Corp Taxes | 30 |
| 2 | S-Corp Owner? Read This First | 30 |
| 3 | Plain-Language S-Corp Tax Guide | 32 |
| 4 | Learn How S-Corps Are Taxed | 28 |
| 5 | Tax Knowledge for Business Owners | 34 |

### 5 DESCRIPTION OPTIONS

| # | Description | Characters |
|---|---|---|
| 1 | A practical digital guide for S-Corp and LLC owners. Starting at $27. | 67 |
| 2 | Nine chapters of plain-language S-Corp tax education. Instant download. | 71 |
| 3 | By S. S. Bahar, CPA Exam Qualified. Educational guide for business owners. | 74 |
| 4 | Understand salary, distributions, deductions & year-end planning. From $27. | 75 |
| 5 | Educational PDF for S-Corp owners. Bundle of 5 books available at $97. | 72 |

---

## 10. A/B TESTING PLAN

### Test 1: Headline
**What to test:** Educational tone vs. benefit-focused vs. question format
- Variation A: "Understand Your S-Corp Taxes" (educational)
- Variation B: "S-Corp Owner? Read This First" (curiosity/question)
- Variation C: "Plain-Language S-Corp Tax Guide" (descriptive)
**Measure:** Click-through rate on the Facebook ad; time on page after click

### Test 2: CTA Button Text
**What to test:** 4 button label variations on the primary pricing card
- Variation A: "Get Instant Access"
- Variation B: "Download the Guide"
- Variation C: "Get the Book — $47"
- Variation D: "Start Reading Today"
**Measure:** Click rate on the $47 "Most Popular" pricing card

### Test 3: Price Display in Ad
**What to test:** Show starting price vs. hide price until landing page
- Variation A: Ad mentions "Starting at $27"
- Variation B: Ad mentions nothing about price — curiosity click
**Measure:** Click-through rate vs. bounce rate — does knowing the price attract more serious buyers or fewer clickers?

### Test 4: Visual Creative
**What to test:** What image drives more link clicks from the target audience
- Variation A: Book cover image (product-focused)
- Variation B: Business owner at a desk (lifestyle/relatable)
- Variation C: Checklist or infographic-style visual (educational/utility)
**Measure:** Facebook ad click-through rate and cost per link click

### Test 5: Bonus Prominence
**What to test:** Does mentioning the bonus checklists in the ad increase conversions?
- Variation A: Ad mentions only the book
- Variation B: Ad mentions "Book + 5 free bonus checklists"
**Measure:** Conversion rate to the $47 tier specifically

### Test 6: Single Book vs. Bundle Focus
**What to test:** Lead with the $27 book or lead with the $97 bundle as the primary offer
- Variation A: Feature the single book as the entry offer, mention bundle as upsell
- Variation B: Feature the bundle prominently, position single book as the starter option
**Measure:** Average order value, conversion rate

### Test 7: Page Length
**What to test:** Short-form page (hero, pricing, FAQ, CTA) vs. full long-form page
- Variation A: Full long-form page (current) — builds trust, addresses objections
- Variation B: Short page — hero, 3 pricing cards, FAQ (5 questions), CTA
**Measure:** Conversion rate, scroll depth, time on page. Hypothesis: long-form wins for cold traffic from Facebook ads because it needs to build trust; short-form may perform better for retargeting warm audiences.

---

*Document generated: May 30, 2025*
*For S S Accounting & Tax Services | 470-455-5515 | Atlanta, GA 30340*

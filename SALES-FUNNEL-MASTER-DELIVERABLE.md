# S-Corp Tax Savings Playbook — Sales Funnel Master Deliverable
**S S Accounting & Tax Services | S. S. Bahar, CPA Exam Qualified, FCMA, CIMA Finalist**
**Document Version: Final | Date: May 30, 2026**

---

# 1. FUNNEL STRATEGY SUMMARY

This funnel is designed to convert cold and warm Facebook audiences into digital product buyers with minimal friction and maximum educational credibility. The flow moves through six stages: Facebook Ad, Landing Page, Pricing Section, Payment Processor, Thank-You Page, and Email Delivery. Each stage is purpose-built to reduce resistance and build trust with small business owners who are motivated by clarity, not hype.

The target audience spans three overlapping segments: LLC owners considering an S-Corp election, existing S-Corp owners who feel uncertain about payroll or distributions, and self-employed professionals approaching tax season without a clear framework. These are informed, skeptical buyers who respond to authority and specificity — not vague promises.

The Facebook ad leads with a pain point (confusion about S-Corp rules, fear of tax season, reasonable compensation uncertainty) and immediately connects that pain point to an affordable, low-risk solution. The $27 entry price is intentionally accessible, removing the financial objection before it forms. The three-tier pricing structure ($27 / $47 / $97) allows buyers to self-select based on how much value they are ready to invest in, and the $47 bundle is positioned as the obvious middle-ground choice for most buyers.

On the landing page, conversion is driven by four key elements: educational credibility (credentials listed accurately), plain-language copy (no jargon, no hype), trust signals (professional author credentials, physical business address, phone number visible), and clear pricing with no hidden complexity.

The compliance-first approach — educational framing, no earnings claims, visible disclaimers — is not a limitation. It is a differentiator. It positions the product as professionally authored and legally sound, which builds the trust necessary to sell at any price point in the financial education category. Buyers who purchase a $27 guide from an author who has been transparently credentialed are far more likely to become consulting clients or repeat customers than buyers who were oversold and under-delivered.

---

# 2. WEBSITE FILE STRUCTURE

```
sales-funnel/
├── index.html
├── thank-you.html
├── download.html
├── privacy-policy.html
├── terms-of-use.html
├── refund-policy.html
├── contact.html
├── styles.css
├── script.js
├── assets/
│   ├── images/
│   │   ├── book-cover.jpg          ← replace with real cover
│   │   ├── author-photo.jpg        ← replace with real photo
│   │   └── og-image.jpg            ← 1200x630 for Facebook sharing
│   └── documents/                  ← DO NOT store PDFs here; use Payhip/Stripe
└── README.md
```

| File | Purpose |
|---|---|
| `index.html` | Main sales page with hero, pricing tiers, trust signals, and CTAs |
| `thank-you.html` | Post-purchase confirmation page; fires Purchase pixel event; shows download instructions |
| `download.html` | Protected delivery page linked from Payhip/email; NOT directly linked from sales page |
| `privacy-policy.html` | Required for Facebook Ads, Google, CCPA, and CAN-SPAM compliance |
| `terms-of-use.html` | Governs use of digital products; limits liability; covers no-refund window |
| `refund-policy.html` | States 30-day satisfaction guarantee terms for digital products |
| `contact.html` | Contact form pointing to 470-455-5515 and suite 206 address; trust builder |
| `styles.css` | All visual styles; uses CSS variables for navy `#0a2342`, gold `#c9a84c`, gray `#f5f5f5` |
| `script.js` | All interactivity: pixel events, smooth scroll, sticky nav, CTA click handlers |
| `assets/images/` | Static images only; keep under 200 KB each; use WebP when possible |
| `assets/documents/` | Placeholder folder only — actual PDFs must live on Payhip or Stripe, never here |
| `README.md` | Developer notes: how to update prices, swap Payhip links, and re-deploy |

---

# 3. PAYMENT INTEGRATION RECOMMENDATION

## Platform Comparison

### Stripe

| | |
|---|---|
| **Pros** | Industry-leading security and fraud protection trusted by millions of businesses worldwide. Full Meta Pixel and Google Analytics integration via Stripe Payment Links or embedded checkout. Highly customizable checkout experience with your brand colors and logo. Detailed analytics dashboard and real-time sales reporting. |
| **Cons** | Requires more technical setup than all-in-one platforms; PDF delivery needs a third-party tool or custom redirect. No built-in digital file delivery — you must use Zapier, SendOwl, or a custom thank-you page to send the PDF. |
| **File Delivery** | Not automatic. Must connect a tool such as SendOwl, Payhip, or a Zapier automation that triggers on successful payment and emails the download link to the customer. |
| **Pixel Integration** | Yes — add your Meta Pixel ID directly in Stripe Dashboard under Settings > Payment Links, or fire pixel events via custom webhook on your thank-you page. |
| **Cost** | 2.9% + $0.30 per transaction (no monthly fee) |
| **Beginner Rating** | 3 / 5 |

---

### Payhip

| | |
|---|---|
| **Pros** | Built-in automatic PDF delivery immediately after purchase — zero extra tools needed. Free plan available with no monthly cost. Simple storefront and product pages included, no website required. Supports discount codes, affiliate program, and EU VAT handling out of the box. |
| **Cons** | Free plan charges 5% transaction fee on top of payment processor fees, which reduces margin at lower price points. Storefront design customization is limited compared to a fully custom website. |
| **File Delivery** | Upload your PDF directly to Payhip; it is automatically emailed to the customer with a secure download link immediately after purchase — no additional setup required. |
| **Pixel Integration** | Yes — Payhip supports Meta Pixel via a simple pixel ID entry field in store settings. No coding required. |
| **Cost** | Free plan: 5% per transaction + Stripe/PayPal fees (approx. 2.9% + $0.30). Plus plan ($29/month): 2% fee. Pro plan ($99/month): 0% fee. |
| **Beginner Rating** | 5 / 5 |

---

### Gumroad

| | |
|---|---|
| **Pros** | Extremely simple setup — create an account, upload a file, and start selling within minutes. Built-in audience discovery through Gumroad Discover marketplace. Handles sales tax and VAT automatically in applicable regions. |
| **Cons** | Higher flat fee structure (10% per sale) makes it less cost-efficient at scale. Limited branding control and checkout customization; your page looks like Gumroad, not your business. |
| **File Delivery** | Automatic. The PDF is delivered instantly to the buyer via email download link after purchase. |
| **Pixel Integration** | Limited — Gumroad does not have a native Meta Pixel integration. Workarounds exist using a custom domain storefront, but not straightforward for beginners. |
| **Cost** | 10% flat fee per transaction (includes payment processing); no monthly fee |
| **Beginner Rating** | 4 / 5 |

---

### Lemon Squeezy

| | |
|---|---|
| **Pros** | Acts as Merchant of Record — handles all sales tax, VAT, and compliance automatically worldwide. Clean, modern checkout with built-in upsells and order bumps ideal for tiered pricing ($27/$47/$97). Native webhook support for Meta Pixel and third-party integrations. |
| **Cons** | Transaction fees are higher than Stripe for low-volume sellers. Platform is newer and has fewer community tutorials than Gumroad or Payhip. |
| **File Delivery** | Automatic. Upload your PDF and it is delivered instantly via secure link after payment confirmation. |
| **Pixel Integration** | Yes — supports Meta Pixel via webhook or by embedding pixel code in the checkout confirmation settings. Moderate technical setup required. |
| **Cost** | 5% + $0.50 per transaction on the base plan (Lemon Squeezy fees; payment processing included) |
| **Beginner Rating** | 3 / 5 |

---

### PayPal

| | |
|---|---|
| **Pros** | Universally recognized brand that many customers already trust and have accounts with. Quick setup with PayPal.me links or PayPal buttons for simple one-time sales. No monthly fees on the standard account. |
| **Cons** | No built-in digital file delivery; you must manually send the PDF or set up a redirect — not scalable. PayPal accounts are subject to holds and disputes that can freeze funds, especially for new sellers. Very limited Meta Pixel integration without significant custom development. |
| **File Delivery** | Manual or redirect only. Redirect buyers to a download page after payment, but this requires custom web development and is not secure by default. Not recommended for unattended digital delivery. |
| **Pixel Integration** | Limited — PayPal does not natively support Meta Pixel. Workarounds exist using payment confirmation redirects, but setup is complex for beginners. |
| **Cost** | 3.49% + $0.49 per transaction for standard digital goods checkout; rates vary by method |
| **Beginner Rating** | 2 / 5 |

---

## Final Recommendation

**Top Choice: Payhip**

For a beginner operating on a GitHub-hosted or Hostinger website with Meta Pixel already in place, Payhip is the clear top recommendation.

Payhip wins because it handles everything in one place — PDF delivery, Meta Pixel integration, checkout, and basic storefront — with zero monthly cost to start and no technical skills required beyond uploading your file and entering your pixel ID. It is the only platform that eliminates the file-delivery problem entirely while also supporting pixel tracking out of the box.

**Second Choice: Stripe Payment Links**

Stripe Payment Links is the best second option if you anticipate higher sales volume and want more professional branding control, but you will need to solve PDF delivery separately using a Zapier automation or a custom thank-you page redirect that fires your pixel and emails the download link.

---

## Recommended Payhip Setup Steps

1. Create a free account at payhip.com using your business email address.
2. Navigate to Products > Add New Product, select "Digital Download," and upload your PDF file (The S-Corp Tax Savings Playbook).
3. Set your product name, description, and price. Create three separate products for $27, $47, and $97 tiers, or use Payhip's pricing options to reflect each bundle.
4. Copy the unique checkout link Payhip generates for each product.
5. Paste each checkout link into the corresponding Buy Now button on your HTML sales page (replace the `href="#"` placeholder with the Payhip link).
6. Go to Payhip Store Settings > Tracking and enter your Meta Pixel ID in the Facebook Pixel field. Payhip will automatically fire the Purchase event on every successful transaction.
7. Complete a test purchase using a real card (then refund yourself) to confirm the full flow works: payment processes, download email arrives, and the Meta Pixel Purchase event appears in Facebook Events Manager.

---

# 4. META PIXEL TRACKING PLAN

## Event 1 — PageView

| Field | Detail |
|---|---|
| **Location** | Inside `<head>` on every HTML page, immediately after the base pixel code |
| **Trigger** | Every page load, automatically |

```javascript
fbq('track', 'PageView');
```

---

## Event 2 — ViewContent

| Field | Detail |
|---|---|
| **Location** | `script.js`, inside a `DOMContentLoaded` event listener |
| **Trigger** | Page fully loaded and DOM is ready |

```javascript
document.addEventListener('DOMContentLoaded', function() {
  fbq('track', 'ViewContent', {
    content_name: 'The S-Corp Tax Savings Playbook',
    content_type: 'product',
    currency: 'USD',
    value: 27.00
  });
});
```

---

## Event 3 — Lead

| Field | Detail |
|---|---|
| **Location** | `script.js`, click event listener on the hero section CTA button |
| **Trigger** | User clicks the "Get Instant Access" button in the hero section |

```javascript
document.getElementById('hero-cta').addEventListener('click', function() {
  fbq('track', 'Lead', {
    content_name: 'The S-Corp Tax Savings Playbook'
  });
});
```

---

## Event 4 — AddToCart

| Field | Detail |
|---|---|
| **Location** | `script.js`, click event listener on each pricing card Buy Now button |
| **Trigger** | User clicks any Buy Now or Get Instant Access button on a pricing card |
| **Note** | Add `data-price="27.00"` and `data-product="The S-Corp Tax Savings Playbook"` as HTML attributes on each pricing button so the correct value is passed dynamically per tier. |

```javascript
document.querySelectorAll('.pricing-cta').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var price = parseFloat(this.getAttribute('data-price'));
    var productName = this.getAttribute('data-product');
    fbq('track', 'AddToCart', {
      content_name: productName,
      value: price,
      currency: 'USD'
    });
  });
});
```

---

## Event 5 — InitiateCheckout

| Field | Detail |
|---|---|
| **Location** | `script.js`, inside each pricing CTA click handler, immediately before the `window.location` redirect to Payhip |
| **Trigger** | Milliseconds before user is sent to the payment processor |
| **Note** | The 300ms `setTimeout` gives the pixel network request time to fire before the browser navigates away. Without it, the browser redirect may cancel the pixel call before it reaches Facebook servers. |

```javascript
fbq('track', 'InitiateCheckout', {
  value: price,
  currency: 'USD',
  num_items: 1
});
setTimeout(function() {
  window.location.href = payhipCheckoutURL;
}, 300);
```

---

## Event 6 — Purchase

| Field | Detail |
|---|---|
| **Location** | `thank-you.html`, inside a `<script>` block in `<head>`, below the base pixel code |
| **Trigger** | After confirmed payment; fires on thank-you page load |
| **Note** | To pass dynamic values, append URL parameters when redirecting to thank-you.html. Example: `https://yourdomain.com/thank-you.html?value=47.00&product=S-Corp+Bundle`. Payhip also has a built-in Facebook Pixel integration under Settings > Integrations > Facebook Pixel. Use BOTH methods as a fallback: Payhip native for accuracy, your thank-you page for remarketing audiences. |

```html
<script>
  var urlParams = new URLSearchParams(window.location.search);
  var purchaseValue = parseFloat(urlParams.get('value')) || 27.00;
  var productName = urlParams.get('product') || 'The S-Corp Tax Savings Playbook';
  fbq('track', 'Purchase', {
    value: purchaseValue,
    currency: 'USD',
    content_name: productName
  });
</script>
```

---

# 5. THANK-YOU PAGE COPY

**Page Title:** Thank You for Your Purchase | S S Accounting & Tax Services

---

**Headline:**
Your Purchase Is Confirmed — Let's Start Saving You Money

---

**Confirmation Message:**
Thank you for purchasing The S-Corp Tax Savings Playbook from S S Accounting & Tax Services. Your order has been successfully processed, and your download is ready. You are one step closer to understanding the S-Corp tax strategies that could save your business thousands of dollars each year.

---

**Download Steps:**

**Step 1:** Check your email inbox for a confirmation email from S S Accounting & Tax Services — if you do not see it within a few minutes, please check your spam or promotions folder.

**Step 2:** Click the secure download link included in that email to access your digital book immediately.

**Step 3:** Save the PDF to your device, Google Drive, Dropbox, or any preferred cloud storage so you always have access to it.

**Step 4:** Open the file with any PDF reader — Adobe Acrobat, Apple Preview, or directly in your browser all work perfectly.

---

**Support Information:**
Questions? Call 470-455-5515 or email [PLACEHOLDER_EMAIL]. We typically respond within one business day.

---

**Consultation CTA:**
If you would like personalized guidance on implementing S-Corp tax strategies for your specific business, S. S. Bahar is available for professional consultations — reach out at 470-455-5515 and we would be happy to help.

---

**Disclaimer:**
This book is intended for general educational purposes only and does not constitute personalized tax, legal, or financial advice. Please consult a qualified tax professional regarding your individual circumstances.

---

# 6. EMAIL CONFIRMATION TEMPLATE

**Subject Line:** Your Digital Book Download — S S Accounting & Tax Services

---

Dear [First Name],

Thank you for your purchase — we are truly glad you chose S S Accounting & Tax Services as your resource for tax savings strategies. The S-Corp Tax Savings Playbook has been carefully prepared to give small business owners and self-employed professionals clear, actionable guidance they can actually use. We hope it brings real value to your business finances for years to come.

---

**Your Purchase Summary:**

You have purchased: The S-Corp Tax Savings Playbook — [AMOUNT]
Order number: [ORDER_ID]

---

**How to Access Your Download:**

1. Click the secure download link below to access your PDF immediately.
2. Save the PDF to your device or preferred cloud storage (Google Drive, Dropbox, iCloud) for easy access anytime.
3. Open with any PDF reader — Adobe Acrobat, Apple Preview, or your web browser.
4. The link remains active for [X] days — please download and save your copy promptly.

---

**[ [ SECURE DOWNLOAD LINK ] ]** ← Insert your delivery link here

---

Need help? Call **470-455-5515** or reply to this email.

---

If you have questions about how these strategies apply to your specific business situation, our team is here to help. Contact us at 470-455-5515 to schedule a professional consultation with S. S. Bahar, CPA Exam Qualified and FCMA.

---

*This book is for general educational purposes only and does not constitute tax, legal, or financial advice.*

---

**S. S. Bahar**
S S Accounting & Tax Services
5725 Buford Hwy NE, Suite 206, Atlanta, GA 30340
470-455-5515

---

# 7. HOSTING THROUGH GITHUB AND HOSTINGER

## Step 1 — Create and Organize Files Locally on Windows

1. Open File Explorer and navigate to your Documents folder (or Desktop).
2. Create a new folder named: `sales-funnel`
3. Inside `sales-funnel`, create subfolders: `assets`, then inside `assets` create `images` and `documents`.
4. Open Notepad++ (free download) or VS Code (recommended, free at code.visualstudio.com).
5. Create each file listed in the file structure above. Save each with the exact filename shown, including the `.html`, `.css`, and `.js` extensions.
6. In VS Code, go to File > Open Folder and select your `sales-funnel` folder to see all files in the sidebar.
7. Place your `book-cover.jpg`, `author-photo.jpg`, and `og-image.jpg` inside `assets/images/`. Resize all images to under 200 KB using squoosh.app (free, browser-based).
8. Do not place any PDF files in the `assets/documents/` folder. All PDFs must be hosted on Payhip or delivered via Stripe.
9. Before uploading, open `index.html` in Chrome locally (double-click the file) and verify layout, links, and that no images are broken.

---

## Step 2 — Create GitHub Repository and Upload Files

**Option A — Drag and Drop (no technical knowledge required):**

1. Go to github.com and click Sign Up. Create a free account using your business email.
2. After logging in, click the green New button on the left dashboard.
3. Repository name: `sales-funnel` (lowercase, no spaces).
4. Set visibility to Public (required for free Hostinger Git deployment) or Private if you have GitHub Pro.
5. Check the box Add a README file. Click Create repository.
6. On your new repository page, click Add file > Upload files.
7. Open your local `sales-funnel` folder in File Explorer. Select ALL files and folders (Ctrl+A). Drag them into the GitHub upload area in your browser.
8. Scroll down, write a commit message: `"Initial upload of sales funnel files"`. Click Commit changes.
9. Verify all files appear in the repository including the `assets/images` subfolder.

**Option B — Git Command Line (faster for future updates):**

1. Download and install Git for Windows at git-scm.com.
2. Open VS Code terminal (Ctrl + backtick) or open Git Bash.
3. Run these commands one at a time:

```bash
cd "C:\Users\YourName\Documents\sales-funnel"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YourGitHubUsername/sales-funnel.git
git push -u origin main
```

4. Enter your GitHub username and password (or personal access token if prompted).
5. Refresh your GitHub repository page to confirm all files are uploaded.

**For future updates:** edit files locally, then run:
```bash
git add .
git commit -m "Describe your change here"
git push
```

---

## Step 3 — Connect GitHub to Hostinger for Auto-Deployment

1. Log in to hPanel at hpanel.hostinger.com.
2. Click on your hosting plan to open the control panel.
3. In the left sidebar, scroll to the Advanced section and click Git.
4. Click Create (or Manage) under the Git section.
5. In the Repository URL field, paste your GitHub repository URL (e.g., `https://github.com/YourUsername/sales-funnel.git`).
6. Branch: type `main`.
7. In the Directory field, type `public_html` (this is your web root; all files will be served from here).
8. Click Save or Create.
9. Hostinger will clone your repository into `public_html` automatically.
10. To enable auto-deploy on every push: look for the Auto-deploy or Webhook section in the Git panel. Copy the webhook URL provided by Hostinger.
11. Go back to your GitHub repository > Settings > Webhooks > Add webhook.
12. Paste the Hostinger webhook URL into Payload URL. Set Content type to `application/json`. Click Add webhook.
13. Now every time you push a change to GitHub, Hostinger will automatically pull the latest version within seconds.
14. To deploy manually at any time: return to hPanel > Git > click Deploy Now (or Pull).

---

## Step 4 — Connect Your Custom Domain to Hostinger

**If domain is registered through Hostinger:**
1. In hPanel, go to Domains > your domain > Manage.
2. Under DNS Zone, verify the A record points to your Hostinger server IP (visible in hPanel > Hosting > your plan > IP Address).
3. No further action needed; propagation is automatic within minutes.

**If domain is registered elsewhere (GoDaddy, Namecheap, Google Domains, etc.):**
1. In hPanel, go to Hosting > your plan > Overview. Find your Hostinger nameservers (e.g., `ns1.dns-parking.com` and `ns2.dns-parking.com` — your actual nameservers appear in hPanel; copy exactly).
2. Log in to your domain registrar (e.g., GoDaddy or Namecheap).
3. Find DNS Settings or Nameservers for your domain.
4. Select Custom Nameservers and replace the existing ones with the two Hostinger nameservers.
5. Save the changes.
6. DNS propagation takes 1 to 48 hours globally. Use dnschecker.org to monitor propagation status by entering your domain and checking the A record.
7. Once propagated, your domain will serve your Hostinger-hosted site.

**Adding domain to Hostinger hosting:**
1. In hPanel > Hosting > Domains tab, click Add Domain or Assign Domain.
2. Enter your custom domain name and click Add.

---

## Step 5 — Enable Free SSL Certificate

1. In hPanel, go to Security > SSL/TLS (or search SSL in the hPanel search bar).
2. Your domain should appear in the list. Click Set Up next to it.
3. Select Hostinger Free SSL (Let's Encrypt). Click Install.
4. Wait 10 to 15 minutes for the certificate to issue and install.
5. Check Auto-renew so the certificate renews automatically every 90 days without manual action.
6. After installation, go to hPanel > Hosting > `.htaccess` or use the Redirects tool to force HTTPS.
7. Add this redirect rule if using `.htaccess`:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

8. Test by visiting `http://yourdomain.com` — it should automatically redirect to `https://yourdomain.com`.
9. Verify the padlock icon appears in the browser address bar.

---

## Step 6 — Testing

| Test | How to Test |
|---|---|
| **Mobile** | Open Chrome on desktop. Press F12 > click the phone/tablet icon (Toggle device toolbar). Select iPhone 14 or Samsung Galaxy S20. Scroll through the full page and verify text is readable, buttons are tappable, and nothing overflows the screen. |
| **Payment** | In Payhip, use the test purchase option, or use Stripe test mode with card `4242 4242 4242 4242`, any future expiry, any CVC. Complete a full purchase and confirm redirect to `thank-you.html`. |
| **Pixel** | Install the Facebook Pixel Helper extension from the Chrome Web Store. Visit your live site. Verify PageView fires on load and AddToCart fires when you click a Buy Now button. |
| **Speed** | Go to pagespeed.web.dev. Enter your full domain URL. Target a score above 80 on mobile. Common fixes: compress images at squoosh.app, add `loading="lazy"` to below-fold images, minify CSS/JS. |
| **Links** | Manually click every CTA button (hero, all three pricing cards, all footer links). Confirm each goes to the correct destination. Verify no 404 errors. |

---

## Step 7 — Final Checklist Before Going Live

| # | Item | Status |
|---|---|---|
| 1 | **PIXEL VERIFIED** | Facebook Pixel Helper shows PageView, ViewContent, AddToCart, and InitiateCheckout all firing correctly with no errors. |
| 2 | **PAYMENT TESTED** | At least one complete test purchase made; buyer received the product and was redirected to `thank-you.html` with correct Purchase event firing. |
| 3 | **SSL ACTIVE** | `https://` padlock is visible; all `http://` URLs redirect to `https://` automatically. |
| 4 | **MOBILE RESPONSIVE** | Full page tested on iPhone and Android viewport sizes; no layout breaks, no text overflow, all buttons are finger-tappable. |
| 5 | **LEGAL PAGES LIVE** | Privacy Policy, Terms of Use, and Refund Policy pages are accessible from the footer on every page. |
| 6 | **DISCLAIMER VISIBLE** | Educational disclaimer appears in the footer of every page and is readable on mobile. |
| 7 | **CONTACT INFO CORRECT** | Phone 470-455-5515 and address 5725 Buford Hwy NE, Suite 206, Atlanta, GA 30340 are accurate on the contact page and footer. |
| 8 | **PAGE SPEED PASS** | Google PageSpeed score is 80 or above on mobile; all images are compressed and served in modern format. |

---

# 8. COMPLIANCE NOTES

## Note 1 — Educational Disclaimer Placement

Place the educational disclaimer in the footer of every single HTML page (`index.html`, `thank-you.html`, `download.html`, and all policy pages). It must be visible without scrolling on desktop, or within one short scroll on mobile. Place it directly above the copyright line in the footer.

**Recommended footer disclaimer text:**
> "The information in this publication is for general educational purposes only. It does not constitute legal, tax, or accounting advice and does not create a client-accountant relationship. Tax laws change frequently. Consult a qualified CPA or tax professional regarding your specific situation before making any financial or tax decisions."

Also add a shorter inline notice near each pricing section:
> "This is an educational digital product, not personalized tax advice."

This two-layer approach (footer + near purchase CTA) provides stronger protection.

---

## Note 2 — Approved and Prohibited Language

**Phrases to AVOID on the sales page and in all marketing materials:**

| Prohibited Phrase | Approved Replacement |
|---|---|
| "Save thousands in taxes" | "Learn strategies that many S-Corp owners use to legally reduce their tax burden" |
| "Guaranteed tax savings" | "Step-by-step guidance based on current IRS rules" |
| "My clients save X dollars" | "Covers the same strategies used in professional tax planning" |
| "You will pay less in taxes" | "Understand how to identify potential deductions and elections available to S-Corp owners" |
| "Get your money back from the IRS" | "Learn how S-Corp election may affect your self-employment tax calculation" |
| "Secret tax strategies" | "Underutilized but fully legal tax planning elections" |

**Approved tone:** Educational, informational, empowering. Always frame claims as "learn," "understand," "discover," or "explore" — never as guaranteed financial outcomes.

---

## Note 3 — Privacy Policy Requirements

Your `privacy-policy.html` must disclose all data collection. Required elements:

- **Data collected:** name, email address, phone number (if collected via contact form), IP address, browser cookies, Facebook Pixel data.
- **Why it is collected:** order fulfillment, email communications, customer support, advertising optimization.
- **CCPA compliance:** Include a "Do Not Sell My Personal Information" section. State that you do not sell personal data but that you share data with Facebook via Pixel for advertising purposes. California residents have the right to request data deletion.
- **CAN-SPAM compliance:** Every marketing email must include your physical business address (5725 Buford Hwy NE, Suite 206, Atlanta, GA 30340), an unsubscribe mechanism, and honest subject lines. Your Privacy Policy must state how users can opt out of email communications.
- **Cookie notice:** Add a simple cookie consent banner to `index.html` that appears on first visit. A lightweight JS cookie banner is sufficient; a full GDPR consent management platform is optional unless you market to EU residents.
- **Data retention:** State how long you retain customer data (recommended: 3 years for tax and business records).
- **Contact for privacy requests:** Provide the phone number 470-455-5515 or a dedicated email address for privacy inquiries.

---

## Note 4 — FTC Disclosure Requirements

- **Testimonials:** If you use testimonials anywhere on the sales page, each must include: *"Individual results vary. This testimonial does not represent typical results."* immediately below it.
- **Complimentary copies:** If any reviewer received a free or discounted copy in exchange for a review or endorsement, disclose clearly near that review: *"Received complimentary copy for review purposes."*
- **Paid advertising:** The FTC's .com Disclosures guidelines apply to the full consumer journey from ad to checkout. Ads must not contain misleading claims.
- **Product vs. service distinction:** The book is a digital educational product, not a professional service engagement. This distinction must be clear at the point of purchase. Do not use language that implies the buyer is entering into a professional services agreement with S. S. Bahar, CPA.
- **Credentials:** S. S. Bahar's credentials (CPA Exam Qualified, M.Com, FCMA, CIMA Finalist) may be listed accurately. Do not use "CPA" as a standalone professional title in a way that implies active licensed CPA status if the license is not yet active in Georgia. Use the full accurate phrasing "CPA Exam Qualified" as provided.

---

## Note 5 — No Earnings Claims Policy

No earnings claims or income projections of any kind are permitted on this sales page, in ads, in email marketing, or in the books themselves.

**Prohibited examples:**
- "Save $10,000 in taxes this year"
- "Clients who read this book saved an average of $8,400"
- "Pay zero in self-employment tax"
- "Double your take-home pay"

**Compliant framing:**
- "This guide covers the mechanics of S-Corp reasonable compensation and tax elections as defined by the IRS."
- "Learn which IRS elections are available to S-Corp owners and how to evaluate them with your tax professional."
- "Understand the difference between W-2 salary and distributions in an S-Corp structure."

**Required Results Disclaimer** — add to the footer of every page and to the bottom of your sales page pricing section, minimum 12px font, not hidden behind a link, readable on mobile without any user action required:

> "Results Disclaimer: This publication is for educational purposes only. No specific financial outcome, tax savings amount, or business result is promised or implied. Individual tax situations vary. Always work with a licensed tax professional for advice specific to your circumstances."

---

# 9. FACEBOOK AD COPY

## Primary Text Options

---

### PRIMARY 1

Still guessing how S-Corp taxes actually work?

If you formed an S-Corp — or are thinking about it — but nobody ever sat down and explained payroll requirements, distributions, or how to pay yourself correctly, you are not alone. Most small business owners piece together information from Google searches and hope for the best.

The S-Corp Tax Savings Playbook by S. S. Bahar, CPA Exam Qualified, FCMA, CIMA Finalist, is a practical digital guide written for real business owners — not accountants.

Inside, you will learn:
- How S-Corp taxation is structured and what that means for your business
- How to understand reasonable compensation requirements
- How distributions differ from salary
- What deductions are commonly available to S-Corp owners
- How to have smarter conversations with your CPA

This is education, not a substitute for professional advice — and that is exactly what makes it valuable.

Get instant PDF access starting at just $27.
Tap "Learn More" to choose your package.

---

### PRIMARY 2

Every January, the same panic hits small business owners.

"What did I miss this year?" "Did I set aside enough?" "Why does my accountant keep mentioning things I do not understand?"

Tax season does not have to feel like a mystery. The problem is not that taxes are impossible — it is that no one ever taught you the fundamentals of how your business structure affects what you owe and when.

The S-Corp Tax Savings Playbook by S. S. Bahar is a clear, straightforward digital guide designed to help small business owners understand how S-Corp taxation works from the ground up.

Learn how S-Corps are taxed, how to think about salary versus distributions, what bookkeeping habits support better tax outcomes, and how to walk into every CPA meeting fully prepared.

Available as a single guide or as part of a complete bundle with four additional business education books.

Starting at $27. Instant PDF download.
Tap "Learn More" to explore all pricing options.

---

### PRIMARY 3

Your LLC is running. Now everyone is telling you to "elect S-Corp status" — but what does that actually mean?

For many LLC owners, the S-Corp election conversation comes up when revenue grows, but the explanation never quite follows. You hear terms like self-employment tax, payroll, and distributions — but no one walks you through how it all connects.

The S-Corp Tax Savings Playbook by S. S. Bahar, CPA Exam Qualified, M.Com (Accounting), FCMA (ICMAB), gives you that walkthrough.

This practical digital guide helps LLC owners understand:
- What the S-Corp election involves and how it changes your tax structure
- How business owners are required to pay themselves under S-Corp rules
- How to evaluate whether an S-Corp election may or may not make sense for your situation
- What questions to bring to your tax professional

Knowledge leads to better decisions. This guide gives you that knowledge.

PDF download, instant access. Starting at $27.
Tap "Learn More" to see all available packages.

---

### PRIMARY 4

"Reasonable compensation" — two words that confuse nearly every S-Corp owner.

If you pay yourself through an S-Corp and have ever wondered what salary you are actually required to take, why it matters, or how it relates to your distributions, this guide was written for you.

The IRS has clear expectations around reasonable compensation for S-Corp owner-employees — but most business owners only discover this through a conversation they were not prepared for.

The S-Corp Tax Savings Playbook by S. S. Bahar breaks down the concept of reasonable compensation in plain language, helping you understand what factors are typically considered, how salary and distributions relate to each other, and what documentation habits can support your position.

This is a digital education resource — not legal or tax advice. It is the foundation that helps you have smarter, more informed conversations with the professionals who advise you.

Starting at $27 for instant PDF access.
Available in a $47 bundle (most popular) or $97 complete package.
Tap "Learn More" to get started.

---

### PRIMARY 5

Running a small business is hard enough. Understanding your taxes should not require a second degree.

Whether you are self-employed, operating an LLC, running an S-Corp, or just starting to grow — the U.S. tax system has rules that directly affect your business finances, and most owners learn them the hard way.

S. S. Bahar, CPA Exam Qualified, FCMA, CIMA Finalist (UK), has put together a practical education library designed for busy business owners who want to understand — not just survive — their tax situation.

The Complete Bundle includes five digital guides:
- The S-Corp Tax Savings Playbook
- Small Business Tax Guide
- Tax Guide for F-1 Students, OPT & Nonresident Aliens
- AI Skills for Work, Business & Daily Life
- Communication Skills for Business Owners & Professionals

Five books. One affordable bundle. Instant PDF access.

Packages start at $27. The complete bundle is available for $97.
Tap "Learn More" to discover which package fits your needs.

---

## Headline Options

| # | Headline | Character Count |
|---|---|---|
| HEADLINE 1 | Learn How S-Corp Taxes Actually Work | 37 |
| HEADLINE 2 | What Your S-Corp Isn't Teaching You | 36 |
| HEADLINE 3 | Confused by S-Corp Rules? Start Here. | 37 |
| HEADLINE 4 | The S-Corp Guide for Business Owners | 36 |
| HEADLINE 5 | 5 Business Books. One Smart Bundle. | 35 |

---

## Description Options

| # | Description |
|---|---|
| DESC 1 | A practical PDF guide by a credentialed accounting professional. Understand S-Corp taxation, distributions, and reasonable compensation. Instant access from $27. |
| DESC 2 | Finally understand how your business structure affects your taxes. Written in plain language for real business owners. Starting at $27. |
| DESC 3 | LLC owner? S-Corp election questions? This guide walks you through what you need to know before your next CPA meeting. |
| DESC 4 | Learn S-Corp fundamentals from a CPA Exam Qualified, FCMA-credentialed professional. Digital PDF. Three pricing options starting at $27. |
| DESC 5 | Five business education books in one bundle — taxes, AI skills, and communication. Complete package just $97. Instant PDF download. |

---

# 10. A/B TESTING PLAN

## Test 1 — Headline Framing

| Field | Detail |
|---|---|
| **What to Test** | Benefit-clarity headline vs. curiosity headline: "Learn How S-Corp Taxes Actually Work" vs. "What Your S-Corp Isn't Teaching You" |
| **Hypothesis** | The curiosity headline will generate higher click-through rates in cold audiences; the benefit headline will convert better among warm retargeting audiences. |
| **What to Measure** | CTR and landing page session duration, tracked separately per audience tier (cold vs. retargeting). |

---

## Test 2 — Call-to-Action Wording

| Field | Detail |
|---|---|
| **What to Test** | Four CTA options: (A) "Get Instant Access" — immediacy and low friction; (B) "Download Your Copy" — concrete, ownership language; (C) "Learn More" — lowest commitment, Facebook native; (D) "Choose Your Package" — frames decision, highlights tiers. |
| **Hypothesis** | "Download Your Copy" will outperform for warm audiences already exposed to the product. "Learn More" will likely win on cold traffic due to lower perceived commitment. |
| **What to Measure** | CTR per CTA variant, segmented by audience temperature (cold/warm). |

---

## Test 3 — Price Display

| Field | Detail |
|---|---|
| **What to Test** | Showing the $27 entry price prominently in ad copy vs. omitting price entirely and leading with educational value. |
| **Hypothesis** | Displaying $27 will pre-qualify clicks and improve cost-per-purchase by filtering out non-buyers early. Hiding price may generate higher raw CTR but lower conversion rates. |
| **What to Measure** | Raw CTR, cost-per-click, conversion rate, and cost-per-purchase. Also monitor whether displaying $27 suppresses interest from buyers who would have chosen the $47 or $97 tier. |

---

## Test 4 — Visual Creative Format

| Field | Detail |
|---|---|
| **What to Test** | Three creative formats: (A) Clean book cover mockup on dark navy background with gold title — communicates professionalism; (B) Lifestyle image of a business owner at a desk reviewing documents — creates relatability; (C) Checklist or preview page from inside the guide — demonstrates tangible value. |
| **Hypothesis** | The checklist preview will generate the strongest engagement among cold audiences because it delivers immediate value before the click. The book cover will perform better in retargeting where trust is already established. |
| **What to Measure** | Engagement rate (reactions, comments, shares), CTR, and conversion rate per creative format, split by audience type. |

---

## Test 5 — Bonus Mention

| Field | Detail |
|---|---|
| **What to Test** | Ad copy that leads with the bonus checklists (included in the $47 package) vs. copy that does not mention them at all. |
| **Hypothesis** | Prominently featuring the checklist bonus will increase conversions to the $47 tier specifically, as it creates perceived added value and anchors the middle price as the obvious choice. If the bonus mention confuses the message or crowds the primary benefit, removing it and keeping focus on the core book will perform better. |
| **What to Measure** | Conversion rate to $47 tier specifically, average order value, and overall ROAS (return on ad spend). |

---

## Test 6 — Single Book vs. Bundle Lead

| Field | Detail |
|---|---|
| **What to Test** | Single-book focus (The S-Corp Tax Savings Playbook only, $27 entry) vs. leading with the five-book bundle value proposition ($97 complete package). |
| **Hypothesis** | The single-book focused ad will win on click-through rate because it presents a lower commitment decision. The bundle ad may win on average order value if it attracts buyers who respond to perceived comprehensiveness. |
| **What to Measure** | CTR, average order value, and revenue-per-click (not CTR alone) to determine true performance. Run both simultaneously for valid comparison. |

---

## Test 7 — Landing Page Length

| Field | Detail |
|---|---|
| **What to Test** | Short, focused landing page (book cover, three bullet benefits, price, single CTA button) vs. full long-form sales page (credentials, testimonials, chapter previews, FAQ, all three pricing tiers displayed). |
| **Hypothesis** | The short page will convert cold traffic faster at the $27 price point due to reduced decision fatigue. The long-form page will perform better for the $97 bundle because higher price requires more trust-building content before purchase. |
| **What to Measure** | Conversion rate at each price tier, time on page, and bounce rate. Consider segmenting traffic by price tier intent if technically feasible to isolate the variable cleanly. |

---

*Document compiled by: S S Accounting & Tax Services | 5725 Buford Hwy NE, Suite 206, Atlanta, GA 30340 | 470-455-5515*
*For internal use and implementation reference only.*

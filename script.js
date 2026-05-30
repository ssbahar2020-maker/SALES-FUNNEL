// ============================================================
// CONFIGURATION — edit these before going live
// ============================================================
const CONFIG = {
  pixelId: 'YOUR_FACEBOOK_PIXEL_ID',  // REPLACE with your actual Pixel ID
  gaId: 'G-XXXXXXXXXX',               // REPLACE with your Google Analytics ID
  bookTitle: 'The S-Corp Tax Savings Playbook',
  currency: 'USD',
  paymentLinks: {
    single:  'REPLACE_WITH_PAYMENT_LINK_SINGLE_27',
    popular: 'REPLACE_WITH_PAYMENT_LINK_POPULAR_47',
    bundle:  'REPLACE_WITH_PAYMENT_LINK_BUNDLE_97'
  }
};

// ============================================================
// PLAN VALUE MAP — maps data-plan attribute to dollar amount
// ============================================================
const PLAN_VALUES = {
  single:  27,
  popular: 47,
  bundle:  97
};

// ============================================================
// META PIXEL / FACEBOOK PIXEL
// ============================================================
// Standard Facebook Pixel base code — pixelId pulled from CONFIG.
(function(f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function() {
    n.callMethod
      ? n.callMethod.apply(n, arguments)
      : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push    = n;
  n.loaded  = true;
  n.version = '2.0';
  n.queue   = [];
  t = b.createElement(e);
  t.async = true;
  t.src   = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
}(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js'));

// Initialise the pixel with the ID from CONFIG (never hardcoded).
fbq('init', CONFIG.pixelId);

// Fire PageView immediately — does not need DOM to be ready.
fbq('track', 'PageView');

// ============================================================
// GOOGLE ANALYTICS 4
// ============================================================
// Dynamically inject the gtag.js library using CONFIG.gaId.
(function() {
  var gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src   = 'https://www.googletagmanager.com/gtag/js?id=' + CONFIG.gaId;
  document.head.appendChild(gtagScript);

  // Set up the dataLayer queue and gtag helper.
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag; // expose globally so other code can call gtag()

  gtag('js', new Date());
  gtag('config', CONFIG.gaId);
}());

// ============================================================
// UTILITY — GA4 custom event helper
// ============================================================
/**
 * trackGAEvent — thin wrapper around gtag() event calls.
 * @param {string} eventName  - GA4 event name (snake_case recommended)
 * @param {Object} [params]   - Optional event parameters object
 */
function trackGAEvent(eventName, params) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params || {});
}

// ============================================================
// DOM READY WRAPPER
// ============================================================
document.addEventListener('DOMContentLoaded', function () {

  // ----------------------------------------------------------
  // STICKY HEADER SCROLL EFFECT
  // ----------------------------------------------------------
  // Adds the class .scrolled to .header when the user scrolls
  // more than 50 px down, allowing CSS to apply a shadow / bg change.
  var header = document.querySelector('.header');

  if (header) {
    var handleHeaderScroll = function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    // Run once on load in case the page is already scrolled (e.g. back-nav).
    handleHeaderScroll();
  }

  // ----------------------------------------------------------
  // MOBILE NAVIGATION — HAMBURGER BUTTON
  // ----------------------------------------------------------
  // If the HTML does not already contain a .hamburger button
  // inside .header, we create one programmatically.
  var nav         = document.querySelector('.nav, .header nav, header nav');
  var hamburger   = document.querySelector('.hamburger');
  var navOverlay  = document.querySelector('.nav-overlay');

  // Create hamburger button if absent from HTML.
  if (header && !hamburger) {
    hamburger         = document.createElement('button');
    hamburger.className   = 'hamburger';
    hamburger.setAttribute('aria-label', 'Toggle navigation');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML   =
      '<span class="hamburger-bar"></span>' +
      '<span class="hamburger-bar"></span>' +
      '<span class="hamburger-bar"></span>';
    header.appendChild(hamburger);
  }

  // Create a full-screen overlay for closing the nav by clicking outside.
  if (!navOverlay) {
    navOverlay           = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
  }

  /**
   * openMobileNav — adds .nav-open to header, updates aria state.
   */
  function openMobileNav() {
    if (!header) return;
    header.classList.add('nav-open');
    navOverlay.classList.add('active');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  /**
   * closeMobileNav — removes .nav-open from header, resets aria state.
   */
  function closeMobileNav() {
    if (!header) return;
    header.classList.remove('nav-open');
    navOverlay.classList.remove('active');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (header.classList.contains('nav-open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  // Close the nav when the overlay (outside the menu) is clicked.
  navOverlay.addEventListener('click', closeMobileNav);

  // Also close the nav when any nav link is clicked (single-page behaviour).
  if (nav) {
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // ----------------------------------------------------------
  // SMOOTH SCROLL
  // ----------------------------------------------------------
  // Intercepts clicks on any anchor whose href starts with "#"
  // and scrolls smoothly, offsetting for the sticky header height.
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return; // skip bare # links

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      // Measure the current header height so we don't hide content behind it.
      var headerHeight = header ? header.getBoundingClientRect().height : 0;
      var targetTop    = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  // ----------------------------------------------------------
  // FAQ ACCORDION
  // ----------------------------------------------------------
  // Each .faq-item contains a .faq-question button and a
  // .faq-answer div.  Clicking the question toggles .active on
  // the parent and animates max-height on the answer panel.
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer   = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    // Ensure the answer starts collapsed via inline style.
    answer.style.maxHeight  = '0';
    answer.style.overflow   = 'hidden';
    answer.style.transition = 'max-height 0.35s ease';

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('active');

      // Close all other open items (accordion behaviour).
      faqItems.forEach(function (otherItem) {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          var otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
          var otherQ = otherItem.querySelector('.faq-question');
          if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle the clicked item.
      if (isOpen) {
        item.classList.remove('active');
        answer.style.maxHeight = '0';
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        // scrollHeight gives the natural height of the content.
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');

        // GA4 event — track which FAQ was opened.
        trackGAEvent('faq_open', {
          faq_question: question.textContent.trim().substring(0, 100)
        });
      }
    });

    // Accessibility: allow keyboard activation via Enter/Space.
    question.setAttribute('aria-expanded', 'false');
    question.setAttribute('role', 'button');
    question.setAttribute('tabindex', '0');
    question.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });

  // ----------------------------------------------------------
  // SCROLL ANIMATIONS — fade-in sections
  // ----------------------------------------------------------
  // Elements with the class .fade-in-section are invisible by
  // default (CSS: opacity 0, transform translateY 30px).
  // The observer adds .visible when they enter the viewport,
  // triggering a CSS transition.
  var fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target); // fire once only
        }
      });
    },
    {
      threshold: 0.12, // trigger when 12% of element is visible
      rootMargin: '0px 0px -40px 0px'
    }
  );

  document.querySelectorAll('.fade-in-section').forEach(function (el) {
    fadeObserver.observe(el);
  });

  // ----------------------------------------------------------
  // MOBILE STICKY CTA BAR
  // ----------------------------------------------------------
  // Shows .mobile-cta-bar after the user scrolls past the .hero
  // section.  Hides it again once the .pricing section has fully
  // scrolled past the bottom of the viewport (user no longer
  // needs a sticky nudge because they can see the real CTA).
  var mobileCTABar  = document.querySelector('.mobile-cta-bar');
  var heroSection    = document.querySelector('.hero');
  var pricingSection = document.querySelector('#pricing');

  if (mobileCTABar && heroSection) {
    // Start hidden; CSS media query shows on mobile only.
    mobileCTABar.classList.add('hidden');

    var updateMobileCTA = function () {
      var heroBottom = heroSection.getBoundingClientRect().bottom;
      // Show bar once the hero has scrolled out of view.
      var shouldShow = heroBottom < 0;

      // Hide bar once pricing section is fully past the viewport bottom.
      if (shouldShow && pricingSection) {
        var pricingBottom = pricingSection.getBoundingClientRect().bottom;
        if (pricingBottom < 0) {
          shouldShow = false;
        }
      }

      if (shouldShow) {
        mobileCTABar.classList.remove('hidden');
      } else {
        mobileCTABar.classList.add('hidden');
      }
    };

    window.addEventListener('scroll', updateMobileCTA, { passive: true });
    // Initial check.
    updateMobileCTA();
  }

  // ----------------------------------------------------------
  // PRICING CTA CLICK HANDLERS
  // ----------------------------------------------------------
  // Buttons must carry a data-plan attribute: 'single', 'popular', or 'bundle'.
  // On click: fire Meta Pixel AddToCart + GA4 event, then redirect
  // after a brief delay so the tracking beacons have time to fire.
  document.querySelectorAll('.pricing-cta-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      var plan  = this.getAttribute('data-plan');
      var value = PLAN_VALUES[plan];
      var link  = CONFIG.paymentLinks[plan];

      if (!plan || !value || !link) {
        console.warn('[script.js] Pricing button missing valid data-plan or CONFIG entry:', plan);
        return;
      }

      // Meta Pixel — AddToCart
      fbq('track', 'AddToCart', {
        content_name:  CONFIG.bookTitle,
        content_ids:   [plan],
        content_type:  'product',
        value:         value,
        currency:      CONFIG.currency
      });

      // Meta Pixel — InitiateCheckout (also fires here for pricing buttons)
      fbq('track', 'InitiateCheckout', {
        content_name:  CONFIG.bookTitle,
        content_ids:   [plan],
        num_items:     1,
        value:         value,
        currency:      CONFIG.currency
      });

      // GA4
      trackGAEvent('begin_checkout', {
        currency: CONFIG.currency,
        value:    value,
        items: [{
          item_name: CONFIG.bookTitle,
          item_id:   plan,
          price:     value,
          quantity:  1
        }]
      });

      trackGAEvent('cta_click', {
        cta_type:   'pricing',
        plan:       plan,
        value:      value,
        currency:   CONFIG.currency
      });

      // Allow 300 ms for pixel beacons to fire, then navigate.
      setTimeout(function () {
        window.location.href = link;
      }, 300);
    });
  });

  // ----------------------------------------------------------
  // HERO CTA TRACKING
  // ----------------------------------------------------------
  // Any element with .hero-cta fires a Meta Pixel Lead event.
  // This is separate from the checkout flow — it signals intent.
  document.querySelectorAll('.hero-cta').forEach(function (btn) {
    btn.addEventListener('click', function () {
      fbq('track', 'Lead', {
        content_name: CONFIG.bookTitle
      });

      trackGAEvent('cta_click', {
        cta_type: 'hero',
        label:    this.textContent.trim().substring(0, 80)
      });
    });
  });

  // ----------------------------------------------------------
  // INITIATE CHECKOUT TRACKING — all .btn-primary links/buttons
  // ----------------------------------------------------------
  // Belt-and-suspenders: any .btn-primary that resolves to a
  // payment link also fires InitiateCheckout.  We skip buttons
  // already handled by the pricing handler above (.pricing-cta-btn).
  document.querySelectorAll('.btn-primary').forEach(function (btn) {
    // Avoid double-tracking elements that are also .pricing-cta-btn.
    if (btn.classList.contains('pricing-cta-btn')) return;

    btn.addEventListener('click', function () {
      // Try to infer a plan value from a data-plan attribute if present.
      var plan  = this.getAttribute('data-plan');
      var value = plan ? (PLAN_VALUES[plan] || 0) : 0;

      fbq('track', 'InitiateCheckout', {
        content_name: CONFIG.bookTitle,
        value:        value,
        currency:     CONFIG.currency
      });

      trackGAEvent('cta_click', {
        cta_type: 'btn_primary',
        label:    this.textContent.trim().substring(0, 80),
        value:    value
      });
    });
  });

  // ----------------------------------------------------------
  // SCROLL DEPTH TRACKING
  // ----------------------------------------------------------
  // Fires GA4 + Meta Pixel events at 25 / 50 / 75 / 100% scroll depth.
  // A Set is used so each milestone fires exactly once per page load.
  var depthMilestones = new Set();
  var milestones      = [25, 50, 75, 100];

  var getScrollDepthPercent = function () {
    var scrolled       = window.scrollY;
    var docHeight      = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return 100;
    return Math.min(100, Math.round((scrolled / docHeight) * 100));
  };

  var handleScrollDepth = function () {
    var depth = getScrollDepthPercent();

    milestones.forEach(function (milestone) {
      if (depth >= milestone && !depthMilestones.has(milestone)) {
        depthMilestones.add(milestone);

        // GA4 scroll depth event.
        trackGAEvent('scroll_depth', {
          percent_scrolled: milestone
        });

        // Meta Pixel custom event for high-value milestones.
        if (milestone === 75 || milestone === 100) {
          fbq('trackCustom', 'ScrollDepth', {
            percent:      milestone,
            content_name: CONFIG.bookTitle
          });
        }
      }
    });

    // Unregister listener once all milestones have fired.
    if (depthMilestones.size === milestones.length) {
      window.removeEventListener('scroll', handleScrollDepth);
    }
  };

  window.addEventListener('scroll', handleScrollDepth, { passive: true });
  // Check depth on load (handles short pages or pre-scrolled state).
  handleScrollDepth();

  // ----------------------------------------------------------
  // VIEWCONTENT — fires after DOM is ready
  // ----------------------------------------------------------
  // PageView was already fired above; ViewContent adds richer
  // product context for the Pixel's catalogue and optimisation.
  fbq('track', 'ViewContent', {
    content_name: CONFIG.bookTitle,
    content_type: 'product',
    currency:     CONFIG.currency
  });

}); // end DOMContentLoaded

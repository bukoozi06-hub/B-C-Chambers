/* ============================================================
   BROOKS AND CREEKS CHAMBERS – main.js
   Navigation, scroll effects, modals, reveal animations, form
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Sticky header + back-to-top ---------- */
  var header = document.getElementById('siteHeader');
  var backToTop = document.getElementById('backToTop');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle('scrolled', y > 40);
    backToTop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  function closeNav() {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  navToggle.addEventListener('click', function () {
    var open = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------- Active nav link on scroll ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(function (s) { spy.observe(s); });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function (el, i) {
    el.style.transitionDelay = (i % 3) * 0.08 + 's';
    revealObs.observe(el);
  });

  /* ---------- Modals (privacy / disclaimer) ---------- */
  var openers = document.querySelectorAll('[data-modal]');
  var lastFocus = null;
  openers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var modal = document.getElementById('modal-' + btn.getAttribute('data-modal'));
      if (!modal) return;
      lastFocus = document.activeElement;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      var closeBtn = modal.querySelector('[data-close]');
      if (closeBtn) closeBtn.focus();
    });
  });
  document.querySelectorAll('.modal').forEach(function (modal) {
    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.closest('[data-close]')) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Enquiry form (Formspree) ---------- */
  var form = document.getElementById('enquiryForm');
  var status = document.getElementById('formStatus');
  var submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';
    status.className = 'form-status';

    // Honeypot: silently ignore bot submissions
    if (form.elements['_gotcha'] && form.elements['_gotcha'].value) return;

    // Basic validation
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var action = form.getAttribute('action');
    if (action.indexOf('YOUR_FORM_ID') !== -1) {
      status.className = 'form-status error';
      status.textContent = 'The enquiry form is not yet connected to a form service. Please call or WhatsApp the Chambers directly, or ask your developer to configure Formspree (see README.md).';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    fetch(action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then(function (res) {
        if (res.ok) {
          status.className = 'form-status success';
          status.textContent = 'Thank you. Your enquiry has been submitted successfully. The Chambers will contact you shortly.';
          form.reset();
        } else {
          throw new Error('Submission failed');
        }
      })
      .catch(function () {
        status.className = 'form-status error';
        status.textContent = 'Sorry, your enquiry could not be sent at this time. Please call 0803 311 4511 or 0704 634 0776.';
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Enquiry';
      });
  });
})();

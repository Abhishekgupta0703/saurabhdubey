document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById('siteHeader');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    var scrollTopBtn = document.getElementById('scrollTop');
    if (window.scrollY > 500) scrollTopBtn.classList.add('visible');
    else scrollTopBtn.classList.remove('visible');
  });

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  mainNav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll-to-top button ---------- */
  document.getElementById('scrollTop').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Scroll reveal (Elementor-style fade-up on scroll) ---------- */
  var revealTargets = document.querySelectorAll(
    '.course-card, .feature-card, .step, .testimonial-carousel, .demo-form, .accordion-item, .stat'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('in-view');
        }, (i % 4) * 90);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(function (el) { revealObserver.observe(el); });

  /* ---------- Animated stat counters ---------- */
  var counters = document.querySelectorAll('.stat-num');
  var countObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1400;
      var start = null;

      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(step);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { countObserver.observe(el); });

  /* ---------- FAQ Accordion ---------- */
  var triggers = document.querySelectorAll('.accordion-trigger');
  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var panel = trigger.nextElementSibling;
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';

      triggers.forEach(function (t) {
        t.setAttribute('aria-expanded', 'false');
        t.nextElementSibling.style.maxHeight = 0;
      });

      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
  // Initialize first FAQ open state with correct height
  var firstPanel = document.querySelector('.accordion-trigger[aria-expanded="true"]');
  if (firstPanel) {
    var p = firstPanel.nextElementSibling;
    requestAnimationFrame(function () { p.style.maxHeight = p.scrollHeight + 'px'; });
  }

  /* ---------- Testimonial carousel ---------- */
  var track = document.getElementById('testimonialTrack');
  var cards = track.querySelectorAll('.testimonial-card');
  var dotsWrap = document.getElementById('carouselDots');
  var current = 0;
  var autoplayTimer;

  cards.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', function () { goTo(i); resetAutoplay(); });
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    current = (index + cards.length) % cards.length;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dotsWrap.querySelectorAll('button').forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  document.getElementById('prevT').addEventListener('click', function () { goTo(current - 1); resetAutoplay(); });
  document.getElementById('nextT').addEventListener('click', function () { goTo(current + 1); resetAutoplay(); });

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(function () { goTo(current + 1); }, 5500);
  }
  resetAutoplay();

  track.style.display = 'flex';
  track.style.transition = 'transform 0.5s ease';

  /* ---------- Demo form (WhatsApp handoff) ---------- */
  var form = document.getElementById('demoForm');
  var successMsg = document.getElementById('formSuccess');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var data = new FormData(form);
    var name = data.get('fullName');
    var role = data.get('role');
    var grade = data.get('grade');
    var course = data.get('course');
    var whatsapp = data.get('whatsapp');
    var country = data.get('country');
    var timezone = data.get('timezone');

    var message = 'Hi Saurabh, I would like to book a free math demo class.%0A%0A' +
      'Name: ' + encodeURIComponent(name) + '%0A' +
      'I am a: ' + encodeURIComponent(role) + '%0A' +
      'Grade: ' + encodeURIComponent(grade) + '%0A' +
      'Current course: ' + encodeURIComponent(course) + '%0A' +
      'Country: ' + encodeURIComponent(country || '') +
      (timezone ? '%0ATimezone: ' + encodeURIComponent(timezone) : '');

    successMsg.textContent = 'Thanks, ' + name + '! Opening WhatsApp to confirm your free demo…';

    setTimeout(function () {
      window.open('https://wa.me/917525871717?text=' + message, '_blank');
    }, 600);

    form.reset();
    document.getElementById('country').value = 'USA';
  });

});
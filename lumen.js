/* Lumen — shared front-end behaviour
   Header state, mobile nav, scroll reveals, 3D hint. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Sticky header state ---- */
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile navigation ---- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    var setNav = function (open) {
      nav.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      setNav(burger.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== burger) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setNav(false); burger.focus(); }
    });
    // Reset when resizing back up to the desktop layout
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) setNav(false);
    });
  }

  /* ---- Scroll reveals ---- */
  var targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---- 3D viewer: show the drag hint once the model is interactive ---- */
  var viewer = document.getElementById('hero3d');
  var hint = document.getElementById('mvHint');
  if (viewer && hint && !reduced) {
    var hide = function () { hint.classList.remove('show'); };
    viewer.addEventListener('load', function () {
      setTimeout(function () { hint.classList.add('show'); }, 700);
      setTimeout(hide, 6500);
    }, { once: true });
    ['pointerdown', 'wheel', 'touchstart'].forEach(function (evt) {
      viewer.addEventListener(evt, hide, { once: true, passive: true });
    });
  }
})();

/* ---------------------------------------------------------------
   Hero 3D: cycle the app screens on the phone's display.
   Swaps the emissive texture of the "AppScreen" material that was
   split out of the model, dimming the panel across the change so it
   reads like a real screen transition rather than a hard cut.
   --------------------------------------------------------------- */
(function () {
  'use strict';

  var mv = document.getElementById('hero3d');
  if (!mv) return;

  var SCREENS = [
    { src: '/images/app/1-home.png',      label: 'Home' },
    { src: '/images/app/2-projects.png',  label: 'Projects' },
    { src: '/images/app/3-schedule.png',  label: 'Schedule' },
    { src: '/images/app/4-scope.png',     label: 'Scope' },
    { src: '/images/app/5-drawings.png',  label: 'Drawings' },
    { src: '/images/app/6-safety.png',    label: 'Safety' }
  ];
  var HOLD = 3200, FADE = 320;

  var hud = document.getElementById('mvHud');
  var dots = document.getElementById('mvDots');
  var label = document.getElementById('mvLabel');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (dots) {
    SCREENS.forEach(function (_, i) {
      var d = document.createElement('i');
      if (i === 0) d.className = 'on';
      dots.appendChild(d);
    });
  }

  var swapTimer = null;

  mv.addEventListener('load', function () {
    var mat = (mv.model && mv.model.materials || []).filter(function (m) {
      return m.name === 'AppScreen';
    })[0];

    // Reveal the HUD, then hand it over to the screen ticker.
    if (hud) {
      setTimeout(function () { hud.classList.add('show'); }, 600);
      setTimeout(function () { if (label) label.textContent = SCREENS[0].label; }, 4200);
    }

    if (!mat || !mat.emissiveTexture || typeof mv.createTexture !== 'function') return;

    Promise.all(SCREENS.map(function (s) { return mv.createTexture(s.src); }))
      .then(function (textures) {
        var i = 0, transitioning = false;

        function setEmissive(v) {
          try { mat.setEmissiveFactor([v, v, v]); } catch (e) {}
        }
        function tween(from, to, ms, done) {
          if (reduced) { setEmissive(to); if (done) done(); return; }
          var start = performance.now();
          (function step(now) {
            var p = Math.min(1, (now - start) / ms);
            setEmissive(from + (to - from) * p);
            if (p < 1) requestAnimationFrame(step);
            else if (done) done();
          })(start);
        }

        function apply(n) {
          try { mat.emissiveTexture.setTexture(textures[n]); } catch (e) {}
          if (label) label.textContent = SCREENS[n].label;
          if (dots) {
            Array.prototype.forEach.call(dots.children, function (d, k) {
              d.className = k === n ? 'on' : '';
            });
          }
        }

        // Strictly sequential: the index only moves when the screen actually
        // changes, and the next cycle is scheduled only once this one lands.
        // Keeps the ticker in step even if rAF is throttled in a background tab.
        function advance() {
          swapTimer = null; transitioning = true;
          tween(1, 0.18, FADE, function () {
            i = (i + 1) % SCREENS.length;
            apply(i);
            tween(0.18, 1, FADE, function () {
              transitioning = false;
              swapTimer = setTimeout(advance, HOLD);
            });
          });
        }

        swapTimer = setTimeout(advance, reduced ? 9000 : HOLD + 1600);

        // Don't burn cycles while the hero is off screen.
        if ('IntersectionObserver' in window) {
          new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
              if (en.isIntersecting) {
                if (!swapTimer && !transitioning) swapTimer = setTimeout(advance, HOLD);
              } else if (swapTimer) {
                clearTimeout(swapTimer); swapTimer = null;
              }
            });
          }, { threshold: 0.12 }).observe(mv);
        }
      })
      .catch(function () { /* textures unavailable — static screen is fine */ });
  }, { once: true });
})();

/* ---------------------------------------------------------------
   Enquiry form -> n8n webhook.
   Same endpoint and payload shape the previous site used, so the
   existing workflow (email + Telegram alert) keeps working.
   --------------------------------------------------------------- */
(function () {
  'use strict';

  var form = document.getElementById('enquiryForm');
  if (!form) return;

  var endpoint = form.getAttribute('data-endpoint');
  if (!endpoint) return;

  function val(name) {
    var el = form.elements[name];
    return el && el.value ? el.value.trim() : '';
  }

  // Deep links like /contact.html?service=new-ios-app preselect the dropdown.
  var wanted = new URLSearchParams(window.location.search).get('service');
  if (wanted) {
    var sel = form.elements.service;
    if (sel) {
      Array.prototype.forEach.call(sel.options, function (o) {
        if (o.value === wanted) o.selected = true;
      });
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var email = val('email'), phone = val('phone');
    if (!email && !phone) {
      var first = form.elements.email || form.elements.phone;
      if (first) first.focus();
      note('Add an email or a phone number so we can reply.', true);
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    var label = btn ? btn.textContent : '';
    if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: val('name'),
        email: email,
        phone: phone,
        business: val('business'),
        service: val('service'),
        message: val('message'),
        submitted: new Date().toISOString(),
        source: 'lumenadl.com' + window.location.pathname
      })
    })
      .then(function (res) {
        if (!res.ok) throw new Error('bad status ' + res.status);
        form.innerHTML =
          '<div style="text-align:center;padding:34px 12px">' +
          '<h3 style="margin-bottom:10px">Thanks &mdash; that\'s come through.</h3>' +
          '<p class="muted" style="font-size:var(--t-sm)">We reply personally, usually within one business day.</p>' +
          '</div>';
      })
      .catch(function () {
        if (btn) { btn.textContent = label; btn.disabled = false; }
        note('Something went wrong. Please email hello@lumenadl.com instead.', true);
      });
  });

  function note(msg, isError) {
    var el = form.querySelector('.form-note');
    if (!el) return;
    el.textContent = msg;
    el.style.color = isError ? '#FF8A6B' : '';
  }
})();

/**
 * 7-Maktab | Minimalist Interactive Scripts
 * Sokin, toza va engil JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll shadow
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu & Burger Toggle System
  const mobileBurger = document.getElementById('mobileBurger');
  const navMenu = document.getElementById('navMenu');

  // Create or retrieve backdrop overlay
  let navBackdrop = document.querySelector('.nav-backdrop');
  if (!navBackdrop) {
    navBackdrop = document.createElement('div');
    navBackdrop.className = 'nav-backdrop';
    document.body.appendChild(navBackdrop);
  }

  // Add mobile menu footer (eMaktab and quick contact) if not present
  if (navMenu && !navMenu.querySelector('.mobile-menu-footer')) {
    const mobileFooter = document.createElement('div');
    mobileFooter.className = 'mobile-menu-footer';
    mobileFooter.innerHTML = `
      <a href="https://emaktab.uz" target="_blank" rel="noopener noreferrer" class="btn-emaktab-full">
        <span>eMaktab tizimiga kirish</span>
        <span>&#8599;</span>
      </a>
      <div class="mobile-menu-contact">
        <span>📞 +998 (70) 214-17-07</span>
        <span>📍 Bekobod sh., 12-mavze</span>
      </div>
    `;
    navMenu.appendChild(mobileFooter);
  }

  const openMobileMenu = () => {
    if (!mobileBurger || !navMenu) return;
    navMenu.classList.add('open');
    mobileBurger.classList.add('open');
    mobileBurger.setAttribute('aria-expanded', 'true');
    navBackdrop.classList.add('active');
    document.body.classList.add('nav-open');
  };

  const closeMobileMenu = () => {
    if (!mobileBurger || !navMenu) return;
    navMenu.classList.remove('open');
    mobileBurger.classList.remove('open');
    mobileBurger.setAttribute('aria-expanded', 'false');
    navBackdrop.classList.remove('active');
    document.body.classList.remove('nav-open');

    // Close any open dropdowns inside mobile menu
    document.querySelectorAll('.nav-item.dropdown').forEach(item => {
      item.classList.remove('open');
      const dd = item.querySelector('.nav-dropdown');
      if (dd) dd.classList.remove('show');
    });
  };

  if (mobileBurger && navMenu) {
    mobileBurger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close when tapping backdrop
    navBackdrop.addEventListener('click', closeMobileMenu);

    // Close on mobile navigation link click
    navMenu.querySelectorAll('a:not(.has-dropdown)').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    // Reset if window resized to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  // 3. Dropdowns for mobile / touch (Accordion behavior)
  const navItemsWithDropdown = document.querySelectorAll('.nav-item.dropdown');
  navItemsWithDropdown.forEach(item => {
    const trigger = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.nav-dropdown');

    if (trigger && dropdown) {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 860) {
          e.preventDefault();
          e.stopPropagation();

          const isCurrentlyOpen = item.classList.contains('open');

          // Accordion: close other dropdowns first
          navItemsWithDropdown.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('open');
              const otherDd = otherItem.querySelector('.nav-dropdown');
              if (otherDd) otherDd.classList.remove('show');
            }
          });

          // Toggle current dropdown
          if (isCurrentlyOpen) {
            item.classList.remove('open');
            dropdown.classList.remove('show');
          } else {
            item.classList.add('open');
            dropdown.classList.add('show');
          }
        }
      });
    }
  });

  // 4. Smooth Anchor Scrolling with offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 5. Minimalist Image Lightbox
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('[data-lightbox]').forEach(box => {
      box.addEventListener('click', () => {
        const img = box.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'Maktab surati';
          lightbox.classList.add('active');
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      lightboxImg.src = '';
    };

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // 6. Contact Form Submission (Toast Notice)
  const contactForm = document.getElementById('contactForm');
  const toastNotice = document.getElementById('toastNotice');

  if (contactForm && toastNotice) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : '';
      if (submitBtn) {
        submitBtn.innerText = 'Yuborilmoqda...';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
        }

        // Show toast
        toastNotice.classList.add('active');
        setTimeout(() => {
          toastNotice.classList.remove('active');
        }, 4000);
      }, 700);
    });
  }

  // 7. Gallery Filter (if on galereya.html)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-card-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 8. Minimalist Scroll Reveal Animation
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealTargets = document.querySelectorAll(`
      .section-header,
      .stat-card,
      .leader-card,
      .student-card,
      .gallery-card,
      .gallery-card-item,
      .about-overview-grid,
      .contact-info-card,
      .contact-form-card,
      .doc-item
    `);

    // Add initial reveal class and stagger delays for grid items
    const grids = document.querySelectorAll('.leadership-grid, .students-grid, .stats-grid, .gallery-grid, .doc-list');
    grids.forEach(grid => {
      const children = grid.children;
      Array.from(children).forEach((child, idx) => {
        child.classList.add('reveal-on-scroll');
        const delay = Math.min((idx % 4) * 60, 240);
        if (delay > 0) {
          child.style.transitionDelay = `${delay}ms`;
        }
      });
    });

    revealTargets.forEach(el => {
      if (!el.classList.contains('reveal-on-scroll')) {
        el.classList.add('reveal-on-scroll');
      }
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      revealObserver.observe(el);
    });
  }
});

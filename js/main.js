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

  // 2. Mobile burger toggle
  const mobileBurger = document.getElementById('mobileBurger');
  const navMenu = document.getElementById('navMenu');

  if (mobileBurger && navMenu) {
    mobileBurger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileBurger.classList.toggle('open');
      mobileBurger.setAttribute('aria-expanded', isOpen);
    });

    // Close on mobile link click
    navMenu.querySelectorAll('a:not(.has-dropdown)').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileBurger.classList.remove('open');
      });
    });
  }

  // 3. Dropdowns for mobile / touch
  const navItemsWithDropdown = document.querySelectorAll('.nav-item.dropdown');
  navItemsWithDropdown.forEach(item => {
    const trigger = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.nav-dropdown');

    if (trigger && dropdown) {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 860) {
          e.preventDefault();
          dropdown.classList.toggle('show');
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
});

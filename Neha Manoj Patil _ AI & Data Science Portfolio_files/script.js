/* ===================================================================
   PORTFOLIO SCRIPTS - NEHA MANOJ PATIL
   Clean, Modular JavaScript for Interactivity, Modals & Theme Control
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC CURRENT YEAR
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. SCROLL PROGRESS BAR
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  });

  // 3. THEME TOGGLING (Default: Light Mode as requested)
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('neha_portfolio_theme') || 'light';

  function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('neha_portfolio_theme', theme);
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  }

  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`);
    });
  }

  // 4. MOBILE NAVBAR TOGGLE
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 5. ACTIVE NAV LINK ON SCROLL
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // Back to top button visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 6. TYPING TEXT EFFECT
  const typingElement = document.getElementById('typing-text');
  const roles = [
    'AI & Data Science Student',
    'Aspiring AI & Data Engineer',
    'Problem Solver & Python Enthusiast',
    'B.Tech Undergrad @ RCPIT'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function typeEffect() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingDelay = 1800; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 400; // Pause before typing new text
    }

    setTimeout(typeEffect, typingDelay);
  }
  typeEffect();

  // 7. CERTIFICATIONS & WORKSHOPS FILTER
  const filterBtns = document.querySelectorAll('.filter-btn');
  const certCards = document.querySelectorAll('.cert-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      certCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 8. CLIPBOARD COPY UTILITIES
  function copyToClipboard(text, message) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(message);
      }).catch(() => {
        fallbackCopy(text, message);
      });
    } else {
      fallbackCopy(text, message);
    }
  }

  function fallbackCopy(text, message) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(message);
    } catch (err) {
      showToast('Could not copy automatically');
    }
    document.body.removeChild(textArea);
  }

  const copyEmailHero = document.getElementById('copy-email-hero');
  if (copyEmailHero) {
    copyEmailHero.addEventListener('click', () => {
      copyToClipboard('nehapatil2210@gmail.com', 'Email copied: nehapatil2210@gmail.com');
    });
  }

  const btnCopyEmail = document.getElementById('btn-copy-email');
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      copyToClipboard('nehapatil2210@gmail.com', 'Email copied to clipboard!');
    });
  }

  const btnCopyPhone = document.getElementById('btn-copy-phone');
  if (btnCopyPhone) {
    btnCopyPhone.addEventListener('click', () => {
      copyToClipboard('+91 7620627271', 'Phone number copied: +91 7620627271');
    });
  }

  // 9. RESUME MODAL HANDLING
  const resumeModal = document.getElementById('resume-modal');
  const navResumeBtn = document.getElementById('nav-resume-btn');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalPrintBtn = document.getElementById('modal-print-btn');

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (navResumeBtn) navResumeBtn.addEventListener('click', openResumeModal);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResumeModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeResumeModal);

  if (modalPrintBtn) {
    modalPrintBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });
  }

  // 10. PROJECT DETAIL MODAL HANDLING
  const projectModal = document.getElementById('project-modal');
  const projectCloseBtn = document.getElementById('project-close-btn');
  const modalProjTitle = document.getElementById('modal-proj-title');
  const modalProjBody = document.getElementById('modal-proj-body');

  const projectDetailsData = {
    elearning: {
      title: "E-Learning Platform With Quizzes",
      category: "Academic Software Development",
      overview: "An integrated web learning system architected to solve the friction of remote educational material delivery and automated assessments.",
      highlights: [
        "Modular topic-based content organization for intuitive student navigation.",
        "Interactive Quiz Engine featuring countdown timers, randomized questions, and real-time calculation of scores.",
        "Comprehensive answer key review after submission to reinforce learning retention.",
        "Performance overview dashboard displaying progress metrics across completed topics."
      ],
      techStack: ["Python", "Web Architecture", "Relational Database Structure", "Algorithms & Logic"],
      learnings: "Mastered full-lifecycle application modeling, state management for quiz timers, and database relationship mapping for student performance data."
    },
    society: {
      title: "Apartment Society Management System",
      category: "System Design & Information Architecture",
      overview: "A comprehensive digital administration solution aimed at eliminating manual ledger tracking for residential complexes and housing cooperatives.",
      highlights: [
        "Flat and resident registry tracking ownership, tenancy, contact details, and vehicle allocations.",
        "Maintenance dues manager with automated billing calculation, penalty tracking, and payment history logs.",
        "Complaint ticketing system allowing residents to report facility issues with status tracking (Open / In Progress / Resolved).",
        "Digital notice board for broadcasts, committee announcements, and emergency notices."
      ],
      techStack: ["System Architecture", "Relational Schema Design", "CRUD Data Operations", "User Access Logic"],
      learnings: "Gained hands-on experience in business logic structuring, multi-entity relationships, relational database normalization, and user role validation."
    }
  };

  function openProjectModal(key) {
    const data = projectDetailsData[key];
    if (!data || !projectModal) return;

    modalProjTitle.textContent = data.title;
    modalProjBody.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--primary); background: var(--primary-subtle); padding: 0.25rem 0.65rem; border-radius: 9999px;">
          ${data.category}
        </span>
      </div>
      <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-body); margin-bottom: 1.25rem;">
        ${data.overview}
      </p>
      
      <h4 style="font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 0.75rem;">
        Architecture & Key Features:
      </h4>
      <ul style="list-style: none; padding: 0; margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem;">
        ${data.highlights.map(item => `
          <li style="font-size: 0.88rem; color: var(--text-body); display: flex; align-items: flex-start; gap: 0.5rem;">
            <i class="fa-solid fa-check" style="color: var(--accent-emerald); margin-top: 0.25rem; font-size: 0.8rem;"></i>
            <span>${item}</span>
          </li>
        `).join('')}
      </ul>

      <h4 style="font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 0.65rem;">
        Technology Core:
      </h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 1.25rem;">
        ${data.techStack.map(tag => `
          <span style="font-size: 0.75rem; font-weight: 600; background: var(--bg-secondary); color: var(--primary); border: 1px solid var(--border-light); padding: 0.25rem 0.65rem; border-radius: 6px;">
            ${tag}
          </span>
        `).join('')}
      </div>

      <div style="background: var(--bg-secondary); border-left: 3px solid var(--primary); padding: 1rem; border-radius: 0 8px 8px 0;">
        <h5 style="font-size: 0.85rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.25rem;">Key Takeaway:</h5>
        <p style="font-size: 0.825rem; color: var(--text-muted); margin: 0;">${data.learnings}</p>
      </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.btn-project-detail').forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      openProjectModal(projKey);
    });
  });

  if (projectCloseBtn) projectCloseBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // Close modals on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResumeModal();
      closeProjectModal();
    }
  });

  // 11. CONTACT FORM HANDLER
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        showToast('Please fill in all required fields.');
        return;
      }

      // Prepare mailto link for direct sending via visitor's mail client
      const mailtoLink = `mailto:nehapatil2210@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      // Show success feedback
      formStatus.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-circle-check" style="color: var(--accent-emerald); font-size: 1.1rem;"></i>
          <div>
            <strong>Thank you, ${name}!</strong> Opening your default mail client to deliver your message to <em>nehapatil2210@gmail.com</em>.
          </div>
        </div>
      `;
      formStatus.className = 'form-status-alert success';

      showToast('Opening email client...');

      // Trigger mailto after brief delay
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 700);

      contactForm.reset();
    });
  }

  // 12. TOAST NOTIFICATION UTILITY
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${message}`;
    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
    }, 3200);
  }

  // 13. SMOOTH SCROLL REVEAL OBSERVER
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // Ensure hero elements reveal immediately
  setTimeout(() => {
    document.querySelectorAll('#home .reveal').forEach(el => el.classList.add('active'));
  }, 100);
});

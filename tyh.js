// Modern JavaScript for Prof. Amenaghawon Website

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
  initNavigation();
  initScrollEffects();
  initAnimations();
  initFormHandling();
  initModalFunctionality();
  initSmoothScrolling();
}

// Navigation functionality
function initNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navbar = document.querySelector(".navbar");

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // Navbar scroll effect
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      navbar.style.background = "rgba(15, 23, 42, 0.98)";
      navbar.style.backdropFilter = "blur(20px)";
    } else {
      navbar.style.background = "rgba(15, 23, 42, 0.95)";
      navbar.style.backdropFilter = "blur(20px)";
    }

    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollY = currentScrollY;
  });
}

// Scroll effects and animations
function initScrollEffects() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        // Special handling for service cards
        if (entry.target.classList.contains("service-card")) {
          entry.target.style.animationDelay = `${
            Array.from(entry.target.parentNode.children).indexOf(entry.target) *
            100
          }ms`;
        }

        // Special handling for team cards
        if (entry.target.classList.contains("team-card")) {
          entry.target.style.animationDelay = `${
            Array.from(entry.target.parentNode.children).indexOf(entry.target) *
            150
          }ms`;
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".service-card, .research-card, .team-card, .hero-content"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Parallax effect for hero elements
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(
      ".floating-elements .element"
    );

    parallaxElements.forEach((el, index) => {
      const speed = 0.5 + index * 0.1;
      el.style.transform = `translateY(${scrolled * speed}px) rotate(${
        scrolled * 0.1
      }deg)`;
    });
  });
}

// Initialize animations
function initAnimations() {
  // Counter animation for stats
  const stats = document.querySelectorAll(".stat-number");
  const animateCounter = (element) => {
    const target = parseInt(element.textContent.replace("+", ""));
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent =
        Math.floor(current) + (element.textContent.includes("+") ? "+" : "");
    }, 40);
  };

  // Intersection observer for stats
  const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  });

  stats.forEach((stat) => {
    statsObserver.observe(stat);
  });

  // Typing effect for hero title
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    setTimeout(typeWriter, 500);
  }
}

// Modal functionality
function initModalFunctionality() {
  const modals = document.querySelectorAll(".modal");

  // Close modal when clicking outside
  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  // Close modal on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      modals.forEach((modal) => {
        modal.style.display = "none";
      });
    }
  });
}

// Open modal function
function openModal(type) {
  const modalMap = {
    consultation: "consultationModal",
    industrial: "consultationModal",
    research: "consultationModal",
    training: "consultationModal",
  };

  const modalId = modalMap[type];
  const modal = document.getElementById(modalId);

  if (modal) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";

    // Pre-fill project type if specific service was clicked
    if (type !== "consultation") {
      const projectTypeSelect = document.getElementById("project-type");
      if (projectTypeSelect) {
        projectTypeSelect.value = type;
      }
    }

    // Focus on first input
    const firstInput = modal.querySelector("input, select, textarea");
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 300);
    }
  }
}

// Close modal function
function closeModal(type) {
  const modalMap = {
    consultation: "consultationModal",
  };

  const modalId = modalMap[type];
  const modal = document.getElementById(modalId);

  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Form handling
function initFormHandling() {
  const consultationForm = document.querySelector(".consultation-form");

  if (consultationForm) {
    consultationForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleFormSubmission(this);
    });

    // Real-time form validation
    const inputs = consultationForm.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this);
      });
    });
  }
}

// Handle form submission
function handleFormSubmission(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
  submitBtn.disabled = true;

  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    // Success feedback
    showNotification(
      "Success! We'll contact you within 24 hours with a detailed proposal.",
      "success"
    );

    // Reset form
    form.reset();
    closeModal("consultation");

    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    // Track conversion (replace with actual analytics)
    trackConversion("form_submission", data);
  }, 2000);
}

// Field validation
function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = "";

  // Remove existing error styling
  field.classList.remove("error");
  const existingError = field.parentNode.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Validation rules
  switch (field.type) {
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = "Please enter a valid email address";
      }
      break;
    case "tel":
      const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = "Please enter a valid phone number";
      }
      break;
    default:
      if (field.required && !value) {
        isValid = false;
        errorMessage = "This field is required";
      }
  }

  // Show error if invalid
  if (!isValid) {
    field.classList.add("error");
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = errorMessage;
    errorDiv.style.color = "#ef4444";
    errorDiv.style.fontSize = "0.875rem";
    errorDiv.style.marginTop = "0.25rem";
    field.parentNode.appendChild(errorDiv);
  }

  return isValid;
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${
              type === "success" ? "fa-check-circle" : "fa-info-circle"
            }"></i>
            <span>${message}</span>
        </div>
    `;

  // Styles
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: type === "success" ? "#10b981" : "#2563eb",
    color: "white",
    padding: "1rem 1.5rem",
    borderRadius: "12px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    zIndex: "9999",
    transform: "translateX(400px)",
    transition: "transform 0.3s ease",
    maxWidth: "400px",
  });

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto remove
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Smooth scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Utility function for smooth scrolling
function scrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

// Analytics tracking (replace with your analytics service)
function trackConversion(event, data) {
  // Example: Google Analytics 4
  if (typeof gtag !== "undefined") {
    gtag("event", event, {
      event_category: "conversion",
      event_label: "consultation_request",
      value: 2000,
      custom_parameters: data,
    });
  }

  // Example: Facebook Pixel
  if (typeof fbq !== "undefined") {
    fbq("track", "Lead", {
      value: 2000,
      currency: "USD",
      content_name: "Consultation Request",
    });
  }

  // Console log for debugging
  console.log("Conversion tracked:", event, data);
}

// Performance optimization
function optimizePerformance() {
  // Lazy load images
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize performance optimizations
document.addEventListener("DOMContentLoaded", optimizePerformance);

// Contact form specific functionality
function initContactForm() {
  const contactBtns = document.querySelectorAll('[onclick*="openModal"]');

  contactBtns.forEach((btn) => {
    // Add click tracking
    btn.addEventListener("click", function () {
      trackConversion("button_click", {
        button_text: this.textContent.trim(),
        location: "hero_section",
      });
    });
  });
}

// Service card interactions
function initServiceCards() {
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-5px) scale(1)";
    });
  });
}

// Initialize all interactive elements
document.addEventListener("DOMContentLoaded", function () {
  initContactForm();
  initServiceCards();
});

// Add CSS for error states
const errorStyles = document.createElement("style");
errorStyles.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
`;
document.head.appendChild(errorStyles);

// Animation on scroll
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".about-image-wrapper, .about-text-content, .detail-item")
  .forEach((el) => {
    observer.observe(el);
  });

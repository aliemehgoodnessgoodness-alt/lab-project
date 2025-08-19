// JAVASCRIPT CODE - script.js

document.addEventListener("DOMContentLoaded", function () {
  // Navigation elements
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");
  const menuIcon = document.getElementById("menuIcon");
  const header = document.getElementById("header");

  // Navigation functionality
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all links and sections
      navLinks.forEach((l) => l.classList.remove("active"));
      sections.forEach((s) => s.classList.remove("active"));

      // Add active class to clicked link
      this.classList.add("active");

      // Show corresponding section with animation
      const targetSection = document.getElementById(
        this.getAttribute("data-section")
      );
      setTimeout(() => {
        targetSection.classList.add("active");
      }, 50);

      // Close mobile menu
      navMenu.classList.remove("active");
      menuIcon.textContent = "☰";

      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    menuIcon.textContent = navMenu.classList.contains("active") ? "✕" : "☰";
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-container")) {
      navMenu.classList.remove("active");
      menuIcon.textContent = "☰";
    }
  });

  // Header scroll effect
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScrollY = currentScrollY;
  });

  // CTA buttons functionality
  const ctaButtons = document.querySelectorAll(".btn-primary, .btn-secondary");
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const targetSection = this.getAttribute("data-section");
      if (targetSection) {
        e.preventDefault();

        // Remove active from all
        navLinks.forEach((l) => l.classList.remove("active"));
        sections.forEach((s) => s.classList.remove("active"));

        // Add active to corresponding nav link
        const correspondingNavLink = document.querySelector(
          `[data-section="${targetSection}"]`
        );
        if (correspondingNavLink) {
          correspondingNavLink.classList.add("active");
        }

        // Show target section
        const targetSectionElement = document.getElementById(targetSection);
        setTimeout(() => {
          targetSectionElement.classList.add("active");
        }, 50);

        // Smooth scroll to top
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    });
  });

  // Counter animation for stats
  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number");

    counters.forEach((counter) => {
      const target = parseInt(counter.textContent);
      const increment = target / 100;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent =
            target +
            (counter.textContent.includes("+") ? "+" : "") +
            (counter.textContent.includes("%") ? "%" : "");
          clearInterval(timer);
        } else {
          counter.textContent =
            Math.floor(current) +
            (counter.textContent.includes("+") ? "+" : "") +
            (counter.textContent.includes("%") ? "%" : "");
        }
      }, 20);
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("stats-section")) {
          animateCounters();
        }
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animations
  const animatedElements = document.querySelectorAll(
    ".feature-card, .stats-section, .content-card"
  );
  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // Add hover effects to feature cards
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-12px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Keyboard navigation support
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      navMenu.classList.remove("active");
      menuIcon.textContent = "☰";
    }
  });

  // Initialize animations on load
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

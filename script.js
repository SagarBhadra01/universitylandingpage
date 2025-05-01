document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("active");

      // Change the menu icon
      const icon = this.querySelector("i");
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      !nav.contains(e.target) &&
      !menuToggle.contains(e.target) &&
      nav.classList.contains("active")
    ) {
      nav.classList.remove("active");
      const icon = menuToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll(
    "nav ul li a, .footer-column ul li a"
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      // Only process internal links (those starting with #)
      if (targetId.startsWith("#")) {
        e.preventDefault();

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Close mobile menu if open
          if (nav.classList.contains("active")) {
            nav.classList.remove("active");
            const icon = menuToggle.querySelector("i");
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
          }

          // Calculate header height for offset
          const headerHeight = document.querySelector("header").offsetHeight;

          // Scroll to the target element
          window.scrollTo({
            top: targetElement.offsetTop - headerHeight,
            behavior: "smooth",
          });

          // Update active link
          navLinks.forEach((link) => link.classList.remove("active"));
          this.classList.add("active");
        }
      }
    });
  });

  // Update active navigation link on scroll
  window.addEventListener("scroll", function () {
    let current = "";
    const sections = document.querySelectorAll("section");
    const headerHeight = document.querySelector("header").offsetHeight;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Testimonial Carousel
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentSlide = 0;

  if (slides.length > 0 && dots.length > 0) {
    // Function to show a specific slide
    function showSlide(index) {
      // Hide all slides
      slides.forEach((slide) => slide.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));

      // Show the selected slide
      slides[index].classList.add("active");
      dots[index].classList.add("active");
      currentSlide = index;
    }

    // Event listeners for next and previous buttons
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
      });
    }

    // Event listeners for dot indicators
    dots.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        showSlide(index);
      });
    });

    // Auto slide every 5 seconds
    setInterval(function () {
      if (!document.hidden) {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      }
    }, 5000);
  }

  // Form Submission
  const contactForm = document.querySelector("#contact form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const name = this.querySelector("#name").value;
      const email = this.querySelector("#email").value;
      const message = this.querySelector("#message").value;

      // You would normally send this data to a server
      // For demo purposes, just log it and show a success message
      console.log("Form submitted with:", { name, email, message });

      // Show success message
      const successMessage = document.createElement("div");
      successMessage.className = "success-message";
      successMessage.textContent =
        "Thank you for your message! We will get back to you soon.";
      successMessage.style.backgroundColor = "#4CAF50";
      successMessage.style.color = "white";
      successMessage.style.padding = "15px";
      successMessage.style.marginTop = "20px";
      successMessage.style.borderRadius = "5px";
      successMessage.style.textAlign = "center";

      this.appendChild(successMessage);

      // Reset form
      this.reset();

      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    });
  }

  // Sticky Header
  const header = document.querySelector("header");
  const heroSection = document.querySelector("#hero");

  if (header && heroSection) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
      } else {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
      }
    });
  }

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll(
    ".about-item, .program-card, .campus-item"
  );

  function checkReveal() {
    const triggerBottom = window.innerHeight * 0.8;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < triggerBottom) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial state for reveal elements
  revealElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // Check on load and scroll
  window.addEventListener("load", checkReveal);
  window.addEventListener("scroll", checkReveal);
});

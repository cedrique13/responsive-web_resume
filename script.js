document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Navbar scroll effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Terminal typing animation
  const typingText = document.getElementById("typing-text");
  const commands = [
    "curl -X GET /api/users",
    "docker ps -a",
    "kubectl get pods",
    "git push origin main",
    "npm run build",
    "python manage.py runserver",
  ];

  let commandIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeCommand() {
    const currentCommand = commands[commandIndex];

    if (isDeleting) {
      typingText.textContent = currentCommand.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingText.textContent = currentCommand.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentCommand.length) {
      setTimeout(() => {
        isDeleting = true;
      }, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      commandIndex = (commandIndex + 1) % commands.length;
    }

    setTimeout(typeCommand, typingSpeed);
  }

  // Start typing animation after a delay
  setTimeout(typeCommand, 2500);

  // Form validation
  const contactForm = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  function validateName() {
    const name = nameInput.value.trim();
    if (name === "") {
      nameError.textContent = "Name is required";
      nameInput.parentElement.classList.add("error");
      return false;
    } else if (name.length < 2) {
      nameError.textContent = "Name must be at least 2 characters";
      nameInput.parentElement.classList.add("error");
      return false;
    } else {
      nameError.textContent = "";
      nameInput.parentElement.classList.remove("error");
      return true;
    }
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      emailError.textContent = "Email is required";
      emailInput.parentElement.classList.add("error");
      return false;
    } else if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address";
      emailInput.parentElement.classList.add("error");
      return false;
    } else {
      emailError.textContent = "";
      emailInput.parentElement.classList.remove("error");
      return true;
    }
  }

  function validateMessage() {
    const message = messageInput.value.trim();
    if (message === "") {
      messageError.textContent = "Message is required";
      messageInput.parentElement.classList.add("error");
      return false;
    } else if (message.length < 10) {
      messageError.textContent = "Message must be at least 10 characters";
      messageInput.parentElement.classList.add("error");
      return false;
    } else {
      messageError.textContent = "";
      messageInput.parentElement.classList.remove("error");
      return true;
    }
  }

  // Real-time validation
  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  messageInput.addEventListener("blur", validateMessage);

  // Form submission
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
      // Simulate form submission
      const submitButton = contactForm.querySelector(".btn-primary");
      const originalText = submitButton.textContent;

      submitButton.textContent = "Sending...";
      submitButton.disabled = true;

      setTimeout(() => {
        alert("Thank you for your message! I'll get back to you soon.");
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 1500);
    }
  });

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Add scroll animation classes to elements
  const animateElements = document.querySelectorAll(
    ".skill-category, .timeline-item, .education-item, .contact-item"
  );
  animateElements.forEach((el, index) => {
    if (index % 2 === 0) {
      el.classList.add("fade-in-left");
    } else {
      el.classList.add("fade-in-right");
    }
    observer.observe(el);
  });

  // Add fade-in-up animation to section titles
  const sectionTitles = document.querySelectorAll(".section-title");
  sectionTitles.forEach((title) => {
    title.classList.add("fade-in-up");
    observer.observe(title);
  });

  // Skill tags hover effect
  const skillTags = document.querySelectorAll(".skill-tag");
  skillTags.forEach((tag) => {
    tag.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)";
    });

    tag.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add active class to current section in navigation
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  // Parallax effect for hero section
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  });

  // Add loading animation
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");
  });
});

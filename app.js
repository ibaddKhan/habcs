document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle with animation and icon change
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = mobileMenuButton.querySelector("i");

  mobileMenuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("open");
    mobileMenu.classList.toggle("open");

    // Toggle icon between hamburger and X
    if (isOpen) {
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    } else {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-xmark");
    }
  });

  // Hide mobile menu on link click
  // Close menu when a link is clicked
  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    });
  });
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -10px 0px",
    }
  );
  document.querySelectorAll(".fade-in-on-scroll").forEach((el) => {
    observer.observe(el);
  });
  // Contact Form Submission Handling
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    console.log("--- Form Submission Details ---");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("-----------------------------");

    const messageBox = document.getElementById("messageBox");
    messageBox.textContent =
      "Thank you for your message! We will get back to you shortly.";
    messageBox.classList.add("show");

    setTimeout(() => {
      messageBox.classList.remove("show");
    }, 5000);

    this.reset();
  });

  // Show sample message on load
  const messageBox = document.getElementById("messageBox");
  messageBox.textContent = "Welcome to HABC! How can we assist you?";
  messageBox.classList.add("show");
  setTimeout(() => {
    messageBox.classList.remove("show");
  }, 4000);
});

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
  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    });
  });

  // Intersection Observer for fade-in
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

/* ---------- IMAGE STACK CARDS ---------- */
const cards = document.querySelectorAll(".image-stack .card");
let activeIndex = 0;
let autoSlide;
let startX_stack = 0;
let endX_stack = 0;

function setCardPositions() {
  cards.forEach((card, i) => {
    let offset = (i - activeIndex) * 30;
    card.style.setProperty("--offset", `${offset}px`);
    card.classList.toggle("active", i === activeIndex);
  });
}

function nextCard() {
  activeIndex = (activeIndex + 1) % cards.length;
  setCardPositions();
}

function prevCard() {
  activeIndex = (activeIndex - 1 + cards.length) % cards.length;
  setCardPositions();
}

cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    activeIndex = index;
    setCardPositions();
    resetAutoSlide();
  });
});

// Swipe detection for touch devices
const imageStack = document.querySelector(".image-stack");

imageStack.addEventListener("touchstart", (e) => {
  startX_stack = e.touches[0].clientX;
});

imageStack.addEventListener("touchend", (e) => {
  endX_stack = e.changedTouches[0].clientX;
  handleSwipeStack();
});

function handleSwipeStack() {
  let diff = endX_stack - startX_stack;
  if (Math.abs(diff) > 50) {
    if (diff < 0) {
      nextCard();
    } else {
      prevCard();
    }
    resetAutoSlide();
  }
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextCard, 3000);
}

setCardPositions();
resetAutoSlide();

document.getElementById("prev-btn").addEventListener("click", () => {
  prevCard();
  resetAutoSlide();
});

document.getElementById("next-btn").addEventListener("click", () => {
  nextCard();
  resetAutoSlide();
});

var swiper = new Swiper(".mySwiper", {
  loop: true,
  speed: 800,
  slidesPerView: 1,
  spaceBetween: 20,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
    },
  },
});

function openModal(src) {
  document.getElementById("modalImg").src = src;
  document.getElementById("imageModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("imageModal").classList.add("hidden");
}

// Close modal when clicking outside the image
document.getElementById("imageModal").addEventListener("click", function (e) {
  if (e.target.id === "imageModal") {
    closeModal();
  }
});

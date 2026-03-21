const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
const yearEl = document.getElementById("year");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light" || savedTheme === "dark") {
  root.setAttribute("data-theme", savedTheme);
}

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", nextTheme);
  localStorage.setItem("portfolio-theme", nextTheme);
});

menuToggle?.addEventListener("click", () => {
  nav?.classList.toggle("open");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -30px 0px",
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
  revealObserver.observe(item);
});

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const form = document.querySelector(".contact-form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const submitButton = form.querySelector("button[type='submit']");
  if (submitButton) {
    const originalText = submitButton.textContent;
    submitButton.textContent = "Message Sent";
    submitButton.setAttribute("disabled", "true");

    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.removeAttribute("disabled");
      form.reset();
    }, 1400);
  }
});

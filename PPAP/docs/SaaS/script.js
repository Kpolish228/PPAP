const navToggle = document.getElementById("nav-toggle");
const nav = document.getElementById("site-nav");
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const savedTheme = localStorage.getItem("theme-mode");
if (savedTheme === "light" || savedTheme === "dark") {
  root.setAttribute("data-theme", savedTheme);
}

const syncThemeLabel = () => {
  const isLight = root.getAttribute("data-theme") === "light";
  themeToggle.textContent = isLight ? "Dark" : "Light";
};

if (themeToggle) {
  syncThemeLabel();

  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme-mode", next);
    syncThemeLabel();
  });
}

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
    threshold: 0.14,
  }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

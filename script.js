// Theme toggle
const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
  const html = document.documentElement;
  const isDark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", isDark ? "light" : "dark");
  themeBtn.textContent = isDark ? "🌙" : "☀️";
});

// Mobile nav toggle
const menuBtn = document.getElementById("menu-btn");
const nav = document.querySelector(".nav");
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  nav.classList.toggle("open");
});

// Smooth scroll + active link
const links = document.querySelectorAll(".nav-link");
links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    nav.classList.remove("open");
    menuBtn.classList.remove("open");
  });
});

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
const revealOnScroll = () => {
  for (let r of reveals) {
    const rect = r.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) r.classList.add("reveal-visible");
  }
};
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// Typed effect (basic version)
const typedWords = ["Web Development", "Machine Learning", "Software Engineering"];
let typedIndex = 0, wordIndex = 0, current = "", isDeleting = false;
const typedEl = document.getElementById("typed");

function type() {
  const word = typedWords[wordIndex];
  if (isDeleting) {
    current = word.substring(0, typedIndex--);
  } else {
    current = word.substring(0, typedIndex++);
  }
  typedEl.textContent = current;

  if (!isDeleting && typedIndex === word.length) {
    isDeleting = true;
    setTimeout(type, 1200);
    return;
  } else if (isDeleting && typedIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typedWords.length;
  }
  setTimeout(type, isDeleting ? 80 : 120);
}
type();

// Animate skill bars
const bars = document.querySelectorAll(".bar__fill");
function animateBars() {
  bars.forEach(bar => {
    bar.style.width = bar.getAttribute("data-width");
  });
}
window.addEventListener("load", animateBars);

// Project filtering
const filterBtns = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project");
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    projects.forEach(p => {
      if (filter === "all" || p.dataset.cat === filter) {
        p.classList.remove("hide");
      } else {
        p.classList.add("hide");
      }
    });
  });
});

// Contact form validation
const form = document.getElementById("contact-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  [name, email, message].forEach(field => {
    const error = field.nextElementSibling;
    if (!field.value.trim()) {
      error.textContent = "This field is required";
      valid = false;
    } else {
      error.textContent = "";
    }
  });

  if (valid) {
    document.querySelector(".form__status").textContent = "✅ Message sent successfully!";
    form.reset();
  }
});

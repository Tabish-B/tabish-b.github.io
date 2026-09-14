const backToTop = document.getElementById("back-to-top");
const navbar = document.getElementById("navbar");

let lastScrollPosition = 0;

function initializeTwoStateThemeToggle() {
  const themeToggle = document.getElementById("light-toggle");
  if (!themeToggle || typeof setThemeSetting !== "function") {
    return;
  }

  if (document.documentElement.dataset.themeSetting === "system") {
    setThemeSetting(typeof determineComputedTheme === "function" ? determineComputedTheme() : "light");
  }

  themeToggle.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      setThemeSetting(nextTheme);
    },
    true
  );
}

function getCurrentScrollPosition() {
  return window.pageYOffset || document.documentElement.scrollTop || 0;
}

function getScrollProgress() {
  const distanceToScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
  if (distanceToScroll === 0) {
    return 0;
  }

  return Math.min(Math.max(getCurrentScrollPosition() / distanceToScroll, 0), 1);
}

function updateScrollChrome() {
  const scrollPosition = getCurrentScrollPosition();
  const scrollProgress = getScrollProgress();

  if (backToTop) {
    backToTop.style.setProperty("--scroll-progress", `${scrollProgress * 100}%`);
  }

  if (navbar && scrollPosition <= 0) {
    navbar.classList.remove("navbar-hidden");
  } else if (navbar && scrollPosition > lastScrollPosition) {
    navbar.classList.add("navbar-hidden");
  } else if (navbar && scrollPosition < lastScrollPosition) {
    navbar.classList.remove("navbar-hidden");
  }

  lastScrollPosition = scrollPosition;
}

function initializeScrollChrome() {
  lastScrollPosition = getCurrentScrollPosition();
  updateScrollChrome();
}

window.addEventListener("load", initializeScrollChrome);
window.addEventListener("load", initializeTwoStateThemeToggle);
window.addEventListener("scroll", updateScrollChrome, { passive: true });
window.addEventListener("resize", updateScrollChrome);

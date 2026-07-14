(function () {
  "use strict";

  var STORAGE_KEY = "theme";
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
  }

  var stored = localStorage.getItem(STORAGE_KEY);
  applyTheme(stored === "light" ? "light" : "dark");

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach(function (el) {
    observer.observe(el);
  });
})();

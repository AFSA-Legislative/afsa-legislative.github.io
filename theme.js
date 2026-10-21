/* Apply a saved light or dark choice before the page paints. Without a saved choice, the page stays in light mode. */
(function () {
  try {
    var t = localStorage.getItem("afsa-theme");
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
  } catch (e) { /* storage unavailable: stay in light mode */ }
})();

/* Apply a saved light or dark choice before the page paints. Without a saved choice, the page follows the device setting. */
(function () {
  try {
    var t = localStorage.getItem("afsa-theme");
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
  } catch (e) { /* storage unavailable: follow the device setting */ }
})();

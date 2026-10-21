/* AFSA Chapter Legislative Playbook: copy buttons, member lookups, template personalizer.
   Every page works without this file; it only adds conveniences. */
(function () {
  "use strict";

  // Screen-reader announcements for copy results
  var live = document.createElement("p");
  live.className = "sr";
  live.setAttribute("aria-live", "polite");
  document.body.appendChild(live);
  function announce(msg) { live.textContent = ""; setTimeout(function () { live.textContent = msg; }, 50); }

  function selectNode(el) {
    try {
      var r = document.createRange();
      r.selectNodeContents(el);
      var s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
    } catch (e) { /* selection not available */ }
  }
  function flash(btn, label) {
    var orig = btn.getAttribute("data-label") || btn.textContent;
    btn.setAttribute("data-label", orig);
    btn.textContent = label;
    setTimeout(function () { btn.textContent = orig; }, 1800);
  }
  function copyText(text, el, btn) {
    var p;
    try { p = navigator.clipboard.writeText(text); } catch (e) { p = Promise.reject(e); }
    p.then(function () {
      flash(btn, "Copied");
      announce("Copied to clipboard");
    }).catch(function () {
      selectNode(el);
      flash(btn, "Selected, press Ctrl+C");
      announce("Text selected. Press Control C or Command C to copy.");
    });
  }

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.hidden = false;
    btn.addEventListener("click", function () {
      var el = document.getElementById(btn.getAttribute("data-copy"));
      if (el) copyText(el.innerText, el, btn);
    });
  });

  document.querySelectorAll("[data-copy-focus]").forEach(function (btn) {
    btn.hidden = false;
    btn.addEventListener("click", function () {
      var d = btn.closest("details");
      var items = Array.prototype.map.call(d.querySelectorAll("li"), function (li) { return "• " + li.textContent.trim(); });
      var text = d.querySelector(".t").textContent + "\n" + d.querySelector(".g").textContent + "\n\n" + items.join("\n") +
        "\n\nSource: AFSA 2026–27 Legislative Platform";
      copyText(text, d.querySelector("ul"), btn);
    });
  });

  // This year's top priorities: copy one priority, or all of them
  function prioText(article) {
    var title = article.querySelector("h4").textContent.trim();
    var bills = article.querySelector(".bill").textContent.replace(/\s+/g, " ").trim();
    var pts = Array.prototype.map.call(article.querySelectorAll(".points li"), function (li) {
      return "• " + li.textContent.replace(/\s+/g, " ").trim();
    });
    return title + "\n" + bills + "\n" + pts.join("\n");
  }
  var PRIO_SOURCE = "\n\nSource: AFSA 2026 Hill Day priorities (figures as of March 2026)";
  document.querySelectorAll("[data-copy-prio]").forEach(function (btn) {
    btn.hidden = false;
    btn.addEventListener("click", function () {
      var a = btn.closest(".prio-item");
      copyText(prioText(a) + PRIO_SOURCE, a.querySelector(".points"), btn);
    });
  });
  document.querySelectorAll("[data-copy-prio-all]").forEach(function (btn) {
    btn.hidden = false;
    btn.addEventListener("click", function () {
      var parts = [];
      document.querySelectorAll(".prio").forEach(function (col) {
        parts.push(col.querySelector("h3").textContent.trim().toUpperCase());
        col.querySelectorAll(".prio-item").forEach(function (a) { parts.push(prioText(a)); });
      });
      var grid = document.querySelector(".prio-grid");
      copyText("AFSA TOP PRIORITIES\n\n" + parts.join("\n\n") + PRIO_SOURCE, grid, btn);
    });
  });

  // Light and dark mode toggle
  var toggle = document.getElementById("themeToggle");
  if (toggle) {
    var root = document.documentElement;
    var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    function isDark() {
      var t = root.getAttribute("data-theme");
      if (t) return t === "dark";
      return !!(mq && mq.matches);
    }
    function sync() { toggle.setAttribute("aria-pressed", isDark() ? "true" : "false"); }
    toggle.hidden = false;
    sync();
    toggle.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("afsa-theme", next); } catch (e) { /* choice lasts for this page only */ }
      sync();
    });
    if (mq && mq.addEventListener) mq.addEventListener("change", sync);
  }

  // Representative lookup (the form also works without JavaScript)
  var zipForm = document.getElementById("zipForm");
  if (zipForm) {
    var zip = document.getElementById("zip");
    var zipErr = document.getElementById("zipErr");
    zipForm.addEventListener("submit", function (e) {
      if (!/^\d{5}$/.test(zip.value.trim())) {
        e.preventDefault();
        zipErr.hidden = false;
        zip.setAttribute("aria-invalid", "true");
        zip.focus();
      } else {
        zipErr.hidden = true;
        zip.removeAttribute("aria-invalid");
      }
    });
  }

  // Senator lookup: build the Senate.gov state link
  var states = [["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],["CA","California"],["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],["FL","Florida"],["GA","Georgia"],["HI","Hawaii"],["ID","Idaho"],["IL","Illinois"],["IN","Indiana"],["IA","Iowa"],["KS","Kansas"],["KY","Kentucky"],["LA","Louisiana"],["ME","Maine"],["MD","Maryland"],["MA","Massachusetts"],["MI","Michigan"],["MN","Minnesota"],["MS","Mississippi"],["MO","Missouri"],["MT","Montana"],["NE","Nebraska"],["NV","Nevada"],["NH","New Hampshire"],["NJ","New Jersey"],["NM","New Mexico"],["NY","New York"],["NC","North Carolina"],["ND","North Dakota"],["OH","Ohio"],["OK","Oklahoma"],["OR","Oregon"],["PA","Pennsylvania"],["RI","Rhode Island"],["SC","South Carolina"],["SD","South Dakota"],["TN","Tennessee"],["TX","Texas"],["UT","Utah"],["VT","Vermont"],["VA","Virginia"],["WA","Washington"],["WV","West Virginia"],["WI","Wisconsin"],["WY","Wyoming"]];
  var stateWrap = document.getElementById("stateWrap");
  if (stateWrap) {
    var sel = document.getElementById("state");
    var go = document.getElementById("stateGo");
    var err = document.getElementById("stateErr");
    stateWrap.hidden = false;
    states.forEach(function (s) {
      var o = document.createElement("option");
      o.value = s[0];
      o.textContent = s[1];
      sel.appendChild(o);
    });
    sel.addEventListener("change", function () {
      if (sel.value) {
        go.href = "https://www.senate.gov/states/" + sel.value + "/intro.htm";
        err.hidden = true;
      }
    });
    go.addEventListener("click", function (e) {
      if (!sel.value) { e.preventDefault(); err.hidden = false; sel.focus(); }
    });
  }

  // Template personalizer
  var panel = document.getElementById("persona");
  if (panel) {
    panel.hidden = false;
    var defaults = {};
    document.querySelectorAll(".tpl [data-k]").forEach(function (span) {
      var k = span.getAttribute("data-k");
      if (!(k in defaults)) defaults[k] = span.textContent;
    });
    panel.querySelectorAll("input[data-key]").forEach(function (inp) {
      inp.addEventListener("input", function () {
        var k = inp.getAttribute("data-key");
        var v = inp.value.trim();
        document.querySelectorAll('.tpl [data-k="' + k + '"]').forEach(function (span) {
          span.textContent = v || defaults[k];
          span.classList.toggle("filled", !!v);
        });
      });
    });
  }
})();

// Hamburger menu: toggles the category menu, closes on outside click / Escape / link click.
// On the homepage, category links apply the filter without reloading; elsewhere they go to index.html with a query.
(function () {
  function init() {
    var btn = document.getElementById("menuBtn");
    var menu = document.getElementById("siteMenu");
    if (!btn || !menu) return;
    function close() { menu.classList.add("hidden"); btn.setAttribute("aria-expanded", "false"); }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = menu.classList.toggle("hidden") === false;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!menu.classList.contains("hidden") && !menu.contains(e.target) && e.target !== btn) close();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    menu.querySelectorAll("a[data-menu-type], a[data-menu-audience]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        // Homepage: apply filter in place
        if (window.mgaSetFilter) {
          e.preventDefault();
          var type = a.getAttribute("data-menu-type");
          var aud = a.getAttribute("data-menu-audience");
          if (type) window.mgaSetFilter("type", type);
          if (aud) window.mgaSetFilter("audience", aud);
          if (type === "all" && !aud) window.mgaSetFilter("audience", "all");
          close();
          var grid = document.querySelector(".games-grid");
          if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          close();
        }
      });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

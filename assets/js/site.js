// SerialLoom website: mobile menu, reveal-on-scroll, and the latest-release download link.
(function () {
  var doc = document.documentElement;
  doc.classList.add("js");

  // Mobile menu
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  if (header && toggle) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    header.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Reveal sections as they scroll into view
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  } else {
    items.forEach(function (el) {
      el.classList.add("in");
    });
  }

  // Point download buttons at the newest installer. The static links already
  // go to the latest GitHub release, so this only makes them one click shorter.
  var KEY = "serialloom.latest";
  function apply(rel) {
    if (!rel || !rel.tag) return;
    document.querySelectorAll("[data-version]").forEach(function (el) {
      el.textContent = rel.tag;
    });
    if (rel.url) {
      document.querySelectorAll("a[data-download]").forEach(function (a) {
        a.href = rel.url;
      });
    }
  }
  var cached = null;
  try {
    cached = JSON.parse(sessionStorage.getItem(KEY) || "null");
  } catch (e) {}
  if (cached) {
    apply(cached);
  } else if (window.fetch && document.querySelector("[data-download], [data-version]")) {
    fetch("https://api.github.com/repos/RahulP5/SerialLoom/releases/latest", {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then(function (r) {
        return r.ok ? r.json() : null;
      })
      .then(function (data) {
        if (!data || !data.tag_name) return;
        var asset = (data.assets || []).find(function (a) {
          return /x64-setup\.exe$/i.test(a.name);
        });
        var rel = { tag: data.tag_name, url: asset ? asset.browser_download_url : null };
        try {
          sessionStorage.setItem(KEY, JSON.stringify(rel));
        } catch (e) {}
        apply(rel);
      })
      .catch(function () {});
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();

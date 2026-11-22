/* Behavior for kwametaylor.github.io. Content comes from content.js. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var page = document.body.dataset.page;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function num(k) { return (k < 9 ? "0" : "") + (k + 1); }

  /* Light and dark. Follows the device setting until the visitor picks one. */
  var themeBtn = $("#theme");
  function isDark() {
    var t = document.documentElement.dataset.theme;
    return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function labelTheme() {
    if (!themeBtn) return;
    themeBtn.textContent = isDark() ? "Light" : "Dark";
    themeBtn.setAttribute("aria-label", "Switch to " + (isDark() ? "light" : "dark") + " mode");
  }
  if (themeBtn) {
    labelTheme();
    themeBtn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
      labelTheme();
    });
  }

  /* Clock in the menu bar, Los Angeles time. */
  var clock = $("#clock");
  if (clock) {
    var tick = function () {
      clock.textContent = "Los Angeles " + new Date().toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour: "numeric", minute: "2-digit" });
    };
    tick(); setInterval(tick, 30000);
  }

  /* Portrait: use the image from content.js when there is one. */
  if (S.portrait) {
    $$(".photo").forEach(function (p) {
      var img = new Image();
      img.src = S.portrait; img.alt = "Portrait of Kwame V. Taylor";
      p.appendChild(img); p.classList.add("has");
      p.removeAttribute("role"); p.removeAttribute("aria-label");
    });
  }

  /* Rotating phrase. */
  var sw = $(".swap");
  if (sw && S.phrases && S.phrases.length) {
    sw.innerHTML = S.phrases.map(function (p) { return '<span class="sz" aria-hidden="true">' + esc(p) + "</span>"; }).join("") +
      '<span class="on">' + esc(S.phrases[0]) + "</span>";
    var on = $(".on", sw), k = 0;
    if (S.phrases.length > 1 && !reduce) {
      setInterval(function () {
        on.classList.add("out");
        setTimeout(function () {
          k = (k + 1) % S.phrases.length;
          on.textContent = S.phrases[k];
          on.classList.remove("out"); on.classList.add("in");
          void on.offsetWidth;
          on.classList.remove("in");
        }, 380);
      }, 3000);
    }
  }

  /* Up and down arrows move through a list; Enter opens the current item. */
  function arrowList(count, set, open) {
    var cur = 0;
    function go(i, byKey) { cur = (i + count) % count; set(cur, !!byKey); }
    addEventListener("keydown", function (e) {
      if (e.target.matches("input, textarea, select")) return;
      if (e.key === "ArrowDown") { go(cur + 1, true); e.preventDefault(); }
      else if (e.key === "ArrowUp") { go(cur - 1, true); e.preventDefault(); }
      else if (e.key === "Enter" && document.activeElement === document.body && open) open(cur);
    });
    return { go: go, cur: function () { return cur; } };
  }

  /* The services picked for the home page, falling back to the first four */
  var homeSvc = (function () {
    var all = S.services || [], pick = (S.homeServices || []).map(function (n) { return all.filter(function (s) { return s.name === n; })[0]; }).filter(Boolean);
    return pick.length ? pick.slice(0, 4) : all.slice(0, 4);
  })();

  /* Small widgets, on whichever page they appear */
  /* Business card: the front, then a different figure from the back on each flip */
  var cards = $$(".flip").map(function (btn) {
    var img = $(".face.b img", btn), win = btn.closest(".win"), label = win && $(".figno", win), fi = 0, F = S.figures || [];
    var draw = function () {
      img.src = "assets/img/card/fig-" + (fi + 1) + ".png";
      img.alt = "Fig. " + (fi + 1) + " of 7 from the back of the card" + (F[fi] ? ": " + F[fi][0] + ". Source: " + F[fi][1] + "." : ".");
    };
    var showing = function () { return btn.getAttribute("aria-pressed") === "true"; };
    var note = btn.parentNode.querySelector(".cardnote");
    var sync = function () { if (label) label.textContent = showing() ? "Fig. " + (fi + 1) + " of 7" : "Front"; if (note) note.hidden = showing(); };
    draw();
    btn.addEventListener("click", function () {
      var back = showing();
      btn.setAttribute("aria-pressed", !back);
      if (back) setTimeout(function () { fi = (fi + 1) % 7; draw(); }, 350);
      sync();
    });
    return { show: function (n) { fi = n; draw(); btn.setAttribute("aria-pressed", "true"); sync(); } };
  });
  if ($("#wr")) {
    $("#wr").addEventListener("input", function (e) { $("#aa").style.setProperty("--w", e.target.value); $("#wv").textContent = "Weight " + e.target.value; });

  }
  if ($("#bar")) {
    $("#bar").addEventListener("input", function (e) { $("#ba").style.setProperty("--p", e.target.value); });

  }

  /* Full screen. A page can only enter it from a click, and it ends when the visitor opens another page. */
  var de = document.documentElement;
  var fsEnter = de.requestFullscreen || de.webkitRequestFullscreen;
  var fsExit = document.exitFullscreen || document.webkitExitFullscreen;
  var fsOn = function () { return !!(document.fullscreenElement || document.webkitFullscreenElement); };
  var fsToggle = function () {
    try { var r = fsOn() ? fsExit.call(document) : fsEnter.call(de); if (r && r.catch) r.catch(function () {}); } catch (e) {}
  };
  var fsBtn = $("#fsbtn");
  if (fsEnter && fsBtn) {
    fsBtn.hidden = false;
    fsBtn.addEventListener("click", fsToggle);
    var fsSync = function () {
      var on = fsOn();
      fsBtn.setAttribute("aria-pressed", on); fsBtn.setAttribute("aria-label", on ? "Exit full screen" : "Full screen");
      setTimeout(function () { window.dispatchEvent(new Event("resize")); }, 120);
    };
    document.addEventListener("fullscreenchange", fsSync); document.addEventListener("webkitfullscreenchange", fsSync);
  }
  /* ===== Phones: a Menu button on every page ===== */
  var phone = matchMedia("(max-width: 700px)");
  var bar = $(".bar");
  if (bar) {
    var mb = document.createElement("button");
    mb.className = "menubtn"; mb.type = "button"; mb.setAttribute("aria-expanded", "false"); mb.setAttribute("aria-controls", "msheet");
    mb.innerHTML = "Menu <i aria-hidden=\"true\"></i>";
    bar.appendChild(mb);
    var here = page === "thanks" ? "contact" : page;
    var links = [["index", "Home"], ["services", "Services"], ["projects", "Projects"], ["design", "Design work"], ["about", "About"], ["contact", "Contact"]];
    var sh = document.createElement("div");
    sh.className = "msheet"; sh.id = "msheet";
    sh.innerHTML = '<div class="win" role="dialog" aria-label="Menu"><div class="tb">Kwame V. Taylor / Site</div><nav aria-label="Pages">' +
      links.map(function (l) { var on = l[0] === here || (l[0] === "index" && here === "home"); return '<a href="' + (page === "404" ? "/" : "") + l[0] + '.html"' + (on ? ' aria-current="page"' : "") + "><span>" + l[1] + "</span><small>" + (on ? "You are here" : "") + "</small></a>"; }).join("") +
      '</nav><div class="mfoot"><button type="button" class="mtheme"></button><span><a href="https://www.linkedin.com/in/kwame-v-taylor" target="_blank" rel="noopener">LinkedIn</a><a href="https://github.com/KwameTaylor" target="_blank" rel="noopener">GitHub</a></span></div></div>';
    document.body.appendChild(sh);
    var mt = $(".mtheme", sh);
    var mtLabel = function () { mt.textContent = isDark() ? "Light mode" : "Dark mode"; };
    var setSheet = function (on) {
      sh.classList.toggle("on", on); mb.setAttribute("aria-expanded", on);
      if (on) { mtLabel(); $("nav a", sh).focus(); }
    };
    mb.addEventListener("click", function () { setSheet(!sh.classList.contains("on")); });
    sh.addEventListener("click", function (e) { if (e.target === sh) setSheet(false); });
    mt.addEventListener("click", function () { if (themeBtn) themeBtn.click(); mtLabel(); });
    addEventListener("keydown", function (e) { if (e.key === "Escape" && sh.classList.contains("on")) { setSheet(false); mb.focus(); } });
  }

  /* Start menu on the home taskbar */
  var sb = $("#startbtn"), sm = $("#startmenu");
  if (sb) {
    var setMenu = function (open) { sm.hidden = !open; sb.setAttribute("aria-expanded", open); };
    sb.addEventListener("click", function (e) { e.stopPropagation(); setMenu(sm.hidden); if (!sm.hidden) $("a", sm).focus(); });
    document.addEventListener("click", function (e) { if (!e.target.closest(".start")) setMenu(false); });
    addEventListener("keydown", function (e) { if (e.key === "Escape" && !sm.hidden) { setMenu(false); sb.focus(); } });
  }

  /* Home: always start from the default layout. A browser can restore a page from memory when the
     visitor comes back to it (Back button, reopened tab), which would bring back moved or minimized
     windows, so reload it fresh instead. Light or dark mode is kept; it is stored separately. */
  if (page === "home") addEventListener("pageshow", function (e) { if (e.persisted) location.reload(); });

  /* Home */
  if (page === "home") {
    var svc = $("#svc");
    if (svc && S.services) svc.innerHTML = homeSvc.map(function (s) {
      return '<li><a href="services.html#' + slug(s.name) + '">' + esc(s.name) + "</a></li>";
    }).join("");
    if (S.projects) $("#pcount").textContent = S.projects.length + " items";


    /* Site window: arrow keys */
    var files = $$("#files a");
    var fl = arrowList(files.length, function (c) {
      files.forEach(function (a, j) { a.classList.toggle("cur", j === c); });
    }, function (c) { files[c].click(); });
    files.forEach(function (a, j) {
      a.addEventListener("mouseenter", function () { fl.go(j); });
      a.addEventListener("focus", function () { fl.go(j); });
    });

    /* Design folder */
    if (S.design) $("#folder").innerHTML = S.design.slice(0, 6).map(function (d) {
      return '<a href="design.html"><i class="' + (d.tone === "k" ? "k" : "") + '" aria-hidden="true">' + esc(d.glyph || "") + "</i>" + esc(d.type) + "</a>";
    }).join("");

    /* Swatches: the accent color, remembered */
    var colors = [["#ffe24a", "Yellow"], ["#c9b3ec", "Lavender"], ["#a9c8ee", "Sky"], ["#f1c3e8", "Orchid"], ["#d99a6c", "Clay"], ["#cfd3d8", "Silver"]];
    var current = (getComputedStyle(document.documentElement).getPropertyValue("--sel") || "").trim().toLowerCase();
    var sw = $("#sw");
    sw.innerHTML = colors.map(function (c) {
      return '<button type="button" style="--c:' + c[0] + '" data-c="' + c[0] + '" aria-label="' + c[1] + '" aria-pressed="' + (c[0] === current) + '"></button>';
    }).join("");
    sw.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      document.documentElement.style.setProperty("--sel", b.dataset.c);
      try { sessionStorage.setItem("accent", b.dataset.c); } catch (err) {}
      $$("button", sw).forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
    });

    /* Terminal */
    var tout = $("#tout"), ti = $("#ti"), pages = ["services", "projects", "design", "about", "contact"];
    if (S.tips && S.tips.length) {
      var tp = document.createElement("p"); tp.className = "tip";
      tp.textContent = S.tips[Math.floor(Math.random() * S.tips.length)];
      tout.appendChild(tp);
    }
    var say = function (t) { var p = document.createElement("p"); p.innerHTML = t; tout.appendChild(p); tout.scrollTop = 1e6; };
    var stop = "a an the is are was were do does did i you he his him they them their what whats who where when how which can could tell me about of in on at for to and or with has have kwame kwames s".split(" ");
    var words = function (t) { return t.toLowerCase().replace(/[^a-z0-9$+ ]/g, " ").split(/\s+/).filter(function (x) { return x && stop.indexOf(x) < 0; }); };
    var answer = function (q) {
      var qw = words(q), best = null, bestScore = 0;
      (S.facts || []).forEach(function (f) {
        var score = 0;
        f.keys.forEach(function (k) { k.split(" ").every(function (p) { return qw.some(function (w) { return w === p || (p.length > 4 && w.indexOf(p) === 0); }); }) && (score += k.split(" ").length); });
        if (score > bestScore) { bestScore = score; best = f; }
      });
      if (!qw.length && (S.facts || []).length) return S.facts[0].a;
      return best ? best.a : "I don't have that on file. Ask them yourself: type open contact.";
    };
    $("#tf").addEventListener("submit", function (e) {
      e.preventDefault();
      var v = ti.value.trim(), w = v.toLowerCase().split(/\s+/); ti.value = "";
      if (!v) return;
      say("<b>kwame $</b> " + esc(v));
      /* less, more, head, tail, and bat read a file the same way cat does */
      var reader = /^(less|more|head|tail|bat)$/.test(w[0]) ? w[0] : "cat";
      if (reader !== "cat") { w = ["cat", w[w.length - 1] === w[0] ? "" : w[w.length - 1]]; }
      if (w[0] === "help") say("This is Kwame's desktop. Ask me about them in plain words, for example: what did Kwame do at GiveDirectly? What do they build? Commands: ls, open &lt;page&gt;, clear.");
      else if (w[0] === "ls" && (w[1] === "-a" || w[1] === "-la" || w[1] === "-al")) say(".  ..  .secrets  " + pages.map(function (p) { return p + ".html"; }).join("  "));
      else if (w[0] === "ls") say(pages.map(function (p) { return p + ".html"; }).join("  "));
      else if (/^(nano|vim|vi|emacs|edit)$/.test(w[0])) say(esc(w[0]) + ": " + esc(w[1] || "file") + " is read-only. You can look, but you can't touch.");
      else if (w[0] === "cat" && w[1] === ".secrets") say("Things this terminal understands that help won't tell you:\n" + (S.secrets || []).join(", ") + "\n...and a few more.");
      else if (w[0] === "cat") say(reader + ": " + esc(w[1] || "") + ": No such file. Try ls -a.");
      else if (w[0] === "open" && pages.indexOf(w[1]) > -1) { say("Opening " + w[1] + "..."); location.href = w[1] + ".html"; }
      else if (w[0] === "open") say("No page called " + esc(w[1] || "") + ". Try ls.");
      else if (w[0] === "clear") tout.innerHTML = "";
      else if (!egg(v)) say(esc(answer(v)));
    });
    $("#term").addEventListener("click", function (e) { if (!e.target.closest("a")) ti.focus(); });

    /* Windows: drag by the title bar, minimize to the dock, restore from it */
    var z = 10, dock = $("#dock"), desk = $(".desk");
    /* Keep a window's bottom edge inside the desktop so the page never scrolls on a laptop screen. */
    var fit = function (w) {
      if (innerWidth <= 900 || w.classList.contains("min") || w.hasAttribute("data-moved")) return;
      w.style.top = "";
      var bar = $(".taskbar"), limit = bar ? bar.getBoundingClientRect().top : innerHeight;
      var room = limit - desk.getBoundingClientRect().top - 28;
      if (w.offsetTop + w.offsetHeight > room) w.style.top = Math.max(8, room - w.offsetHeight) + "px";
    };
    var fitAll = function () { $$(".desk .win").forEach(fit); };
    var dragify = function (w, handle, isLink) {
      var sx, sy, ox, oy, down = false, moved = false;
      handle.addEventListener("pointerdown", function (e) {
        if (innerWidth <= 900 || e.target.closest(".x")) return;
        down = true; moved = false; sx = e.clientX; sy = e.clientY; ox = w.offsetLeft; oy = w.offsetTop;
        handle.setPointerCapture(e.pointerId); w.classList.add("drag"); w.style.zIndex = ++z;
      });
      handle.addEventListener("pointermove", function (e) {
        if (!down) return;
        var dx = e.clientX - sx, dy = e.clientY - sy;
        if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
        w.style.left = ox + dx + "px"; w.style.top = oy + dy + "px"; if (moved) w.setAttribute("data-moved", "1");
      });
      var up = function () { down = false; w.classList.remove("drag"); };
      handle.addEventListener("pointerup", up); handle.addEventListener("pointercancel", up);
      if (isLink) w.addEventListener("click", function (e) { if (moved) e.preventDefault(); });
    };
    $$(".desk .win").forEach(function (w) {
      dragify(w, $(".tb", w));
      w.addEventListener("pointerdown", function () { if (!w.classList.contains("termwin") || w.classList.contains("sheet")) return; w.style.zIndex = ++z; });
      var x = $(".x", w), title = $(".tb span", w).textContent;
      var minimize = function (focusTab) {
        w.classList.add("min");
        var tab = document.createElement("button");
        tab.type = "button"; tab.innerHTML = "<i aria-hidden=\"true\">" + esc(title.charAt(0)) + "</i><span>" + esc(title.replace("Kwame V. Taylor / ", "")) + "</span>"; tab.setAttribute("aria-label", "Restore " + title);
        tab.addEventListener("click", function () {
          w.classList.remove("min"); w.removeAttribute("data-start"); fit(w); w.style.zIndex = ++z; w.style.animation = "none"; void w.offsetWidth; w.style.animation = "";
          tab.remove();
          $(".x", w).focus();
        });
        dock.appendChild(tab); if (focusTab) tab.focus();
      };
      x.addEventListener("click", function () { minimize(true); });
      if (w.dataset.start === "min") { minimize(false); w.style.animation = "none"; }
    });
    addEventListener("resize", function () {
      if (innerWidth <= 900) $$(".desk .win").forEach(function (w) { w.style.left = ""; w.style.top = ""; w.removeAttribute("data-moved"); });
      else fitAll();
    });
    fitAll();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);


    /* ===== Phones: a lock screen, then a widget home screen. Toys open as bottom sheets. ===== */
    var sheets = [], dim = document.createElement("div");
    dim.className = "phdim"; desk.appendChild(dim);
    var openSheet = function (w) {
      if (!w || w.classList.contains("sheet")) return;
      w.classList.remove("closing"); w.style.transform = "";
      w.classList.add("sheet"); w.style.zIndex = 70 + sheets.length; sheets.push(w);
      dim.classList.add("on"); document.body.classList.add("sheetopen");
      try { history.pushState({ sheet: w.getAttribute("aria-label") }, ""); } catch (e) {}
      var x = $(".tb .x", w); if (x) x.focus();
    };
    var afterVideo = null;
    var closeTop = function () {
      var w = sheets.pop(); if (!w) return;
      if (w.id === "rick" && afterVideo) { var go = afterVideo; afterVideo = null; setTimeout(go, 260); }
      w.classList.add("closing");
      setTimeout(function () { w.classList.remove("sheet", "closing"); w.style.zIndex = ""; w.style.transform = ""; }, reduce ? 0 : 200);
      if (!sheets.length) { dim.classList.remove("on"); document.body.classList.remove("sheetopen"); }
    };
    addEventListener("popstate", function () { if (sheets.length) closeTop(); });
    var sheetBack = function () { if (history.state && history.state.sheet) history.back(); else closeTop(); };
    dim.addEventListener("click", function (e) { if (e.target === dim) sheetBack(); });
    var wireApp = function (w) {
      if (w.hasAttribute("data-sheet")) return; w.setAttribute("data-sheet", "1");
      var x = $(".tb .x", w), tb = $(".tb", w);
      if (x) x.addEventListener("click", function (e) { if (!phone.matches) return; e.stopImmediatePropagation(); sheetBack(); }, true);
      /* drag the title bar down to close */
      var sy = null;
      tb.addEventListener("pointerdown", function (e) { if (!phone.matches || !w.classList.contains("sheet") || e.target.closest("button")) return; sy = e.clientY; w.classList.add("dragging"); tb.setPointerCapture(e.pointerId); });
      tb.addEventListener("pointermove", function (e) { if (sy === null) return; w.style.transform = "translateY(" + Math.max(0, e.clientY - sy) + "px)"; });
      var end = function (e) { if (sy === null) return; var dy = e.clientY - sy; sy = null; w.classList.remove("dragging"); if (dy > 90) sheetBack(); else w.style.transform = ""; };
      tb.addEventListener("pointerup", end); tb.addEventListener("pointercancel", end);
    };
    $$(".desk .win").forEach(wireApp);

    /* Home screen */
    var hero = $(".hero"), home = document.createElement("div");
    home.className = "phome";
    var P = S.projects || [], SV = S.services || [];
    home.innerHTML =
      '<a class="wdg w-photo" href="about.html">' + (S.portrait ? '<img src="' + esc(S.portrait) + '" alt="Portrait of Kwame V. Taylor">' : "") + "<span>About</span></a>" +
      '<div class="wdg w-svc"><h3>Services</h3>' + homeSvc.map(function (s) { return '<a href="services.html#' + slug(s.name) + '">' + esc(s.name) + "</a>"; }).join("") + (SV.length > 4 ? '<a class="wmore" href="services.html">+ ' + (SV.length - 4) + " more</a>" : "") + "</div>" +
      '<a class="wdg w-proj" href="projects.html"><h3>Projects · ' + P.length + "</h3><p>" + P.slice(0, 3).map(function (p) { return esc(p.name); }).join(" · ") + " →︎</p></a>" +
      '<span class="plabel">Extras</span>';
    var TOYS = [["Terminal", "i-term", "&gt;_"], ["Business card", "i-card", '<img src="assets/img/card/front.png" alt="">'], ["Swatches", "i-sw", ""], ["Save file", "i-svg", '<svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M5 5h15l3 3v15H5z"/><path d="M9 5v6h9V5"/><rect x="8.5" y="15" width="11" height="8"/></svg>']];
    TOYS.forEach(function (t) {
      var w = $('.desk .win[aria-label="' + t[0] + '"]'); if (!w) return;
      var bt = document.createElement("button"); bt.type = "button"; bt.className = "ic " + t[1];
      bt.innerHTML = '<i aria-hidden="true">' + t[2] + "</i><span>" + (t[0] === "Business card" ? "Card" : t[0]) + "</span>";
      bt.setAttribute("aria-label", "Open " + t[0]);
      bt.addEventListener("click", function () { openSheet(w); });
      home.appendChild(bt);
    });
    hero.insertAdjacentElement("afterend", home);
    var pd = document.createElement("nav"); pd.className = "phdock"; pd.setAttribute("aria-label", "Pages");
    var dockIcons = [["services.html", "i-svg", '<svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M10 8h12M10 14h12M10 20h12"/><rect x="5" y="7" width="2" height="2" fill="currentColor" stroke="none"/><rect x="5" y="13" width="2" height="2" fill="currentColor" stroke="none"/><rect x="5" y="19" width="2" height="2" fill="currentColor" stroke="none"/></svg>', "Services"], ["projects.html", "i-svg", '<svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M4 8.5V21a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V10.5a1 1 0 0 0-1-1H13l-2-2.5H5a1 1 0 0 0-1 1z"/></svg>', "Projects"], ["design.html", "", "Aa", "Design"], ["contact.html", "i-svg", '<svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><rect x="4" y="7.5" width="20" height="14" rx="1"/><path d="M4.5 8l9.5 7.5L23.5 8"/></svg>', "Contact"]];
    pd.innerHTML = dockIcons
      .map(function (d) { return '<a class="ic ' + d[1] + '" href="' + d[0] + '"><i aria-hidden="true">' + d[2] + "</i><span>" + d[3] + "</span></a>"; }).join("");
    desk.appendChild(pd);

    if (window.visualViewport) {
      var vv = window.visualViewport, fitKb = function () {
        var r = document.documentElement.style;
        r.setProperty("--vvh", vv.height + "px");
        r.setProperty("--kb", Math.max(0, innerHeight - vv.height - vv.offsetTop) + "px");
        var o = $("#tout"); if (o) o.scrollTop = o.scrollHeight;
      };
      vv.addEventListener("resize", fitKb); vv.addEventListener("scroll", fitKb); fitKb();
    }
    /* Name card star: centered between the longest line of the tagline and the card's right edge */
    var heroEl = $(".hero"), leadEl = $(".hero .lead");
    var placeStar = function () {
      if (!heroEl || !leadEl || !phone.matches) return;
      var rg = document.createRange(); rg.selectNodeContents(leadEl);
      var right = 0; [].forEach.call(rg.getClientRects(), function (q) { right = Math.max(right, q.right); });
      var h = heroEl.getBoundingClientRect(), inner = h.right - parseFloat(getComputedStyle(heroEl).borderRightWidth);
      heroEl.style.setProperty("--sx", ((right + inner) / 2 - h.left) + "px");
    };
    placeStar(); addEventListener("resize", placeStar); if (document.fonts) document.fonts.ready.then(placeStar);
    /* Lock screen: shown once per visit; swipe up (or tap) to unlock */
    var lk = document.createElement("section");
    lk.className = "lockscr"; lk.setAttribute("aria-label", "Lock screen");
    var first = (S.phrases && S.phrases[0]) || "data models.";
    lk.innerHTML =
      '<div class="lk-time"><small id="lkdate"></small><b id="lktime"></b></div><div class="lk-notes">' +
      '<button type="button" class="nt"><header><i>' + (S.portrait ? '<img src="' + esc(S.portrait) + '" alt="">' : "K") + "</i>Kwame V. Taylor<em>now</em></header><b>Hi, I'm Kwame.</b><p>Technical program manager and designer." + '</p><div class="more"><div class="tb">About</div><div class="bio">' + (S.portrait ? '<img src="' + esc(S.portrait) + '" alt="">' : "") + "<span>Technical program manager, PMP, in Los Angeles. I build programs, data systems, and tools, and I design logos and identities.</span></div><a class=\"go\" href=\"about.html\">About Kwame →︎</a></div></button>" +
      '<button type="button" class="nt"><header><i class="svg">' + dockIcons[0][2] + '</i>Services<em>' + SV.length + "</em></header><b>Freelance data and design work</b><p>" + homeSvc.slice(0, 3).map(function (s, i) { return esc(i ? s.name.charAt(0).toLowerCase() + s.name.slice(1) : s.name); }).join(", ") + (SV.length > 3 ? ", and " + (SV.length - 3) + " more" : "") + '.</p><div class="more"><div class="tb">Services</div>' + SV.map(function (s) { return '<a class="row" href="services.html#' + slug(s.name) + '"><span>' + esc(s.name) + "</span><span>→︎</span></a>"; }).join("") + '<a class="go" href="services.html">Open Services →︎</a></div></button>' +
      '<button type="button" class="nt"><header><i class="svg">' + dockIcons[1][2] + '</i>Projects<em>' + P.length + "</em></header><b>" + esc((P[0] || {}).name || "Projects") + "</b><p>Plus " + Math.max(0, P.length - 1) + ' more.</p><div class="more"><div class="tb">Projects</div>' + P.slice(0, 4).map(function (p) { return '<a class="row" href="projects.html#' + slug(p.name) + '"><span>' + esc(p.name) + "</span><span>→︎</span></a>"; }).join("") + '<a class="go" href="projects.html">Open Projects →︎</a></div></button>' +
      '<a class="nt" href="contact.html"><header><i class="svg">' + dockIcons[3][2] + '</i>Message</header><b>Say hello</b><p>Tap to write to Kwame.</p></a>' +
      '</div><div class="lk-foot"><button type="button" class="lk-circ" id="lkterm" aria-label="Unlock and open the terminal">&gt;_</button>' +
      '<button type="button" class="lk-unlock" id="lkopen"><span>Swipe up to unlock</span></button>' +
      '<button type="button" class="lk-circ dk" id="lkdark" aria-label="Switch light or dark mode"></button></div>';
    document.body.appendChild(lk);
    var tick2 = function () {
      var now = new Date(), tz = { timeZone: "America/Los_Angeles" };
      $("#lktime").textContent = now.toLocaleTimeString("en-US", { timeZone: tz.timeZone, hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M$/, "");
      $("#lkdate").textContent = now.toLocaleDateString("en-US", { timeZone: tz.timeZone, weekday: "long", month: "long", day: "numeric" });
    };
    tick2(); setInterval(tick2, 15000);
    var unlocked = false; try { unlocked = sessionStorage.getItem("unlocked") === "1"; } catch (e) {}
    var unlock = function () {
      try { sessionStorage.setItem("unlocked", "1"); } catch (e) {}
      lk.style.transform = ""; document.body.classList.remove("locked");
      lk.setAttribute("aria-hidden", "true"); lk.inert = true;
    };
    if (phone.matches && !unlocked) { document.body.classList.add("locked"); }
    else { lk.setAttribute("aria-hidden", "true"); lk.inert = true; }
    $$(".nt", lk).forEach(function (n) {
      if (n.tagName === "A") { n.addEventListener("click", unlock); return; }
      n.addEventListener("click", function (e) {
        if (e.target.closest("a")) { unlock(); return; }
        var was = n.classList.contains("open");
        $$(".nt.open", lk).forEach(function (o) { o.classList.remove("open"); });
        if (!was) n.classList.add("open");
      });
    });
    $("#lkopen").addEventListener("click", unlock);
    var lockAgain = function () {
      while (sheets.length) closeTop();
      $$(".nt.open", lk).forEach(function (o) { o.classList.remove("open"); });
      lk.removeAttribute("aria-hidden"); lk.inert = false; lk.style.transform = "";
      document.body.classList.add("locked");
      try { sessionStorage.removeItem("unlocked"); } catch (e) {}
    };
    var lb = document.createElement("button"); lb.type = "button"; lb.className = "lockbtn"; lb.setAttribute("aria-label", "Lock the phone");
    lb.innerHTML = '<svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="4" y="9" width="12" height="9" rx="1.5"/><path d="M7 9V6.5a3 3 0 0 1 6 0V9"/></svg>';
    lb.addEventListener("click", lockAgain);
    var mbtn = $(".bar .menubtn"); if (mbtn) mbtn.parentNode.insertBefore(lb, mbtn);
    $("#lkterm").addEventListener("click", function () { unlock(); setTimeout(function () { openSheet($('.desk .win[aria-label="Terminal"]')); }, reduce ? 0 : 300); });
    $("#lkdark").addEventListener("click", function () { if (themeBtn) themeBtn.click(); lk.classList.toggle("dk", isDark()); });
    lk.classList.toggle("dk", isDark());
    /* swipe up from the bottom of the lock screen */
    var foot = $(".lk-foot", lk), ly = null;
    foot.addEventListener("pointerdown", function (e) { if (e.target.closest(".lk-circ")) return; ly = e.clientY; lk.classList.add("dragging"); foot.setPointerCapture(e.pointerId); });
    foot.addEventListener("pointermove", function (e) { if (ly === null) return; lk.style.transform = "translateY(" + Math.min(0, e.clientY - ly) + "px)"; });
    var lend = function (e) {
      if (ly === null) return; var dy = e.clientY - ly; ly = null; lk.classList.remove("dragging");
      if (dy < -innerHeight * .18) unlock(); else lk.style.transform = "";
    };
    foot.addEventListener("pointerup", lend); foot.addEventListener("pointercancel", lend);
    addEventListener("keydown", function (e) { if (e.key === "Escape" && sheets.length && phone.matches) sheetBack(); });
    if (phone.addEventListener) phone.addEventListener("change", function () { while (sheets.length) closeTop(); if (!phone.matches) document.body.classList.remove("locked"); });

    /* Double-click the Terminal's title bar to make it bigger; double-click again to put it back. */
    var tw = $('section[aria-label="Terminal"]');
    if (tw) $(".tb", tw).addEventListener("dblclick", function (e) {
      if (innerWidth <= 900 || e.target.closest(".x")) return;
      tw.classList.add("anim");
      setTimeout(function () { tw.classList.remove("anim"); }, 260);
      if (tw.hasAttribute("data-big")) {
        var was = JSON.parse(tw.getAttribute("data-big"));
        tw.style.left = was.l; tw.style.top = was.t; tw.style.width = was.w; tw.style.height = was.h;
        tw.removeAttribute("data-big");
        return;
      }
      tw.setAttribute("data-big", JSON.stringify({ l: tw.style.left, t: tw.style.top, w: tw.style.width, h: tw.style.height }));
      var bar = $(".taskbar"), room = (bar ? bar.getBoundingClientRect().top : innerHeight) - desk.getBoundingClientRect().top - 28;
      var W = Math.min(Math.round(desk.clientWidth * .52), 760), H = Math.min(Math.round(room * .72), 560);
      var L = Math.max(16, Math.min(tw.offsetLeft, desk.clientWidth - W - 24)), T = Math.max(8, Math.min(tw.offsetTop, room - H));
      tw.style.width = W + "px"; tw.style.height = H + "px"; tw.style.left = L + "px"; tw.style.top = T + "px";
      tw.style.zIndex = ++z; tw.setAttribute("data-moved", "1");
    });

    /* Hidden commands */
    var restore = function (title) {
      if (phone.matches) { openSheet($('.desk .win[aria-label="' + title + '"]')); return; }
      var t = $('#dock button[aria-label="Restore ' + title + '"]');
      if (t) t.click();
    };
    var loadSave = function () { try { return JSON.parse(sessionStorage.getItem("save2")) || null; } catch (e) { return null; } };
    var storeSave = function (sv) { try { sessionStorage.setItem("save2", JSON.stringify(sv)); } catch (e) {} };
    var mins = function (sec) { var m = Math.floor(sec / 60), s = Math.round(sec % 60); return (m ? m + "m " : "") + s + "s"; };
    var started = Date.now();
    var drawSlot = function () {
      var sv = loadSave(), el = $("#slot2");
      if (!sv || !el) return;
      el.className = "slot you";
      el.innerHTML = "<b>Slot 2 · You</b><span class=\"k\">Play time</span><span>" + mins(sv.play) + " on this site</span><span class=\"k\">Location</span><span>Kwame's desktop</span>" +
        (sv.lives ? "<span class=\"k\">Lives</span><span>" + sv.lives + "</span>" : "");
    };
    drawSlot();
    var saveGame = function (extra) {
      var sv = loadSave() || { play: 0 };
      sv.play = (sv.base || 0) + (Date.now() - started) / 1000;
      sv.base = sv.base || 0;
      for (var k in extra) sv[k] = extra[k];
      storeSave(sv); drawSlot();
    };
    var comicPending = false;
    var openVideo = function () {
      if ($("#rick")) { restore("never-gonna.mp4"); return; }
      var w = document.createElement("section");
      w.className = "win"; w.id = "rick"; w.setAttribute("aria-label", "never-gonna.mp4");
      w.style.cssText = "--x:36;--y:12;--w:30;--k:0;z-index:" + (++z);
      w.innerHTML = '<div class="tb"><span>never-gonna.mp4</span><button class="x" type="button" aria-label="Close video">×</button></div>' +
        '<div class="vid"><iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&playsinline=1' + (phone.matches ? '&mute=1' : '') + '" title="Never Gonna Give You Up" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>';
      desk.appendChild(w);
      wireApp(w); if (phone.matches) openSheet(w);
      dragify(w, $(".tb", w));
      $(".x", w).addEventListener("click", function () { w.remove(); });
      fit(w);
    };

    /* Suggest it once, on a computer, when the browser's own bars leave the desktop short of room. */
    var seen = null;
    /* The tip is remembered for 3 days, then offered again on the next visit */
    try { var t = +localStorage.getItem("fsNudgeAt"); seen = t && Date.now() - t < 3 * 864e5; localStorage.removeItem("fsNudge"); } catch (e) {}
    var cramped = innerHeight < 860 && (screen.height - innerHeight) > 90;
    if (fsEnter && !seen && innerWidth > 900 && cramped && !fsOn()) {
      var mac = /Mac/.test(navigator.platform || navigator.userAgent);
      var nw = document.createElement("section");
      nw.className = "win nudge"; nw.setAttribute("aria-label", "Full screen tip");
      nw.style.cssText = "--x:34;--y:22;--w:30;--k:6;z-index:" + (++z);
      nw.innerHTML = '<div class="tb"><span>Tip</span><button class="x" type="button" aria-label="Close tip">×</button></div>' +
        '<div class="body"><p>This desktop looks best full screen.</p><div class="row"><button class="btn" type="button" data-fs="go">Go full screen <b>→︎</b></button><button class="ghost" type="button" data-fs="no">No thanks</button></div>' +
        "<small>To stay full screen on every page, use your browser's own: " + (mac ? "Control + Command + F" : "F11") + ". The button in the taskbar works too.</small></div>";
      desk.appendChild(nw);
      dragify(nw, $(".tb", nw)); fit(nw);
      var closeNudge = function () { try { localStorage.setItem("fsNudgeAt", String(Date.now())); } catch (e) {} if (nw.parentNode) nw.parentNode.removeChild(nw); };
      nw.addEventListener("click", function (e) {
        var b = e.target.closest("button"); if (!b) return;
        if (b.dataset.fs === "go") { fsToggle(); closeNudge("yes"); }
        else closeNudge("no");
      });
    }

    /* Trogdor: outlined vector flames along the top of every open window, with sparks rising behind them */
    var FL = ["M20 63C8 63 2 54 4 44C6 35 13 31 12 20C17 25 20 31 19 37C23 31 25 22 22 8C31 17 38 31 36 45C35 56 29 63 20 63Z",
      "M20 63C8 63 3 53 5 43C7 34 15 30 15 18C19 24 21 30 20 36C25 29 28 19 27 4C34 15 38 30 36 44C35 56 29 63 20 63Z",
      "M20 63C9 63 2 55 3 45C4 36 10 32 8 22C14 26 18 32 18 38C21 32 21 22 17 10C27 18 37 30 36 45C35 56 30 63 20 63Z"];
    var sprites = null, burning = false;
    var makeSprites = function () {
      return [[255, 248, 214], [255, 214, 92], [255, 150, 20], [245, 90, 0], [200, 40, 0], [120, 20, 0]].map(function (c) {
        var cv = document.createElement("canvas"); cv.width = cv.height = 64;
        var g = cv.getContext("2d"), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
        gr.addColorStop(0, "rgba(" + c + ",1)"); gr.addColorStop(.4, "rgba(" + c + ",.55)"); gr.addColorStop(1, "rgba(" + c + ",0)");
        g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return cv;
      });
    };
    var flamesOn = function (w) {
      var W = w.offsetWidth, box = document.createElement("div"), n = Math.max(5, Math.round(W / 19)), html = "";
      box.className = "flames"; box.style.left = w.offsetLeft + "px"; box.style.top = (w.offsetTop + 10) + "px"; box.style.width = W + "px";
      for (var i = 0; i < n; i++) {
        var fw = Math.round(26 + Math.random() * 28), fh = Math.round(fw * 1.6), k = i % 3;
        var vals = [FL[k], FL[(k + 1) % 3], FL[(k + 2) % 3], FL[k]].join(";");
        var dur = (.45 + Math.random() * .35).toFixed(2), beg = (-Math.random()).toFixed(2);
        var layer = function (c, sc, stroke) {
          return '<path fill="' + c + '"' + (stroke ? ' stroke="#111111" stroke-width="1.6" stroke-linejoin="round" vector-effect="non-scaling-stroke"' : "") +
            ' transform="translate(20 63) scale(' + sc + ') translate(-20 -63)" d="' + FL[k] + '"><animate attributeName="d" values="' + vals + '" dur="' + dur + 's" begin="' + beg + 's" repeatCount="indefinite"/></path>';
        };
        html += '<svg class="flame" viewBox="0 0 40 64" width="' + fw + '" height="' + fh + '" aria-hidden="true" style="left:calc(' + ((i + .5) / n * 100).toFixed(2) + "% - " + fw / 2 + "px);animation-delay:" + Math.round(Math.random() * 260) + 'ms"><g style="--fd:' + (.24 + Math.random() * .2).toFixed(2) + 's">' +
          layer("#ff4a1c", 1, true) + layer("#ff9f1a", .68, false) + layer("#ffe14a", .4, false) + "</g></svg>";
      }
      box.innerHTML = html; desk.appendChild(box);
      setTimeout(function () { $$(".flame", box).forEach(function (f) { setTimeout(function () { f.classList.add("out"); }, Math.random() * 300); }); }, 2600);
      setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 3500);
    };
    var sparks = function (rects) {
      sprites = sprites || makeSprites();
      var dpr = Math.min(2, window.devicePixelRatio || 1), cv = document.createElement("canvas"), VW = innerWidth, VH = innerHeight;
      cv.className = "sparks"; cv.width = VW * dpr; cv.height = VH * dpr; cv.style.width = VW + "px"; cv.style.height = VH + "px";
      document.body.appendChild(cv);
      var cx = cv.getContext("2d"); cx.scale(dpr, dpr);
      var total = rects.reduce(function (a, r) { return a + r.width; }, 0), ps = [], t0 = performance.now(), last = t0, acc = 0;
      var add = function () {
        var pick = Math.random() * total, r = rects[0];
        for (var i = 0; i < rects.length; i++) { if (pick < rects[i].width) { r = rects[i]; break; } pick -= rects[i].width; }
        var ember = Math.random() < .3;
        ps.push({ x: r.left + Math.random() * r.width, y: r.top - 14, vx: (Math.random() - .5) * 24, vy: -(ember ? 110 + Math.random() * 120 : 55 + Math.random() * 95),
          age: 0, life: ember ? 1.1 + Math.random() * .8 : .4 + Math.random() * .5, size: ember ? 2 + Math.random() * 2 : 9 + Math.random() * 15, seed: Math.random() * 99, ember: ember });
      };
      var frame = function (now) {
        var dt = Math.min(.05, (now - last) / 1000), el = (now - t0) / 1000; last = now;
        if (el < 2.6) {
          acc += total * .9 * dt * Math.min(1, el / .3) * (el > 2.1 ? (2.6 - el) / .5 : 1);
          while (acc >= 1) { acc--; add(); }
        }
        cx.clearRect(0, 0, VW, VH);
        for (var i = ps.length - 1; i >= 0; i--) {
          var p = ps[i]; p.age += dt; var t = p.age / p.life;
          if (t >= 1) { ps.splice(i, 1); continue; }
          p.vy -= 40 * dt; p.x += (p.vx + Math.sin(now * .007 + p.seed) * 26) * dt; p.y += p.vy * dt;
          var ci = p.ember ? 1 + (t > .6 ? 1 : 0) : Math.min(5, 1 + Math.floor(t * 5)), a = (t < .1 ? t / .1 : 1 - (t - .1) / .9) * (p.ember ? 1 : .6), sz = p.size * (p.ember ? 1 : 1 - t * .65);
          cx.globalAlpha = Math.max(0, a); cx.drawImage(sprites[ci], p.x - sz, p.y - sz * 1.4, sz * 2, sz * 2.8);
        }
        if (el < 2.6 || ps.length) requestAnimationFrame(frame); else document.body.removeChild(cv);
      };
      requestAnimationFrame(frame);
    };
    var burninate = function () {
      if (burning) return;
      flash("burninate", 3100);
      if (reduce) return;
      burning = true; setTimeout(function () { burning = false; }, 3600);
      var wins = phone.matches ? $$(".hero, .wdg, .phdock") : $$(".desk .win:not(.min)");
      if (phone.matches && sheets.length) { ti.blur(); document.body.classList.add("peek"); setTimeout(function () { document.body.classList.remove("peek"); }, 3300); }
      wins.forEach(flamesOn);
      sparks(wins.map(function (w) { return w.getBoundingClientRect(); }));
    };
    var flash = function (cls, ms) { document.body.classList.remove(cls); void document.body.offsetWidth; document.body.classList.add(cls); setTimeout(function () { document.body.classList.remove(cls); }, ms); };
    tout.addEventListener("click", function (e) { if (e.target.closest(".again")) burninate(); });
    var egg = function (raw) {
      var v = raw.toLowerCase().replace(/[\u2019']/g, "").replace(/[!.?]+$/, "").trim();
      if (comicPending) {
        comicPending = false;
        if (v === "yes" || v === "y" || v === "comic sans") { document.documentElement.classList.add("comic"); say("You asked for this. Type serif to undo."); return true; }
        if (v === "no" || v === "n") { say("Good call."); return true; }
      }
      if (v === "comic sans") { comicPending = true; say("Are you sure? That doesn't sound like a good idea. (yes / no)"); return true; }
      if (v === "serif") { document.documentElement.classList.remove("comic"); say("Order restored."); return true; }
      if (v === "save") { saveGame({}); restore("Save file"); say("Game saved to Slot 2."); return true; }
      if (v === "draw") { var cs = S.cards || []; say("You drew: " + esc(cs[Math.floor(Math.random() * cs.length)])); return true; }
      if (v === "its time to duel") { say("Kwame draws Duel Magician, a deckbuilding companion for Yu-Gi-Oh! Duel Links. It's still in their hand: in progress. Type draw to play a card."); return true; }
      if (v === "fig" || v === "figure") {
        var fs = S.figures || [], n = Math.floor(Math.random() * fs.length);
        restore("Business card"); if (cards[0]) cards[0].show(n);
        if (n === 0) setTimeout(openVideo, 900);
        say("Fig. " + (n + 1) + " of 7 · " + esc(fs[n][0]) + "\nSource: " + esc(fs[n][1]) + "\nIt's on the back of Kwame's business card.");
        return true;
      }
      if (/^(rick ?roll(ed)?|rick-roll(ed)?|rick astley|never gonna give you up)$/.test(v)) {
        var f1 = (S.figures || [])[0];
        if (phone.matches) { afterVideo = function () { openSheet($('.desk .win[aria-label="Business card"]')); if (cards[0]) cards[0].show(0); }; }
        else { restore("Business card"); if (cards[0]) cards[0].show(0); }
        if (f1) say("Fig. 1 of 7 · " + esc(f1[0]) + "\nSource: " + esc(f1[1]) + "\nIt's on the back of Kwame's business card.");
        say("Never gonna give you up.");
        openVideo();
        return true;
      }
      if (v === "kern") {
        var t = $("#term"); t.classList.add("kern"); say("Tightening...");
        setTimeout(function () { t.classList.remove("kern"); say("Better."); }, 3000);
        return true;
      }
      if (v === "afrofuturism") { say(esc(S.afrofuturism.intro)); return true; }
      if (v === "sun ra") { say(esc(S.afrofuturism.sunra)); return true; }
      if (v === "octavia" || v === "octavia butler" || v === "parable") { say(esc(S.afrofuturism.octavia)); return true; }
      var hs = S.homestar || {};
      var flash = function (cls, ms) { document.body.classList.remove(cls); void document.body.offsetWidth; document.body.classList.add(cls); setTimeout(function () { document.body.classList.remove(cls); }, ms); };
      if (v === "trogdor" || v === "burninate" || v === "burninator") {
        say(esc(hs.trogdor) + '\n<button class="again" type="button">Burninate again</button>');
        burninate();
        return true;
      }
      if (v === "consummate v" || v === "consummate vs" || v === "consummate v's") { say(esc(hs.consummate)); flash("consummate", 2400); return true; }
      if (v === "sbemail" || v === "check email" || v === "strong bad" || v === "strongbad") { say(esc(hs.sbemail)); return true; }
      if (v === "homestar" || v === "homestar runner" || v === "home star" || v === "home star runner" || v === "everybody everybody") {
        say(esc(hs.homestar));
        if (!reduce) {
          var r = document.createElement("div"); r.className = "runner"; r.textContent = "Everybody! Everybody!";
          desk.appendChild(r); setTimeout(function () { desk.removeChild(r); }, 2700);
        }
        return true;
      }
      if (v === "homsar") { say(esc(hs.homsar)); return true; }
      if (v === "fhqwhgads" || v === "everybody to the limit") { say(esc(hs.fhqwhgads)); return true; }
      if (v === "the cheat") { say(esc(hs.cheat)); return true; }
      if (/^sudo hire kwame/.test(v)) { say("[sudo] password for visitor: ********\nPermission granted. Opening contact.html..."); setTimeout(function () { location.href = "contact.html"; }, 1400); return true; }
      if (v === "xyzzy") {
        if (Math.random() < .5) { say("Nothing happens."); return true; }
        var dest = pages[Math.floor(Math.random() * pages.length)];
        say("A hollow voice says \"plugh\". You are teleported to " + dest + ".html..."); setTimeout(function () { location.href = dest + ".html"; }, 1400); return true;
      }
      if (v === "rm -rf /" || v === "rm -rf" || v === "sudo rm -rf /" || v === "rm -rf /*") {
        var wipe = document.createElement("div"); wipe.className = "wipe"; wipe.textContent = "Deleting everything...";
        document.body.appendChild(wipe);
        setTimeout(function () { wipe.remove(); say("Nice try."); ti.focus(); }, reduce ? 600 : 1800);
        return true;
      }
      if (v === "coffee" || v === "make coffee" || v === "brew coffee" || v === "brew") { say("Error 418: I'm a teapot."); return true; }
      if (/^(dysentery|oregon trail|ford the river|caulk the wagon)$/.test(v)) { say(v === "ford the river" ? "You attempt to ford the river. Kwame's résumé floats. Your oxen do not." : v === "caulk the wagon" ? "You caulk the wagon and float across. Kwame approves of this process improvement." : "You have died of dysentery.\n\nHere lies a visitor. Should have typed open contact."); return true; }
      if (v === "fizzbuzz" || v === "fizz buzz") { var fb = []; for (var i = 1; i <= 15; i++) fb.push(i % 15 ? i % 5 ? i % 3 ? i : "Fizz" : "Buzz" : "FizzBuzz"); say(fb.join("\n") + "\n\nHired? Type open contact."); return true; }
      if (v === "motherlode" || v === "rosebud" || v === "kaching") { say(v === "motherlode" ? "Cheat activated. §50,000 Simoleons added to your household funds.\nKwame's rates are unchanged." : "Cheat activated. §1,000 Simoleons added. Try motherlode."); return true; }
      if (v === "exit" || v === "quit") { say("Bye."); setTimeout(function () { $('section[aria-label="Terminal"] .x').click(); }, 400); return true; }
      return false;
    };

    /* Konami code, anywhere on the page */
    var seq = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"], pos = 0;
    addEventListener("keydown", function (e) {
      var k = (e.key || "").toLowerCase();
      pos = k === seq[pos] ? pos + 1 : (k === seq[0] ? 1 : 0);
      if (pos < seq.length) return;
      pos = 0;
      document.body.classList.remove("konami"); void document.body.offsetWidth; document.body.classList.add("konami");
      saveGame({ lives: 30 });
      restore("Terminal");
      say("↑︎ ↑︎ ↓︎ ↓︎ ←︎ →︎ ←︎ →︎ B A · 30 lives granted and saved to Slot 2. You still have to use the contact form.");
    });

  }

  /* Services */
  if (page === "services" && S.services) {
    var rows = $("#rows");
    rows.innerHTML = S.services.map(function (s, k) {
      return '<li id="' + slug(s.name) + '"><button aria-expanded="false"><small>' + num(k) + "</small><span><b>" + esc(s.name) +
        "</b><span>" + esc(s.line) + '</span></span><i aria-hidden="true">→︎</i></button><div class="inc"><ul>' +
        (s.includes || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") +
        '</ul><a class="link" href="contact.html?about=' + encodeURIComponent(s.name) + '">Ask about this →︎</a></div></li>';
    }).join("");
    var lis = $$("#rows > li");
    var toggle = function (c, force) {
      lis.forEach(function (li, j) {
        var open = j === c ? (force === undefined ? !li.classList.contains("open") : force) : false;
        li.classList.toggle("open", open);
        $("button", li).setAttribute("aria-expanded", open);
      });
    };
    var sl = arrowList(lis.length, function (c, byKey) {
      lis.forEach(function (li, j) { li.classList.toggle("cur", j === c); });
      if (byKey) $("button", lis[c]).focus();
    }, function (c) { toggle(c); });
    lis.forEach(function (li, j) {
      var b = $("button", li);
      b.addEventListener("click", function () { sl.go(j); toggle(j); });
      b.addEventListener("mouseenter", function () { sl.go(j); });
      b.addEventListener("focus", function () { sl.go(j); });
    });
    var at = lis.findIndex(function (li) { return "#" + li.id === location.hash; });
    sl.go(at > -1 ? at : 0);
    if (at > -1) toggle(at, true);
    /* Links to a service on this same page (from the side windows) open it too */
    addEventListener("hashchange", function () {
      var h = lis.findIndex(function (li) { return "#" + li.id === location.hash; });
      if (h > -1) { sl.go(h); toggle(h, true); }
    });
  }

  /* Button text for a project link, from its site: "View on GitHub", "View on Streamlit" */
  function linkName(url) {
    var host = ""; try { host = new URL(url).hostname.replace(/^www\./, ""); } catch (e) {}
    var known = { "github.com": "GitHub", "streamlit.app": "Streamlit", "givedirectly.org": "GiveDirectly" };
    for (var k in known) if (host === k || host.slice(-k.length - 1) === "." + k) return "View on " + known[k];
    return host ? "View on " + host : "Visit";
  }

  /* Projects */
  if (page === "projects" && S.projects) {
    var list = $("#plist"), P = S.projects;
    list.insertAdjacentHTML("beforeend", P.map(function (p, k) {
      return '<button data-k="' + k + '">' + esc(p.name) + "</button>";
    }).join(""));
    var btns = $$("button", list);
    var show = function (c) {
      var p = P[c];
      btns.forEach(function (b, j) { b.classList.toggle("cur", j === c); b.setAttribute("aria-current", j === c); });
      $("#pmeta").textContent = [p.status, p.year, p.stack].filter(Boolean).join(" · ");
      $("#pname").textContent = p.name;
      $("#ptext").textContent = p.text || "";
      $("#ppath").textContent = "Projects / " + p.name;
      $("#pgo").innerHTML = p.link
        ? '<a class="cta" href="' + esc(p.link) + '" target="_blank" rel="noopener">' + esc(p.linkLabel || linkName(p.link)) + ' <b>↗︎</b></a>'
        : '<span class="mute">' + (p.status === "In progress" ? "In progress. No link yet." : "Link to come.") + "</span>";
      var shot = $("#pshot");
      if (p.image) shot.innerHTML = '<img src="' + esc(p.image) + '" alt="Screenshot of ' + esc(p.name) + '">';
      else {
        if (!$("i", shot)) shot.innerHTML = "<i></i><i></i><i></i><i></i><i></i><span>Preview to come</span>";
        $$("i", shot).forEach(function (b, j) { b.style.setProperty("--h", 25 + ((c * 37 + j * 53) % 70)); });
      }
      try { history.replaceState(null, "", "#" + slug(p.name)); } catch (e) {}
    };
    var pl = arrowList(P.length, function (c, byKey) { show(c); if (byKey) btns[c].focus(); });
    btns.forEach(function (b, j) { b.addEventListener("click", function () { pl.go(j); }); });
    var pat = P.findIndex(function (p) { return "#" + slug(p.name) === location.hash; });
    pl.go(pat > -1 ? pat : 0);
  }

  /* Design work */
  if (page === "design" && S.design) {
    var gal = $("#gal"), chips = $("#chips"), D = S.design;
    var types = D.map(function (d) { return d.type; }).filter(function (t, i, a) { return a.indexOf(t) === i; });
    chips.innerHTML = ["All"].concat(types).map(function (t, i) {
      return '<button aria-pressed="' + (i === 0) + '">' + esc(t) + "</button>";
    }).join("");
    gal.innerHTML = D.map(function (d, k) {
      return '<button class="tile ' + esc(d.shape || "square") + " " + esc(d.tone || "") + '" data-k="' + k + '" data-type="' + esc(d.type) + '" aria-label="' + esc(d.title) + '">' +
        (d.image ? '<img src="' + esc(d.image) + '" alt="" loading="lazy">' : '<span aria-hidden="true">' + esc(d.glyph || "") + "</span>") +
        '<span class="cap">' + esc(d.type) + "</span></button>";
    }).join("");
    chips.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      $$("button", chips).forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      $$(".tile", gal).forEach(function (t) { t.hidden = b.textContent !== "All" && t.dataset.type !== b.textContent; });
    });
    var dlg = $("#viewer");
    gal.addEventListener("click", function (e) {
      var t = e.target.closest(".tile"); if (!t || !dlg.showModal) return;
      var d = D[+t.dataset.k];
      $("#vtitle").textContent = d.title;
      var big = $("#vbig");
      big.className = "big tile " + (d.tone || "");
      big.innerHTML = d.image ? '<img src="' + esc(d.image) + '" alt="' + esc(d.title) + '">' : '<span aria-hidden="true">' + esc(d.glyph || "") + "</span>";
      $("#vcap").textContent = d.type;
      dlg.showModal();
    });
    $("#vclose").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  }

  /* Design page: Tracking. One slider for letter spacing, with the mood each setting gives a word. */
  var tw = $("#tword");
  if (tw) {
    var slide = $("#tslide"), mood = $("#tmood"), ghost = $("#tghost"), status = $("#tstatus"), target = null;
    var moods = [[-0.06, "Fashion cover. Tight and loud."], [-0.015, "Headline. Confident."], [0.03, "Book text. The default."],
      [0.12, "Labels and small caps. Calm."], [0.3, "Luxury brand. Expensive."], [9, "Movie poster. Epic."]];
    var moodFor = function (v) { for (var i = 0; i < moods.length; i++) if (v < moods[i][0]) return moods[i][1]; };
    var upd = function () {
      var v = +slide.value; tw.style.letterSpacing = v + "em";
      mood.textContent = (v >= 0 ? "+" : "") + Math.round(v * 1000) + " · " + moodFor(v);
      if (target !== null) {
        if (Math.abs(v - target) < .02) { status.textContent = "Matched. That's the " + moodFor(target).split(".")[0] + " look."; ghost.classList.add("hit"); target = null; }
        else status.textContent = v < target ? "Looser..." : "Tighter...";
      }
    };
    var setWord = function () { var t = $("#tinput").value.trim() || "KWAME"; tw.textContent = t; ghost.textContent = t; };
    slide.addEventListener("input", upd);
    $("#tinput").addEventListener("input", setWord);
    if ($("#tmatch")) $("#tmatch").addEventListener("click", function () {
      var picks = [-0.08, -0.03, 0.08, 0.2, 0.45]; target = picks[Math.floor(Math.random() * picks.length)];
      ghost.style.letterSpacing = target + "em"; ghost.classList.remove("hit"); ghost.classList.add("on");
      slide.value = 0.01; upd(); status.textContent = "Slide until your word sits on the outline.";
    });
    setWord(); upd();
  }

  /* Thank-you page: greet the sender by first name when the form passed one along */
  if (page === "thanks") {
    var nm = ""; try { nm = sessionStorage.getItem("sentName") || ""; } catch (e) {}
    if (nm) $("#thx").innerHTML = 'Thanks<em>,</em><br>' + esc(nm) + ".";
  }

  /* About: organizations */
  if (page === "about" && S.champions) {
    $("#bm").innerHTML = S.champions.map(function (c) {
      return '<li><a href="' + esc(c.url) + '" target="_blank" rel="noopener"><span>' + esc(c.name) + '</span><span aria-hidden="true">↗︎</span></a></li>';
    }).join("") + '<li class="mute">More to come</li>';
  }

  /* Not found: orbiting links */
  if (page === "404") {
    var sky = $(".orbit");
    var B = [["Services", 46, .32, .30, 0.6, 70], ["Projects", 30, .40, .36, 2.5, 90], ["Design", 54, .46, .41, 4.2, 110], ["About", 38, .36, .45, 5.4, 130], ["Contact", 24, .48, .47, 1.2, 150]];
    var els = B.map(function (b) {
      var r = document.createElement("div"); r.className = "ring"; sky.appendChild(r);
      var a = document.createElement("a"); a.className = "planet"; a.href = "/" + b[0].toLowerCase() + ".html";
      a.style.setProperty("--d", b[1]); a.innerHTML = "<u></u><span>" + b[0] + "</span>"; sky.appendChild(a);
      var o = { b: b, r: r, a: a, t: b[4], sp: 1, hold: false };
      ["mouseenter", "focus"].forEach(function (ev) { a.addEventListener(ev, function () { o.hold = true; r.classList.add("on"); }); });
      ["mouseleave", "blur"].forEach(function (ev) { a.addEventListener(ev, function () { o.hold = false; r.classList.remove("on"); }); });
      return o;
    });
    var last = performance.now();
    var frame = function (now) {
      var dt = Math.min(.05, (now - last) / 1000); last = now;
      var W = sky.clientWidth, H = sky.clientHeight;
      els.forEach(function (o) {
        var A = o.b[2] * W, Bb = o.b[3] * H;
        o.r.style.width = 2 * A + "px"; o.r.style.height = 2 * Bb + "px";
        o.sp += ((o.hold ? 0 : 1) - o.sp) * .12;
        if (!reduce) o.t += dt * o.sp * 2 * Math.PI / o.b[5];
        var x = W / 2 + A * Math.cos(o.t) - o.b[1] / 2, y = H * .48 + Bb * Math.sin(o.t) - o.b[1] / 2;
        o.a.style.transform = "translate(" + x + "px," + y + "px)";
        o.a.style.zIndex = Math.sin(o.t) > 0 ? 20 : 5;
      });
      if (!reduce) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
    if (reduce) addEventListener("resize", function () { frame(performance.now()); });
  }

  /* Contact form */
  if (page === "contact") {
    var form = $("#form"), status = $("#fstatus"), send = $("#send");
    var about = new URLSearchParams(location.search).get("about");
    if (about) $("#subject").value = about.slice(0, 120);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!S.formEndpoint) { status.textContent = "This form is not connected yet. Please reach me on LinkedIn for now."; return; }
      if (!form.reportValidity()) return;
      send.disabled = true; status.textContent = "Sending.";
      fetch(S.formEndpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error();
          var first = ($("#name").value || "").trim().split(/\s+/)[0].slice(0, 40);
          try { sessionStorage.setItem("sentName", first); } catch (e) {}
          form.reset(); status.textContent = "Sent. Thank you.";
          location.href = "thanks.html";
        })
        .catch(function () { status.textContent = "That did not send. Please try again, or reach me on LinkedIn."; })
        .then(function () { send.disabled = false; });
    });
  }
})();

/* Behaviour for kwametaylor.github.io. Content comes from content.js. */
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
    function go(i) { cur = (i + count) % count; set(cur); }
    addEventListener("keydown", function (e) {
      if (e.target.matches("input, textarea, select")) return;
      if (e.key === "ArrowDown") { go(cur + 1); e.preventDefault(); }
      else if (e.key === "ArrowUp") { go(cur - 1); e.preventDefault(); }
      else if (e.key === "Enter" && document.activeElement === document.body && open) open(cur);
    });
    return { go: go, cur: function () { return cur; } };
  }

  /* Small widgets, on whichever page they appear */
  if ($("#playtime")) $("#playtime").textContent = (new Date().getFullYear() - 2011 + 1) + " years of design";
  if ($("#flip")) {
    /* Seven figures on the back, one per flip. Placeholder charts until the real ones are drawn. */
    var flip = $("#flip"), back = $("#cardback"), fi = 0;
    var drawBack = function () {
      var bars = [];
      for (var b = 0; b < 12; b++) bars.push('<i style="--h:' + (15 + ((fi * 31 + b * 47) % 85)) + '"></i>');
      back.innerHTML = '<span class="cap">Fig. ' + (fi + 1) + ' of 7</span><span class="mini">' + bars.join("") + "</span>";
    };
    drawBack();
    flip.addEventListener("click", function () {
      var showingBack = flip.getAttribute("aria-pressed") === "true";
      flip.setAttribute("aria-pressed", !showingBack);
      if (showingBack) setTimeout(function () { fi = (fi + 1) % 7; drawBack(); }, 350);
    });
  }
  if ($("#wr")) {
    $("#wr").addEventListener("input", function (e) { $("#aa").style.setProperty("--w", e.target.value); $("#wv").textContent = "Weight " + e.target.value; });

  }
  if ($("#bar")) {
    $("#bar").addEventListener("input", function (e) { $("#ba").style.setProperty("--p", e.target.value); });

  }

  /* Start menu on the home taskbar */
  var sb = $("#startbtn"), sm = $("#startmenu");
  if (sb) {
    var setMenu = function (open) { sm.hidden = !open; sb.setAttribute("aria-expanded", open); };
    sb.addEventListener("click", function (e) { e.stopPropagation(); setMenu(sm.hidden); if (!sm.hidden) $("a", sm).focus(); });
    document.addEventListener("click", function (e) { if (!e.target.closest(".start")) setMenu(false); });
    addEventListener("keydown", function (e) { if (e.key === "Escape" && !sm.hidden) { setMenu(false); sb.focus(); } });
  }

  /* Home */
  if (page === "home") {
    var svc = $("#svc");
    if (svc && S.services) svc.innerHTML = S.services.slice(0, 4).map(function (s) {
      return '<li><a href="services.html#' + slug(s.name) + '">' + esc(s.name) + "</a></li>";
    }).join("");
    if (S.projects) $("#pcount").textContent = S.projects.length + " items";
    var year = new Date().getFullYear(), yrs = year - 2011 + 1;


    /* Figures that change every few seconds */
    var bars = $("#bars");
    var figs = [
      ["Designing since 2011", "Years of practice, 2011 to " + year, Array.apply(null, Array(yrs)).map(function (_, i) { return (i + 1) / yrs * 100; })],
      ["Items on this site", "Services, projects, design pieces, organizations", [S.services.length, S.projects.length, S.design.length, S.champions.length].map(function (n, i, a) { return n / Math.max.apply(null, a) * 100; })],
      ["Pages: 5", "Links in the Site window, by item count", [4, S.projects.length, S.design.length, 1, 1].map(function (n, i, a) { return n / Math.max.apply(null, a) * 100; })]
    ];
    var f = 0;
    var fig = function () {
      var d = figs[f % figs.length];
      bars.innerHTML = d[2].map(function (h, i) { return '<i style="--h:' + h + ";--i:" + i + '"></i>'; }).join("");
      $("#figtitle").textContent = d[0]; $("#figcap").textContent = d[1];
      $("#fign").textContent = "Fig. " + (f % figs.length + 1) + " of " + figs.length;
      f++;
    };
    fig();
    if (!reduce) setInterval(fig, 4500);

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

    /* Swatches: the accent colour, remembered */
    var colours = [["#ffe24a", "Yellow"], ["#35d4c4", "Turquoise"], ["#ff8fc0", "Pink"], ["#b79cff", "Purple"], ["#ff6b5e", "Red"], ["#8fb4ff", "Blue"]];
    var current = (getComputedStyle(document.documentElement).getPropertyValue("--sel") || "").trim().toLowerCase();
    var sw = $("#sw");
    sw.innerHTML = colours.map(function (c) {
      return '<button type="button" style="--c:' + c[0] + '" data-c="' + c[0] + '" aria-label="' + c[1] + '" aria-pressed="' + (c[0] === current) + '"></button>';
    }).join("");
    sw.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      document.documentElement.style.setProperty("--sel", b.dataset.c);
      try { localStorage.setItem("accent", b.dataset.c); } catch (err) {}
      $$("button", sw).forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
    });

    /* Terminal */
    var tout = $("#tout"), ti = $("#ti"), pages = ["services", "projects", "design", "about", "contact"];
    var say = function (t) { var p = document.createElement("p"); p.innerHTML = t; tout.appendChild(p); tout.scrollTop = 1e6; };
    var stop = "a an the is are was were do does did i you he his him what whats who where when how which can could tell me about of in on at for to and or with has have kwame kwames s".split(" ");
    var words = function (t) { return t.toLowerCase().replace(/[^a-z0-9$+ ]/g, " ").split(/\s+/).filter(function (x) { return x && stop.indexOf(x) < 0; }); };
    var answer = function (q) {
      var qw = words(q), best = null, bestScore = 0;
      (S.facts || []).forEach(function (f) {
        var score = 0;
        f.keys.forEach(function (k) { k.split(" ").every(function (p) { return qw.some(function (w) { return w === p || (p.length > 4 && w.indexOf(p) === 0); }); }) && (score += k.split(" ").length); });
        if (score > bestScore) { bestScore = score; best = f; }
      });
      return best ? best.a : "I don't have that on file. Ask him yourself: type open contact.";
    };
    $("#tf").addEventListener("submit", function (e) {
      e.preventDefault();
      var v = ti.value.trim(), w = v.toLowerCase().split(/\s+/); ti.value = "";
      if (!v) return;
      say("<b>kwame $</b> " + esc(v));
      if (w[0] === "help") say("This is Kwame's desktop. Ask me about him in plain words, for example: what did he do at GiveDirectly? What does he build? Commands: ls, open &lt;page&gt;, clear.");
      else if (w[0] === "ls") say(pages.map(function (p) { return p + ".html"; }).join("  "));
      else if (w[0] === "open" && pages.indexOf(w[1]) > -1) { say("Opening " + w[1] + "..."); location.href = w[1] + ".html"; }
      else if (w[0] === "open") say("No page called " + esc(w[1] || "") + ". Try ls.");
      else if (w[0] === "clear") tout.innerHTML = "";
      else say(esc(answer(v)));
    });
    $("#term").addEventListener("click", function (e) { if (!e.target.closest("a")) ti.focus(); });

    /* Windows: drag by the title bar, minimize to the dock, restore from it */
    var z = 10, dock = $("#dock");
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
        w.style.left = ox + dx + "px"; w.style.top = oy + dy + "px";
      });
      var up = function () { down = false; w.classList.remove("drag"); };
      handle.addEventListener("pointerup", up); handle.addEventListener("pointercancel", up);
      if (isLink) w.addEventListener("click", function (e) { if (moved) e.preventDefault(); });
    };
    $$(".desk .win").forEach(function (w) {
      dragify(w, $(".tb", w));
      w.addEventListener("pointerdown", function () { if (!w.classList.contains("termwin")) return; w.style.zIndex = ++z; });
      var x = $(".x", w), title = $(".tb span", w).textContent;
      var minimize = function (focusTab) {
        w.classList.add("min");
        var tab = document.createElement("button");
        tab.type = "button"; tab.innerHTML = "<i aria-hidden=\"true\">" + esc(title.charAt(0)) + "</i><span>" + esc(title.replace("Kwame V. Taylor / ", "")) + "</span>"; tab.setAttribute("aria-label", "Restore " + title);
        tab.addEventListener("click", function () {
          w.classList.remove("min"); w.style.zIndex = ++z; w.style.animation = "none"; void w.offsetWidth; w.style.animation = "";
          tab.remove();
          $(".x", w).focus();
        });
        dock.appendChild(tab); if (focusTab) tab.focus();
      };
      x.addEventListener("click", function () { minimize(true); });
      if (w.dataset.start === "min") { minimize(false); w.style.animation = "none"; }
    });
    addEventListener("resize", function () {
      if (innerWidth <= 900) $$(".desk .win, .note").forEach(function (w) { w.style.left = ""; w.style.top = ""; });
    });
  }

  /* Services */
  if (page === "services" && S.services) {
    var rows = $("#rows");
    rows.innerHTML = S.services.map(function (s, k) {
      return '<li id="' + slug(s.name) + '"><button aria-expanded="false"><small>' + num(k) + "</small><span><b>" + esc(s.name) +
        "</b><span>" + esc(s.line) + '</span></span><i aria-hidden="true">→</i></button><div class="inc"><ul>' +
        (s.includes || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") +
        '</ul><a class="link" href="contact.html?about=' + encodeURIComponent(s.name) + '">Ask about this →</a></div></li>';
    }).join("");
    var lis = $$("#rows > li");
    var toggle = function (c, force) {
      lis.forEach(function (li, j) {
        var open = j === c ? (force === undefined ? !li.classList.contains("open") : force) : false;
        li.classList.toggle("open", open);
        $("button", li).setAttribute("aria-expanded", open);
      });
    };
    var sl = arrowList(lis.length, function (c) {
      lis.forEach(function (li, j) { li.classList.toggle("cur", j === c); });
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
        ? '<a class="cta" href="' + esc(p.link) + '" target="_blank" rel="noopener">View on GitHub <b>↗</b></a>'
        : '<span class="mute">' + (p.status === "In progress" ? "In progress. No link yet." : "Link to come.") + "</span>";
      var shot = $("#pshot");
      if (p.image) shot.innerHTML = '<img src="' + esc(p.image) + '" alt="Screenshot of ' + esc(p.name) + '">';
      else {
        if (!$("i", shot)) shot.innerHTML = "<i></i><i></i><i></i><i></i><i></i><span>Preview to come</span>";
        $$("i", shot).forEach(function (b, j) { b.style.setProperty("--h", 25 + ((c * 37 + j * 53) % 70)); });
      }
      try { history.replaceState(null, "", "#" + slug(p.name)); } catch (e) {}
    };
    var pl = arrowList(P.length, show);
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

  /* About: organizations */
  if (page === "about" && S.champions) {
    $("#bm").innerHTML = S.champions.map(function (c) {
      return '<li><a href="' + esc(c.url) + '" target="_blank" rel="noopener"><span>' + esc(c.name) + '</span><span aria-hidden="true">↗</span></a></li>';
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
          form.reset(); status.textContent = "Sent. Thank you. I will reply by email.";
        })
        .catch(function () { status.textContent = "That did not send. Please try again, or reach me on LinkedIn."; })
        .then(function () { send.disabled = false; });
    });
  }
})();

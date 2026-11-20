/* From Code to Systems — presentation engine
   Content lives in content.json. Every section exposes a number of "steps";
   the clicker / keyboard walks the steps, then moves to the next section. */
(function () {
  "use strict";

  /* ---------- Icon set (24×24 line icons, offline) ---------- */
  var P = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
  var ICONS = {
    person: '<circle cx="12" cy="7.5" r="3.5"/><path d="M4.5 20.5c.8-4 3.8-6.5 7.5-6.5s6.7 2.5 7.5 6.5"/>',
    users: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19.5c.6-3.3 3-5.5 6-5.5s5.4 2.2 6 5.5"/><path d="M15.5 14.2c2.7.1 4.6 2 5 4.8"/>',
    flow: '<rect x="3" y="3.5" width="6" height="5" rx="1.2"/><rect x="15" y="9.5" width="6" height="5" rx="1.2"/><rect x="3" y="15.5" width="6" height="5" rx="1.2"/><path d="M9 6h3a2 2 0 0 1 2 2v4h1M9 18h3a2 2 0 0 0 2-2v-4"/>',
    database: '<ellipse cx="12" cy="5.5" rx="7.5" ry="2.8"/><path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13"/><path d="M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8"/>',
    sliders: '<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
    plug: '<path d="M9 3v4M15 3v4"/><path d="M6.5 7h11v3.5a5.5 5.5 0 0 1-11 0z"/><path d="M12 16v5"/>',
    brain: '<path d="M9.5 4.5a3 3 0 0 0-3 3 3 3 0 0 0-2 5.2A3 3 0 0 0 7 17.5a2.8 2.8 0 0 0 5 1.5V6a2.5 2.5 0 0 0-2.5-1.5z"/><path d="M14.5 4.5a3 3 0 0 1 3 3 3 3 0 0 1 2 5.2 3 3 0 0 1-2.5 4.8 2.8 2.8 0 0 1-5 1.5"/>',
    cloud: '<path d="M7 18.5h10.5a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.6 9.2 4.7 4.7 0 0 0 7 18.5z"/>',
    antenna: '<path d="M12 11v10M8.5 21h7"/><circle cx="12" cy="9" r="2"/><path d="M8 5.5a5.5 5.5 0 0 0 0 7M16 5.5a5.5 5.5 0 0 1 0 7M5.2 3a9.5 9.5 0 0 0 0 12M18.8 3a9.5 9.5 0 0 1 0 12"/>',
    laptop: '<rect x="4.5" y="5" width="15" height="10" rx="1.5"/><path d="M2.5 19h19"/><path d="M10 12l2-4 2 4"/>',
    box: '<path d="M12 2.8l8 4.4v9.6l-8 4.4-8-4.4V7.2z"/><path d="M4 7.2l8 4.4 8-4.4M12 11.6v9.6"/>',
    building: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10.5 21v-3h3v3"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3z"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    hand: '<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10V4a1.5 1.5 0 0 1 3 0v6.5M14 10.5V6a1.5 1.5 0 0 1 3 0v7c0 4.5-2.5 8-6.5 8-2.7 0-4.3-1.3-5.6-3.5L3.6 14a1.5 1.5 0 0 1 2.4-1.7L8 14.5"/>',
    code: '<path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5M13.5 4.5l-3 15"/>',
    rocket: '<path d="M12 15l-3-3c1.3-4.6 4.6-8 10-9-1 5.4-4.4 8.7-9 10"/><path d="M9 12H5.5L8 8.5h4M12 15v3.5L15.5 16v-4"/><path d="M6.5 17.5c-1 1-1.5 3-1.5 3s2-.5 3-1.5"/>',
    hourglass: '<path d="M6.5 3h11M6.5 21h11M7.5 3c0 4.5 4.5 6 4.5 9s-4.5 4.5-4.5 9M16.5 3c0 4.5-4.5 6-4.5 9s4.5 4.5 4.5 9"/>',
    chart: '<path d="M3.5 20.5h17"/><rect x="5" y="12" width="3" height="6" rx=".6"/><rect x="10.5" y="8" width="3" height="10" rx=".6"/><rect x="16" y="4" width="3" height="14" rx=".6"/>',
    pulse: '<path d="M3 12h4l2.2-5.5 4 11L15.5 12H21"/>',
    shield: '<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z"/>',
    shieldcheck: '<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z"/><path d="M8.8 12l2.2 2.2 4.3-4.4"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.7 2.7L16.2 9.4"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8.5 7V5a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 5v2M3 12.5h18"/>',
    zap: '<path d="M13 2.5L4.5 13.5H12l-1 8 8.5-11H12z"/>',
    chat: '<path d="M4 5.5h16v10H9.5L5 19.5v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    branch: '<circle cx="6" cy="5.5" r="2"/><circle cx="6" cy="18.5" r="2"/><circle cx="18" cy="8.5" r="2"/><path d="M6 7.5v9M18 10.5c0 4-4 4.5-10.5 6.8"/>',
    flask: '<path d="M9.5 3h5M10 3v6L4.8 18.2A1.8 1.8 0 0 0 6.4 21h11.2a1.8 1.8 0 0 0 1.6-2.8L14 9V3"/><path d="M7.5 14.5h9"/>',
    coin: '<ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/>',
    gauge: '<path d="M4 17a8.5 8.5 0 1 1 16 0"/><path d="M12 14l4-5"/><circle cx="12" cy="14.5" r="1.3"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="2"/>',
    bug: '<rect x="7.5" y="7.5" width="9" height="12" rx="4.5"/><path d="M9.5 7.5a2.5 2.5 0 0 1 5 0M12 11v8.5M3.5 13h4M16.5 13h4M4.5 8.5l3 1.5M19.5 8.5l-3 1.5M4.5 18l3-1.5M19.5 18l-3-1.5"/>',
    layers: '<path d="M12 3l9 4.5-9 4.5-9-4.5z"/><path d="M3 12l9 4.5 9-4.5M3 16.5L12 21l9-4.5"/>',
    bank: '<path d="M3 9.5L12 4l9 5.5zM4 20.5h16M5.5 11v7M9.5 11v7M14.5 11v7M18.5 11v7"/>',
    flame: '<path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.6 2.6-5.6 3.8-9.3 1.9 1.3 2.8 3.3 2.7 5.5 1.3-.7 2.1-2 2.3-3.5 2.3 2 4.2 4.6 4.2 7.3 0 3.6-2.6 6.2-6.5 6.2z"/>',
    pill: '<rect x="2.8" y="8.5" width="18.4" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="M9.5 9.5l5 5"/>',
    car: '<path d="M4 16.5V12l2-5h12l2 5v4.5"/><path d="M3 16.5h18v2H3zM4 12h16"/><circle cx="7.5" cy="14.3" r=".7"/><circle cx="16.5" cy="14.3" r=".7"/>',
    bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
    quote: '<path d="M5 17.5c2.8-.8 4-2.7 4-5.5H5.5V6.5H10v5.5c0 4-2 6.3-5 7M14 17.5c2.8-.8 4-2.7 4-5.5h-3.5V6.5H19v5.5c0 4-2 6.3-5 7"/>',
    scale: '<path d="M12 3.5v17M7 20.5h10M4.5 7.5h15M12 5.5"/><path d="M6.5 7.5L3.5 14a3 3 0 0 0 6 0zM17.5 7.5l-3 6.5a3 3 0 0 0 6 0z"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    alert: '<path d="M12 3.5l9.5 16.5h-19z"/><path d="M12 10v4.5M12 17.3v.2"/>',
    wrench: '<path d="M14.5 6.5a4 4 0 0 0 5 5L21 13l-8 8-3.5-3.5 7-7M14.5 6.5L13 5l-8 8"/><path d="M3.5 20.5l4-4"/>',
    lightbulb: '<path d="M9 17.5h6M10 20.5h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
    arrowright: '<path d="M4 12h15M14 6.5l5.5 5.5-5.5 5.5"/>',
    flip: '<path d="M4 9a8 8 0 0 1 14-3l2 2M20 4v4h-4M20 15a8 8 0 0 1-14 3l-2-2M4 20v-4h4"/>'
  };
  function icon(name, cls) {
    var body = ICONS[name] || ICONS.compass;
    return '<span class="icon' + (cls ? " " + cls : "") + '" aria-hidden="true"><svg viewBox="0 0 24 24" ' + P + ">" + body + "</svg></span>";
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function src(label, url) {
    if (!url) return "";
    return '<div class="src">' + icon("link") + '<a href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(label) + "</a></div>";
  }
  function head(s) {
    return '<header class="head">' + (s.kicker ? '<div class="kicker">' + esc(s.kicker) + "</div>" : "") +
      (s.title ? '<h2 class="title">' + esc(s.title) + "</h2>" : "") +
      (s.subtitle ? '<p class="subtitle">' + esc(s.subtitle) + "</p>" : "") + "</header>";
  }
  function onSteps(el, n) {
    el.querySelectorAll("[data-step]").forEach(function (x) {
      x.classList.toggle("on", Number(x.getAttribute("data-step")) <= n);
    });
  }

  /* ---------- Renderers: each returns { html, steps, apply(el, n), bind(el, go) } ---------- */
  var R = {};

  R.title = function (s, meta) {
    var rail = s.icons.map(function (n, i) {
      return '<span class="ic" style="animation-delay:' + (0.15 + i * 0.08) + 's">' + icon(n) + "</span>" +
        (i < s.icons.length - 1 ? '<span class="arrow">›</span>' : "");
    }).join("");
    return {
      steps: 0,
      html: '<div class="eyebrow">' + esc(s.kicker) + "</div>" +
        '<h1><span class="grad-text">' + esc(s.title) + "</span></h1>" +
        '<p class="lede">' + esc(s.subtitle) + "</p>" +
        '<div class="icon-rail" aria-label="The execution stack, from human to container">' + rail + "</div>" +
        '<div class="byline">' + icon("person") + "<span><strong>" + esc(meta.speaker) + "</strong> · " + esc(meta.role) + "</span></div>" +
        '<p class="disclaimer">' + esc(meta.disclaimer) + "</p>"
    };
  };

  R.intro = function (s) {
    var items = s.points.map(function (p, i) {
      return '<div class="intro-item glass step" data-step="' + (i + 1) + '">' + icon(p.icon) + "<span>" + esc(p.text) + "</span></div>";
    }).join("");
    return { steps: s.points.length, html: head(s) + '<div class="intro-grid">' + items + "</div>", apply: onSteps };
  };

  R.poll = function (s) {
    var f = s.followups.map(function (t, i) {
      return '<div class="step" data-step="' + (i + 1) + '">' + icon("hand") + "<span>" + esc(t) + "</span></div>";
    }).join("");
    var n = s.followups.length + 1;
    return {
      steps: n,
      html: '<div class="kicker">' + esc(s.kicker) + "</div>" + '<div class="poll-hand">' + icon("hand") + "</div>" +
        '<h2 class="poll-q">' + esc(s.question) + "</h2>" + '<div class="poll-follow">' + f + "</div>" +
        '<div class="poll-punch step grad-text" data-step="' + n + '">' + esc(s.punch) + "</div>" +
        '<div class="tally" role="group" aria-label="Room read">' +
        '<button type="button">Few hands</button><button type="button">About half</button><button type="button">Most hands</button></div>',
      apply: onSteps,
      bind: function (el) {
        var bs = el.querySelectorAll(".tally button");
        bs.forEach(function (b) {
          b.addEventListener("click", function (e) {
            e.stopPropagation();
            bs.forEach(function (x) { x.classList.toggle("sel", x === b && !b.classList.contains("sel")); });
          });
        });
      }
    };
  };

  R.shift = function (s) {
    function col(c, cls, st) {
      return '<div class="shift-col glass ' + cls + (st ? ' step" data-step="' + st + '"' : '"') + ">" +
        "<h3>" + icon(c.icon) + esc(c.label) + "</h3><ul>" + c.items.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></div>";
    }
    return {
      steps: 2,
      html: head(s) + '<div class="shift-row">' + col(s.from, "then") + '<div class="shift-arrow step" data-step="1">' + icon("arrowright") + "</div>" +
        col(s.to, "now", 1) + "</div>" + '<div class="bigline step" data-step="2"><span class="grad-text">' + esc(s.bigline) + "</span></div>",
      apply: onSteps
    };
  };

  R.reveal = function (s) {
    var cards = s.items.map(function (it, i) {
      return '<div class="reveal-card glass" data-i="' + i + '" role="button" tabindex="0" aria-label="Reveal answer">' +
        icon(it.icon, "big") + '<div class="prompt">' + esc(it.prompt) + "</div>" +
        '<div class="qmark">?</div><div class="answer grad-text">' + esc(it.answer) + "</div>" +
        '<div class="note">' + esc(it.note) + "</div>" + src(it.source, it.url) + "</div>";
    }).join("");
    var n = s.items.length + 1;
    return {
      steps: n,
      html: head(s) + '<div class="reveal-grid">' + cards + "</div>" +
        '<div class="takeaway step" data-step="' + n + '">' + esc(s.takeaway) + "</div>",
      apply: function (el, k) {
        el.querySelectorAll(".reveal-card").forEach(function (c, i) { c.classList.toggle("open", i < k); });
        onSteps(el, k);
      },
      bind: function (el) {
        el.querySelectorAll(".reveal-card").forEach(function (c) {
          function t() { c.classList.toggle("open"); }
          c.addEventListener("click", function (e) { if (e.target.closest("a")) return; e.stopPropagation(); t(); });
          c.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.stopPropagation(); t(); } });
        });
      }
    };
  };

  R.evidence = function (s) {
    var cards = s.cards.map(function (c, i) {
      return '<div class="evi glass step" data-step="' + (i + 1) + '"><div class="top">' + icon(c.icon) +
        '<div class="stat grad-text">' + esc(c.stat) + '</div></div><div class="label">' + esc(c.label) + "</div>" + src(c.source, c.url) + "</div>";
    }).join("");
    return {
      steps: s.cards.length,
      html: head(s) + '<div class="evi-grid">' + cards + "</div>" + '<div class="caveat">' + icon("alert") + esc(s.caveat) + "</div>",
      apply: onSteps
    };
  };

  R.provocation = function (s) {
    return {
      steps: 1,
      html: '<div class="flip" role="button" tabindex="0" aria-label="Flip">' +
        '<div class="flip-inner">' +
        '<div class="face front">' + icon(s.icon, "giant") + '<div class="tag">' + icon("alert") + esc(s.kicker) + "</div>" +
        '<div class="say">' + esc(s.myth) + "</div>" +
        '<div class="vote"><span>' + icon("hand") + "Myth</span><span>" + icon("hand") + "Fact</span></div></div>" +
        '<div class="face back">' + icon("lightbulb", "giant") + '<div class="tag">' + icon("flip") + "Flip it</div>" +
        '<div class="say grad-text">' + esc(s.flip) + "</div></div>" +
        "</div></div>",
      apply: function (el, k) { el.querySelector(".flip").classList.toggle("flipped", k >= 1); },
      bind: function (el) {
        var f = el.querySelector(".flip");
        f.addEventListener("click", function (e) { e.stopPropagation(); f.classList.toggle("flipped"); });
      }
    };
  };

  function layerDetail(L, idx) {
    return '<div class="dh">' + icon(L.icon) + '<div><div class="kicker">Layer ' + (idx + 1) + "</div><h3>" + esc(L.name) + "</h3></div></div>" +
      '<div class="kv">' +
      '<span class="ok">' + icon("wrench") + '</span><div><div class="k">You engineer</div><div class="v">' + esc(L.engineer) + "</div></div>" +
      '<span class="bad">' + icon("alert") + '</span><div><div class="k">What breaks</div><div class="v">' + esc(L.risk) + "</div></div>" +
      '<span class="sk">' + icon("target") + '</span><div><div class="k">Skills that save you</div><div class="pills">' +
      L.skills.map(function (x) { return '<span class="pill">' + esc(x) + "</span>"; }).join("") + "</div></div></div>" +
      src(L.source, L.url);
  }

  R.stack = function (s) {
    var layers = s.layers.map(function (L, i) {
      return '<button type="button" class="layer" data-i="' + i + '"><span class="num">' + String(i + 1).padStart(2, "0") + "</span>" + icon(L.icon) + "<span>" + esc(L.name) + "</span></button>";
    }).join("");
    return {
      steps: s.layers.length,
      html: head(s) + '<div class="stack-wrap"><div class="stack">' + layers + "</div>" +
        '<div class="detail glass"><div class="detail-empty">' + icon("layers") + "<div>Ten layers. One system.<br>Click or advance to explore.</div></div></div></div>",
      apply: function (el, k) {
        var d = el.querySelector(".detail");
        el.querySelectorAll(".layer").forEach(function (b, i) { b.classList.toggle("sel", i === k - 1); b.classList.toggle("done", i < k - 1); });
        d.innerHTML = k === 0 ? '<div class="detail-empty">' + icon("layers") + "<div>Ten layers. One system.<br>Click or advance to explore.</div></div>" : layerDetail(s.layers[k - 1], k - 1);
      },
      bind: function (el, go) {
        el.querySelectorAll(".layer").forEach(function (b) {
          b.addEventListener("click", function (e) { e.stopPropagation(); go(Number(b.getAttribute("data-i")) + 1); });
        });
      }
    };
  };

  R.journey = function (s, meta, all) {
    var stack = all.filter(function (x) { return x.type === "stack"; })[0];
    var layers = stack ? stack.layers : [];
    var idx = {}; layers.forEach(function (L, i) { idx[L.id] = i; });
    var track = layers.map(function (L, i) {
      return '<div class="layer" data-i="' + i + '"><span class="num">' + String(i + 1).padStart(2, "0") + "</span>" + icon(L.icon) + "<span>" + esc(L.name) + "</span></div>";
    }).join("");
    var n = s.steps.length + 1;
    function card(k) {
      if (k === 0) return '<div class="detail-empty">' + icon("chat") + "<div>Advance to send the request<br>through the stack.</div></div>";
      if (k > s.steps.length) return '<div class="detail-empty">' + icon("lightbulb") + '<div class="what grad-text" style="font-size:clamp(24px,2.6vw,42px);font-weight:700">' + esc(s.takeaway) + "</div></div>";
      var st = s.steps[k - 1], L = layers[idx[st.layer]] || { name: st.layer, icon: "compass" };
      return '<div class="stepno">HOP ' + k + " / " + s.steps.length + " · " + esc(L.name).toUpperCase() + "</div>" +
        '<div class="what">' + esc(st.what) + "</div>" +
        '<div class="jgrid"><div class="jbox breaks">' + icon("alert") + "<div><small>What could break</small>" + esc(st.breaks) + "</div></div>" +
        '<div class="jbox save">' + icon("shieldcheck") + "<div><small>What saves you</small>" + esc(st.save) + "</div></div></div>";
    }
    return {
      steps: n,
      html: head(s) + '<div class="journey-req">' + esc(s.request) + "</div>" +
        '<div class="journey-wrap"><div class="track">' + track + '<span class="packet" style="top:-40px;opacity:0"></span></div><div class="jcard glass"></div></div>',
      apply: function (el, k) {
        el.querySelector(".jcard").innerHTML = card(k);
        var cur = k >= 1 && k <= s.steps.length ? idx[s.steps[k - 1].layer] : -1;
        var rows = el.querySelectorAll(".track .layer");
        rows.forEach(function (r, i) { r.classList.toggle("sel", i === cur); });
        var pk = el.querySelector(".packet");
        if (cur >= 0 && rows[cur]) { pk.style.opacity = 1; pk.style.top = (rows[cur].offsetTop + rows[cur].offsetHeight / 2 - 6) + "px"; }
        else pk.style.opacity = 0;
      }
    };
  };

  R.trio = function (s) {
    var items = s.items.map(function (t, i) {
      return '<div class="t glass step" data-step="' + (i + 1) + '">' + icon(t.icon) + "<h3>" + esc(t.name) + '</h3><div class="line">' + esc(t.line) + "</div>" +
        '<div class="proof">' + esc(t.proof) + "</div>" + src("Source", t.url) + "</div>";
    }).join("");
    var n = s.items.length + 1;
    return { steps: n, html: head(s) + '<div class="trio">' + items + '</div><div class="takeaway step" data-step="' + n + '">' + esc(s.takeaway) + "</div>", apply: onSteps };
  };

  R.skills = function (s) {
    var tiles = s.skills.map(function (k, i) {
      return '<button type="button" class="tile" data-i="' + i + '">' + icon(k.icon) + "<span>" + esc(k.name) + "</span></button>";
    }).join("");
    var state = { sel: -1, flipped: false };
    function card(i, flipped) {
      if (i < 0) return '<div class="glass detail-empty" style="min-height:380px">' + icon("target") + "<div>" + s.skills.length + " skills.<br>Advance or click a tile.</div></div>";
      var k = s.skills[i];
      return '<div class="skill-card' + (flipped ? " flipped" : "") + '" role="button" tabindex="0" aria-label="Flip card"><div class="flip-inner">' +
        '<div class="face front"><h3>' + icon(k.icon) + esc(k.name) + '</h3><div class="why">' + esc(k.why) + "</div>" + src(k.source, k.url) +
        '<div class="hint">' + icon("flip") + "Click or advance: old way vs. AI way</div></div>" +
        '<div class="face back"><h3>' + icon(k.icon) + esc(k.name) + "</h3>" +
        '<div class="oldnew"><div class="o"><small>Old way</small>' + esc(k.old) + '</div><div class="n"><small>AI-era way</small>' + esc(k.ai) + "</div></div>" +
        '<details class="starter"><summary>' + icon("rocket") + "Starter move</summary><p>" + esc(k.starter) + "</p></details></div>" +
        "</div></div>";
    }
    var pane;
    function render(el) {
      pane.innerHTML = card(state.sel, state.flipped);
      el.querySelectorAll(".tile").forEach(function (t, i) { t.classList.toggle("sel", i === state.sel); });
      var c = pane.querySelector(".skill-card");
      if (c) c.addEventListener("click", function (e) {
        if (e.target.closest("details") || e.target.closest("a")) { e.stopPropagation(); return; }
        e.stopPropagation(); state.flipped = !state.flipped; c.classList.toggle("flipped", state.flipped);
      });
    }
    return {
      steps: s.skills.length * 2,
      html: head(s) + '<div class="skills-wrap"><div class="skill-grid">' + tiles + '</div><div class="skill-pane"></div></div>',
      apply: function (el, k) {
        pane = el.querySelector(".skill-pane");
        state.sel = k === 0 ? -1 : Math.ceil(k / 2) - 1;
        state.flipped = k > 0 && k % 2 === 0;
        el.querySelectorAll(".tile").forEach(function (t, i) { t.classList.toggle("seen", i < state.sel); });
        render(el);
      },
      bind: function (el, go) {
        el.querySelectorAll(".tile").forEach(function (t) {
          t.addEventListener("click", function (e) { e.stopPropagation(); go(Number(t.getAttribute("data-i")) * 2 + 1); });
        });
      }
    };
  };

  R.field = function (s) {
    var cards = s.stories.map(function (st, i) {
      return '<div class="story glass step" data-step="' + (i + 1) + '">' + icon(st.icon) +
        '<div class="sector">' + esc(st.sector) + "</div><h3>" + esc(st.title) + "</h3>" +
        '<div class="row">' + icon("alert") + "<span>" + esc(st.challenge) + "</span></div>" +
        '<div class="row">' + icon("wrench") + "<span>" + esc(st.move) + "</span></div>" +
        '<div class="row lesson">' + icon("lightbulb") + "<span>" + esc(st.lesson) + "</span></div></div>";
    }).join("");
    return {
      steps: s.stories.length,
      html: head(s) + '<div class="field-grid">' + cards + '</div><div class="caveat">' + icon("shield") + esc(s.note) + "</div>",
      apply: onSteps
    };
  };

  R.cases = function (s) {
    var cards = s.cases.map(function (c, i) {
      var q = c.icon === "quote";
      return '<div class="case glass step" data-step="' + (i + 1) + '"><div class="top"><span class="org">' + esc(c.org) + "</span>" + icon(c.icon) + "</div>" +
        '<div class="what">' + esc(c.what) + "</div>" +
        (q ? '<div class="stat quote">' + esc(c.statLabel) + "</div>" : '<div class="stat grad-text">' + esc(c.stat) + '</div><div class="sl">' + esc(c.statLabel) + "</div>") +
        src("Read the story", c.url) + "</div>";
    }).join("");
    return {
      steps: s.cases.length,
      html: head(s) + '<div class="case-grid">' + cards + '</div><div class="caveat">' + icon("alert") + esc(s.caveat) + "</div>",
      apply: onSteps
    };
  };

  R.roles = function (s) {
    var order = s.legend.map(function (l) { return l.key; });
    var cols = s.legend.map(function (l, ci) {
      var rs = s.roles.filter(function (r) { return r.horizon === l.key; }).map(function (r) {
        return '<div class="role glass ' + r.horizon + (r.name === "Legal engineering" ? " feature" : "") + '">' + icon(r.icon) +
          "<h3>" + esc(r.name) + '</h3><div class="line">' + esc(r.line) + '</div><div class="proof">' + src(r.proof, r.url) + "</div></div>";
      }).join("");
      return '<div class="role-col step" data-step="' + (ci + 1) + '"><h4><span class="dot ' + l.key + '"></span>' + esc(l.label) + "</h4>" + rs + "</div>";
    }).join("");
    var legend = s.legend.map(function (l) { return '<span class="lg"><span class="dot ' + l.key + '"></span>' + esc(l.label) + "</span>"; }).join("") +
      '<span class="ln">' + esc(s.legendNote) + "</span>";
    return { steps: order.length, html: head(s) + '<div class="legend">' + legend + '</div><div class="role-cols">' + cols + "</div>", apply: onSteps };
  };

  R.close = function (s, meta) {
    return {
      steps: 2,
      html: '<div class="l1">' + esc(s.line) + "</div>" +
        '<div class="l2 step grad-text" data-step="1">' + esc(s.line2) + "</div>" +
        '<div class="thanks step" data-step="2"><strong>' + esc(s.thanks) + "</strong> · " + esc(meta.speaker) + "</div>",
      apply: onSteps
    };
  };

  R.sources = function (s) {
    var g = s.groups.map(function (gr) {
      return '<div class="src-group glass"><h3>' + esc(gr.name) + "</h3><ol>" +
        gr.items.map(function (it) { return '<li><a href="' + esc(it.url) + '" target="_blank" rel="noopener">' + esc(it.t) + "</a></li>"; }).join("") +
        "</ol></div>";
    }).join("");
    return { steps: 0, html: head(s) + '<div class="src-grid">' + g + "</div>" };
  };

  /* ---------- Engine ---------- */
  var stage = document.getElementById("stage");
  var slides = [], cur = 0, step = 0;

  function build(data) {
    document.title = data.meta.title + " · " + data.meta.subtitle;
    data.sections.forEach(function (s, i) {
      var r = (R[s.type] || R.sources)(s, data.meta, data.sections);
      var el = document.createElement("section");
      el.className = "slide s-" + s.type;
      el.id = s.id;
      el.setAttribute("aria-label", s.title || s.question || s.myth || s.kicker || s.id);
      el.innerHTML = r.html;
      stage.appendChild(el);
      var obj = { el: el, r: r, s: s };
      if (r.bind) r.bind(el, function (k) { goStep(i, k); });
      slides.push(obj);
    });
    var h = (location.hash || "").replace("#", "").split("/");
    var si = slides.findIndex(function (x) { return x.s.id === h[0]; });
    show(si >= 0 ? si : 0, si >= 0 ? Math.min(Number(h[1]) || 0, slides[si].r.steps || 0) : 0);
  }

  function show(i, k) {
    cur = Math.max(0, Math.min(slides.length - 1, i));
    var sl = slides[cur];
    step = Math.max(0, Math.min(sl.r.steps || 0, k));
    slides.forEach(function (x, j) { x.el.classList.toggle("active", j === cur); x.el.setAttribute("aria-hidden", j === cur ? "false" : "true"); });
    if (sl.r.apply) sl.r.apply(sl.el, step);
    document.getElementById("counter").textContent = (cur + 1) + " / " + slides.length;
    var total = slides.length - 1 || 1;
    var frac = (cur + (sl.r.steps ? step / (sl.r.steps + 1) : 0)) / total;
    document.getElementById("progressBar").style.width = Math.min(100, frac * 100) + "%";
    history.replaceState(null, "", "#" + sl.s.id + (step ? "/" + step : ""));
  }
  function goStep(i, k) { show(i, k); }
  function next() {
    var sl = slides[cur];
    if (step < (sl.r.steps || 0)) show(cur, step + 1);
    else if (cur < slides.length - 1) { slides[cur + 1].el.scrollTop = 0; show(cur + 1, 0); }
  }
  function prev() {
    if (step > 0) show(cur, step - 1);
    else if (cur > 0) show(cur - 1, slides[cur - 1].r.steps || 0);
  }

  document.addEventListener("keydown", function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
    var bo = document.getElementById("blackout");
    var k = e.key;
    if (k === "b" || k === "B" || k === "." ) { bo.classList.toggle("on"); e.preventDefault(); return; }
    if (bo.classList.contains("on")) { bo.classList.remove("on"); e.preventDefault(); return; }
    if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter", "n", "N"].indexOf(k) >= 0) {
      if (k === "Enter" && t && t.closest && (t.closest("summary") || t.closest("a") || t.closest("button") || t.closest("[role=button]"))) return;
      e.preventDefault(); next();
    } else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace", "p", "P"].indexOf(k) >= 0) {
      e.preventDefault(); prev();
    } else if (k === "Home") { e.preventDefault(); show(0, 0); }
    else if (k === "End") { e.preventDefault(); show(slides.length - 1, 0); }
    hint();
  });
  document.getElementById("nextBtn").addEventListener("click", function (e) { e.stopPropagation(); next(); });
  document.getElementById("prevBtn").addEventListener("click", function (e) { e.stopPropagation(); prev(); });

  var hintTimer;
  function hint() {
    var h = document.getElementById("keyhint");
    h.classList.add("hide");
    clearTimeout(hintTimer);
  }
  hintTimer = setTimeout(hint, 9000);
  window.addEventListener("resize", function () { var sl = slides[cur]; if (sl && sl.r.apply) sl.r.apply(sl.el, step); });

  /* ---------- Load content: embedded copy first (works offline / file://), else content.json ---------- */
  var embedded = document.getElementById("talk-data");
  if (embedded) {
    build(JSON.parse(embedded.textContent));
  } else {
    fetch("content.json").then(function (r) { return r.json(); }).then(build).catch(function () {
      stage.innerHTML = '<section class="slide active" style="justify-content:center;align-items:center;text-align:center"><h2 class="title">Content could not load</h2>' +
        '<p class="subtitle">Open the single-file version, or serve this folder from a local web server.</p></section>';
    });
  }
})();

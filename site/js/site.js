/* Julian Zauner · site.js (ohne Abhängigkeiten) */
(() => {
  const d = document, root = d.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lang = root.lang.startsWith("en") ? "en" : "de";
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];

  /* ---------- Kopf: fest beim Scrollen, Menü ---------- */
  const top = $(".top");
  const hero = $(".hero");
  const onScroll = () => top && top.classList.toggle("is-solid", scrollY > (hero ? hero.offsetHeight - 90 : 10));
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const menuBtn = $(".menu-btn"), sheet = $(".sheet");
  const setMenu = (open) => {
    root.classList.toggle("menu-open", open);
    menuBtn?.setAttribute("aria-expanded", String(open));
    sheet?.setAttribute("aria-hidden", String(!open));
    if (sheet) sheet.inert = !open;
    d.body.style.overflow = open ? "hidden" : "";
    if (open) top.classList.add("is-solid"); else onScroll();
  };
  if (sheet) sheet.inert = true;
  menuBtn?.addEventListener("click", () => setMenu(!root.classList.contains("menu-open")));
  sheet?.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  d.addEventListener("keydown", (e) => { if (e.key === "Escape" && root.classList.contains("menu-open")) { setMenu(false); menuBtn.focus(); } });

  /* ---------- Roter Schlusspunkt: gleicher sichtbarer Abstand nach jedem Endbuchstaben ----------
     Misst die rechte Leerfläche (Vorbreite minus Tintenkante) des letzten Buchstabens in der echten Schrift
     und setzt den Abstand so, dass zwischen Tinte und Punkt immer GAP × Schriftgröße liegt. */
  const GAP = .085;
  const ctx = d.createElement("canvas").getContext("2d");
  const lastChar = (dot) => {
    for (let n = dot.previousSibling; n; n = n.previousSibling) { const t = (n.textContent || "").trimEnd(); if (t) return t.at(-1); }
    return "";
  };
  const fixDots = () => $$(".dot").forEach((dot) => {
    const prev = dot.previousElementSibling;
    const cs = getComputedStyle(prev && prev.classList.contains("ch") ? prev : dot.parentElement);
    const ch = lastChar(dot), size = parseFloat(cs.fontSize);
    if (!ch || !size) return;
    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${size}px ${cs.fontFamily}`;
    const m = ctx.measureText(cs.textTransform === "uppercase" ? ch.toUpperCase() : ch);
    const rsb = m.width - m.actualBoundingBoxRight;   // Leerraum rechts der Tinte
    const ls = parseFloat(cs.letterSpacing) || 0;     // Laufweite nach dem letzten Buchstaben
    // Optischer Ausgleich: Buchstaben, die unten rechts offen sind (Arm oben, Stamm links), bekommen den Punkt näher heran
    const up = cs.textTransform === "uppercase" ? ch.toUpperCase() : ch;
    const opt = { Y: .15, T: .15, V: .07, W: .05, P: .11, F: .12, 7: .1 }[up] || 0;
    dot.style.marginLeft = ((GAP * size - rsb - ls) / size - opt).toFixed(3) + "em";
  });
  (d.fonts ? d.fonts.ready : Promise.resolve()).then(() => { fixDots(); dispatchEvent(new Event("resize")); });

  /* ---------- Hero: Karussell mit Serienbild ---------- */
  if (hero) {
    const slides = $$(".hero__slide", hero);
    const tabs = $$(".tab", hero);
    const stacks = $$("[data-stack]", hero);
    const edge = $(".shutter-edge", hero), flash = $(".flash", hero);
    const pauseBtn = $(".pause", hero);
    const DUR = [9200, 7000, 7600];
    let cur = 0, timer = null, paused = reduce, userPaused = false, burstDone = false, burstTimer = null;

    const word = (el) => { // Buchstaben einzeln für den Einstieg
      if (el.dataset.split) return; el.dataset.split = 1;
      let n = 0;
      $$(".ln", el).forEach((ln) => {
        const html = [...ln.childNodes].map((node) => {
          const wrap = node.nodeType === 1 ? [node.outerHTML.split(">")[0] + ">", "</" + node.tagName.toLowerCase() + ">"] : ["", ""];
          return wrap[0] + [...node.textContent].map((c) => c === " " ? " " : `<span class="ch" style="--n:${n++}">${c}</span>`).join("") + wrap[1];
        }).join("");
        ln.innerHTML = html;
      });
    };
    const fit = () => { // Riesenwort auf Seitenbreite setzen (längstes Wort füllt die Breite)
      const ref = $(".word[data-ref]", hero); if (!ref) return;
      const avail = ref.parentElement.getBoundingClientRect().width;
      const probe = ref.cloneNode(true); probe.style.cssText = "position:absolute;visibility:hidden;font-size:100px;width:auto"; ref.parentElement.appendChild(probe);
      const w = probe.getBoundingClientRect().width; probe.remove();
      const size = Math.min(avail / w * 100 * .985, innerHeight * .29) * .70; // 30 % kleiner als die volle Breite (Julian, 2026-11-24: 18 %, danach nochmals 15 %)
      hero.style.setProperty("--fit", size.toFixed(1) + "px");
    };
    d.fonts?.ready.then(fit); addEventListener("resize", fit); fit();
    $$(".word", hero).forEach((w) => { if (!reduce) word(w); });

    const shutter = (el) => {
      if (reduce) return;
      el.classList.remove("shutter-in"); void el.offsetWidth; el.classList.add("shutter-in");
      edge.classList.remove("run"); void edge.offsetWidth; edge.classList.add("run");
      flash.classList.remove("run"); void flash.offsetWidth; flash.classList.add("run");
    };
    const setStacks = (key, i) => stacks.forEach((s) => $$(":scope > [data-for]", s).forEach((c) => c.classList.toggle("is-active", c.dataset.for === key && (c.dataset.i === undefined || +c.dataset.i === i))));
    const runBar = (i) => tabs.forEach((t, j) => {
      t.classList.remove("run", "done"); t.setAttribute("aria-selected", String(j === i)); t.tabIndex = j === i ? 0 : -1;
      if (j < i) t.classList.add("done");
      if (j === i && !paused) { t.style.setProperty("--dur", DUR[i] + "ms"); void t.offsetWidth; t.classList.add("run"); }
    });

    // Serienbild auf Slide 1: Bilder wechseln wie bei einer Serienaufnahme, das letzte bleibt stehen
    const frames = $$(".burst__frame", hero);
    const showFrame = (k, anim = true) => {
      frames.forEach((f, j) => { f.classList.toggle("is-under", f.classList.contains("is-on") && j !== k); f.classList.toggle("is-on", j === k); });
      if (anim) shutter(frames[k]);
      setStacks("photo", k);
    };
    const loadFrames = () => Promise.all(frames.map((f) => { const img = $("img", f); if (img.loading === "lazy") img.loading = "eager"; return img.decode().catch(() => {}); }));
    const burst = async () => {
      if (reduce || burstDone || frames.length < 2) { showFrame(frames.length - 1, false); return; }
      burstDone = true;
      await loadFrames();
      let k = 0;
      const step = () => { if (cur !== 0) return; k++; if (k >= frames.length) return; showFrame(k); burstTimer = setTimeout(step, k === frames.length - 1 ? 0 : 1150); };
      burstTimer = setTimeout(step, 1400);
    };

    const go = (i, user = false) => {
      if (i === cur) { if (user) { runBar(cur); schedule(); } return; } // Klick auf den aktiven Tab: nur Zeit neu starten
      const prev = slides[cur];
      clearTimeout(burstTimer);
      prev.classList.remove("is-active"); prev.classList.add("is-leaving");
      setTimeout(() => prev.classList.remove("is-leaving"), 800);
      cur = (i + slides.length) % slides.length;
      const s = slides[cur];
      s.classList.add("is-active");
      shutter(s);
      hero.dataset.mode = s.dataset.key;
      slides.forEach((x, j) => x.setAttribute("aria-hidden", String(j !== cur)));
      if (s.dataset.key === "photo") { if (!burstDone) burst(); else { showFrame(frames.length - 1, false); } }
      setStacks(s.dataset.key, s.dataset.key === "photo" ? frames.findIndex((f) => f.classList.contains("is-on")) : undefined);
      runBar(cur); schedule();
      if (user) live.textContent = tabs[cur].textContent.trim();
    };
    const schedule = () => { clearTimeout(timer); if (!paused) timer = setTimeout(() => go(cur + 1), DUR[cur]); };
    const live = Object.assign(d.createElement("p"), { className: "sr-only" }); live.setAttribute("aria-live", "polite"); hero.appendChild(live);
    const setPaused = (p) => { paused = p; hero.classList.toggle("paused", p); pauseBtn?.setAttribute("aria-label", p ? pauseBtn.dataset.play : pauseBtn.dataset.pause); if (p) clearTimeout(timer); else { runBar(cur); schedule(); } };

    tabs.forEach((t, j) => {
      t.addEventListener("click", () => go(j, true));
      t.addEventListener("keydown", (e) => { const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (k) { e.preventDefault(); const n = (j + k + tabs.length) % tabs.length; tabs[n].focus(); go(n, true); } });
    });
    pauseBtn?.addEventListener("click", () => { userPaused = !paused; setPaused(!paused); });
    hero.addEventListener("focusin", (e) => { if (!e.target.closest(".tabs") && !paused) setPaused(true); });
    hero.addEventListener("focusout", (e) => { if (!hero.contains(e.relatedTarget) && !userPaused && !reduce) setPaused(false); });
    hero.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse" && !paused) { hero.dataset.hoverPause = 1; setPaused(true); } });
    hero.addEventListener("pointerleave", () => { if (hero.dataset.hoverPause && !userPaused) { delete hero.dataset.hoverPause; setPaused(false); } });
    d.addEventListener("visibilitychange", () => { if (d.hidden) clearTimeout(timer); else if (!paused) schedule(); });

    // Design-Slide: leichte Tiefe per Maus (nur Desktop mit Maus, nicht bei reduzierter Bewegung)
    const stage = $(".board__stage", hero);
    if (stage && !reduce && matchMedia("(hover: hover) and (pointer: fine)").matches) {
      hero.addEventListener("pointermove", (e) => {
        if (hero.dataset.mode !== "design") return;
        const r = hero.getBoundingClientRect();
        stage.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        stage.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      });
      hero.addEventListener("pointerleave", () => { stage.style.setProperty("--px", 0); stage.style.setProperty("--py", 0); });
    }

    hero.dataset.mode = "photo";
    setPaused(reduce);
    runBar(0); schedule();
    setStacks("photo", 0);
    if (!reduce) burst(); else showFrame(frames.length - 1, false);
  }

  /* ---------- Fotografie-Index: Vorschau folgt der Zeile ---------- */
  const view = $(".cats__view");
  if (view) {
    const figs = $$("figure", view);
    let on = 0;
    const show = (i) => { if (i === on) return; figs.forEach((f, j) => { f.classList.toggle("was", j === on); f.classList.toggle("is-on", j === i); }); $$(".cat").forEach((c, j) => c.classList.toggle("is-on", j === i)); on = i; };
    $$(".cat").forEach((c, i) => { c.addEventListener("pointerenter", () => show(i)); c.addEventListener("focus", () => show(i)); });
  }

  /* ---------- Garantie: Zeitleiste zeichnet sich einmal ---------- */
  const lt = $(".line-time");
  if (lt && !reduce && "IntersectionObserver" in window) {
    lt.style.setProperty("--p", 0);
    new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { requestAnimationFrame(() => lt.style.setProperty("--p", 1)); o.disconnect(); } }), { threshold: .6 }).observe(lt);
  }

  /* ---------- KI-Werkstatt ---------- */
  const tools = $$(".tool");
  if (tools.length) {
    const scenes = $$(".scene"), label = $(".ki__bar b");
    // Bildschirmaufnahmen: nur das gewählte Werkzeug spielt, und nur wenn sichtbar (nicht bei reduzierter Bewegung/Datensparen)
    let inView = false;
    const noMotion = reduce || navigator.connection?.saveData;
    const syncVideos = () => scenes.forEach((s) => { const v = $("video", s); if (!v) return; if (s.classList.contains("is-active") && inView && !noMotion) { v.preload = "auto"; v.play().catch(() => {}); } else v.pause(); });
    const pick = (i, focus = false) => {
      tools.forEach((t, j) => { t.setAttribute("aria-selected", String(j === i)); t.tabIndex = j === i ? 0 : -1; });
      scenes.forEach((s, j) => { s.classList.remove("is-active"); if (j === i) { void s.offsetWidth; s.classList.add("is-active"); } });
      if (label) label.textContent = tools[i].dataset.file;
      if (focus) tools[i].focus();
      syncVideos();
    };
    tools.forEach((t, i) => {
      t.addEventListener("click", () => pick(i));
      t.addEventListener("keydown", (e) => { const k = { ArrowDown: 1, ArrowUp: -1, ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (k) { e.preventDefault(); pick((i + k + tools.length) % tools.length, true); } });
    });
    // Szenen erst abspielen, wenn sichtbar
    const scr = $(".ki__screen");
    if (scr && "IntersectionObserver" in window) {
      scr.classList.add("hold");
      new IntersectionObserver((es) => es.forEach((e) => { inView = e.isIntersecting; syncVideos(); }), { threshold: .4 }).observe(scr);
    }
  }

  /* ---------- Anfrage: WhatsApp oder E-Mail mit fertiger Nachricht ---------- */
  const form = $("#anfrage-form");
  if (form) {
    const T = {
      de: { need: "Wähl bitte aus, worum es geht.", name: "Wie heißt du? Dann weiß ich, wem ich antworte.", hi: "Hallo Julian,", want: "es geht um", when: "Zeitraum", date: "Wunschtermin", via: "Von dir gehört über", msg: "Nachricht", from: "Name", subj: "Anfrage" },
      en: { need: "Please pick what it's about.", name: "What's your name? Then I know who I'm replying to.", hi: "Hi Julian,", want: "this is about", when: "Timing", date: "Preferred date", via: "Heard about you from", msg: "Message", from: "Name", subj: "Enquiry" },
    }[lang];
    const errTopic = $("#err-topic"), errName = $("#err-name"), nameIn = $("#f-name");
    // Thema vorauswählen über Link (#anfrage?thema=ki oder data-thema)
    const preset = (key) => { const box = form.querySelector(`input[name="thema"][value="${key}"]`); if (box) box.checked = true; };
    $$("[data-thema]").forEach((a) => a.addEventListener("click", () => preset(a.dataset.thema)));
    const p = new URLSearchParams(location.search).get("thema"); if (p) preset(p);
    const build = () => {
      const topics = $$('input[name="thema"]:checked', form).map((i) => i.dataset.label);
      const when = $('input[name="wann"]:checked', form)?.dataset.label;
      const v = (id) => $(id)?.value.trim();
      let ok = true;
      errTopic.classList.toggle("on", !topics.length); if (!topics.length) ok = false;
      const n = v("#f-name");
      errName.classList.toggle("on", !n); nameIn.setAttribute("aria-invalid", String(!n)); if (!n) ok = false;
      if (!ok) { (!topics.length ? form.querySelector('input[name="thema"]') : nameIn).focus(); return null; }
      const lines = [T.hi, "", `${T.want}: ${topics.join(", ")}.`];
      if (when) lines.push(`${T.when}: ${when}`);
      if (v("#f-datum")) lines.push(`${T.date}: ${new Date(v("#f-datum")).toLocaleDateString(lang === "de" ? "de-AT" : "en-GB")}`);
      if (v("#f-text")) lines.push("", v("#f-text"));
      if (v("#f-via")) lines.push("", `${T.via}: ${v("#f-via")}`);
      lines.push("", `${T.from}: ${n}`);
      return { text: lines.join("\n"), subject: `${T.subj}: ${topics.join(", ")} (${n})` };
    };
    const done = $(".form__ok");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const m = build(); if (!m) return;
      const via = e.submitter?.value || "whatsapp";
      const url = via === "mail"
        ? `mailto:${form.dataset.mail}?subject=${encodeURIComponent(m.subject)}&body=${encodeURIComponent(m.text)}`
        : `https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(m.text)}`;
      done.classList.add("on"); done.focus();
      if (via === "mail") location.href = url; else window.open(url, "_blank", "noopener");
    });
    $$('input[name="thema"]', form).forEach((i) => i.addEventListener("change", () => errTopic.classList.remove("on")));
    nameIn.addEventListener("input", () => { errName.classList.remove("on"); nameIn.removeAttribute("aria-invalid"); });
  }

  /* ---------- Daumenleiste am Handy ---------- */
  const thumb = $(".thumb"), ask = $("#anfrage");
  if (thumb) {
    let past = false, atAsk = false;
    const upd = () => thumb.classList.toggle("on", past && !atAsk && !root.classList.contains("menu-open"));
    addEventListener("scroll", () => { past = scrollY > innerHeight * 2.2; upd(); }, { passive: true });
    if (ask && "IntersectionObserver" in window) new IntersectionObserver((es) => es.forEach((e) => { atAsk = e.isIntersecting; upd(); }), { rootMargin: "0px 0px -20% 0px" }).observe(ask);
  }

  /* ---------- Galerie: Filter + Lightbox ---------- */
  const gal = $(".gal");
  if (gal) {
    const items = $$(".gal__item", gal);
    const chips = $$('.filters input[name="filter"]');
    // Zeilenweises Raster: jedes Bild bekommt eine Zeilen-Spanne passend zu seiner Höhe (Reihenfolge liest von links nach rechts)
    const layout = () => {
      gal.classList.add("is-grid");
      const gap = parseFloat(getComputedStyle(gal).columnGap) || 10;
      items.forEach((it) => { if (it.hidden) return; const img = $("img", it); const w = it.getBoundingClientRect().width; const h = w * (img.height / img.width); it.style.gridRowEnd = `span ${Math.ceil(h + gap)}`; });
    };
    let raf; addEventListener("resize", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(layout); });
    const apply = (k) => { items.forEach((it) => { it.hidden = k !== "alle" && it.dataset.kat !== k; }); const c = chips.find((x) => x.value === k); if (c) c.checked = true; layout(); };
    layout();
    chips.forEach((c) => c.addEventListener("change", () => { apply(c.value); history.replaceState(null, "", c.value === "alle" ? location.pathname : "#" + c.value); }));
    const h = location.hash.slice(1); if (h && chips.some((c) => c.value === h)) apply(h);

    const lb = $(".lb"), lbImg = $(".lb__img img"), cap = $(".lb__cap"), exif = $(".lb__exif"), cnt = $(".lb__count");
    let idx = 0, opener = null;
    const vis = () => items.filter((x) => !x.hidden);
    const open = (it) => {
      const list = vis(); idx = list.indexOf(it);
      const im = $("img", it);
      lbImg.src = it.dataset.full; lbImg.alt = im.alt; lbImg.hidden = false;
      cap.textContent = im.alt; exif.textContent = it.dataset.exif || "";
      cnt.textContent = `${idx + 1} / ${list.length}`;
    };
    const show = (it) => { opener = opener || d.activeElement; open(it); lb.classList.add("on"); lb.setAttribute("aria-hidden", "false"); d.body.style.overflow = "hidden"; $(".lb__close").focus(); };
    const close = () => { lb.classList.remove("on"); lb.setAttribute("aria-hidden", "true"); d.body.style.overflow = ""; opener?.focus(); opener = null; };
    const step = (k) => { const list = vis(); open(list[(idx + k + list.length) % list.length]); };
    items.forEach((it) => it.addEventListener("click", () => show(it)));
    $(".lb__close").addEventListener("click", close);
    $(".lb__prev").addEventListener("click", () => step(-1));
    $(".lb__next").addEventListener("click", () => step(1));
    lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lb__img")) close(); });
    d.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("on")) return;
      if (e.key === "Escape") close(); else if (e.key === "ArrowRight") step(1); else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") { const f = $$("button", lb); const i = f.indexOf(d.activeElement); if (e.shiftKey && i <= 0) { e.preventDefault(); f.at(-1).focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); } }
    });
    let sx = null; lb.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", (e) => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); sx = null; });
  }

  /* ---------- Videos: erst abspielen, wenn sichtbar ---------- */
  const vids = $$("video[data-auto]");
  if (vids.length && "IntersectionObserver" in window) {
    const saveData = navigator.connection?.saveData;
    vids.forEach((v) => {
      const btn = v.parentElement.querySelector("button");
      const sync = () => btn && btn.setAttribute("aria-label", v.paused ? btn.dataset.play : btn.dataset.pause) ;
      btn?.addEventListener("click", () => { v.dataset.user = 1; if (v.paused) v.play(); else v.pause(); });
      v.addEventListener("play", () => { btn?.classList.add("is-playing"); sync(); });
      v.addEventListener("pause", () => { btn?.classList.remove("is-playing"); sync(); });
      if (reduce || saveData) return;
      new IntersectionObserver((es) => es.forEach((e) => { if (v.dataset.user) return; if (e.isIntersecting) { v.preload = "auto"; v.play().catch(() => {}); } else v.pause(); }), { threshold: .35 }).observe(v);
    });
  }
})();

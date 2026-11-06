// Small progressive enhancements. Everything works without this file:
// the city switch is CSS (:has), dropdowns are <details>, «Зателефонувати» falls back to #kliniky.

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const KEY = "mediostar-city";

// City switch: remember the choice (no cookies, localStorage only).
const radios = document.querySelectorAll<HTMLInputElement>("[data-city-radio]");
let saved: string | null = null;
try { saved = localStorage.getItem(KEY); } catch { /* storage blocked */ }
radios.forEach((r) => {
  if (saved && r.value === saved) r.checked = true;
  r.addEventListener("change", () => {
    if (!r.checked) return;
    try { localStorage.setItem(KEY, r.value); } catch { /* storage blocked */ }
    saved = r.value;
  });
});

// Details dropdowns (Записатися, menu): close on Escape, outside click and after choosing a link.
const dropdowns = document.querySelectorAll<HTMLDetailsElement>("details[data-dismiss]");
const closeAll = (except?: HTMLDetailsElement) => dropdowns.forEach((d) => { if (d !== except) d.open = false; });
dropdowns.forEach((d) => {
  d.addEventListener("toggle", () => { if (d.open) closeAll(d); });
  d.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement).closest("a");
    if (a) d.open = false;
  });
});
document.addEventListener("click", (e) => {
  dropdowns.forEach((d) => { if (d.open && !d.contains(e.target as Node)) d.open = false; });
});
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  dropdowns.forEach((d) => {
    if (d.open) { d.open = false; d.querySelector("summary")?.focus(); }
  });
});

// Bottom sheet with both clinics (phone). A header phone icon calls directly once a city was chosen.
const sheet = document.getElementById("call-sheet") as HTMLDialogElement | null;
const closeSheet = () => {
  if (!sheet?.open) return;
  if (reduce) { sheet.close(); return; }
  sheet.classList.add("is-closing");
  window.setTimeout(() => { sheet.classList.remove("is-closing"); sheet.close(); }, 200);
};
if (sheet && typeof sheet.showModal === "function") {
  document.querySelectorAll<HTMLAnchorElement>("[data-open-sheet]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      sheet.showModal();
    });
  });
  sheet.querySelector("[data-close-sheet]")?.addEventListener("click", closeSheet);
  sheet.addEventListener("click", (e) => { if (e.target === sheet) closeSheet(); });
  sheet.addEventListener("cancel", (e) => { e.preventDefault(); closeSheet(); });
}

// Doctors rail: arrow buttons scroll by one card; smooth only without reduced motion.
document.querySelectorAll<HTMLElement>("[data-rail]").forEach((wrap) => {
  const rail = wrap.querySelector<HTMLElement>("[data-rail-track]");
  const prev = wrap.querySelector<HTMLButtonElement>("[data-rail-prev]");
  const next = wrap.querySelector<HTMLButtonElement>("[data-rail-next]");
  if (!rail || !prev || !next) return;
  const step = () => {
    const item = rail.querySelector<HTMLElement>("li");
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    return item ? item.getBoundingClientRect().width + gap : rail.clientWidth * 0.8;
  };
  const update = () => {
    prev.disabled = rail.scrollLeft <= 2;
    next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
  };
  prev.addEventListener("click", () => rail.scrollBy({ left: -step(), behavior: reduce ? "auto" : "smooth" }));
  next.addEventListener("click", () => rail.scrollBy({ left: step(), behavior: reduce ? "auto" : "smooth" }));
  rail.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  wrap.classList.add("has-controls");
  update();
});

const PROJECTS_URL = "data/projects.json";
const grid = document.getElementById("projectGrid");
const filters = document.getElementById("projectFilters");
const dialog = document.getElementById("projectDialog");
const dialogContent = document.getElementById("dialogContent");
let projects = [];
let activeFilter = "All";

const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safeUrl = value => {
  if (!value) return "";
  try { const u = new URL(value, window.location.href); return ["http:","https:"].includes(u.protocol) ? u.href : ""; } catch { return ""; }
};
const link = (url, label) => safeUrl(url) ? `<a href="${escapeHtml(safeUrl(url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} ↗</a>` : "";
const categories = () => ["All", ...new Set(projects.map(p => p.category).filter(Boolean))];

function renderFilters() {
  filters.innerHTML = categories().map(c => `<button class="filter-btn" type="button" data-filter="${escapeHtml(c)}" aria-pressed="${c===activeFilter}">${escapeHtml(c)}</button>`).join("");
}
function renderProjects() {
  const visible = projects.filter(p => activeFilter === "All" || p.category === activeFilter);
  if (!visible.length) { grid.innerHTML = `<p class="loading-state">No projects in this category yet.</p>`; return; }
  grid.innerHTML = visible.map(p => `
    <article class="project-card">
      <img class="project-cover" src="${escapeHtml(p.cover || "assets/favicon.svg")}" alt="${escapeHtml(p.title)} project preview" loading="lazy">
      <div class="project-card-body">
        <div class="project-meta"><span>${escapeHtml(p.category || "Analytics")}</span><span>${p.featured ? "FEATURED" : "PROJECT"}</span></div>
        <h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.summary)}</p>
        <div class="tag-list">${(p.tools || []).slice(0,4).map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>
        <div class="card-actions"><button class="text-action" type="button" data-open="${escapeHtml(p.id)}">Explore project ↗</button>${safeUrl(p.interactive) ? `<a class="text-action" href="${escapeHtml(safeUrl(p.interactive))}" target="_blank" rel="noopener noreferrer">Interactive report ↗</a>` : ""}</div>
      </div>
    </article>`).join("");
}
function renderProjectDetails(p) {
  const list = (arr) => (arr || []).map(x=>`<li>${escapeHtml(x)}</li>`).join("");
  const fileLinks = [
    p.pbix ? `<a href="${escapeHtml(p.pbix)}" download>Download PBIX</a>` : "",
    p.pdf ? `<a href="${escapeHtml(p.pdf)}" target="_blank" rel="noopener noreferrer">View / download PDF</a>` : "",
    p.github ? link(p.github,"GitHub repository") : "",
    p.interactive ? link(p.interactive,"Open interactive dashboard") : "",
    p.datasetUrl ? link(p.datasetUrl,"Dataset source") : ""
  ].filter(Boolean).join("");
  dialogContent.innerHTML = `
    <h2 class="dialog-title" id="dialogTitle">${escapeHtml(p.title)}</h2>
    <p class="dialog-summary">${escapeHtml(p.summary)}</p>
    <img class="dialog-preview" src="${escapeHtml(p.cover || "assets/favicon.svg")}" alt="${escapeHtml(p.title)} preview">
    ${(p.screenshots || []).filter(Boolean).map((src, i) => `<img class="dialog-preview" src="${escapeHtml(src)}" alt="${escapeHtml(p.title)} screenshot ${i+1}" loading="lazy">`).join("")}
    ${safeUrl(p.interactive) ? `<div class="dialog-section"><h4>Interactive dashboard</h4><div class="report-frame-wrap"><iframe class="report-frame" src="${escapeHtml(safeUrl(p.interactive))}" title="${escapeHtml(p.title)} interactive report" loading="lazy" allowfullscreen></iframe></div><p><a href="${escapeHtml(safeUrl(p.interactive))}" target="_blank" rel="noopener noreferrer">Open report in a new tab ↗</a></p></div>` : ""}
    ${safeUrl(p.pdf) ? `<div class="dialog-section"><h4>PDF report preview</h4><div class="report-frame-wrap"><iframe class="report-frame pdf-frame" src="${escapeHtml(safeUrl(p.pdf))}#view=FitH" title="${escapeHtml(p.title)} PDF preview" loading="lazy"></iframe></div></div>` : ""}
    <div class="dialog-section"><h4>Business problem</h4><p>${escapeHtml(p.problem || "Add the business question this project addresses.")}</p></div>
    <div class="dialog-section"><h4>Dataset</h4><p>${escapeHtml(p.dataset || "Dataset details to be added.")}</p></div>
    <div class="dialog-section"><h4>Tools</h4><div class="tag-list">${(p.tools||[]).map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join("")}</div></div>
    <div class="dialog-section"><h4>Methodology</h4><ul>${list(p.methodology)}</ul></div>
    <div class="dialog-section"><h4>Key findings</h4><ul>${list(p.findings)}</ul></div>
    ${p.notes ? `<div class="dialog-section"><h4>Project notes</h4><p>${escapeHtml(p.notes)}</p></div>` : ""}
    <div class="dialog-links">${fileLinks || `<span class="empty-link">Project files and external links will be added when available.</span>`}</div>`;
  dialog.showModal();
}
async function init() {
  document.getElementById("year").textContent = new Date().getFullYear();
  try {
    const response = await fetch(PROJECTS_URL, {cache:"no-cache"});
    if (!response.ok) throw new Error(`Could not load projects (${response.status})`);
    projects = await response.json();
    if (!Array.isArray(projects)) throw new Error("Project data must be a JSON array.");
    renderFilters(); renderProjects();
  } catch (error) {
    grid.innerHTML = `<p class="loading-state">Projects could not be loaded. Check that the site is hosted from its project folder and that <code>data/projects.json</code> is valid.</p>`;
    console.error(error);
  }
}
filters.addEventListener("click", e => {
  const btn = e.target.closest("[data-filter]");
  if (!btn) return;
  activeFilter = btn.dataset.filter; renderFilters(); renderProjects();
});
grid.addEventListener("click", e => {
  const btn = e.target.closest("[data-open]");
  if (!btn) return;
  const p = projects.find(x => x.id === btn.dataset.open);
  if (p) renderProjectDetails(p);
});
document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("primaryNav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
nav.addEventListener("click", e => { if (e.target.closest("a")) { nav.classList.remove("open"); menuToggle.setAttribute("aria-expanded","false"); }});
init();

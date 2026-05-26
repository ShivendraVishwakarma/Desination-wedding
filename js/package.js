// Package card rendering.
window.DWI = window.DWI || {};

window.DWI.createPackageCard = function createPackageCard(packageItem) {
  const safe = window.DWI.escapeText;
  const features = packageItem.features
    .map((feature) => `<li><i class="bi bi-check-circle-fill"></i><span>${safe(feature)}</span></li>`)
    .join("");

  return `
    <div class="col-md-6 col-xl-4">
      <article class="package-card ${packageItem.featured ? "featured" : ""}">
        ${packageItem.featured ? '<span class="package-badge">Most Popular</span>' : ""}
        <h3>${safe(packageItem.name)}</h3>
        <p class="text-muted">${safe(packageItem.subtitle)}</p>
        <div class="package-price">${safe(packageItem.price)}</div>
        <p class="fw-bold mb-0">${safe(packageItem.guests)}</p>
        <ul class="feature-list">${features}</ul>
        <a class="btn-luxury w-100" href="contact.html">Plan This Package</a>
      </article>
    </div>
  `;
};

window.DWI.renderPackages = function renderPackages(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let packages = [...window.DWI.getData("packages")];
  if (options.limit) packages = packages.slice(0, options.limit);
  container.innerHTML = packages.map(window.DWI.createPackageCard).join("");
};

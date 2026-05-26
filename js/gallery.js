// Gallery rendering.
window.DWI = window.DWI || {};

window.DWI.createGalleryItem = function createGalleryItem(item) {
  const safe = window.DWI.escapeText;
  return `
    <figure class="gallery-item">
      <img src="${item.image}" alt="${safe(item.title)}" loading="lazy">
      <figcaption class="gallery-caption">
        <strong>${safe(item.title)}</strong>
        <span class="d-block small">${safe(item.category)}</span>
      </figcaption>
    </figure>
  `;
};

window.DWI.renderGallery = function renderGallery(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let gallery = [...window.DWI.getData("gallery")];
  if (options.limit) gallery = gallery.slice(0, options.limit);
  container.innerHTML = gallery.map(window.DWI.createGalleryItem).join("");
};

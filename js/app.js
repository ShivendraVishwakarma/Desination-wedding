document.addEventListener("DOMContentLoaded", () => {
  window.DWI.setActiveNav();
  window.DWI.populateDestinationSelects();
  window.DWI.renderDestinations("popularDestinationsGrid", { limit: 6 });
  window.DWI.renderDestinations("destinationsGrid");
  window.DWI.renderPackages("homePackagesGrid", { limit: 3 });
  window.DWI.renderPackages("packagesGrid");
  window.DWI.renderGallery("homeGalleryGrid", { limit: 6 });
  window.DWI.renderGallery("galleryGrid");
  renderTestimonials();
  renderCategories();
  initNavbarState();
  initBackToTop();
  window.DWI.initDestinationModal();
  window.DWI.initDestinationFilters();
  window.DWI.initContactForm();
});

function renderTestimonials() {
  const container = document.getElementById("testimonialsGrid");
  if (!container) return;

  container.innerHTML = window.DWI.getData("testimonials").map((testimonial) => `
    <div class="col-md-6 col-xl-3">
      <article class="testimonial-card">
        <div class="stars mb-3">${'<i class="bi bi-star-fill"></i>'.repeat(testimonial.rating)}</div>
        <p class="text-muted">"${window.DWI.escapeText(testimonial.review)}"</p>
        <div class="d-flex align-items-center gap-3 mt-4">
          <img src="${testimonial.image}" alt="${window.DWI.escapeText(testimonial.couple)}" loading="lazy">
          <div>
            <strong>${window.DWI.escapeText(testimonial.couple)}</strong>
            <span class="d-block small text-muted">${window.DWI.escapeText(testimonial.location)} wedding</span>
          </div>
        </div>
      </article>
    </div>
  `).join("");
}

function renderCategories() {
  const container = document.getElementById("categoriesGrid");
  if (!container) return;

  const categories = [
    { icon: "bi-water", title: "Beach Wedding", copy: "Open-air vows, coastal resorts, and sunset celebrations." },
    { icon: "bi-gem", title: "Royal Wedding", copy: "Palace venues, grand entries, folk artists, and heritage stays." },
    { icon: "bi-stars", title: "Luxury Wedding", copy: "Designer decor, premium hospitality, and elevated guest experiences." },
    { icon: "bi-flower1", title: "Traditional Wedding", copy: "Ritual-led planning, regional menus, and culturally rich decor." },
    { icon: "bi-heart", title: "Intimate Wedding", copy: "Smaller guest lists with personal, warm, highly detailed hosting." }
  ];

  container.innerHTML = categories.map((category) => `
    <div class="col-md-6 col-xl">
      <article class="category-card">
        <span class="category-icon"><i class="bi ${category.icon}"></i></span>
        <h3 class="h5">${category.title}</h3>
        <p class="text-muted mb-0">${category.copy}</p>
      </article>
    </div>
  `).join("");
}

function initNavbarState() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const update = () => navbar.classList.toggle("shadow", window.scrollY > 24);
  update();
  window.addEventListener("scroll", update);
}

function initBackToTop() {
  const button = document.getElementById("backToTop");
  if (!button) return;

  window.addEventListener("scroll", () => button.classList.toggle("show", window.scrollY > 500));
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

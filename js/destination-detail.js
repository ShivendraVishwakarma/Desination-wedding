document.addEventListener("DOMContentLoaded", () => {
  renderDestinationDetail();
});

function renderDestinationDetail() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("destination") || "goa";
  const destination = window.DWI.getData("destinations").find((item) => item.slug === slug);
  const root = document.getElementById("destinationDetail");

  if (!root || !destination) {
    if (root) {
      root.innerHTML = `
        <section class="section">
          <div class="container text-center">
            <h1>Destination not found</h1>
            <p class="text-muted">Please choose one of our available wedding destinations.</p>
            <a class="btn-luxury" href="destinations.html">View Destinations</a>
          </div>
        </section>
      `;
    }
    return;
  }

  document.title = `${destination.name} Wedding | Destination Wedding India`;

  root.innerHTML = `
    <header class="destination-detail-hero">
      <img src="${destination.hero}" alt="${destination.name} destination wedding">
      <div class="destination-detail-overlay"></div>
      <div class="container destination-detail-hero-content">
        <a class="detail-back-link" href="destinations.html"><i class="bi bi-arrow-left"></i> All destinations</a>
        <span class="eyebrow">${destination.type}</span>
        <h1>${destination.name} Destination Wedding</h1>
        <p>${destination.mood}</p>
        <div class="hero-actions">
          <a class="btn-luxury" href="contact.html"><i class="bi bi-calendar-heart"></i> Plan ${destination.name} Wedding</a>
          <a class="btn-outline-luxury" href="#detailGallery"><i class="bi bi-images"></i> View Images</a>
        </div>
      </div>
    </header>

    <section class="section section-muted">
      <div class="container">
        <div class="detail-facts-grid">
          ${createFact("Budget", destination.budget, "bi-wallet2")}
          ${createFact("Best Season", destination.bestSeason, "bi-calendar2-heart")}
          ${createFact("Venues", destination.venues, "bi-building")}
          ${createFact("Guest Fit", destination.guests, "bi-people")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="row g-5 align-items-start">
          <div class="col-lg-7">
            <span class="eyebrow">Overview</span>
            <h2 class="mt-2">${destination.name} wedding experience</h2>
            <p class="detail-lead">${destination.description}</p>
            <p class="text-muted">${destination.planningNotes}</p>

            <div class="detail-list-block">
              <h3>Signature Highlights</h3>
              <div class="detail-pill-list">${destination.highlights.map(createPill).join("")}</div>
            </div>

            <div class="detail-list-block">
              <h3>Best For</h3>
              <div class="detail-pill-list">${destination.bestFor.map(createPill).join("")}</div>
            </div>
          </div>
          <div class="col-lg-5">
            <aside class="detail-side-panel">
              <h3>Venue Styles</h3>
              <ul class="feature-list">${destination.venueStyles.map((item) => `<li><i class="bi bi-check-circle-fill"></i><span>${item}</span></li>`).join("")}</ul>
              <a class="btn-luxury w-100" href="contact.html">Request Venue Shortlist</a>
            </aside>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-muted">
      <div class="container">
        <div class="section-heading center">
          <span class="eyebrow">Suggested Flow</span>
          <h2>A wedding weekend that fits ${destination.name}</h2>
          <p>Use this as a starting point. The final flow can be customized around rituals, family preferences, and guest travel.</p>
        </div>
        <div class="detail-timeline">
          ${destination.suggestedFlow.map((item, index) => `
            <article class="timeline-card">
              <span>Day ${index + 1}</span>
              <h3>${item}</h3>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="section" id="detailGallery">
      <div class="container">
        <div class="section-heading center">
          <span class="eyebrow">Images</span>
          <h2>${destination.name} wedding visuals</h2>
        </div>
        <div class="detail-gallery">
          ${destination.gallery.map((image) => `<img src="${image}" alt="${destination.name} wedding inspiration" loading="lazy">`).join("")}
        </div>
      </div>
    </section>

    <section class="section section-dark">
      <div class="container">
        <div class="row g-4 align-items-center">
          <div class="col-lg-7">
            <span class="eyebrow">Planning Scope</span>
            <h2>What we can manage for ${destination.name}</h2>
            <div class="detail-pill-list mt-3">${destination.inclusions.map(createPill).join("")}</div>
          </div>
          <div class="col-lg-5 text-lg-end">
            <a class="btn-luxury" href="contact.html">Get Custom Proposal</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function createFact(label, value, icon) {
  return `
    <article class="detail-fact-card">
      <i class="bi ${icon}"></i>
      <span>${label}</span>
      <strong>${value}</strong>
    </article>
  `;
}

function createPill(item) {
  return `<span class="pill"><i class="bi bi-check2-circle"></i>${item}</span>`;
}

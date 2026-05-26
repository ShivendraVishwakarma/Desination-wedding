// Destination rendering and filtering.
window.DWI = window.DWI || {};

window.DWI.createDestinationCard = function createDestinationCard(destination) {
  const safe = window.DWI.escapeText;
  return `
    <div class="col-md-6 col-xl-4">
      <article class="destination-card">
        <div class="destination-image">
          <img src="${destination.image}" alt="${safe(destination.name)} destination wedding" loading="lazy">
          <span class="destination-state">${safe(destination.state)}</span>
        </div>
        <div class="destination-card-body">
          <p class="destination-type mb-2">${safe(destination.type)}</p>
          <h3 class="mb-2">${safe(destination.name)}</h3>
          <p class="text-muted">${safe(destination.description)}</p>
          <div class="destination-meta">
            <span class="pill"><i class="bi bi-wallet2"></i>${safe(destination.budget)}</span>
            <span class="pill"><i class="bi bi-calendar-heart"></i>${safe(destination.bestSeason)}</span>
          </div>
          <a class="btn-quiet mt-2" href="destination-detail.html?destination=${safe(destination.slug)}">
            View Details <i class="bi bi-arrow-right"></i>
          </a>
        </div>
      </article>
    </div>
  `;
};

window.DWI.renderDestinations = function renderDestinations(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let destinations = [...window.DWI.getData("destinations")];
  if (options.filter) destinations = destinations.filter(options.filter);
  if (options.limit) destinations = destinations.slice(0, options.limit);

  container.innerHTML = destinations.map(window.DWI.createDestinationCard).join("");
};

window.DWI.initDestinationModal = function initDestinationModal() {
  const modalElement = document.getElementById("destinationModal");
  if (!modalElement) return;

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-destination-id]");
    if (!trigger) return;

    const destination = window.DWI.getData("destinations").find((item) => item.id === Number(trigger.dataset.destinationId));
    if (!destination) return;

    modalElement.querySelector("[data-modal-image]").src = destination.image;
    modalElement.querySelector("[data-modal-title]").textContent = destination.name;
    modalElement.querySelector("[data-modal-type]").textContent = `${destination.type} in ${destination.state}`;
    modalElement.querySelector("[data-modal-description]").textContent = destination.description;
    modalElement.querySelector("[data-modal-facts]").innerHTML = `
      <div><strong>Budget</strong><span>${destination.budget}</span></div>
      <div><strong>Best Season</strong><span>${destination.bestSeason}</span></div>
      <div><strong>Venues</strong><span>${destination.venues}</span></div>
      <div><strong>Guest Fit</strong><span>${destination.guests}</span></div>
    `;
    modalElement.querySelector("[data-modal-highlights]").innerHTML = destination.highlights
      .map((item) => `<span class="pill"><i class="bi bi-check2-circle"></i>${window.DWI.escapeText(item)}</span>`)
      .join("");

    bootstrap.Modal.getOrCreateInstance(modalElement).show();
  });
};

window.DWI.initDestinationFilters = function initDestinationFilters() {
  const form = document.getElementById("destinationFilterForm");
  if (!form) return;

  const stateSelect = form.querySelector("[name='state']");
  const destinations = window.DWI.getData("destinations");
  [...new Set(destinations.map((item) => item.state))].forEach((state) => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
  });

  const applyFilters = () => {
    const values = new FormData(form);
    const search = String(values.get("search") || "").toLowerCase().trim();
    const state = values.get("state");
    const type = values.get("type");

    window.DWI.renderDestinations("destinationsGrid", {
      filter: (destination) => {
        const matchesSearch = !search || `${destination.name} ${destination.state} ${destination.type}`.toLowerCase().includes(search);
        const matchesState = !state || destination.state === state;
        const matchesType = !type || destination.type === type;
        return matchesSearch && matchesState && matchesType;
      }
    });
  };

  form.addEventListener("input", applyFilters);
  form.addEventListener("reset", () => setTimeout(applyFilters, 0));
};

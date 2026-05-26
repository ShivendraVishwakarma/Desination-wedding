// Shared helpers used by all pages.
window.DWI = window.DWI || {};

window.DWI.createElement = function createElement(tag, className, html) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (html) element.innerHTML = html;
  return element;
};

window.DWI.getData = function getData(key) {
  return (window.DWI_DATA && window.DWI_DATA[key]) || [];
};

window.DWI.escapeText = function escapeText(value) {
  const div = document.createElement("div");
  div.textContent = value || "";
  return div.innerHTML;
};

window.DWI.showToast = function showToast(message, type = "success") {
  const toast = document.getElementById("siteToast");
  if (!toast) return;

  toast.querySelector(".toast-body").textContent = message;
  toast.classList.toggle("text-bg-danger", type === "error");
  toast.classList.toggle("text-bg-success", type !== "error");
  bootstrap.Toast.getOrCreateInstance(toast).show();
};

window.DWI.setActiveNav = function setActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === currentPage || (currentPage === "" && href === "index.html"));
  });
};

window.DWI.populateDestinationSelects = function populateDestinationSelects() {
  const destinations = window.DWI.getData("destinations");
  document.querySelectorAll("[data-destination-select]").forEach((select) => {
    destinations.forEach((destination) => {
      const option = document.createElement("option");
      option.value = destination.name;
      option.textContent = `${destination.name}, ${destination.state}`;
      select.appendChild(option);
    });
  });
};

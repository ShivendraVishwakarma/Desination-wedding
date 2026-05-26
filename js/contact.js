// Contact form validation. This is frontend-only and ready to swap to API submission later.
window.DWI = window.DWI || {};

window.DWI.initContactForm = function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[6-9]\d{9}$/;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    let valid = form.checkValidity();

    if (!emailPattern.test(email)) {
      form.email.setCustomValidity("Enter a valid email address.");
      valid = false;
    } else {
      form.email.setCustomValidity("");
    }

    if (!phonePattern.test(phone)) {
      form.phone.setCustomValidity("Enter a valid 10 digit Indian mobile number.");
      valid = false;
    } else {
      form.phone.setCustomValidity("");
    }

    form.classList.add("was-validated");
    if (!valid) {
      window.DWI.showToast("Please correct the highlighted fields.", "error");
      return;
    }

    window.DWI.showToast("Thank you. Our wedding specialist will contact you within 24 hours.");
    form.reset();
    form.classList.remove("was-validated");
  });
};

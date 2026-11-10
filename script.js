
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const year = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const formNotice = document.getElementById("formNotice");

// Automatically update the copyright year.
if (year) {
  year.textContent = new Date().getFullYear();
}

// Mobile navigation.
if (menuToggle && navbar) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navbar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });
}

// Select a package from the pricing section.
document.querySelectorAll(".choose-plan").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedPlan = button.dataset.plan;
    const budgetField = document.getElementById("projectBudget");

    if (budgetField && selectedPlan) {
      budgetField.value = selectedPlan;
    }
  });
});

// Project enquiry demonstration form.
// This validates and previews the information locally.
// It does NOT transmit or store visitor information.
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const formData = new FormData(contactForm);

    const name = String(formData.get("name") || "").trim();
    const type = String(formData.get("type") || "").trim();
    const budget = String(formData.get("budget") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !type || !message) {
      formNotice.textContent = "Please complete all required fields.";
      return;
    }

    formNotice.textContent =
      "Enquiry preview created! This is only a demo: no information was sent or saved. A secure, adult-managed contact system must be connected before accepting real enquiries.";

    formNotice.classList.add("success-message");

    console.log("LEMON WEB STUDIO enquiry preview:", {
      name,
      type,
      budget,
      message
    });
  });
}

// Small welcome message in the developer console.
console.log("🍋 LEMON WEB STUDIO is ready!");

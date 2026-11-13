
/*
  LEMON WEB STUDIO
  Website interactions and enquiry form
*/

// Replace this URL after deploying the Python backend on Render.
const API_BASE_URL = "https://YOUR-RENDER-SERVICE.onrender.com";

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const year = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const formNotice = document.getElementById("formNotice");

// Copyright year
if (year) {
  year.textContent = new Date().getFullYear();
}

// Mobile navigation
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
      menuToggle.textContent = "☰";
    });
  });
}

// Pricing buttons
document.querySelectorAll(".choose-plan").forEach((button) => {
  button.addEventListener("click", () => {
    const budget = document.getElementById("projectBudget");

    if (budget && button.dataset.plan) {
      budget.value = button.dataset.plan;
    }
  });
});

// Enquiry form
if (contactForm && formNotice) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const button = contactForm.querySelector(
      'button[type="submit"]'
    );

    const formData = new FormData(contactForm);

    const enquiry = {
      name: String(formData.get("name") || "").trim(),
      project: String(formData.get("type") || "").trim(),
      budget: String(formData.get("budget") || "Not sure yet").trim(),
      message: String(formData.get("message") || "").trim()
    };

    if (
      !enquiry.name ||
      !enquiry.project ||
      !enquiry.message
    ) {
      formNotice.textContent =
        "Please complete all required fields.";
      return;
    }

    if (API_BASE_URL.includes("YOUR-RENDER-SERVICE")) {
      formNotice.textContent =
        "Our enquiry service is not online yet.";
      return;
    }

    if (button) {
      button.disabled = true;
      button.textContent = "Sending...";
    }

    formNotice.textContent = "Sending your enquiry...";

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/enquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(enquiry)
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to send your enquiry."
        );
      }

      formNotice.textContent =
        result.message || "Enquiry sent successfully!";

      formNotice.classList.add("success-message");
      contactForm.reset();

    } catch (error) {
      formNotice.classList.remove("success-message");

      formNotice.textContent =
        error.message || "Please try again later.";

    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = "Send enquiry";
      }
    }
  });
}

console.log("LEMON WEB STUDIO is ready!");

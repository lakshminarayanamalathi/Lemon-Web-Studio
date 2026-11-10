
// =================================
// LEMON WEB STUDIO
// INTERACTIVE FEATURES
// =================================

// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", function () {

    navbar.classList.toggle("active");

    const isOpen = navbar.classList.contains("active");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", isOpen);

});

// CLOSE MOBILE MENU AFTER CLICKING A LINK

document.querySelectorAll(".navbar a").forEach(function (link) {

    link.addEventListener("click", function () {

        navbar.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");

    });

});

// AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();

// SMOOTH NAVIGATION

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});

console.log("LEMON WEB STUDIO loaded successfully!");
console.log("Fresh ideas. Powerful websites. 🍋");

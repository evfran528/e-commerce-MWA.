const hamburgerBtn = document.getElementById("hamburgerBtn");
const mainNav = document.getElementById("mainNav");

if (hamburgerBtn && mainNav) {

    hamburgerBtn.addEventListener("click", () => {

        const isOpen = mainNav.classList.toggle("active");

        hamburgerBtn.classList.toggle("active");
        hamburgerBtn.setAttribute("aria-expanded", isOpen);

    });

    mainNav.querySelectorAll(":scope > a").forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");
            hamburgerBtn.classList.remove("active");
            hamburgerBtn.setAttribute("aria-expanded", "false");

        });

    });

    mainNav.querySelectorAll(".mega-menu a").forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");
            hamburgerBtn.classList.remove("active");
            hamburgerBtn.setAttribute("aria-expanded", "false");

        });

    });

}
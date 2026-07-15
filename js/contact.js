// CONTACT FORM

const form = document.getElementById("contactForm");
const messageSuccessOverlay = document.getElementById("messageSuccessOverlay");
const messageSuccessCloseBtn = document.getElementById("messageSuccessCloseBtn");

if(form){
    form.addEventListener("submit", function(e){

        e.preventDefault();

        const name = form.querySelector('input[type="text"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();
        const message = form.querySelector("textarea").value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(name === ""){
            alert("Please enter your name.");
            return;
        }

        if(!emailPattern.test(email)){
            alert("Please enter a valid email address.");
            return;
        }

        if(message.length < 10){
            alert("Message should be at least 10 characters.");
            return;
        }

        if(messageSuccessOverlay){
            messageSuccessOverlay.classList.add("active");
        }

        form.reset();

    });
}

if(messageSuccessCloseBtn && messageSuccessOverlay){
    messageSuccessCloseBtn.addEventListener("click", () => {
        messageSuccessOverlay.classList.remove("active");
    });

    messageSuccessOverlay.addEventListener("click", (e) => {
        if(e.target === messageSuccessOverlay){
            messageSuccessOverlay.classList.remove("active");
        }
    });
}

//  FAQ ACCORDION 

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".question");

    if(question){
        question.addEventListener("click", () => {

            faqItems.forEach(box => {
                if(box !== item){
                    box.classList.remove("active");
                    const otherIcon = box.querySelector("i");
                    if(otherIcon){
                        otherIcon.className = "fa-solid fa-plus";
                    }
                }
            });

            item.classList.toggle("active");

            const icon = item.querySelector("i");

            if(icon){
                icon.className = item.classList.contains("active")
                    ? "fa-solid fa-minus"
                    : "fa-solid fa-plus";
            }

        });
    }

});

// HERO BUTTON 

const heroBtn = document.getElementById("heroBtn");

if(heroBtn){
    heroBtn.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector("#contact").scrollIntoView({ behavior:"smooth" });
    });
}

//STICKY HEADER SHADOW

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    header.style.boxShadow = window.scrollY > 50
        ? "0 5px 20px rgba(0,0,0,.15)"
        : "0 2px 10px rgba(0,0,0,.08)";

});

//SCROLL REVEAL 

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show-section");
        }
    });

}, { threshold: .15 });

document.querySelectorAll(".contact-section, .map, .faq").forEach(section => {
    section.classList.add("hidden-section");
    observer.observe(section);
});

//HEART ICON 

const heart = document.querySelector(".fa-heart");

if(heart){
    heart.addEventListener("click", () => {

        heart.classList.toggle("fa-solid");
        heart.classList.toggle("fa-regular");

        heart.style.color = heart.classList.contains("fa-solid") ? "red" : "";

    });
}

//SEARCH 

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function goToShopSearch(){

    const keyword = searchInput.value.trim();

    window.location.href = keyword
        ? `shop.html?search=${encodeURIComponent(keyword)}`
        : "shop.html";

}

if(searchBtn && searchInput){

    searchBtn.addEventListener("click", goToShopSearch);

    searchInput.addEventListener("keyup", (e) => {
        if(e.key === "Enter") goToShopSearch();
    });

}

//HAMBURGER MENU 

const hamburgerBtn = document.getElementById("hamburgerBtn");
const mainNav = document.getElementById("mainNav");

if(hamburgerBtn && mainNav){

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

// MOBILE CATEGORY DROPDOWN TOGGLE 

const dropdown = document.querySelector(".dropdown > a");

if(dropdown){

    dropdown.addEventListener("click", function(e){

        if(window.innerWidth <= 1024){

            e.preventDefault();

            document.querySelector(".mega-menu").classList.toggle("active");

        }

    });

}

//CATEGORY LINK HOVER 

const categoryLinks = document.querySelectorAll(".category-link");
const productGroups = document.querySelectorAll(".product-group");

categoryLinks.forEach(link => {

    link.addEventListener("mouseenter", () => {

        const target = link.getAttribute("data-target");

        categoryLinks.forEach(item => item.classList.remove("active"));
        productGroups.forEach(group => group.classList.remove("active"));

        link.classList.add("active");
        document.getElementById(target).classList.add("active");

    });

});

console.log("MWA Contact Page Loaded Successfully");
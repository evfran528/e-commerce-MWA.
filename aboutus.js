// ADD TO CART
const cartCounter = document.getElementById("cart-count");

function extractProductFromCard(card) {

    const name = card.dataset.name
        || card.querySelector("h3")?.innerText.trim()
        || "Product";

    const priceText = card.dataset.price
        || card.querySelector(".price, .price-now")?.innerText.replace(/[^0-9.]/g, "")
        || "0";

    return {
        id: card.dataset.id || name.toLowerCase().replace(/\s+/g, "-"),
        name: name,
        brandLabel: card.dataset.brand || "MWA",
        price: parseFloat(priceText) || 0,
        img: card.dataset.img || card.querySelector("img")?.src || ""
    };

}

document.querySelectorAll(".product-card button").forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".product-card");
        const product = extractProductFromCard(card);
        const size = card.dataset.size || "One Size";

        CartStore.addItem(product, size);

        showNotification("Product added to cart!");

    });

});

// NOTIFICATION

function showNotification(message){

    const notification = document.createElement("div");

    notification.classList.add("notification");

    notification.innerText = message;

    document.body.appendChild(notification);

    setTimeout(()=>{

        notification.classList.add("show");

    },100);

    setTimeout(()=>{

        notification.classList.remove("show");

        setTimeout(()=>{

            notification.remove();

        },300);

    },2000);

}

// NEWSLETTER VALIDATION

const form = document.getElementById("newsletter-form");

if (form) {

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const email = form.querySelector("input");

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(email.value.trim() === ""){

            alert("Please enter your email.");

            return;

        }

        if(!emailPattern.test(email.value)){

            alert("Please enter a valid email.");

            return;

        }

        alert("Thank you for subscribing!");

        form.reset();

    });

}

// SMOOTH SCROLL

document.querySelectorAll("nav a").forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        const href = this.getAttribute("href");

        if(href && href.startsWith("#")){

            e.preventDefault();

            const target = document.querySelector(href);

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        }

    });

});

// STICKY HEADER EFFECT

window.addEventListener("scroll",()=>{

    const header = document.querySelector("header");

    if(!header) return;

    if(window.scrollY > 50){

        header.style.boxShadow="0 5px 20px rgba(0,0,0,.15)";

    }

    else{

        header.style.boxShadow="0 3px 10px rgba(0,0,0,.08)";

    }

});

// HERO BUTTON

const slideButton = document.querySelector(".slide button");

if (slideButton) {

    slideButton.addEventListener("click",()=>{

        window.location.href = "shop.html";

    });

}

// HERO BACKGROUND SLIDESHOW

const slideBgItems = document.querySelectorAll(".slide-bg-item");
let slideBgIndex = 0;

if (slideBgItems.length > 1) {

    setInterval(() => {

        slideBgItems[slideBgIndex].classList.remove("active");

        slideBgIndex = (slideBgIndex + 1) % slideBgItems.length;

        slideBgItems[slideBgIndex].classList.add("active");

    }, 4000);

}

// cart ICON

const heart = document.querySelector(".fa-heart");

if (heart) {

    heart.addEventListener("click",()=>{

        heart.classList.toggle("fa-solid");

        heart.classList.toggle("fa-regular");

        heart.style.color = heart.classList.contains("fa-solid")
            ? "red"
            : "";

    });

}

// SEARCH ICON
// SEARCH PRODUCTS

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function searchProduct(){

    const keyword = searchInput.value.toLowerCase().trim();

    const products = document.querySelectorAll(".product-card");

    let found = false;

    products.forEach(product=>{

        const name = product.querySelector("h3")?.innerText.toLowerCase() || "";

        if(name.includes(keyword)){

            product.style.display="block";

            found = true;

        }else{

            product.style.display="none";

        }

    });

    if(!found && keyword !== ""){

        alert("No matching products found.");

    }

    if(keyword === ""){

        products.forEach(product=>{

            product.style.display="block";

        });

    }

}

if (searchBtn && searchInput) {

    searchBtn.addEventListener("click", searchProduct);

    searchInput.addEventListener("keyup", function(e){

        if(e.key === "Enter"){
            searchProduct();
        }

    });

}

// CATEGORY CARD CLICK

document.querySelectorAll(".category-card").forEach(card=>{

    card.addEventListener("click",()=>{

        const category = card.querySelector("h3")?.innerText || "This";

        showNotification(category + " Collection");

    });

});

// PRODUCT HOVER

document.querySelectorAll(".product-card").forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-10px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0px)";

    });

});

// FADE ANIMATION

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show-section");

        }

    });

});

document.querySelectorAll("section").forEach(section=>{

    section.classList.add("hidden-section");

    observer.observe(section);

});


// CAROUSEL

const productSlider = document.querySelector(".products");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (productSlider && nextBtn && prevBtn) {

    const originalCards = [...document.querySelectorAll(".product-card")];

    originalCards.forEach(card => {
        productSlider.appendChild(card.cloneNode(true));
    });

    let currentIndex = 0;
    const gap = 25;

    function updateCarousel() {
        const cardWidth = originalCards[0].offsetWidth + gap;

        productSlider.style.transition = "transform .5s ease";
        productSlider.style.transform =
            `translateX(-${currentIndex * cardWidth}px)`;
    }

    // NEXT
    nextBtn.addEventListener("click", () => {

        currentIndex++;
        updateCarousel();

    });

    // PREVIOUS
    prevBtn.addEventListener("click", () => {

        if(currentIndex > 0){
            currentIndex--;
            updateCarousel();
        }

    });

    // AUTO SLIDE
    setInterval(() => {

        currentIndex++;

        updateCarousel();

        //  cloned cards
        if(currentIndex >= originalCards.length){

            setTimeout(() => {

                productSlider.style.transition = "none";
                currentIndex = 0;

                const cardWidth = originalCards[0].offsetWidth + gap;

                productSlider.style.transform =
                    `translateX(-${currentIndex * cardWidth}px)`;

            },500);

        }

    },3000);

    window.addEventListener("resize", updateCarousel);
    updateCarousel();

}

//drop down

const dropdown = document.querySelector(".dropdown > a");

if (dropdown) {

    dropdown.addEventListener("click", function(e){

        if(window.innerWidth <= 768){

            e.preventDefault();

            document
                .querySelector(".mega-menu")
                .classList.toggle("active");

        }

    });

}

// HAMBURGER MENU TOGGLE

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

// CATEGORY LINK HOVER EFFECT

const categoryLinks =
document.querySelectorAll(".category-link");

const productGroups =
document.querySelectorAll(".product-group");

categoryLinks.forEach(link => {

    link.addEventListener("mouseenter", () => {

        const target =
        link.getAttribute("data-target");

        categoryLinks.forEach(item =>
            item.classList.remove("active")
        );

        productGroups.forEach(group =>
            group.classList.remove("active")
        );
        link.classList.add("active");

        document
            .getElementById(target)
            .classList.add("active");
    });

});


// CONSOLE

console.log("MWA Clothing Website Loaded Successfully");

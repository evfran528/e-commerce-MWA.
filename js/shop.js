// STICKY HEADER SHADOW

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    header.style.boxShadow = window.scrollY > 50
        ? "0 5px 20px rgba(0,0,0,.15)"
        : "0 3px 10px rgba(0,0,0,.08)";

});

// WISHLIST HEART (header icon)

const heart = document.querySelector(".right .fa-heart");

heart.addEventListener("click", () => {

    heart.classList.toggle("fa-solid");
    heart.classList.toggle("fa-regular");

    heart.style.color = heart.classList.contains("fa-solid") ? "red" : "";

});

// MEGA-MENU MOBILE TOGGLE

const dropdownTrigger = document.querySelector(".dropdown > a");

dropdownTrigger.addEventListener("click", function (e) {

    if (window.innerWidth <= 1024) {

        e.preventDefault();
        document.querySelector(".mega-menu").classList.toggle("active");

    }

});

// MEGA-MENU CATEGORY HOVER

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

// TOAST NOTIFICATION

function showNotification(message) {

    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add("show"), 100);

    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
    }, 2000);

}

/*  HERO IMAGE SLIDER */

(function initHeroSlider() {

    const slidesWrap = document.getElementById("heroSlides");
    if (!slidesWrap) return; 
    const slides = Array.from(slidesWrap.querySelectorAll(".hero-slide"));
    const dotsWrap = document.getElementById("heroDots");
    const prevBtn = document.getElementById("heroPrev");
    const nextBtn = document.getElementById("heroNext");

    let current = slides.findIndex(s => s.classList.contains("active"));
    if (current < 0) current = 0;

    const AUTO_MS = 5000;
    let timer = null;

    // build the dots
    slides.forEach((_, i) => {

        const dot = document.createElement("button");
        dot.className = "hero-dot" + (i === current ? " active" : "");
        dot.setAttribute("aria-label", `Go to slide ${i + 1}`);

        dot.addEventListener("click", () => goToSlide(i));

        dotsWrap.appendChild(dot);

    });

    const dots = Array.from(dotsWrap.querySelectorAll(".hero-dot"));

    function goToSlide(index) {

        slides[current].classList.remove("active");
        dots[current].classList.remove("active");

        current = (index + slides.length) % slides.length;

        slides[current].classList.add("active");
        dots[current].classList.add("active");

        restartAutoplay();

    }

    function nextSlide() {
        goToSlide(current + 1);
    }

    function prevSlide() {
        goToSlide(current - 1);
    }

    function restartAutoplay() {
        clearInterval(timer);
        timer = setInterval(nextSlide, AUTO_MS);
    }

    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    const heroSection = document.getElementById("heroSlider");
    let touchStartX = 0;

    if (heroSection) {

        heroSection.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });

        heroSection.addEventListener("touchend", (e) => {

            const touchEndX = e.changedTouches[0].clientX;
            const deltaX = touchEndX - touchStartX;
            const SWIPE_THRESHOLD = 40;

            if (deltaX > SWIPE_THRESHOLD) {
                prevSlide();
            } else if (deltaX < -SWIPE_THRESHOLD) {
                nextSlide();
            }

        }, { passive: true });

    }

    restartAutoplay();

})();

/*  SHOP DATA  */

const PRODUCTS = [

    /* ---------- NIKE ---------- */

    // Men
    { id: 1, name: "Tech Fleece Pullover Hoodie", brand: "nike", brandLabel: "Nike", category: "men", type: "hoodie", price: 68.0, was: null, img: "../nike/Tech Fleece Pullover Hoodie.jpg", badge: null, isNew: false },
    { id: 2, name: "Nike Tech Fleece Track Pants", brand: "nike", brandLabel: "Nike", category: "men", type: "pants", price: 62.0, was: 78.0, img: "../nike/Nike Tech Fleece Track Pants.jpg", badge: "Sale", isNew: false },
    { id: 3, name: "Nike Flex Stride Shorts", brand: "nike", brandLabel: "Nike", category: "men", type: "shorts", price: 32.0, was: null, img: "../nike/Nike Flex Stride.jpg", badge: null, isNew: false },
    { id: 4, name: "Dri-Fit Training Tee", brand: "nike", brandLabel: "Nike", category: "men", type: "tshirt", price: 34.0, was: null, img: "../nike/Dri-Fit Training Tee.jpg", badge: null, isNew: true },

    // Women
    { id: 5, name: "Women's Dri-FIT Dress", brand: "nike", brandLabel: "Nike", category: "women", type: "dress", price: 72.0, was: null, img: "../nike/Women_s Dri-FIT Dress.jpg", badge: "New", isNew: true },
    { id: 6, name: "Women's Dri-FIT High-Rise Joggers", brand: "nike", brandLabel: "Nike", category: "women", type: "pants", price: 55.0, was: null, img: "../nike/Women_s Dri-FIT High-Rise Joggers.jpg", badge: null, isNew: false },
    { id: 7, name: "City Ready Shorts", brand: "nike", brandLabel: "Nike", category: "women", type: "shorts", price: 30.0, was: 38.0, img: "../nike/City Ready Shorts.jpg", badge: "Sale", isNew: false },
    { id: 8, name: "Sportswear Crop Tee", brand: "nike", brandLabel: "Nike", category: "women", type: "tshirt", price: 29.0, was: null, img: "../nike/Sportswear Crop Tee.jpg", badge: null, isNew: false },

    // Kids
    { id: 9, name: "Kids Fleece Hoodie", brand: "nike", brandLabel: "Nike", category: "kids", type: "hoodie", price: 38.0, was: null, img: "../nike/Kids Fleece Hoodie.jpg", badge: null, isNew: false },
    { id: 10, name: "Kids' Fleece Joggers", brand: "nike", brandLabel: "Nike", category: "kids", type: "pants", price: 30.0, was: 38.0, img: "../nike/Fleece Joggers Kids.png", badge: "Sale", isNew: false },
    { id: 11, name: "Kids Active Shorts", brand: "nike", brandLabel: "Nike", category: "kids", type: "shorts", price: 22.0, was: null, img: "../nike/Kids Active Shorts.jpg", badge: null, isNew: false },
    { id: 12, name: "Kids Graphic Tee", brand: "nike", brandLabel: "Nike", category: "kids", type: "tshirt", price: 20.0, was: null, img: "../nike/Kids Graphic Tee.jpg", badge: "New", isNew: true },

    /* ---------- ADIDAS ---------- */

    // Men
    { id: 13, name: "FOG X ADIDAS Hoodie", brand: "adidas", brandLabel: "Adidas", category: "men", type: "hoodie", price: 60.0, was: null, img: "../adidas/FOG X ADIDAS.jpg", badge: null, isNew: false },
    { id: 14, name: "Tiro Track Pants", brand: "adidas", brandLabel: "Adidas", category: "men", type: "pants", price: 58.0, was: null, img: "../adidas/Tiro Track Pants.jpg", badge: null, isNew: false },
    { id: 15, name: "3-Stripe Shorts", brand: "adidas", brandLabel: "Adidas", category: "men", type: "shorts", price: 28.0, was: 35.0, img: "../adidas/3-Stripe Shorts.jpg", badge: "Sale", isNew: false },
    { id: 16, name: "Adicolor Tee", brand: "adidas", brandLabel: "Adidas", category: "men", type: "tshirt", price: 25.0, was: null, img: "../adidas/Adicolor Tee.jpg", badge: null, isNew: false },

    // Women
    { id: 17, name: "Firebird Wrap Dress", brand: "adidas", brandLabel: "Adidas", category: "women", type: "dress", price: 66.0, was: null, img: "../adidas/Firebird Wrap Dress.jpg", badge: "New", isNew: true },
    { id: 18, name: "Believe This Leggings", brand: "adidas", brandLabel: "Adidas", category: "women", type: "pants", price: 50.0, was: null, img: "../adidas/Believe This Leggings.jpg", badge: null, isNew: false },
    { id: 19, name: "Run Shorts", brand: "adidas", brandLabel: "Adidas", category: "women", type: "shorts", price: 27.0, was: null, img: "../adidas/Run Shorts.jpg", badge: null, isNew: false },
    { id: 20, name: "Trefoil Crop Tee", brand: "adidas", brandLabel: "Adidas", category: "women", type: "tshirt", price: 24.0, was: 30.0, img: "../adidas/Trefoil Crop Tee.jpg", badge: "Sale", isNew: false },

    // Kids
    { id: 21, name: "Kids FOG X ADIDAS Hoodie", brand: "adidas", brandLabel: "Adidas", category: "kids", type: "hoodie", price: 34.0, was: null, img: "../adidas/FOG X ADIDAS kids Hoodie.jpg", badge: null, isNew: false },
    { id: 22, name: "Kids Track Pants", brand: "adidas", brandLabel: "Adidas", category: "kids", type: "pants", price: 28.0, was: null, img: "../adidas/Kids Track Pants.jpg", badge: null, isNew: false },
    { id: 23, name: "Kids FOG X ADIDAS Short", brand: "adidas", brandLabel: "Adidas", category: "kids", type: "shorts", price: 20.0, was: 26.0, img: "../adidas/Kids FOG X ADIDAS short.jpg", badge: "Sale", isNew: false },
    { id: 24, name: "Kids Trefoil Tee", brand: "adidas", brandLabel: "Adidas", category: "kids", type: "tshirt", price: 18.0, was: null, img: "../adidas/Kids Trefoil Tee.jpg", badge: "New", isNew: true },

    /* ---------- UNIQLO ---------- */

    // Men
    { id: 25, name: "Fleece Full-Zip Hoodie", brand: "uniqlo", brandLabel: "Uniqlo", category: "men", type: "hoodie", price: 39.9, was: null, img: "../uniqlo/Fleece Full-Zip Hoodie.jpg", badge: null, isNew: false },
    { id: 26, name: "Linen Blend Easy Ankle Pants", brand: "uniqlo", brandLabel: "Uniqlo", category: "men", type: "pants", price: 39.9, was: null, img: "../uniqlo/Linen Blend Easy Ankle Pants.jpg", badge: null, isNew: false },
    { id: 27, name: "Dry-Ex Shorts", brand: "uniqlo", brandLabel: "Uniqlo", category: "men", type: "shorts", price: 19.9, was: null, img: "../uniqlo/Dry-Ex Shorts.jpg", badge: null, isNew: false },
    { id: 28, name: "AIRism Cotton Oversized T-Shirt", brand: "uniqlo", brandLabel: "Uniqlo", category: "men", type: "tshirt", price: 19.9, was: null, img: "../uniqlo/AIRism Cotton Oversized T-Shirt.jpg", badge: null, isNew: false },

    // Women
    { id: 29, name: "Linen Blend Dress", brand: "uniqlo", brandLabel: "Uniqlo", category: "women", type: "dress", price: 39.9, was: null, img: "../uniqlo/Linen Blend Dress.jpg", badge: "New", isNew: true },
    { id: 30, name: "Linen Cotton Tapered Pants", brand: "uniqlo", brandLabel: "Uniqlo", category: "women", type: "pants", price: 34.9, was: null, img: "../uniqlo/Linen Cotton Tapered Pants.jpg", badge: null, isNew: false },
    { id: 31, name: "Linen Cotton Shorts", brand: "uniqlo", brandLabel: "Uniqlo", category: "women", type: "shorts", price: 17.9, was: 22.9, img: "../uniqlo/Linen Cotton Shorts.jpg", badge: "Sale", isNew: false },
    { id: 32, name: "Boat Neck T-Shirt", brand: "uniqlo", brandLabel: "Uniqlo", category: "women", type: "tshirt", price: 14.9, was: null, img: "../uniqlo/Boat Neck T-Shirt.jpg", badge: null, isNew: false },

    // Kids
    { id: 33, name: "Kids Dry Sweat Full-Zip Hoodie", brand: "uniqlo", brandLabel: "Uniqlo", category: "kids", type: "hoodie", price: 24.9, was: null, img: "../uniqlo/Kids Dry Sweat Full-Zip Hoodie.jpg", badge: null, isNew: false },
    { id: 34, name: "Kids Jersey Pants", brand: "uniqlo", brandLabel: "Uniqlo", category: "kids", type: "pants", price: 19.9, was: null, img: "../uniqlo/Kids Jersey Pants.jpg", badge: null, isNew: false },
    { id: 35, name: "KIDS Baggy Cargo Shorts", brand: "uniqlo", brandLabel: "Uniqlo", category: "kids", type: "shorts", price: 14.9, was: 18.9, img: "../uniqlo/Kids Baggy Cargo Shorts.jpg", badge: "Sale", isNew: false },
    { id: 36, name: "Kids Crew Tee", brand: "uniqlo", brandLabel: "Uniqlo", category: "kids", type: "tshirt", price: 12.9, was: null, img: "../uniqlo/Kids Crew Tee.jpg", badge: "New", isNew: true },

    /* ---------- RICHBOYZ ---------- */

    // Men
    { id: 37, name: "Airy Quarter Zip Hoodie", brand: "richboyz", brandLabel: "RichBoyz", category: "men", type: "hoodie", price: 58.0, was: null, img: "../Richboyz/Airy Quarter Zip Hoodie.jpg", badge: "New", isNew: true },
    { id: 38, name: "Pleated Lounge Pants", brand: "richboyz", brandLabel: "RichBoyz", category: "men", type: "pants", price: 65.0, was: 80.0, img: "../Richboyz/Pleated Lounge Pants.jpg", badge: "Sale", isNew: false },
    { id: 39, name: "Boxy Fit Tee", brand: "richboyz", brandLabel: "RichBoyz", category: "men", type: "tshirt", price: 30.0, was: null, img: "../Richboyz/Boxy Fit Tee.jpg", badge: null, isNew: false },
    { id: 40, name: "Traverse Shorts", brand: "richboyz", brandLabel: "RichBoyz", category: "men", type: "shorts", price: 34.0, was: null, img: "../Richboyz/Traverse Shorts.jpg", badge: null, isNew: false },

    // Women
    { id: 41, name: "SIGNATUBE", brand: "richboyz", brandLabel: "RichBoyz", category: "women", type: "top", price: 42.0, was: null, img: "../Richboyz/SIGNATUBE.jpg", badge: null, isNew: true },
    { id: 42, name: "Knit Shirt Dress", brand: "richboyz", brandLabel: "RichBoyz", category: "women", type: "dress", price: 52.0, was: 68.0, img: "../Richboyz/Knit Shirt Dress.jpg", badge: "Sale", isNew: false },
    { id: 43, name: "PIXIE SKIRT", brand: "richboyz", brandLabel: "RichBoyz", category: "women", type: "pants", price: 48.0, was: null, img: "../Richboyz/PIXIE SKIRT.jpg", badge: null, isNew: false },
    { id: 44, name: "Mini Waffle Shorts", brand: "richboyz", brandLabel: "RichBoyz", category: "women", type: "shorts", price: 36.0, was: null, img: "../Richboyz/Mini Waffle Shorts.jpg", badge: "New", isNew: true },

    // Kids
    { id: 45, name: "Box Tee", brand: "richboyz", brandLabel: "RichBoyz", category: "kids", type: "tshirt", price: 26.0, was: null, img: "../Richboyz/Box Tee.jpg", badge: null, isNew: false },
    { id: 46, name: "Kids Oversized Hoodie", brand: "richboyz", brandLabel: "RichBoyz", category: "kids", type: "hoodie", price: 36.0, was: null, img: "../Richboyz/Kids Oversized Hoodie.jpg", badge: "New", isNew: true },
    { id: 47, name: "Kidz SweatPants", brand: "richboyz", brandLabel: "RichBoyz", category: "kids", type: "pants", price: 32.0, was: null, img: "../Richboyz/Kidz SweatPants.jpg", badge: null, isNew: false },
    { id: 48, name: "Kidz SweatShorts", brand: "richboyz", brandLabel: "RichBoyz", category: "kids", type: "shorts", price: 18.0, was: 24.0, img: "../Richboyz/Kidz SweatShorts.jpg", badge: "Sale", isNew: false }

];


const SIZE_RUN = ["XS", "S", "M", "L", "XL"];

/*STATE */

const state = {
    brand: "all",
    category: "all",
    type: "all",
    sort: "featured",
    query: "",
    visibleCount: 8
};

const PAGE_SIZE = 8;

let activeQuickViewProduct = null;
let activeQuickViewSize = null;

/* ELEMENTS */

const shopGrid = document.getElementById("shopGrid");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const sortSelect = document.getElementById("sortSelect");
const brandPills = document.querySelectorAll(".brand-pill");
const categoryChips = document.querySelectorAll("#categoryChips .chip");
const typeChips = document.querySelectorAll("#typeChips .chip");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const cartCounter = document.getElementById("cart-count");
const cartTrigger = document.getElementById("cartTrigger");

// Quick view modal
const quickViewOverlay = document.getElementById("quickViewOverlay");
const qvClose = document.getElementById("qvClose");
const qvImg = document.getElementById("qvImg");
const qvBrand = document.getElementById("qvBrand");
const qvName = document.getElementById("qvName");
const qvPrice = document.getElementById("qvPrice");
const qvSizeOptions = document.getElementById("qvSizeOptions");
const qvAddBtn = document.getElementById("qvAddBtn");

// Cart modal
const cartOverlay = document.getElementById("cartOverlay");
const cartClose = document.getElementById("cartClose");
const cartItemsEl = document.getElementById("cartItems");
const cartEmptyMsg = document.getElementById("cartEmptyMsg");
const cartSubtotalEl = document.getElementById("cartSubtotal");
const checkoutBtn = document.getElementById("checkoutBtn");

// Checkout modal
const checkoutOverlay = document.getElementById("checkoutOverlay");
const checkoutClose = document.getElementById("checkoutClose");
const checkoutForm = document.getElementById("checkoutForm");
const ckName = document.getElementById("ckName");
const ckAddress = document.getElementById("ckAddress");
const ckPhone = document.getElementById("ckPhone");
const checkoutTotalEl = document.getElementById("checkoutTotal");

// Success
const successOverlay = document.getElementById("successOverlay");
const successCloseBtn = document.getElementById("successCloseBtn");
const successMsg = document.getElementById("successMsg");

/* CORE RENDER (product grid)*/

function getFilteredProducts() {

    let items = PRODUCTS.filter(p => {

        const brandMatch = state.brand === "all" || p.brand === state.brand;
        const categoryMatch = state.category === "all" || p.category === state.category;
        const typeMatch = state.type === "all" || p.type === state.type;
        const queryMatch = state.query === "" || p.name.toLowerCase().includes(state.query) || p.brandLabel.toLowerCase().includes(state.query);

        return brandMatch && categoryMatch && typeMatch && queryMatch;

    });

    switch (state.sort) {
        case "price-asc":
            items = items.slice().sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            items = items.slice().sort((a, b) => b.price - a.price);
            break;
        case "newest":
            items = items.slice().sort((a, b) => (b.isNew === a.isNew) ? 0 : b.isNew ? 1 : -1);
            break;
        default:
            break;
    }

    return items;

}

function buildCard(product) {

    const card = document.createElement("div");
    card.className = "shop-card";
    card.dataset.brand = product.brand;
    card.dataset.category = product.category;
    card.dataset.type = product.type;

    const badgeHtml = product.badge
        ? `<span class="shop-badge ${product.badge === "Sale" ? "sale" : ""}">${product.badge}</span>`
        : "";

    const priceHtml = product.was
        ? `<span class="price-now">$${product.price.toFixed(2)}</span><span class="price-was">$${product.was.toFixed(2)}</span>`
        : `<span class="price-now">$${product.price.toFixed(2)}</span>`;

    card.innerHTML = `
        <div class="shop-card-media">
            ${badgeHtml}
            <img src="${product.img}" alt="${product.name}">
        </div>
        <div class="shop-card-body">
            <span class="shop-card-brand">${product.brandLabel}</span>
            <h3 class="shop-card-name">${product.name}</h3>
            <div class="shop-card-price">${priceHtml}</div>
            <button class="add-cart-btn">Add to Cart</button>
        </div>
    `;

    card.querySelector(".add-cart-btn").addEventListener("click", () => {
        openQuickView(product);
    });

    return card;

}

function render() {

    const filtered = getFilteredProducts();
    const visible = filtered.slice(0, state.visibleCount);

    shopGrid.innerHTML = "";
    visible.forEach(p => shopGrid.appendChild(buildCard(p)));

    resultCount.textContent = `${filtered.length} item${filtered.length === 1 ? "" : "s"}`;
    noResults.hidden = filtered.length !== 0;
    shopGrid.style.display = filtered.length === 0 ? "none" : "grid";

    loadMoreBtn.style.display = state.visibleCount >= filtered.length ? "none" : "inline-block";

}

/*  MODAL HELPERS*/

function openOverlay(overlay) {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeOverlay(overlay) {
    overlay.classList.remove("active");
 
    const anyOpen = document.querySelector(".modal-overlay.active, .success-overlay.active");
    if (!anyOpen) document.body.style.overflow = "";
}

/* QUICK VIEW */

function openQuickView(product) {

    activeQuickViewProduct = product;
    activeQuickViewSize = null;

    qvImg.src = product.img;
    qvImg.alt = product.name;
    qvBrand.textContent = product.brandLabel;
    qvName.textContent = product.name;

    qvPrice.innerHTML = product.was
        ? `<span class="price-now">$${product.price.toFixed(2)}</span> <span class="price-was">$${product.was.toFixed(2)}</span>`
        : `$${product.price.toFixed(2)}`;

    qvSizeOptions.innerHTML = "";
    SIZE_RUN.forEach(size => {

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "qv-size-btn";
        btn.textContent = size;

        btn.addEventListener("click", () => {
            activeQuickViewSize = size;
            qvSizeOptions.querySelectorAll(".qv-size-btn").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            qvAddBtn.disabled = false;
            qvAddBtn.textContent = "Add to Cart";
        });

        qvSizeOptions.appendChild(btn);

    });

    qvAddBtn.disabled = true;
    qvAddBtn.textContent = "Select a size";

    openOverlay(quickViewOverlay);

}

qvClose.addEventListener("click", () => closeOverlay(quickViewOverlay));

quickViewOverlay.addEventListener("click", (e) => {
    if (e.target === quickViewOverlay) closeOverlay(quickViewOverlay);
});

qvAddBtn.addEventListener("click", () => {

    if (!activeQuickViewProduct || !activeQuickViewSize) return;

    addToCart(activeQuickViewProduct, activeQuickViewSize);

    closeOverlay(quickViewOverlay);
    showNotification(`${activeQuickViewProduct.name} (${activeQuickViewSize}) added to cart!`);

});


function addToCart(product, size) {
    CartStore.addItem(product, size);
    updateCartCount();
}

function updateCartCount() {

    const totalQty = CartStore.getCount();

    cartCounter.textContent = totalQty;
    cartCounter.style.display = "flex";

}

function getCartSubtotal() {
    return CartStore.getSubtotal();
}

function renderCart() {

    const cart = CartStore.getCart();

    cartItemsEl.innerHTML = "";

    if (cart.length === 0) {
        cartEmptyMsg.hidden = false;
        cartItemsEl.style.display = "none";
        checkoutBtn.disabled = true;
    } else {
        cartEmptyMsg.hidden = true;
        cartItemsEl.style.display = "flex";
        checkoutBtn.disabled = false;
    }

    cart.forEach((item, index) => {

        const row = document.createElement("div");
        row.className = "cart-row";

        row.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-row-info">
                <span class="cart-row-name">${item.name}</span>
                <span class="cart-row-meta">Size: ${item.size}</span>
                <div class="cart-qty">
                    <button class="qty-btn" data-action="dec">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" data-action="inc">+</button>
                </div>
            </div>
            <div class="cart-row-actions">
                <span class="cart-row-price">$${(item.price * item.qty).toFixed(2)}</span>
                <button class="remove-item-btn">Remove</button>
            </div>
        `;

        row.querySelector('[data-action="inc"]').addEventListener("click", () => {
            CartStore.updateQty(index, item.qty + 1);
            renderCart();
            updateCartCount();
        });

        row.querySelector('[data-action="dec"]').addEventListener("click", () => {
            CartStore.updateQty(index, item.qty - 1);
            renderCart();
            updateCartCount();
        });

        row.querySelector(".remove-item-btn").addEventListener("click", () => {
            CartStore.removeItem(index);
            renderCart();
            updateCartCount();
        });

        cartItemsEl.appendChild(row);

    });

    cartSubtotalEl.textContent = `$${getCartSubtotal().toFixed(2)}`;

}

function openCart() {
    renderCart();
    openOverlay(cartOverlay);
}

cartTrigger.addEventListener("click", openCart);

cartClose.addEventListener("click", () => closeOverlay(cartOverlay));

cartOverlay.addEventListener("click", (e) => {
    if (e.target === cartOverlay) closeOverlay(cartOverlay);
});

window.addEventListener("cart:updated", () => {
    if (cartOverlay.classList.contains("active")) renderCart();
});

/* CHECKOUT*/

checkoutBtn.addEventListener("click", () => {

    if (CartStore.getCart().length === 0) return;

    checkoutTotalEl.textContent = `$${getCartSubtotal().toFixed(2)}`;

    closeOverlay(cartOverlay);
    openOverlay(checkoutOverlay);

});

checkoutClose.addEventListener("click", () => closeOverlay(checkoutOverlay));

checkoutOverlay.addEventListener("click", (e) => {
    if (e.target === checkoutOverlay) closeOverlay(checkoutOverlay);
});

checkoutForm.addEventListener("submit", (e) => {

    e.preventDefault();

    if (!ckName.value.trim() || !ckAddress.value.trim() || !ckPhone.value.trim()) {
        return;
    }

    const paymentMethod = checkoutForm.querySelector('input[name="payment"]:checked').value;
    const paymentLabel = paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment";
    const orderNumber = `MWA-${Date.now().toString().slice(-6)}`;
    const orderTotal = getCartSubtotal();

    closeOverlay(checkoutOverlay);

    successMsg.textContent = `Order #${orderNumber} · ${paymentLabel} · Total $${orderTotal.toFixed(2)}. We'll text updates to ${ckPhone.value.trim()}.`;
    openOverlay(successOverlay);

    CartStore.clearCart();
    updateCartCount();
    checkoutForm.reset();

});

successCloseBtn.addEventListener("click", () => {
    closeOverlay(successOverlay);
});

successOverlay.addEventListener("click", (e) => {
    if (e.target === successOverlay) closeOverlay(successOverlay);
});

document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    [quickViewOverlay, cartOverlay, checkoutOverlay].forEach(closeOverlay);
    closeOverlay(successOverlay);
});

/*  TOOLBAR EVENTS */

brandPills.forEach(pill => {

    pill.addEventListener("click", () => {

        brandPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");

        state.brand = pill.dataset.brand;
        state.visibleCount = PAGE_SIZE;

        render();

    });

});

categoryChips.forEach(chip => {

    chip.addEventListener("click", () => {

        categoryChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");

        state.category = chip.dataset.category;
        state.visibleCount = PAGE_SIZE;

        render();

    });

});

typeChips.forEach(chip => {

    chip.addEventListener("click", () => {

        typeChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");

        state.type = chip.dataset.type;
        state.visibleCount = PAGE_SIZE;

        render();

    });

});

sortSelect.addEventListener("change", () => {

    state.sort = sortSelect.value;
    render();

});

loadMoreBtn.addEventListener("click", () => {

    state.visibleCount += PAGE_SIZE;
    render();

});

if (searchBtn && searchInput) {

    function runSearch() {
        state.query = searchInput.value.toLowerCase().trim();
        state.visibleCount = PAGE_SIZE;
        render();
    }

    searchBtn.addEventListener("click", runSearch);

    searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") runSearch();
    });

}

/*  URL PARAMS */

function applyUrlParams() {

    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    const brandParam = params.get("brand");

    if (categoryParam) {

        const validCategories = ["men", "women", "kids"];

        if (validCategories.includes(categoryParam)) {

            state.category = categoryParam;

            categoryChips.forEach(c => {
                c.classList.toggle("active", c.dataset.category === categoryParam);
            });

        }

    }

    if (brandParam) {

        const validBrands = ["nike", "richboyz", "adidas", "uniqlo"];

        if (validBrands.includes(brandParam)) {

            state.brand = brandParam;

            brandPills.forEach(p => {
                p.classList.toggle("active", p.dataset.brand === brandParam);
            });

        }

    }

}


applyUrlParams();
render();
updateCartCount();

console.log("MWA Shop page loaded successfully");
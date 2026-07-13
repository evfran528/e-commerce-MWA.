
const CartStore = (function () {

    const STORAGE_KEY = "mwa_cart";

    function getCart() {

        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error("Cart read failed:", e);
            return [];
        }

    }

    function saveCart(cart) {

        try {

            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));

            window.dispatchEvent(new CustomEvent("cart:updated", { detail: cart }));

        } catch (e) {
            console.error("Cart save failed:", e);
        }

    }

    function addItem(product, size, qty = 1) {

        const cart = getCart();

        const existing = cart.find(item =>
            item.productId === product.id && item.size === (size || "One Size")
        );

        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({
                productId: product.id,
                name: product.name,
                brandLabel: product.brandLabel || "MWA",
                price: product.price,
                img: product.img,
                size: size || "One Size",
                qty: qty
            });
        }

        saveCart(cart);
        return cart;

    }

    function removeItem(index) {

        const cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        return cart;

    }

    function updateQty(index, qty) {

        const cart = getCart();
        if (!cart[index]) return cart;

        if (qty <= 0) {
            cart.splice(index, 1);
        } else {
            cart[index].qty = qty;
        }

        saveCart(cart);
        return cart;

    }

    function clearCart() {
        saveCart([]);
    }

    function getCount() {
        return getCart().reduce((sum, item) => sum + item.qty, 0);
    }

    function getSubtotal() {
        return getCart().reduce((sum, item) => sum + (item.price * item.qty), 0);
    }

    return { getCart, saveCart, addItem, removeItem, updateQty, clearCart, getCount, getSubtotal };

})();

function initCartBadge() {

    const cartCounter = document.getElementById("cart-count");
    if (!cartCounter) return;

    function refresh() {
        const count = CartStore.getCount();
        cartCounter.textContent = count;
        cartCounter.style.display = "flex";
    }

    refresh();

    window.addEventListener("cart:updated", refresh);

    window.addEventListener("storage", (e) => {
        if (e.key === "mwa_cart") refresh();
    });

}

document.addEventListener("DOMContentLoaded", initCartBadge);

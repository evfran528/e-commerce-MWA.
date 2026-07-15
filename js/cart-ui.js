document.addEventListener("DOMContentLoaded", () => {

    const cartTrigger   = document.getElementById("cartTrigger");
    const cartOverlay   = document.getElementById("cartOverlay");

    if (!cartTrigger || !cartOverlay) return;

    const cartClose      = document.getElementById("cartClose");
    const cartItemsEl    = document.getElementById("cartItems");
    const cartEmptyMsg   = document.getElementById("cartEmptyMsg");
    const cartSubtotalEl = document.getElementById("cartSubtotal");
    const checkoutBtn    = document.getElementById("checkoutBtn");

    const checkoutOverlay = document.getElementById("checkoutOverlay");
    const checkoutClose   = document.getElementById("checkoutClose");
    const checkoutForm    = document.getElementById("checkoutForm");
    const ckName          = document.getElementById("ckName");
    const ckAddress       = document.getElementById("ckAddress");
    const ckPhone         = document.getElementById("ckPhone");
    const checkoutTotalEl = document.getElementById("checkoutTotal");

    const successOverlay   = document.getElementById("successOverlay");
    const successCloseBtn  = document.getElementById("successCloseBtn");
    const successMsg       = document.getElementById("successMsg");

    const notify = typeof window.showNotification === "function"
        ? window.showNotification
        : (msg) => console.log(msg);

    function openOverlay(overlay) {
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeOverlay(overlay) {
        overlay.classList.remove("active");
        const anyOpen = document.querySelector(".modal-overlay.active, .success-overlay.active");
        if (!anyOpen) document.body.style.overflow = "";
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
            });

            row.querySelector('[data-action="dec"]').addEventListener("click", () => {
                CartStore.updateQty(index, item.qty - 1);
                renderCart();
            });

            row.querySelector(".remove-item-btn").addEventListener("click", () => {
                CartStore.removeItem(index);
                renderCart();
            });

            cartItemsEl.appendChild(row);

        });

        cartSubtotalEl.textContent = `$${CartStore.getSubtotal().toFixed(2)}`;

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

    /*  CHECKOUT  */

    if (checkoutBtn && checkoutOverlay) {

        checkoutBtn.addEventListener("click", () => {

            if (CartStore.getCart().length === 0) return;

            checkoutTotalEl.textContent = `$${CartStore.getSubtotal().toFixed(2)}`;

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
            const orderTotal = CartStore.getSubtotal();

            closeOverlay(checkoutOverlay);

            if (successOverlay) {
                successMsg.textContent = `Order #${orderNumber} · ${paymentLabel} · Total $${orderTotal.toFixed(2)}. We'll text updates to ${ckPhone.value.trim()}.`;
                openOverlay(successOverlay);
            } else {
                notify(`Order #${orderNumber} placed!`);
            }

            CartStore.clearCart();
            checkoutForm.reset();

        });

    }

    if (successOverlay) {

        successCloseBtn.addEventListener("click", () => closeOverlay(successOverlay));

        successOverlay.addEventListener("click", (e) => {
            if (e.target === successOverlay) closeOverlay(successOverlay);
        });

    }

    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        [cartOverlay, checkoutOverlay].forEach(o => o && closeOverlay(o));
        if (successOverlay) closeOverlay(successOverlay);
    });

});
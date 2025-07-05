const CartItems = document.querySelector(".cart-items");

// Create total display at bottom of cart
const CartTotalDisplay = document.createElement("h2");
CartTotalDisplay.className = "cart-total";
CartTotalDisplay.textContent = "Total: $0.00";
CartItems.parentNode.appendChild(CartTotalDisplay);

function displayCartItems() {
  const items = JSON.parse(localStorage.getItem("cart")) || [];

  CartItems.innerHTML = ""; // Clear old items
  let cartTotal = 0;

  items.forEach((item, index) => {
    const subtotal = item.price * (item.quantity || 1);
    cartTotal += subtotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart_item";

    cartItem.innerHTML = `
      <p class="cart_id">${item.id}</p>
      <p class="cart_title">${item.title}</p>
      <img src="${item.image}" alt="${item.title}" class="cart_img" />
      <p class="cart_price">$${item.price}</p>
      <input type="number" min="1" value="${item.quantity || 1}" class="cart_qty" data-index="${index}" />
      <p class="cart_subtotal">$${subtotal.toFixed(2)}</p>
      <p class="cart_delete" style="cursor:pointer; color:red;" data-index="${index}">Delete</p>
    `;

    CartItems.appendChild(cartItem);
  });

  CartTotalDisplay.textContent = `Total: $${cartTotal.toFixed(2)}`;

  // Add event listeners
  document.querySelectorAll(".cart_delete").forEach((btn) => {
    btn.addEventListener("click", () => {
      deleteCartItem(btn.dataset.index);
    });
  });

  document.querySelectorAll(".cart_qty").forEach((input) => {
    input.addEventListener("change", () => {
      updateQuantity(input.dataset.index, parseInt(input.value));
    });
  });
}

function deleteCartItem(index) {
  const items = JSON.parse(localStorage.getItem("cart")) || [];
  items.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(items));
  displayCartItems();
}

function updateQuantity(index, qty) {
  if (qty < 1) return;
  const items = JSON.parse(localStorage.getItem("cart")) || [];
  items[index].quantity = qty;
  localStorage.setItem("cart", JSON.stringify(items));
  displayCartItems();
}

displayCartItems();

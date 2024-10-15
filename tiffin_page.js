const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

// Function to add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-item');
        const itemPrice = parseFloat(button.getAttribute('data-price'));

        // Add item to cart
        cartItems.push({ name: itemName, price: itemPrice });
        totalPrice += itemPrice;
        updateCart();
    });
});

// Function to update the cart UI
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceDiv = document.getElementById('total-price');

    // Update cart count
    cartCount.textContent = cartItems.length;

    // Display cart items with remove buttons
    cartItemsDiv.innerHTML = cartItems.map((item, index) => `
        <div class="cart-item">
            <p>${item.name}: $${item.price.toFixed(2)}</p>
            <button class="remove-item" data-index="${index}">Remove</button>
        </div>
    `).join('');

    totalPriceDiv.textContent = `Total: $${totalPrice.toFixed(2)}`;

    // Save updated cart items and total price to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', totalPrice);
}

// Function to remove an item from the cart
function removeItem(index) {
    const itemPrice = cartItems[index].price;
    cartItems.splice(index, 1); // Remove item from array
    totalPrice -= itemPrice; // Adjust total price
    updateCart(); // Update the cart UI
}

// Add event listener for "Remove" buttons
document.getElementById('cart-items').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
        const index = event.target.getAttribute('data-index');
        removeItem(index);
    }
});

// Checkout button functionality
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cartItems.length > 0) {
        window.location.href = 'tiffin_checkout.html'; // Link to your checkout page
    } else {
        alert('Your cart is empty.');
    }
});

// Initial cart update to reflect existing items in localStorage
updateCart();

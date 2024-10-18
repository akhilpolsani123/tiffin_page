// Retrieve cart data from localStorage or initialize with empty values
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let totalPrice = 0; // Initialize with 0 if no data found

// Recalculate total price from cart items
cartItems.forEach(item => {
    totalPrice += item.price * item.quantity;
});

// Function to update the checkout items display
function updateCheckout() {
    const checkoutItemsDiv = document.getElementById('checkout-items');
    const totalPriceDiv = document.getElementById('total-price');

    // Display cart items in checkout with quantity controls
    checkoutItemsDiv.innerHTML = cartItems.map((item, index) => `
        <div class="checkout-item">
            <p>${item.name}: $${item.price.toFixed(2)}</p>
            <div class="quantity-controls">
                <button class="decrease" data-index="${index}">−</button>
                <span>${item.quantity}</span>
                <button class="increase" data-index="${index}">+</button>
            </div>
        </div>
    `).join('');

    // Update total price
    totalPriceDiv.textContent = `Total: $${totalPrice.toFixed(2)}`;

    // Add event listeners for quantity controls
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            cartItems[index].quantity += 1;
            totalPrice += cartItems[index].price;
            updateCheckout();
        });
    });

    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity -= 1;
                totalPrice -= cartItems[index].price;
            } else {
                // Remove the item if quantity is 1 and decrease is pressed
                totalPrice -= cartItems[index].price;
                cartItems.splice(index, 1);
            }
            updateCheckout();
        });
    });

    // Save updated cart items and total price to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', totalPrice);
}

// Confirm order action
document.getElementById('confirm-order').addEventListener('click', () => {
    alert('Order Confirmed! Thank you for your order.');
    // Clear cart after confirmation
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalPrice');
    window.location.href = 'tiffin_page.html'; // Redirect to main menu
});

// Start new order action
document.getElementById('start-new-order').addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalPrice');
    window.location.href = 'tiffin_page.html'; // Redirect to main menu
});

// Initial checkout update
updateCheckout();

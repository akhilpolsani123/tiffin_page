const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

// Function to update the checkout items display
function updateCheckout() {
    const checkoutItemsDiv = document.getElementById('checkout-items');
    const totalPriceDiv = document.getElementById('total-price');

    // Display cart items in checkout
    checkoutItemsDiv.innerHTML = cartItems.map(item => `<p>${item.name}: $${item.price.toFixed(2)}</p>`).join('');
    totalPriceDiv.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Confirm order action
document.getElementById('confirm-order').addEventListener('click', () => {
    alert('Order Confirmed! Thank you for your order.');
    // Clear cart after confirmation
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalPrice');
    window.location.href = 'tiffin_page1.html'; // Redirect to main menu
});

// Start new order action
document.getElementById('start-new-order').addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalPrice');
    window.location.href = 'tiffin_page1.html'; // Redirect to main menu
});

// Initial checkout update
updateCheckout();

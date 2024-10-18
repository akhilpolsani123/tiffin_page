// Retrieve cart data from localStorage or initialize with empty values
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let totalPrice = 0; // Initialize to 0 for a fresh start

// Calculate total price from cart items in localStorage
cartItems.forEach(item => {
    totalPrice += item.price * item.quantity;
});

// Function to add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-item');
        const itemPrice = parseFloat(button.getAttribute('data-price'));

        // Check if the item already exists in the cart
        const existingItem = cartItems.find(item => item.name === itemName);

        if (existingItem) {
            // If the item exists, increase its quantity
            existingItem.quantity += 1;
        } else {
            // If it's a new item, add it to the cart with quantity 1
            cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
        }

        // Update the total price
        totalPrice += itemPrice;

        // Update the cart UI
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

    // Display cart items with quantity controls (no remove button)
    cartItemsDiv.innerHTML = cartItems.map((item, index) => `
        <div class="cart-item">
            <p>${item.name}: $${item.price.toFixed(2)}</p>
            <div class="quantity-controls">
                <button class="decrease" data-index="${index}">−</button>
                <span>${item.quantity}</span>
                <button class="increase" data-index="${index}">+</button>
            </div>
        </div>
    `).join('');

    // Update the total price
    totalPriceDiv.textContent = `Total: $${totalPrice.toFixed(2)}`;

    // Save updated cart items and total price to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', totalPrice);

    // Add event listeners for quantity controls
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            cartItems[index].quantity += 1;
            totalPrice += cartItems[index].price;
            updateCart();
        });
    });

    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity -= 1;
                totalPrice -= cartItems[index].price;
            } else {
                // Remove the item if quantity is 1 and decrease button is pressed
                totalPrice -= cartItems[index].price;
                cartItems.splice(index, 1);
            }
            updateCart();
        });
    });
}

// Checkout button functionality
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cartItems.length > 0) {
        window.location.href = 'tiffin_checkout.html'; // Redirect to your checkout page
    } else {
        alert('Your cart is empty.');
    }
});

// Initial cart update to reflect existing items in localStorage
updateCart();

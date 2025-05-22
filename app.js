// app.js
const cartModule = require('./Surendhar_openCartModule.js');

// 1. Start with an empty cart
let cart = { items: [], coupon: null };

// 2. List all products
console.log('Products:', cartModule.listProducts(null));
console.log('==============================================================')
// 3. Add 2× product #1
cart = cartModule.addToCart(cart, 1, 2);
console.log('Cart after adding:', cart);
console.log('==============================================================')
// 4. Apply a coupon
cart = cartModule.applyCoupon(cart, 'WELCOME10');
console.log('Cart with coupon:', cart);
console.log('==============================================================')
// 5. Calculate total price
console.log('Total price:', cartModule.calculateCartTotal(cart));
console.log('==============================================================')
// 6. Checkout (returns an order ID and clears the cart)
const orderId = cartModule.checkout(cart, {
  cardNumber: '4111111111111111',
  expiry:     '12/25',
  cvv:        '123'
});
console.log('Order placed, ID:', orderId);
console.log('==============================================================')
// 7. Inspect updated stock
console.log('Product #1 now:', cartModule.getProductDetails(1));
console.log('==============================================================')

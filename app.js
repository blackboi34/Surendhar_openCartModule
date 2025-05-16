// index.js
// Starting our OpenCart module test

console.log("Starting OpenCart Module Test");

const cartModule = require("./Surendhar_openCartModule.js");

// 1) create an empty cart
let cart = { items: [], coupon: null };
console.log("Initial cart:", cart);

// 2) list all products
console.log("All products:", cartModule.listProducts(null));

// 3) add 2× product #1
cart = cartModule.addToCart(cart, 1, 2);
console.log("After addToCart:", cart);

// 4) apply coupon
cart = cartModule.applyCoupon(cart, 'WELCOME10');
console.log("After applyCoupon:", cart);

// 5) calculate total
console.log("Cart total:", cartModule.calculateCartTotal(cart));

// 6) checkout
const orderId = cartModule.checkout(cart, {
  cardNumber: '4111111111111111',
  expiry:     '12/25',
  cvv:        '123'
});
console.log("Order ID:", orderId);

// 7) verify stock decrement
console.log("Product #1 now:", cartModule.getProductDetails(1));

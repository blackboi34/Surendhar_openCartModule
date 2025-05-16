// Surendhar_openCartModule.js
// A simple in-memory e-commerce module for the OpenCart demo

const products = [
  { id: 1, name: 'MacBook',    price: 1000, stock: 5, categoryId: 1 },
  { id: 2, name: 'iPhone',     price: 800,  stock: 10, categoryId: 1 },
  { id: 3, name: 'Galaxy Tab', price: 600,  stock: 7,  categoryId: 2 },
  { id: 4, name: 'ThinkPad',   price: 900,  stock: 4,  categoryId: 1 },
  { id: 5, name: 'Pixel 5',    price: 700,  stock: 6,  categoryId: 1 },
];

const coupons = [
  { code: 'WELCOME10', discountPct: 10, expires: '2025-12-31' },
  { code: 'SPRING20',  discountPct: 20, expires: '2025-06-30' },
];

module.exports = {
  // Return all products (if categoryId is null) or filter by category
  listProducts(categoryId) {
    if (categoryId == null) return products;
    return products.filter(p => p.categoryId === categoryId);
  },

  // Return a single product by ID, or null if not found
  getProductDetails(productId) {
    return products.find(p => p.id === productId) || null;
  },

  // Add qty of a product to the cart object
  addToCart(cart, productId, qty) {
    const prod = this.getProductDetails(productId);
    if (!prod) throw new Error('Product not found');
    if (prod.stock < qty) throw new Error('Insufficient stock');
    const item = cart.items.find(i => i.productId === productId);
    if (item) item.qty += qty;
    else cart.items.push({ productId, qty });
    return cart;
  },

  // Remove a product entirely from the cart
  removeFromCart(cart, productId) {
    cart.items = cart.items.filter(i => i.productId !== productId);
    return cart;
  },

  // Calculate total price after applying coupon (if valid)
  calculateCartTotal(cart) {
    let total = cart.items.reduce((sum, i) => {
      const prod = this.getProductDetails(i.productId);
      return sum + prod.price * i.qty;
    }, 0);

    if (cart.coupon) {
      const c = coupons.find(c => c.code === cart.coupon && new Date(c.expires) >= new Date());
      if (c) total *= (1 - c.discountPct / 100);
    }

    return parseFloat(total.toFixed(2));
  },

  // Apply a coupon code to the cart
  applyCoupon(cart, couponCode) {
    const c = coupons.find(c => c.code === couponCode);
    if (!c) throw new Error('Invalid coupon code');
    if (new Date(c.expires) < new Date()) throw new Error('Coupon expired');
    cart.coupon = couponCode;
    return cart;
  },

  // “Place” the order: simulate payment, decrement stock, clear cart
  checkout(cart, paymentInfo) {
    if (!cart.items.length) throw new Error('Cart is empty');
    // Simulate payment processing...
    const orderId = 'ORD' + Date.now();
    cart.items.forEach(i => {
      const prod = this.getProductDetails(i.productId);
      prod.stock -= i.qty;
    });
    cart.items = [];
    cart.coupon = null;
    return orderId;
  }
};

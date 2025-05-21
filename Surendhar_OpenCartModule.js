var products = [
  { id: 1, name: 'MacBook',    price: 1000, stock: 5, categoryId: 1 },
  { id: 2, name: 'iPhone',     price: 800,  stock: 10, categoryId: 1 },
  { id: 3, name: 'Galaxy Tab', price: 600,  stock: 7,  categoryId: 2 },
  { id: 4, name: 'ThinkPad',   price: 900,  stock: 4,  categoryId: 1 },
  { id: 5, name: 'Pixel 5',    price: 700,  stock: 6,  categoryId: 3 }
];

var coupons = [
  { code: 'WELCOME10', discountPct: 10, expires: '2025-12-31' },
  { code: 'SPRING20',  discountPct: 20, expires: '2025-06-30' }
];

module.exports = {
  // Description of the module
  description: "Simple in-memory OpenCart demo module",

  // Return all products, or filter by categoryId if provided
  listProducts: function(categoryId) {
    if (categoryId == null) {
      return products;
    }
    var result = [];
    for (var i = 0; i < products.length; i++) {
      if (products[i].categoryId === categoryId) {
        result.push(products[i]);
      }
    }
    return result;
  },

  // Return details for a single product by ID
  getProductDetails: function(productId) {
    var result = null;
    for (var i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
        result = products[i];
        break;
      }
    }
    return result;
  },

  // Add a quantity of a product to the cart object
  addToCart: function(cart, productId, qty) {
    var product = this.getProductDetails(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    if (product.stock < qty) {
      throw new Error('Insufficient stock');
    }
    var found = false;
    for (var i = 0; i < cart.items.length; i++) {
      if (cart.items[i].productId === productId) {
        cart.items[i].qty += qty;
        found = true;
        break;
      }
    }
    if (!found) {
      cart.items.push({ productId: productId, qty: qty });
    }
    return cart;
  },

  // Remove a product entirely from the cart
  removeFromCart: function(cart, productId) {
    var newItems = [];
    for (var i = 0; i < cart.items.length; i++) {
      if (cart.items[i].productId !== productId) {
        newItems.push(cart.items[i]);
      }
    }
    cart.items = newItems;
    return cart;
  },

  // Calculate the total price after applying any valid coupon (no reduce)
  calculateCartTotal: function(cart) {
    var total = 0;
    // Sum price * qty
    for (var i = 0; i < cart.items.length; i++) {
      var item = cart.items[i];
      var prod = this.getProductDetails(item.productId);
      total += prod.price * item.qty;
    }
    // Apply coupon 
    if (cart.coupon) {
      var applied = null;
      for (var j = 0; j < coupons.length; j++) {
        if (coupons[j].code === cart.coupon &&
            new Date(coupons[j].expires) >= new Date()) {
          applied = coupons[j];
          break;
        }
      }
      if (applied) {
        total = total * (1 - applied.discountPct / 100);
      }
    }
    return parseFloat(total.toFixed(2));
  },

  // Apply a coupon code to the cart
  applyCoupon: function(cart, couponCode) {
    var found = null;
    for (var i = 0; i < coupons.length; i++) {
      if (coupons[i].code === couponCode) {
        found = coupons[i];
        break;
      }
    }
    if (!found) {
      throw new Error('Invalid coupon code');
    }
    if (new Date(found.expires) < new Date()) {
      throw new Error('Coupon expired');
    }
    cart.coupon = couponCode;
    return cart;
  },

  // Place the order: simulate payment, decrement stock, clear the cart
  checkout: function(cart, paymentInfo) {
    if (cart.items.length === 0) {
      throw new Error('Cart is empty');
    }
    var orderId = 'ORD' + Date.now();
    for (var i = 0; i < cart.items.length; i++) {
      var prod = this.getProductDetails(cart.items[i].productId);
      prod.stock -= cart.items[i].qty;
    }
    cart.items = [];
    cart.coupon = null;
    return orderId;
  }
};

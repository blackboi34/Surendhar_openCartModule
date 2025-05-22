// Array for storing product 
var products = [
  { id: 1, name: 'MacBook',    price: 1000, stock: 5, categoryId: 1 },
  { id: 2, name: 'iPhone',     price: 800,  stock: 10, categoryId: 1 },
  { id: 3, name: 'Galaxy Tab', price: 600,  stock: 7,  categoryId: 2 },
  { id: 4, name: 'ThinkPad',   price: 900,  stock: 4,  categoryId: 1 },
  { id: 5, name: 'Pixel 5',    price: 700,  stock: 6,  categoryId: 3 }
];

// Array for storing coupons
var coupons = [
  { code: 'WELCOME10', discountPct: 10, expires: '2025-12-31' },
  { code: 'SPRING20',  discountPct: 20, expires: '2025-06-30' }
];

// function for returning all products, or filter by categoryId if provided
function listProducts(categoryId) {
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
}

// function for returning details for a single product by ID
function getProductDetails(productId) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      return products[i];
    }
  }
  return null;
}

// function for adding a quantity of a product to the cart object
function addToCart(cart, productId, qty) {
  var product = getProductDetails(productId);
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
}

// function for removing a product entirely from the cart
function removeFromCart(cart, productId) {
  var newItems = [];
  for (var i = 0; i < cart.items.length; i++) {
    if (cart.items[i].productId !== productId) {
      newItems.push(cart.items[i]);
    }
  }
  cart.items = newItems;
  return cart;
}

// function for appling a coupon code to the cart if valid and not expired
function applyCoupon(cart, couponCode) {
  for (var i = 0; i < coupons.length; i++) {
    var c = coupons[i];
    if (c.code === couponCode) {
      if (new Date(c.expires) < new Date()) {
        throw new Error('Coupon expired');
      }
      cart.coupon = couponCode;
      return cart;
    }
  }
  throw new Error('Invalid coupon code');
}

// function for calculating the total price after applying any valid coupon
function calculateCartTotal(cart) {
  var total = 0;
  for (var i = 0; i < cart.items.length; i++) {
    var item = cart.items[i];
    var prod = getProductDetails(item.productId);
    total += prod.price * item.qty;
  }
  if (cart.coupon) {
    for (var j = 0; j < coupons.length; j++) {
      var c = coupons[j];
      if (c.code === cart.coupon && new Date(c.expires) >= new Date()) {
        total = total * (1 - c.discountPct / 100);
        break;
      }
    }
  }
  return parseFloat(total.toFixed(2));
}



// function for placing the order: simulate payment, decrement stock, clear the cart
function checkout(cart, paymentInfo) {
  if (cart.items.length === 0) {
    throw new Error('Cart is empty');
  }
  var orderId = 'ORD' + Date.now();
  cart.items.forEach(function(item) {
    var prod = getProductDetails(item.productId);
    prod.stock = prod.stock - item.qty;
  });
  cart.items  = [];
  cart.coupon = null;
  return orderId;
}

// Export the module at the end of the file
module.exports = {
  listProducts,
  getProductDetails,
  addToCart,
  removeFromCart,
  calculateCartTotal,
  applyCoupon,
  checkout
};



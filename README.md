````markdown
# OpenCartModule

OpenCartModule is a lightweight Node.js module that simulates core features of an OpenCart storefront: product catalog management, shopping cart operations, coupon handling, and checkout (stock update and order ID generation).

## Installation

1. Clone the repository and navigate into it:
   ```bash
   git clone https://github.com/your-username/Surendhar_openCartModule.git
   cd Surendhar_openCartModule
````

2. No additional setup is required—there are no external dependencies. Your module is ready to use.

## Usage

Create a file called `app.js` (or `index.js`) in the project root:

```js
// app.js
const cartModule = require('./Surendhar_openCartModule.js');

// 1. Start with an empty cart
let cart = { items: [], coupon: null };

// 2. List all products
console.log('Products:', cartModule.listProducts(null));

// 3. Add 2× product #1
cart = cartModule.addToCart(cart, 1, 2);
console.log('Cart after adding:', cart);

// 4. Apply a coupon
cart = cartModule.applyCoupon(cart, 'WELCOME10');
console.log('Cart with coupon:', cart);

// 5. Calculate total price
console.log('Total price:', cartModule.calculateCartTotal(cart));

// 6. Checkout (returns an order ID and clears the cart)
const orderId = cartModule.checkout(cart, {
  cardNumber: '4111111111111111',
  expiry:     '12/25',
  cvv:        '123'
});
console.log('Order placed, ID:', orderId);

// 7. Inspect updated stock
console.log('Product #1 now:', cartModule.getProductDetails(1));
```

Run your application:

```bash
node app.js
```

---

## Module Reference

### In-Memory Data

#### `products`

An array of product objects, each with:

* `id` (Number): Unique identifier
* `name` (String): Product name
* `price` (Number): Unit price
* `stock` (Number): Available quantity
* `categoryId` (Number): Category grouping

#### `coupons`

An array of coupon objects, each with:

* `code` (String): Coupon code
* `discountPct` (Number): Percentage off (e.g. `10`)
* `expires` (String): Expiry date in `YYYY-MM-DD`

---

### Available Functions

* **`listProducts(categoryId)`**
  Returns all products if `categoryId` is `null`, otherwise only those matching that category.

* **`getProductDetails(productId)`**
  Retrieves a single product by ID, or `null` if not found.

* **`addToCart(cart, productId, qty)`**
  Adds `qty` units of the specified product to `cart` (throws if invalid ID or insufficient stock). Returns the updated cart.

* **`removeFromCart(cart, productId)`**
  Removes all quantities of the specified product from `cart`. Returns the updated cart.

* **`applyCoupon(cart, couponCode)`**
  Validates and applies a coupon (throws if invalid or expired). Returns the updated cart.

* **`calculateCartTotal(cart)`**
  Computes the total price of items in `cart`, applying any valid coupon discount. Returns a number rounded to two decimals.

* **`checkout(cart, paymentInfo)`**
  Simulates order placement: errors if `cart` is empty, decrements each product’s stock, clears `cart`, and returns a generated order ID.

---

## References

* **OpenCart Demo Store**: [https://demo.opencart.com/](https://demo.opencart.com/)
* **Saleor GraphQL Demo Store**: [https://demo.saleor.io/](https://demo.saleor.io/)


```
```

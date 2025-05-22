````markdown
# Surendhar_openCartModule

Surendhar_openCartModule is a minimal Node.js library that simulates a simple e-commerce backend:

- **Product catalog** you can browse or filter by category  
- **Shopping cart** operations (add/remove items)  
- **Coupon** validation and discount calculation  
- **Checkout** simulation with stock updates and order ID generation  

---

## Prerequisites

- [Node.js](https://nodejs.org/) v12 or newer

---

## Installation

```bash
git clone https://github.com/your-username/Surendhar_openCartModule.git
cd Surendhar_openCartModule
````

*No external dependencies required.*

---

## Quick Start

1. **Create** a file named `app.js` in the project root:

   ```js
   // app.js
   console.log('--- Starting Shopping Cart Demo ---');

   const cartModule = require('./Surendhar_openCartModule.js');

   // Initialize an empty cart
   let cart = { items: [], coupon: null };
   console.log('Initial cart:', cart);

   console.log('\n1) listProducts(null)');
   const products = cartModule.listProducts(null);
   console.log('Products:', products);

   console.log('\n2) addToCart(cart, 1, 2)');
   cart = cartModule.addToCart(cart, 1, 2);
   console.log('Cart after adding:', cart);

   console.log('\n3) applyCoupon(cart, "WELCOME10")');
   cart = cartModule.applyCoupon(cart, 'WELCOME10');
   console.log('Cart after applying coupon:', cart);

   console.log('\n4) calculateCartTotal(cart)');
   const total = cartModule.calculateCartTotal(cart);
   console.log('Total price:', total);

   console.log('\n5) checkout(cart, paymentInfo)');
   const orderId = cartModule.checkout(cart, {
     cardNumber: '4111111111111111',
     expiry:     '12/25',
     cvv:        '123'
   });
   console.log('Order placed, ID:', orderId);

   console.log('\n6) getProductDetails(1)');
   const updatedProduct = cartModule.getProductDetails(1);
   console.log('Product #1 now:', updatedProduct);

   console.log('\n--- Demo Complete ---');
   ```

2. **Run** the demo:

   ```bash
   node app.js
   ```

You’ll see step-by-step logs showing products listed, items added, coupon applied, total calculated, checkout performed, and stock updated.

---

## API Reference

### `listProducts(categoryId)`

* **Description:** Return all products if `categoryId` is `null`, or only those matching the category.
* **Returns:** `Array<Object>` of product objects.

### `getProductDetails(productId)`

* **Description:** Retrieve a single product by its ID.
* **Returns:** A product object or `null` if not found.

### `addToCart(cart, productId, qty)`

* **Description:** Add `qty` units of a product to the cart (throws if ID invalid or stock insufficient).
* **Returns:** The updated cart object.

### `removeFromCart(cart, productId)`

* **Description:** Remove all quantities of the given product from the cart.
* **Returns:** The updated cart.

### `applyCoupon(cart, couponCode)`

* **Description:** Validate and apply a coupon code (throws if invalid or expired).
* **Returns:** The updated cart.

### `calculateCartTotal(cart)`

* **Description:** Compute the total price of all items in the cart, applying any valid coupon.
* **Returns:** A `Number` rounded to two decimals.

### `checkout(cart, paymentInfo)`

* **Description:** Simulate placing the order:

  1. Throws if the cart is empty
  2. Decrements each product’s stock
  3. Clears the cart and coupon
  4. Returns a generated order ID
* **Returns:** A string like `"ORD1612345678901"`.

---

## Data Structures

* **Product**

  ```js
  { id: Number, name: String, price: Number, stock: Number, categoryId: Number }
  ```
* **Cart**

  ```js
  {
    items: [ { productId: Number, qty: Number } ],
    coupon: String | null
  }
  ```
* **Coupon**

  ```js
  { code: String, discountPct: Number, expires: "YYYY-MM-DD" }
  ```

---

## References

* **OpenCart Demo Store**: [https://demo.opencart.com/](https://demo.opencart.com/)
* **Saleor GraphQL Demo**: [https://demo.saleor.io/](https://demo.saleor.io/)

```
```

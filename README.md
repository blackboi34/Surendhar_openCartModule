````markdown
# Surendhar_openCartModule

Surendhar_openCartModule is a minimal Node.js library that simulates a simple e-commerce backend:  
- A product catalog you can browse or filter by category  
- Shopping cart operations (add/remove items)  
- Coupon validation and discount calculation  
- Checkout simulation with stock updates and order ID generation  

---

## Prerequisites

- **Node.js** v12 or newer

---

## Installation

```bash
git clone https://github.com/your-username/Surendhar_openCartModule.git
cd Surendhar_openCartModule
````

*No additional dependencies are required.*

---

## Quick Start

1. **Create** an `app.js` (or `index.js`) in the project root:

   ```js
   const cartModule = require('./Surendhar_openCartModule.js');

   // Initialize an empty cart
   let cart = { items: [], coupon: null };
   ```

2. **Use** the API:

   ```js
   // 1) List all products
   console.log('Products:', cartModule.listProducts(null));

   // 2) Add 2× MacBook (id: 1)
   cart = cartModule.addToCart(cart, 1, 2);

   // 3) Apply a coupon
   cart = cartModule.applyCoupon(cart, 'WELCOME10');

   // 4) Calculate total price
   console.log('Total price:', cartModule.calculateCartTotal(cart));

   // 5) Checkout (returns an order ID and clears the cart)
   const orderId = cartModule.checkout(cart, {
     cardNumber: '4111111111111111',
     expiry:     '12/25',
     cvv:        '123'
   });
   console.log('Order placed, ID:', orderId);

   // 6) Check updated stock for product #1
   console.log('Product #1 now:', cartModule.getProductDetails(1));
   ```

3. **Run** your application:

   ```bash
   node app.js
   ```

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

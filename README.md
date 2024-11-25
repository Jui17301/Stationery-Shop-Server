# Stationery Shop

## Objective

Develop a TypeScript-based Express application integrated with MongoDB and Mongoose to manage a Stationery Shop. The application supports CRUD operations for stationery products and orders, ensuring data integrity through Mongoose schema validation.

---

## Features

1. **Stationery Product Management**:

   - Create, read, update, and delete stationery products.
   - Search products by `name`, `brand`, or `category`.

2. **Order Management**:

   - Place orders for stationery products.
   - Inventory management:
     - Reduce product quantity on order placement.
     - Mark product as `out of stock` when inventory is depleted.
     - Handle insufficient stock scenarios gracefully.

3. **Revenue Calculation**:

   - Aggregate total revenue from all orders using MongoDB's aggregation pipeline.

4. **Error Handling**:
   - Standardized error responses with details for debugging and clarity.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB (via Mongoose ODM)
- **Validation**: Mongoose Schema Validation
- **HTTP Client**: Postman (for API testing)

---

### **Models:**

1. **Stationery Product Model**
   - **name** (string): The name of the product (e.g., Pen, Notebook, Eraser).
   - **brand** (string): The brand of the product (e.g., Pilot, Moleskine, Faber-Castell).
   - **price** (number): Price of the product.
   - **category** (string): The type of product, using an `enum` (e.g., Writing, Office Supplies). use `enum`, exact value (Writing, Office Supplies, Art Supplies, Educational, Technology)
   - **description** (string): A brief description of the product.
   - **quantity** (number): Quantity of the product available.
   - **inStock** (boolean): Indicates if the product is in stock.
2. **Order Model**
   - **email** (string): The email address of the customer.
   - **product** (ObjectId): The stationery product ordered. (`unused ref`) (enter the created productId from your database which product you would love to buy).
   - **quantity** (number): The quantity of the ordered product.
   - **totalPrice** (number): The total price (product price \* quantity).

---

## Installation

Clone the repository:

```
https://github.com/Shabbir878/Stationery-Shop.git
cd Stationery-Shop
```

## Install dependencies:

```
npm install
```

## Environment Variables

Create a .env file in the root directory and add the following environment variables:

```
PORT=your_port
DB_URL=your_mongodb_url
```

## Running the Application

Start the development server:

```
npm run start:dev
```

Start the production server:

```
npm run start:prod
```

---

### **Generic Error Response:**

1. **`message`**: A brief error message explaining what went wrong.
2. **`success`**: Set to `false` for error responses.
3. **`error`**: The error message or error object returned by the application (e.g., `"ValidationError"`, `"Resource not found"`).
4. **`stack`**: The stack trace showing where the error occurred in the code.

### Example:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "price": {
        "message": "Price must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Price must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "price",
        "value": -5
      }
    }
  },
  "stack": "Error: Something went wrong\n    at app.js:23:13\n    at..."
}
```

---

### **1. Create a Stationery Product**

- **Endpoint:** **`/api/products`**
- **Method:** `POST`
- **Request Body:**

```json
{
  "name": "Notebook",
  "brand": "Moleskine",
  "price": 15,
  "category": "Office Supplies",
  "description": "A high-quality notebook for professionals.",
  "quantity": 200,
  "inStock": true
}
```

- **Response:** Success message and created product details.

```jsx
{
  "message": "Product created successfully",
  "success": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Notebook",
    "brand": "Moleskine",
    "price": 15,
    "category": "Office Supplies",
    "description": "A high-quality notebook for professionals.",
    "quantity": 200,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}

```

---

### **2. Get All Stationery Products**

- **Endpoint:** **`/api/products`**
- **Method:** `GET`
- **Response:** A list of all products with details like name, brand, price, category, etc.
- Query: A list of all products from the same category, you’ll take this as `/api/products?searchTerm=category` searchTerm can be `name`, `brand`, `category`

```jsx
{
  "message": "Products retrieved successfully",
  "status": true,
  "data": [
    {
      "_id": "648a45e5f0123c45678d9012",
      "name": "Notebook",
      "brand": "Moleskine",
      "price": 15,
      "category": "Office Supplies",
      "description": "A high-quality notebook for professionals.",
      "quantity": 200,
      "inStock": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    },
    // ... rest data
  ]
}

```

---

### **3. Get a Specific Stationery Product**

- **Endpoint:** **`/api/products/:productId`**
- **Method:** `GET`
- **Response:** The details of a specific product by ID.

```jsx
{
  "message": "Product retrieved successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Notebook",
    "brand": "Moleskine",
    "price": 15,
    "category": "Office Supplies",
    "description": "A high-quality notebook for professionals.",
    "quantity": 200,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}

```

---

### **4. Update a Stationery Product**

- **Endpoint:** **`/api/products/:productId`**
- **Method:** `PUT`
- **Request Body:** (Product details to update)

```json
{
  "price": 18,
  "quantity": 180
}
```

- **Response:** Success message and updated product details.

```jsx
{
  "message": "Product updated successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Notebook",
    "brand": "Moleskine",
    "price": 18,  // Price updated
    "category": "Office Supplies",
    "description": "A high-quality notebook for professionals.",
    "quantity": 180,  // Quantity updated
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T11:00:00.000Z"  // Updated timestamp
  }
}

```

---

### **5. Delete a Stationery Product**

- **Endpoint:** **`/api/products/:productId`**
- **Method:** `DELETE`
- **Response:** Success message confirming the product has been deleted.

```jsx
{
  "message": "Product deleted successfully",
  "status": true,
  "data": {}
}

```

---

### **6. Order a Stationery Product**

- **Endpoint:** **`/api/orders`**
- **Method:** `POST`
- **Inventory Management Logic:**
  - When an order is placed, reduce the **quantity** in the product model.
  - If the inventory quantity goes to zero, set **inStock** to `false`.
  - Handle **insufficient stock** cases by returning an appropriate error message.
- **Request Body:**

```json
{
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",
  "quantity": 2,
  "totalPrice": 36
}
```

- **Response:** Success message confirming the order.

```jsx
{
  "message": "Order created successfully",
  "status": true,
  "data": {
    "_id": "648b45f5e1234b56789a6789",
    "email": "customer@example.com",
    "product": "648a45e5f0123c45678d9012",
    "quantity": 2,
    "totalPrice": 36,
    "createdAt": "2024-11-19T12:00:00.000Z",
    "updatedAt": "2024-11-19T12:00:00.000Z"
  }
}

```

---

### **7. Calculate Revenue from Orders (Aggregation)**

- **Endpoint:** **`/api/orders/revenue`**
- **Method:** `GET`
- **Aggregation Suggestion:**
  - Use MongoDB aggregation pipeline to calculate the total revenue from `all orders`.
  - Calculate the total price by multiplying the price of each product by the quantity ordered.
- **Response:** The total revenue from all orders.

```jsx
{
  "message": "Revenue calculated successfully",
  "status": true,
  "data": {
    "totalRevenue": 720  // Total revenue calculated from all orders
  }
}

```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the License.
raw
formatted

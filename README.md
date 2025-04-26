
# eShop - E-commerce Application 🛒

## Overview
eShop is a scalable and secure back-end system designed for an E-commerce platform. Built using **Node.js**, **Express.js**, and **MongoDB**, this project focuses on delivering robust features such as category management, route validation, professional error handling, and API documentation.

The system is currently under active development, with upcoming features including **JWT-based authentication**, product and order management, and advanced business logic.

This project showcases my skills in backend development, RESTful API design, and database management while adhering to best practices in software engineering.

---

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [API Documentation](#api-documentation)
5. [Upcoming Features](#upcoming-features)
6. [Contributing](#contributing)
7. [Author](#author)

---

## Features

### Completed Features:
- **Category and Subcategory System**: A hierarchical structure for organizing products.
- **Route Validation**: Ensures only valid requests are processed by the server.
- **Professional Error Handling**: Centralized error handling mechanism for consistent responses.
- **API Testing & Documentation**: Comprehensive testing and documentation using **Apidog**.

### Upcoming Features:
- **JWT-Based Authentication**: Secure user login and session management.
- **Product Management**: CRUD operations for managing products.
- **Order Management**: End-to-end order processing and tracking.
- **Advanced Business Logic**: Implementing workflows for payments, discounts, and inventory management.

---

## Technologies Used
- **Node.js**: Runtime environment for building server-side applications.
- **Express.js**: Web framework for creating RESTful APIs.
- **MongoDB**: NoSQL database for storing and managing data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **Apidog**: Tool for API testing and documentation.
- **JWT (JSON Web Tokens)**: For secure authentication and authorization (upcoming).

---

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud Atlas)
- NPM (comes with Node.js)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ahmedaboseada/eShop.git
   ```
2. Navigate into the project directory:
   ```bash
   cd eShop
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     PORT=3000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```
5. Start the development server:
   ```bash
   npm run dev
   ```

6. For production:
   ```bash
   npm start
   ```

The server will be running at: `http://localhost:3000/`

---

## API Documentation

The API is documented using **Apidog**.

🔗 **Documentation link**: *(coming soon)*

### Example Endpoints:
- `GET /api/categories` → Fetch all categories
- `POST /api/categories` → Create a new category
- `PUT /api/categories/:id` → Update a category by ID
- `DELETE /api/categories/:id` → Delete a category by ID

---

## Upcoming Features
- **JWT-Based Authentication**: Secure login, protected routes.
- **Role-Based Access Control (RBAC)**: Admin and user roles.
- **Product & Order Management**: CRUD, tracking orders, updating statuses.
- **Advanced Business Logic**: Payment integrations (e.g., Stripe, PayPal), inventory management.
- **Reviews and Ratings**: User feedback for products.

---

## Contributing

Contributions are welcome! 🚀

Steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request.

---

## Author

**Ahmed Abu Seada**  
📧 [ahmedabuseada22@gmail.com](mailto:ahmedabuseada22@gmail.com)  
🔗 [LinkedIn Profile](https://www.linkedin.com/in/ahmedaboseada/)  
🔗 [GitHub](https://github.com/ahmedaboseada)

---

© 2025 Ahmed Abu Seada. All Rights Reserved.

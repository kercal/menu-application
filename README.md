# Cafe/Restaurant Management Application

This is a full-stack web application that I wanted to build for years but couldn't start due to my studies, designed to manage cafe/restaurant operations, including creating and managing menus, generating QR codes for tables, and handling customer orders. The application allows cafe owners to manage their menus and view customer orders, while customers can view the menu, place orders, and manage their profiles. I'm still building it.

## Technologies Used

- **Frontend:** React, Bootstrap
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **File Uploads:** Multer

## Features

- **Cafe Owners:**

  - Register and log in to manage their cafe/restaurant.
  - Create and manage menu items with categories, prices, descriptions, and images.
  - Generate QR codes for each table, allowing customers to view the menu and place orders.
  - View orders in real-time from the dashboard.

- **Customers:**

  - Register and log in to view the menu, place orders, and manage their profiles.
  - Access a table-specific menu via QR code.

- **Upcoming Features:**
  -Visited locations history for customers
  -Rating for cafe/restaurants
  -Comments from customers

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Clone the Repository`

git clone https://github.com/kercal/menu-application

cd menuApplication


### Backend Setup

1. Navigate to the root directory

2. Install the required packages:

npm install



3. Create a `.env` file in the `backend` directory with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the backend server(root):


node index.js


### Frontend Setup

1. Navigate to the `frontend` directory:

cd client


2. Install the required packages:

npm install

3. Start the frontend development server:

npm start

The frontend server should be running on `http://localhost:3000` and the backend server on `http://localhost:5000`.

## Usage

1. **Register as a Cafe Owner:**

   - Create a new cafe owner account and log in to access the dashboard.
   - Manage your menu by adding categories and menu items.
   - Generate QR codes for tables, allowing customers to access the menu.

2. **Register as a Customer:**

   - Create a new customer account and log in to access your profile.
   - Scan a table's QR code to view the menu and place an order.

3. **Dashboard:**
   - Access the dashboard to view and manage orders in real-time.

## Project Structure

- **backend/**: Contains all backend-related code, including routes, models, middleware, and configuration files.
- **frontend/**: Contains all frontend-related code, including React components, pages, and styles.


![ss1](https://github.com/user-attachments/assets/2caad801-371a-4aba-854c-aa00fc6b091b)
![ss2](https://github.com/user-attachments/assets/0f640c4d-9c20-4835-8654-bdc9093ae97b)
![ss3](https://github.com/user-attachments/assets/89b2546f-7135-4bb6-804a-8f0ec996cafe)
![ss4](https://github.com/user-attachments/assets/62eca68c-899d-4d68-b7d3-c2f992f372f5)



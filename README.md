# 🛒 Forever E-Commerce – Full Stack MERN Application

A full-featured MERN stack e-commerce platform with separate User and Admin dashboards, secure authentication, online payments, and complete order management.

---

## 🚀 Features

### 👤 User Features
- User authentication using JWT
- Browse products and categories
- Add and remove items from cart
- Place orders with online payment
- View order history and order status

### 🛠 Admin Features
- Secure admin authentication
- Add, update, and delete products
- View and manage all orders
- Update order status
- Protected admin routes

---

## 🧰 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Payments & Services
- Razorpay
- Cloudinary

---

## 📂 Project Structure

forever-ecommerce/
├── frontend   # User-facing React app
├── admin      # Admin dashboard
├── backend    # REST API


## 🔐 Security
- Environment variables for secrets
- JWT-based authentication
- Protected user and admin routes


## ⚙️ Setup Instructions
git clone https://github.com/Gaurav9350-tyagi/forever-ecommerce.git
cd backend && npm install && npm run server
cd frontend && npm install && npm run dev
cd admin && npm install && npm run dev

## 🌐 Environment Variables

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key


## 👨‍💻 Author
Gaurav Tyagi – B.Tech CSE | MERN Stack Developer



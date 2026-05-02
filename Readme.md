# 🚀 Team Task Manager (MERN Stack)

## 🔗 Live Demo

https://team-task-manager-oqs5-mocha.vercel.app

## 📌 Features

* 🔐 User Authentication (Login / Signup)
* 👨‍💼 Role-based Access (Admin / User)
* 📝 Create, Update, Delete Tasks
* 📊 Task Status (To Do, In Progress, Completed)
* 🔒 Secure JWT Authentication

## 🛠 Tech Stack

* Frontend: React, Redux Toolkit, Tailwind CSS
* Backend: Node.js, Express.js
* Database: MongoDB Atlas
* Deployment: Vercel (Frontend) + Railway (Backend)

## ⚙️ Setup Instructions

### 1. Clone Repository



### 2. Install Dependencies

cd client
npm install

cd ../server
npm install

### 3. Environment Variables

#### server/.env

PORT=5002
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

#### client/.env

VITE_API_URL=http://localhost:5002/api

### 4. Run Project

cd server
npm run dev

cd ../client
npm run dev





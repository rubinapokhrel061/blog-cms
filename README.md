# 📝 Simple Blog CMS - Ten Tech Solutions Trial Task

This is a simple custom CMS built with the MERN stack. It allows an admin to login and manage blog posts (Create, Edit, Delete, View).

## 🚀 Features

- Admin Login 
- Create/Edit/Delete blog posts
- View all posts (dashboard)
- View single post detail page

## 🔧 Tech Stack

- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Atlas)

## 🔐 Admin Login Credentials
ADMIN_PASSWORD=admin@123
ADMIN_USERNAME=admin

## 📦 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/rubinapokhrel061/blog-cms.git
cd blog-cms

### Setup Backend
cd server
npm install
# Create .env file
# Server
PORT=8080
# Database
DATABASE_URL=mongodb+srv://pokhrelrubina2061:aOPP1ioNNADcDbp9@cluster0.xwxebuh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
# Frontend
FRONTEND_HOST=http://localhost:5173
JWT_SECRET=rubiwhhdhhchbcshbh
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASS=admin@123
ADMIN_USERNAME=admin

npm run dev

### Setup Frontend
cd client
npm install
# Create .env
VITE_API_URL=http://localhost:8080

npm run dev

# Full-Stack MERN Blog Application


A modern, production-ready **Full Stack MERN Blog Application** built using **MongoDB, Express.js, React, and Node.js**, featuring secure authentication, advanced search, image management, an admin dashboard and a complete **Dockerized CI/CD workflow**. This project demonstrates real-world full-stack development.

---

## Project Overview




This project is a complete blog and content management platform developed with the latest MERN stack technologies. It focuses on scalability, security, and user experience, implementing industry-standard authentication, optimized database queries, and a modern, responsive frontend.

The application supports:
- Secure user authentication
- Blog creation and management
- Image uploads with cloud storage
- Advanced search and filtering
- Admin-level system control

---

## Key Features

### Authentication & Security
- Secure **Email & Password authentication** using **JWT**
- **Google OAuth** integration for seamless social login
- JWT-based **cookie validation** for protected routes
- Secure account deletion and session handling

###  Blog & Content Management
- Full **CRUD operations** for blog posts
- Users can create, edit, update, and delete their own posts
- Admin control over posts, users, and comments

###  Advanced Search & Filtering
- Smart search with keyword-based filtering
- Sorting options (latest, oldest, relevance)
- Optimized **MongoDB queries** for better performance

###  Image Management
- **Firebase Storage** integration for image uploads
- Upload and manage multiple images efficiently
- Secure image handling and deletion

###  User Profile Management
- Profile update functionality
- Profile image upload support
- Secure account deletion

###  Admin Dashboard
- View and manage users, posts, and comments
- Monitor recent activity
- Full administrative control

###  Modern Frontend Stack
- **React 18** with functional components and hooks
- **Redux Toolkit** for state management
- **React Router DOM** for dynamic routing
- **Tailwind CSS & Flowbite** for responsive and modern UI design

## DevOps & Deployment
- Dockerized frontend and backend with separate Dockerfiles
- Docker Compose for service orchestration
- CI/CD pipeline implemented using GitHub Actions
- Deployed on Render with production-ready configuration

---

##  Tech Stack

**Frontend**
- React.js
- Redux Toolkit
- React Router DOM
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)

**Authentication & Storage**
- Google OAuth
- Firebase Storage

**DevOps & Deployment:**  
- Docker, Docker Compose, GitHub Actions, Render

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Lahirue20272/mern-blog.git

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install

# Run the project
npm run dev

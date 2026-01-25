# Full-Stack MERN Blog Application


A **production-ready Full Stack MERN Blog Application** built using **MongoDB, Express.js, React, and Node.js**, featuring secure authentication, advanced search, image management, an admin dashboard, and a **fully automated CI/CD pipeline deployed on AWS EC2**.


This project showcases **real-world full-stack development**, modern **DevOps practices**, and **cloud deployment** using **Docker, GitHub Actions, Docker Hub, Nginx, a custom domain, and HTTPS (SSL)**.


---

## Project Overview




This project is a complete blog and content management platform developed with the latest MERN stack technologies. It focuses on scalability, security, and user experience, implementing industry-standard authentication, optimized database queries, and a modern, responsive frontend.

It supports:
- Secure user authentication and authorization
- Blog creation and management
- Image uploads with cloud storage
- Advanced search and filtering
- Admin-level system control
- Automated CI/CD deployment to AWS EC2
- Custom domain with HTTPS enabled

---

## Key Features

### Authentication & Security
- Secure **Email & Password authentication** using **JWT**
- **Google OAuth** integration for seamless social login
- JWT stored in **HTTP-only cookies**
- Protected routes and role-based access
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

#### Admin Dashboard Preview
![Admin Dashboard](https://github.com/user-attachments/assets/a79e8f53-fb3c-48cf-abe4-0ce68ecb4893)


###  Modern Frontend Stack
- **React 18** with functional components and hooks
- **Redux Toolkit** for state management
- **React Router DOM** for dynamic routing
- **Tailwind CSS & Flowbite** for responsive and modern UI design
---

## Cloud, DevOps & Deployment

### Docker & Containerization
- Dockerized **frontend** and **backend**
- Multi-stage Docker builds
- Docker Compose for local development and production

### CI/CD Pipeline (GitHub Actions)
- Triggered on every push to the `main` branch
- Builds Docker images automatically
- Pushes images to **Docker Hub**
- AWS EC2 pulls the latest images and restarts containers

### AWS EC2 Deployment
- Deployed on **AWS EC2 (Ubuntu)**
- Secure environment variable management
- Production-ready configuration

### Nginx Reverse Proxy
- Nginx serves **React static files**
- Reverse proxy for backend API requests
- Improves performance, security, and scalability

### Custom Domain & HTTPS
- Custom domain configured and connected to AWS EC2
- **SSL/TLS certificate installed** (HTTPS enabled)
- Secure traffic using **Nginx + SSL certificate**
- Automatic HTTP → HTTPS redirection
---

## Tech Stack Summary

### Frontend
- React.js
- Redux Toolkit
- React Router DOM
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Authentication & Storage
- Google OAuth
- Firebase Storage

### DevOps & Cloud
- Docker
- Docker Compose
- GitHub Actions
- Docker Hub
- AWS EC2
- Nginx
- Custom Domain & SSL (HTTPS)

---

## Architecture Overview

<img width="1920" height="1080" alt="Process Mapping Whiteboard in Dark Blue Blue Light Blue Monochromatic Style (2)" src="https://github.com/user-attachments/assets/20f2bc5a-65d4-4140-aed4-95b5ee424666" />

<img width="1920" height="1080" alt="Process Mapping Whiteboard in Dark Blue Blue Light Blue Monochromatic Style (4)" src="https://github.com/user-attachments/assets/1dc74f1e-a323-43ba-90c4-a172497cb9ed" />

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

# Run with Docker (Local)
docker compose up --build





# Task Management System

## Overview

A full-stack Task Management System built using Node.js, Express.js, MongoDB, and React. The application provides secure JWT authentication, role-based access control, task management features, and API documentation using Swagger.

## Features

### Authentication

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Authentication

### Authorization

* Role-Based Access Control (User/Admin)
* Protected Routes

### Task Management

* Create Task
* View Tasks
* Update Task
* Delete Task

### Additional Features

* Input Validation
* Swagger API Documentation
* RESTful API Design
* MongoDB Integration

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcryptjs
* Swagger

### Frontend

* React.js
* React Router DOM
* Axios
* Bootstrap

## Project Structure

project/
├── backend/
├── frontend/
├── README.md

## Environment Variables

Backend .env

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

## Installation

### Backend

cd backend

npm install

npm run dev

### Frontend

cd frontend

npm install

npm run dev

## API Documentation

Swagger UI:

http://localhost:5000/api-docs

## API Endpoints

### Authentication

POST /api/v1/auth/register

POST /api/v1/auth/login

### Tasks

POST /api/v1/tasks

GET /api/v1/tasks

PUT /api/v1/tasks/:id

DELETE /api/v1/tasks/:id

### Admin

GET /api/v1/admin/tasks

## Scalability Considerations

* Stateless JWT Authentication
* Modular Architecture
* API Versioning
* Horizontal Scaling Ready
* Redis Caching (Future Scope)
* Docker Deployment (Future Scope)
* Microservices Architecture (Future Scope)

## Author

Pranith Kumar 

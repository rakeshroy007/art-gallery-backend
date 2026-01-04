# 🎨 ArtGallery Backend

Backend service for **ArtGallery (Creative Showcase)** — a full-stack web application where artists can upload and showcase their digital artwork and memories.

This backend is built using **Node.js, Express, MongoDB, and Multer**, providing secure authentication, image uploads, and public/private data access.

---

## 🚀 Features

- User authentication (Signup / Login)
- Password hashing using bcrypt
- Image upload with Multer
- Serve uploaded images statically
- Public image gallery APIs
- User-specific private dashboard APIs
- MongoDB Atlas integration

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Multer** (file uploads)
- **bcrypt** (password hashing)
- **dotenv**
- **CORS**

---

## 🔑 Environment Variables

Create a `.env` file in the root:

```env
MONGODB__URI=your_mongodb_connection_string
```

## ▶️ Running the Backend Locally
npm install
`nodemon .\app.js`
or 
`node .\app.js`
Server will start at:
`http://localhost:5000`


## 📡 API Routes Overview

### 🔐 Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/auth/signup` | Register a new user account and store username in localstorage |
| **POST** | `/api/auth/login` | Authenticate user and store username in localstorage |

---

### 🖼️ Images (Private)
> **Note:** These routes are protected.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/images/upload` | Upload a new image to the database |
| **GET** | `/api/images/my` | Get all images uploaded by the logged-in user |

---

### 🌍 Public Routes
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/images` | Fetch random public images for the landing page |
| **GET** | `/api/profile/:username` | Retrieve public gallery for a specific user |

### 📂 Static Files
Uploaded images are served from:
```
/uploads
```

Example:
```
http://localhost:5000/uploads/image.jpg`
```

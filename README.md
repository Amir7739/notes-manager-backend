# 📝 Notes Manager Backend (MERN Stack)

This is the backend for the Notes Manager application built using **Node.js**, **Express**, and **MongoDB**. It includes secure user authentication (with JWT), AES encryption of notes, and RESTful APIs for CRUD operations on encrypted notes.

## 🔐 Features

- ✅ User registration and login
- 🔒 Password hashing using bcrypt
- 🛡️ JWT authentication with token expiration
- 🗂️ CRUD operations on encrypted notes
- 📦 Well-structured API with error handling
- 🧪 Protected routes using middleware

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Token (JWT)
- Bcrypt.js (for password hashing)
- Crypto-js (AES encryption)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Amir7739/notes-manager-backend.git
cd notes-manager-backend

## 2. Install dependencies
npm install

## 3. Set environment variables
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_32_char_encryption_key



## 4. Now Run It:

npm run dev


## API Endpoints

# Authenticated
| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login and get token |

# Notes
| Method | Endpoint                 | Description                              |
| ------ | ------------------------ | --------------------------------         |
| GET    | `/api/notes/get-all`     | Get all notes for logged-in user         |
| POST   | `/api/notes/create`      | Add a new note                           |
| PUT    | `/api/notes/update/:id`  | Update a note                            |
| DELETE | `/api/notes/delete/:id`  | Delete a note                            |



## Testing
You can test the APIs using Postman or Thunder Client. Make sure to include the Authorization header as:

Bearer <your_token_here>


```

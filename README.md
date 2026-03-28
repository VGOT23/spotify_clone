# Spotify Clone Backend

A Node.js/Express/MongoDB backend for a Spotify Clone, starting with user authentication (register/login). Expandable for music streaming features.

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Quick Setup](#quick-setup)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Running the Server](#running-the-server)
- [Testing](#testing)
- [TODO / Next Steps](#todo--next-steps)

## Prerequisites
- Node.js (v20+ recommended)
- MongoDB Atlas account (free tier) or local MongoDB
- Postman or curl for API testing

## Quick Setup
1. Clone the repo:
   ```
   git clone <repo-url>
   cd "d:/YT_backend/Spotify Clone"
   ```

2. Create `.env` file in root (see [Environment Variables](#environment-variables)):
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the server:
   ```
   npm run run
   ```
   Server starts on `http://localhost:3000`.

## Project Structure
```
.
├── server.js          # Entry point: DB connect + server start
├── src/
│   ├── app.js         # Express app setup + middleware
│   ├── db/
│   │   └── db.js      # MongoDB connection
│   ├── models/
│   │   └── user.model.js  # User schema (username, email, password, role)
│   ├── controller/
│   │   └── auth.controller.js  # Register logic (bcrypt, JWT)
│   └── routes/
│       └── auth.routes.js  # POST /register
├── package.json       # Deps: express, mongoose, bcryptjs, jwt, etc.
└── .env               # Secrets (gitignored)
```

## Environment Variables
Create `.env`:
```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/spotifyclone?retryWrites=true&amp;w=majority
JWT_SECRET=your-very-secure-secret-key-min-32-chars
```

## API Endpoints
| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| POST   | `/api/auth/register` | Register user (returns JWT cookie + user info) |

**Register Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepass123",
  "role": "user"  // optional: "user" or "artist"
}
```

## Running the Server
```
npm run run
```
- Uses `nodemon server.js` for auto-restart on changes.
- Console: `Server is running on port 3000` + `server connected to database`

## Testing
Use curl:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }' \
  -c cookies.txt  # Saves JWT cookie
```

Expected Response (201):
```json
{
  "message": "user created sucessfully",
  "user": {
    "id": "...",
    "username": "testuser",
    "email": "test@example.com",
    "role": "user"
  }
}
```

**Note:** Passwords hashed with bcrypt. Duplicate username/email → 401 error.

## TODO / Next Steps
1. Implement login endpoint (POST /api/auth/login).
2. Protected routes (e.g., playlists, songs) with JWT middleware.
3. Spotify API integration (auth, tracks, playlists).
4. Artist features (upload music).
5. Error handling improvements.
6. Validation (Joi/Zod).
7. Rate limiting.

## Troubleshooting
- DB connection fail? Check MONGO_URI (allow network in Atlas).
- JWT issues? Regenerate JWT_SECRET.
- Port 3000 busy? Change in server.js.

Happy coding! 🎵


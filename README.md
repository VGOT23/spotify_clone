# Spotify Clone Backend

A Node.js/Express/MongoDB backend for a Spotify Clone with full user authentication (register/login with roles: user/artist), music upload/storage (ImageKit), albums, and role-based access control. Features protected routes for music management.

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
- ImageKit account (for music file storage)
- Postman or curl for API testing

## Quick Setup
1. Clone the repo:
   ```
   git clone <repo-url>
   cd \"Spotify Clone\"
   ```

2. Create `.env` file in root (see [Environment Variables](#environment-variables)):
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key_here
   IMAGE_KIT=your_imagekit_private_key
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
├── server.js          # Entry point: DB connect + server start on port 3000
├── src/
│   ├── app.js         # Express app: JSON, cookies, auth/music routes
│   ├── db/
│   │   └── db.js      # MongoDB connection
│   ├── models/
│   │   ├── user.model.js  # User schema (username, email, password, role: user/artist)
│   │   ├── music.model.js # Music (uri, title, artist ref)
│   │   └── album.model.js # Album (title, music[], artist ref)
│   ├── controllers/
│   │   ├── auth.controller.js  # registerUser, loginuser (bcrypt, JWT cookie)
│   │   └── music.controller.js # createMusic (upload), createalbum, getAllmusic, getallAlbums, getalbum
│   ├── routes/
│   │   ├── auth.routes.js  # POST /register, /login
│   │   └── music.routes.js # POST /upload, /album; GET /allmusic, /album, /album/:id
│   ├── middlewares/
│   │   └── auth.middleware.js # artistmiddleware (artist-only), authUser (user-only)
│   └── services/
│       └── storage.service.js # ImageKit file upload
├── package.json       # Deps: express, mongoose, bcryptjs, jsonwebtoken, multer, @imagekit/nodejs, etc.
├── README.md
├── TODO.md
└── .env               # Secrets (gitignored)
```

## Environment Variables
Create `.env`:
```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/spotifyclone?retryWrites=true&w=majority
JWT_SECRET=your-very-secure-secret-key-min-32-chars
IMAGE_KIT=your_imagekit_private_key_here
```

## API Endpoints

### Authentication (Public)
| Method | Endpoint              | Description                  | Role |
|--------|-----------------------|------------------------------|------|
| POST   | `/api/auth/register`  | Register user, returns JWT cookie + user info | - |
| POST   | `/api/auth/login`     | Login by username/email/pass, returns JWT cookie + user info | - |

**Register/Login Body:**
```json
{
  \"username\": \"john_doe\",
  \"email\": \"john@example.com\",
  \"password\": \"securepass123\",
  \"role\": \"artist\"  // optional: \"user\" (default) or \"artist\"
}
```

### Music (Protected)
| Method | Endpoint                   | Description                  | Auth |
|--------|----------------------------|------------------------------|------|
| POST   | `/api/music/upload`        | Upload music file (multer + ImageKit) | artist |
| POST   | `/api/music/album`         | Create album (title + musicIds) | artist |
| GET    | `/api/music/allmusic`      | Get all music                | user |
| GET    | `/api/music/album`         | Get all albums               | user |
| GET    | `/api/music/album/:id`     | Get single album (populated) | user |

**Upload Body:** `multipart/form-data` with `music` file + `title` field.

## Running the Server
```
npm run run
```
- Uses `nodemon server.js` for auto-restart.
- Logs: `Server is running on port 3000` + `server connected to database`.

## Testing
1. **Register (artist):**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H \"Content-Type: application/json\" \
  -d '{\"username\":\"artist1\",\"email\":\"artist@test.com\",\"password\":\"pass123\",\"role\":\"artist\"}' \
  -c cookies.txt
```

2. **Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H \"Content-Type: application/json\" \
  -d '{\"email\":\"artist@test.com\",\"password\":\"pass123\"}' \
  -b cookies.txt \
  -c cookies.txt
```

3. **Upload Music:**
```bash
curl -X POST http://localhost:3000/api/music/upload \
  -H \"Cookie: token=your_jwt_from_cookies.txt\" \
  -F \"music=@/path/to/song.mp3\" \
  -F \"title=\\\"My Song\\\"\" \
  -b cookies.txt
```

Expected music response (201):
```json
{
  \"message\": \"Music Uploaded\",
  \"music\": {
    \"name\": \"My Song\",
    \"url\": \"https://ik.imagekit.io/...song123.mp3\",
    \"artist\": \"...\"
  }
}
```

4. **Get All Music:**
```bash
curl -X GET http://localhost:3000/api/music/allmusic \
  -H \"Cookie: token=your_jwt\" \
  -b cookies.txt
```

**Notes:** JWT in cookie `token`. Roles enforced. Passwords hashed. Duplicates → 401. Files stored in ImageKit folder `spotify-music`.

## TODO / Next Steps
1. Add playlists (user create/add music).
2. Music streaming/player integration.
3. Search (songs, artists, albums).
4. User playlists, favorites, search.
5. Spotify API integration (recommendations).
6. Frontend integration.
7. Validation (Joi), rate limiting, error handling.
8. Deployment (Docker, PM2).

## Troubleshooting
- DB fail? Check MONGO_URI (Atlas IP allowlist).
- JWT issues? Regenerate JWT_SECRET.
- ImageKit upload fail? Verify IMAGE_KIT key/permissions.
- Port busy? Change in server.js.

Happy streaming! 🎵

# Social Media Platform — API Reference

Base URL: `http://localhost:5000`

All protected routes require an `Authorization` header in this format:
`Authorization: Bearer <token>`

---

## Auth Routes

| Method | URL | Auth Required |
|--------|-----|---------------|
| POST | /api/auth/register | No |
| POST | /api/auth/login | No |

---

### POST /api/auth/register

Registers a new user account.

**Request body:**
```json
{
  "username": "jay",
  "email": "jay@email.com",
  "password": "password123"
}
```

**Success response (200):**
```json
{
  "message": "User registered successfully",
  "token": "<jwt>",
  "user": {
    "id": "177553859",
    "username": "jay",
    "email": "jay@email.com"
  }
}
```

---

### POST /api/auth/login

Logs in an existing user.

**Request body:**
```json
{
  "email": "jay@email.com",
  "password": "password123"
}
```

**Success response (200):**
```json
{
  "message": "Login successful",
  "token": "<jwt>",
  "user": {
    "id": "177553859",
    "username": "jay",
    "email": "jay@email.com"
  }
}
```

---

## Post Routes

| Method | URL | Auth Required |
|--------|-----|---------------|
| GET | /api/posts | No |
| POST | /api/posts | Yes |
| GET | /api/posts/:id | No |
| PUT | /api/posts/:id | Yes |
| DELETE | /api/posts/:id | Yes |

---

### GET /api/posts

Returns all posts, newest first.

**Request body:** none

**Success response (200):**
```json
[
  {
    "id": "177553859",
    "author": { "id": "177553859", "username": "jay" },
    "content": "Hello world!",
    "createdAt": "2026-04-07T17:48:34.983Z",
    "likes": 0,
    "comments": []
  }
]
```

---

### POST /api/posts

Creates a new post. Requires authentication.

**Request body:**
```json
{
  "content": "Hello world!"
}
```

**Success response (201):**
```json
{
  "id": "177553859",
  "author": { "id": "177553859", "username": "jay" },
  "content": "Hello world!",
  "createdAt": "2026-04-07T17:48:34.983Z",
  "likes": 0,
  "comments": []
}
```

---

### GET /api/posts/:id

Returns a single post by ID.

**Request body:** none

**Success response (200):** single post object (same shape as above)

---

### PUT /api/posts/:id

Updates the content of a post. Requires authentication.

**Request body:**
```json
{
  "content": "Updated content"
}
```

**Success response (200):** updated post object

---

### DELETE /api/posts/:id

Deletes a post by ID. Requires authentication.

**Request body:** none

**Success response (200):**
```json
{
  "message": "Post deleted successfully"
}
```

---

## User Routes

| Method | URL | Auth Required |
|--------|-----|---------------|
| GET | /api/users/:id | No |
| PUT | /api/users/:id | Yes |
| GET | /api/users/:id/posts | No |
| POST | /api/users/:id/follow | Yes |
| POST | /api/users/:id/unfollow | Yes |

---

### GET /api/users/:id

Returns a user's public profile. Password is never included.

**Request body:** none

**Success response (200):**
```json
{
  "id": "177553859",
  "username": "jay",
  "email": "jay@email.com",
  "bio": "",
  "followers": [],
  "following": []
}
```

---

### PUT /api/users/:id

Updates a user's username or bio. Requires authentication.

**Request body:**
```json
{
  "username": "newname",
  "bio": "Hello I am jay"
}
```

**Success response (200):** updated user object (no password)

---

### GET /api/users/:id/posts

Returns all posts written by this user.

**Request body:** none

**Success response (200):** array of post objects

---

### POST /api/users/:id/follow

Follows a user. Requires authentication.

**Request body:**
```json
{
  "followerId": "177553859"
}
```

**Success response (200):**
```json
{
  "message": "Followed successfully"
}
```

---

### POST /api/users/:id/unfollow

Unfollows a user. Requires authentication.

**Request body:**
```json
{
  "followerId": "177553859"
}
```

**Success response (200):**
```json
{
  "message": "Unfollowed successfully"
}
```

---

## What Changes When We Add MongoDB

Currently, data is stored in plain JavaScript arrays in memory.
This means all data is wiped every time the server restarts.

In Database Integration part, these arrays will be replaced with a MongoDB database.
Here is what changes:

| Current | Next |
|-----------------|------------------|
| `data/users.js` — plain array | `models/User.js` — Mongoose schema |
| `data/posts.js` — plain array | `models/Post.js` — Mongoose schema |
| `findUserById(id)` | `User.findById(id)` |
| `createUser(data)` | `new User(data).save()` |
| `updateUser(id, updates)` | `User.findByIdAndUpdate(id, updates)` |
| IDs are `Date.now().toString()` | IDs are MongoDB ObjectIDs |
| Data wiped on server restart | Data persists across restarts |

The most important change: every route handler becomes `async/await`
because database queries take time, while array operations are instant.
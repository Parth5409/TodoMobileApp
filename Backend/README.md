# FastAPI Todo Backend

Production-ready FastAPI backend with MongoDB for the Todo mobile application.

## 🚀 Features

- JWT-based authentication
- Todo CRUD with pagination and filters
- MongoDB with async Motor driver
- Pydantic v2 validation
- CORS enabled for mobile app
- Clean modular architecture

## 📦 Tech Stack

- **FastAPI** - Modern Python web framework
- **Motor** - Async MongoDB driver
- **Pydantic v2** - Data validation
- **PyJWT** - JWT token handling
- **Passlib** - Password hashing
- **Python 3.10+**

## 📁 Project Structure

```
app/
├── core/
│   ├── config.py          # Configuration and settings
│   ├── security.py        # JWT and password utilities
│   └── database.py        # MongoDB connection
├── models/
│   ├── user.py           # User model
│   └── todo.py           # Todo model
├── schemas/
│   ├── auth.py           # Auth request/response schemas
│   ├── user.py           # User schemas
│   └── todo.py           # Todo schemas
├── routers/
│   ├── auth.py           # Authentication endpoints
│   └── todos.py          # Todo CRUD endpoints
├── services/
│   ├── auth_service.py   # Auth business logic
│   └── todo_service.py   # Todo business logic
└── main.py               # FastAPI application
```

## 🛠 Installation

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## ⚙️ Configuration

Create a `.env` file in the root directory:

```env
# MongoDB
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=todo_app

# JWT
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
ALLOWED_ORIGINS=http://localhost:8081,exp://192.168.1.100:8081
```

## 🚀 Running the Server

```bash
# Development
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Production
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 📚 API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🔐 Authentication Endpoints

### POST /auth/signup
Create a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-01-01T00:00:00"
  }
}
```

### POST /auth/login
Login with existing credentials.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### GET /auth/me
Get current user information (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

## ✅ Todo Endpoints

### GET /todos
Get todos with pagination and filters.

**Query Parameters:**
- `skip` (int): Number of records to skip (default: 0)
- `limit` (int): Number of records to return (default: 10)
- `category` (str): Filter by category
- `priority` (str): Filter by priority
- `completed` (bool): Filter by completion status

### POST /todos
Create a new todo.

**Request:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "category": "shopping",
  "priority": "medium",
  "due_date": "2024-01-15T10:00:00"
}
```

### GET /todos/{id}
Get a specific todo by ID.

### PUT /todos/{id}
Update a todo.

### DELETE /todos/{id}
Delete a todo.

## 🧪 Testing with cURL

```bash
# Signup
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get todos (with token)
curl -X GET http://localhost:8000/todos \
  -H "Authorization: Bearer <your-token>"

# Create todo
curl -X POST http://localhost:8000/todos \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Todo","category":"work","priority":"high"}'
```

## 🐳 Docker (Optional)

```bash
# Build image
docker build -t todo-backend .

# Run container
docker run -p 8000:8000 --env-file .env todo-backend
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URL` | MongoDB connection string | `mongodb://localhost:27017` |
| `DATABASE_NAME` | Database name | `todo_app` |
| `SECRET_KEY` | JWT secret key | Required |
| `ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time | `30` |
| `ALLOWED_ORIGINS` | CORS allowed origins | Required |

## 🔒 Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- CORS configured for mobile app
- Input validation with Pydantic
- MongoDB injection protection

## 📄 License

MIT

---

Built with ❤️ using FastAPI

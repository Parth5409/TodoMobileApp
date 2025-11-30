# 📝 GrowSkill Todo App

A complete, production-grade task management mobile application built with Expo React Native and FastAPI. Features a modern white-and-orange theme with secure authentication, offline support, and advanced task management capabilities.

## 🎯 Overview

GrowSkill Todo App delivers a smooth user experience with all essential features expected in a real-world productivity tool. Built with scalable architecture, clean folder structure, strict validation rules, and secure JWT authentication.

## ✨ Features

### Authentication
- Secure signup/login with form validation
- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes and secure token storage

### Task Management
- Full CRUD operations for todos
- Categories: Work, Personal, Study, Shopping, Other
- Priority levels: Low, Medium, High
- Due date support with overdue highlighting
- Swipe actions for quick complete/delete

### Dashboard & Analytics
- Todo counts (completed, pending, total)
- Completion percentage visualization
- Pull-to-refresh support
- Skeleton loaders for better UX

### Offline Support
- Local caching of todos
- App remains functional without internet
- Auto-sync when connection returns

### Modern UI/UX
- Custom component library (Buttons, Cards, Inputs, Modals)
- White base theme with orange accent colors
- Rounded corners and smooth shadows
- Consistent spacing and typography
- Responsive mobile-first design

## 🛠️ Tech Stack

### Frontend
- **Framework**: Expo, React Native
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Validation**: Zod + React Hook Form
- **Storage**: AsyncStorage

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.10
- **Database**: MongoDB with Motor (Async)
- **Validation**: Pydantic v2
- **Authentication**: JWT (Access Token)

## 📁 Project Structure

### Frontend
TodoAppFrontend/
├── app/ # Screens & navigation
│ ├── (auth)/ # Login, Signup
│ └── (tabs)/ # Dashboard, Todos, Profile
├── components/ # Buttons, Inputs, Cards, Icons
├── constants/ # Colors, theme, app config
├── services/ # API client, local storage
├── store/ # Redux slices (auth, todos)
└── utils/ # Helpers, validators, formatters


### Backend
TodoAppBackend/app/
├── core/ # DB connection, JWT config, settings
├── models/ # MongoDB document models
├── schemas/ # Request/response validation
├── routers/ # auth.py, todos.py
├── services/ # Logic for user/todo operations
└── main.py # Entrypoint


## 🚀 Getting Started

### Prerequisites

**Backend:**
- Python 3.10+
- MongoDB (local or Atlas)

**Frontend:**
- Node.js & npm
- Expo CLI

### Backend Setup

1. Navigate to backend directory:
cd Backend


2. Create virtual environment:
python -m venv venv


3. Activate virtual environment:
Mac/Linux
source venv/bin/activate

Windows
venv\Scripts\activate


4. Install dependencies:
pip install -r requirements.txt


5. Create `.env` file:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key


6. Start the server:
uvicorn app.main:app --reload


The backend will be running at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
cd Frontend


2. Install dependencies:
npm install


3. Create `.env` file:
EXPO_PUBLIC_API_URL=http://localhost:8000

For Android emulator use: http://10.0.2.2:8000

4. Start Expo:
npm start


5. Run the app:
- Scan QR code with Expo Go app on your phone
- Press `a` for Android emulator
- Press `i` for iOS simulator

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/login` | Authenticate user & return token |
| GET | `/auth/me` | Fetch profile details |
| GET | `/todos` | Get todos with pagination/filters |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/{id}` | Update todo |
| DELETE | `/todos/{id}` | Delete todo |

### Query Parameters for `/todos`
- `skip`: Pagination offset (default: 0)
- `limit`: Number of items (default: 10)
- `priority`: Filter by priority (Low, Medium, High)
- `category`: Filter by category
- `status`: Filter by completion status

## 🏗️ Architecture

The application follows a clean separation of concerns:

**Client (Frontend)**
- UI rendering and input handling
- Local validation and token storage
- API communication and offline caching

**Server (Backend)**
- Authentication and business logic
- Database CRUD operations
- Schema validation and pagination

**Database**
- User management
- Todo storage with metadata
- Timestamps, categories, and priority levels

## ✅ Key Highlights

- ✅ Production-ready code quality
- ✅ Modular and scalable architecture
- ✅ Comprehensive form validation
- ✅ Secure JWT authentication
- ✅ Async/await for optimal performance
- ✅ Clean error handling
- ✅ Type-safe with TypeScript
- ✅ Mobile-first responsive design
- ✅ Offline-first capability

## 👨‍💻 Developer

**Parth Ravindra Gaikwad**  
Full Stack Developer (React Native • FastAPI • Spring Boot)

- Email: parthgaikwad5409@gmail.com
- GitHub: [github.com/parth5409](https://github.com/parth5409)
- LinkedIn: [linkedin.com/in/parthgaikwad09](https://linkedin.com/in/parthgaikwad09)
- Portfolio: [parthgaikwad-portfolio.vercel.app](https://parthgaikwad-portfolio.vercel.app)

## 📄 License

This project was built as part of the GrowEasy.ai Full-Stack Developer Internship assignment.

## 🙏 Acknowledgments

Built for GrowEasy.ai Full-Stack Developer Internship - November 2025

---

**Note**: This is a production-grade application built to demonstrate full-stack development skills with modern technologies and best practices.
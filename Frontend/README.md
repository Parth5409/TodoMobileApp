# 📝 Beautiful Todo App

A production-ready mobile Todo application built with **Expo React Native**, featuring a clean white UI with vibrant orange accents, comprehensive todo management, and offline support.

![Todo App](https://img.shields.io/badge/React%20Native-0.81.5-blue) ![Expo](https://img.shields.io/badge/Expo-~54.0-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)

## ✨ Features

### 🔐 Authentication
- Secure JWT-based authentication
- Beautiful login and signup screens
- Form validation with Zod
- Automatic session persistence
- Password visibility toggle

### 📊 Dashboard & Analytics
- Real-time todo statistics
- Completion percentage tracker
- Visual progress indicators
- Pull-to-refresh functionality
- Skeleton loaders for smooth UX

### ✅ Todo Management
- Create, read, update, and delete todos
- **Categories**: Work, Personal, Study, Shopping, Other
- **Priorities**: Low, Medium, High
- **Due dates** with overdue highlighting
- Checkbox completion toggle
- Haptic feedback on interactions
- Color-coded badges

### 👤 Profile
- User avatar with initials
- Editable profile information
- Secure logout with confirmation

### 🎨 Design System
- **Theme**: Clean white + orange (#FF6B35)
- **Typography**: Consistent, readable fonts
- **Spacing**: 8px-based system
- **Shadows**: Subtle elevation
- **Animations**: Smooth transitions

### 🚀 Advanced Features
- **Offline Support**: View cached todos without internet
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form
- **Validation**: Zod schemas
- **Toast Notifications**: User feedback
- **TypeScript**: Full type safety

## 📁 Project Structure

```
GrowSkillTodoApp/
├── app/                    # Screens and navigation
│   ├── (auth)/            # Authentication screens
│   └── (tabs)/            # Main app tabs
├── components/            # Reusable components
│   └── ui/               # UI primitives
├── constants/            # Theme, types, config
├── services/             # API and storage
├── store/                # Redux state management
└── utils/                # Validation and helpers
```

## 🛠 Tech Stack

- **Framework**: Expo SDK 54
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Storage**: AsyncStorage
- **Navigation**: Expo Router
- **Icons**: Expo Vector Icons
- **Notifications**: React Native Toast Message

## 📦 Installation

```bash
# Clone the repository
cd GrowSkillTodoApp

# Install dependencies
npm install

# Start the development server
npm start
```

## 🚀 Running the App

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## ⚙️ Configuration

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_URL=http://localhost:8000
```

Update with your backend API URL.

## 📱 Screens

### Authentication
- **Login**: Email and password authentication
- **Signup**: New user registration

### Main App
- **Dashboard**: Todo list with analytics
- **Profile**: User information and settings

## 🎯 Key Components

### UI Components
- `Button` - Multiple variants and sizes
- `Input` - With icons and validation
- `Card` - Pressable cards with elevation
- `Badge` - Color-coded indicators
- `SkeletonLoader` - Loading placeholders

### Feature Components
- `TodoCard` - Individual todo item
- `AnalyticsCard` - Statistics display

## 🔧 Development

```bash
# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `EXPO_PUBLIC_API_URL` | Backend API URL | `http://localhost:8000` |

## 🎨 Theme Customization

Edit `constants/theme.ts` to customize colors, spacing, typography, and more.

## 🤝 Backend Integration

This app is designed to work with a FastAPI backend. The expected API endpoints are:

### Auth
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `GET /auth/me` - Get current user

### Todos
- `GET /todos` - List todos (with pagination)
- `POST /todos` - Create todo
- `PUT /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo

## 📄 License

MIT

## 👨‍💻 Author

Built with ❤️ using Expo React Native

---

**Note**: This is the frontend application. You'll need to set up the backend API separately or use mock data for development.

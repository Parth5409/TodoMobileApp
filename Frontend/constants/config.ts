import { Platform } from 'react-native';

// API Configuration
// For Android emulator, use 10.0.2.2 instead of localhost
// For physical Android devices, use your computer's IP address
const getApiUrl = () => {
    if (process.env.EXPO_PUBLIC_API_URL) {
        console.log('Using EXPO_PUBLIC_API_URL:', process.env.EXPO_PUBLIC_API_URL);
        return process.env.EXPO_PUBLIC_API_URL;
    }

    // Default URLs for development
    if (Platform.OS === 'android') {
        // Android emulator uses 10.0.2.2 to access host machine's localhost
        console.log('Android detected - using 10.0.2.2:8000');
        return 'http://10.0.2.2:8000';
    }

    // iOS simulator and web can use localhost
    console.log('iOS/Web detected - using localhost:8000');
    return 'http://localhost:8000';
};

export const API_BASE_URL = getApiUrl();
console.log('Final API_BASE_URL:', API_BASE_URL);

// Storage Keys
export const STORAGE_KEYS = {
    TOKEN: '@todo_app_token',
    USER: '@todo_app_user',
    CACHED_TODOS: '@todo_app_cached_todos',
    OFFLINE_QUEUE: '@todo_app_offline_queue',
};

// Pagination
export const DEFAULT_PAGE_SIZE = 10;

// Categories
export const TODO_CATEGORIES = [
    { value: 'work', label: 'Work', icon: '💼' },
    { value: 'personal', label: 'Personal', icon: '👤' },
    { value: 'study', label: 'Study', icon: '📚' },
    { value: 'shopping', label: 'Shopping', icon: '🛒' },
    { value: 'other', label: 'Other', icon: '📌' },
] as const;

// Priorities
export const TODO_PRIORITIES = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
] as const;

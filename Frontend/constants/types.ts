/**
 * TypeScript type definitions for the Todo App
 */

// User types
export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

// Todo types
export type TodoCategory = 'work' | 'personal' | 'study' | 'shopping' | 'other';
export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    category: TodoCategory;
    priority: TodoPriority;
    dueDate?: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
}

// API Request types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
}

export interface CreateTodoRequest {
    title: string;
    description?: string;
    category: TodoCategory;
    priority: TodoPriority;
    dueDate?: string;
}

export interface UpdateTodoRequest {
    title?: string;
    description?: string;
    completed?: boolean;
    category?: TodoCategory;
    priority?: TodoPriority;
    dueDate?: string;
}

// API Response types
export interface AuthResponse {
    token: string;
    user: User;
}

export interface TodosResponse {
    todos: Todo[];
    total: number;
    skip: number;
    limit: number;
}

// Filter types
export interface TodoFilters {
    category?: TodoCategory;
    priority?: TodoPriority;
    completed?: boolean;
}

// Redux state types
export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export interface TodoState {
    todos: Todo[];
    filters: TodoFilters;
    pagination: {
        skip: number;
        limit: number;
        total: number;
    };
    loading: boolean;
    error: string | null;
    offlineQueue: Array<{
        action: 'create' | 'update' | 'delete';
        data: any;
        timestamp: number;
    }>;
}

// Analytics types
export interface TodoAnalytics {
    total: number;
    completed: number;
    pending: number;
    completionPercentage: number;
}

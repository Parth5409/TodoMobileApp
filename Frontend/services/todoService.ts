/**
 * Todo API service
 */

import api from './api';
import type {
    Todo,
    TodosResponse,
    CreateTodoRequest,
    UpdateTodoRequest,
    TodoFilters,
} from '@/constants/types';

export const todoService = {
    /**
     * Get todos with pagination and filters
     */
    getTodos: async (
        skip: number = 0,
        limit: number = 10,
        filters?: TodoFilters
    ): Promise<TodosResponse> => {
        const params: any = { skip, limit };

        if (filters?.category) params.category = filters.category;
        if (filters?.priority) params.priority = filters.priority;
        if (filters?.completed !== undefined) params.completed = filters.completed;

        const response = await api.get<TodosResponse>('/todos', { params });
        return response.data;
    },

    /**
     * Get single todo by ID
     */
    getTodoById: async (id: string): Promise<Todo> => {
        const response = await api.get<Todo>(`/todos/${id}`);
        return response.data;
    },

    /**
     * Create new todo
     */
    createTodo: async (data: CreateTodoRequest): Promise<Todo> => {
        const response = await api.post<Todo>('/todos', data);
        return response.data;
    },

    /**
     * Update existing todo
     */
    updateTodo: async (id: string, data: UpdateTodoRequest): Promise<Todo> => {
        const response = await api.put<Todo>(`/todos/${id}`, data);
        return response.data;
    },

    /**
     * Delete todo
     */
    deleteTodo: async (id: string): Promise<void> => {
        await api.delete(`/todos/${id}`);
    },

    /**
     * Toggle todo completion status
     */
    toggleTodo: async (id: string, completed: boolean): Promise<Todo> => {
        const response = await api.put<Todo>(`/todos/${id}`, { completed });
        return response.data;
    },
};

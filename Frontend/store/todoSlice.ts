/**
 * Todo Redux Slice
 * Manages todo state, filters, pagination, and offline sync
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type {
    TodoState,
    Todo,
    CreateTodoRequest,
    UpdateTodoRequest,
    TodoFilters,
} from '@/constants/types';
import { todoService } from '@/services/todoService';
import { storeCachedTodos, getCachedTodos, storeOfflineQueue, getOfflineQueue } from '@/services/storage';
import { DEFAULT_PAGE_SIZE } from '@/constants/config';

// Initial state
const initialState: TodoState = {
    todos: [],
    filters: {},
    pagination: {
        skip: 0,
        limit: DEFAULT_PAGE_SIZE,
        total: 0,
    },
    loading: false,
    error: null,
    offlineQueue: [],
};

// Async thunks
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (
        { skip, limit, filters }: { skip?: number; limit?: number; filters?: TodoFilters },
        { rejectWithValue }
    ) => {
        try {
            const response = await todoService.getTodos(
                skip ?? 0,
                limit ?? DEFAULT_PAGE_SIZE,
                filters
            );
            // Cache todos for offline use
            await storeCachedTodos(response.todos);
            return response;
        } catch (error: any) {
            // If network error, try to load from cache
            if (error.status === 0) {
                const cachedTodos = await getCachedTodos();
                return {
                    todos: cachedTodos,
                    total: cachedTodos.length,
                    skip: 0,
                    limit: DEFAULT_PAGE_SIZE,
                };
            }
            return rejectWithValue(error.message || 'Failed to fetch todos');
        }
    }
);

export const createTodo = createAsyncThunk(
    'todos/createTodo',
    async (data: CreateTodoRequest, { rejectWithValue, getState }) => {
        try {
            const todo = await todoService.createTodo(data);
            return todo;
        } catch (error: any) {
            // If offline, add to queue
            if (error.status === 0) {
                const state = getState() as { todos: TodoState };
                const queue = [...state.todos.offlineQueue, { action: 'create', data, timestamp: Date.now() }];
                await storeOfflineQueue(queue);
                return rejectWithValue('Offline - will sync when online');
            }
            return rejectWithValue(error.message || 'Failed to create todo');
        }
    }
);

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async ({ id, data }: { id: string; data: UpdateTodoRequest }, { rejectWithValue, getState }) => {
        try {
            const todo = await todoService.updateTodo(id, data);
            return todo;
        } catch (error: any) {
            // If offline, add to queue
            if (error.status === 0) {
                const state = getState() as { todos: TodoState };
                const queue = [...state.todos.offlineQueue, { action: 'update', data: { id, ...data }, timestamp: Date.now() }];
                await storeOfflineQueue(queue);
                return rejectWithValue('Offline - will sync when online');
            }
            return rejectWithValue(error.message || 'Failed to update todo');
        }
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id: string, { rejectWithValue, getState }) => {
        try {
            await todoService.deleteTodo(id);
            return id;
        } catch (error: any) {
            // If offline, add to queue
            if (error.status === 0) {
                const state = getState() as { todos: TodoState };
                const queue = [...state.todos.offlineQueue, { action: 'delete', data: { id }, timestamp: Date.now() }];
                await storeOfflineQueue(queue);
                return rejectWithValue('Offline - will sync when online');
            }
            return rejectWithValue(error.message || 'Failed to delete todo');
        }
    }
);

export const toggleTodoComplete = createAsyncThunk(
    'todos/toggleComplete',
    async ({ id, completed }: { id: string; completed: boolean }, { rejectWithValue }) => {
        try {
            const todo = await todoService.toggleTodo(id, completed);
            return todo;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to toggle todo');
        }
    }
);

// Slice
const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<TodoFilters>) => {
            state.filters = action.payload;
            state.pagination.skip = 0; // Reset pagination when filters change
        },
        clearFilters: (state) => {
            state.filters = {};
            state.pagination.skip = 0;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.pagination.skip = action.payload * state.pagination.limit;
        },
        clearError: (state) => {
            state.error = null;
        },
        loadOfflineQueue: (state, action: PayloadAction<any[]>) => {
            state.offlineQueue = action.payload;
        },
        clearOfflineQueue: (state) => {
            state.offlineQueue = [];
        },
    },
    extraReducers: (builder) => {
        // Fetch todos
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload.todos;
                state.pagination.total = action.payload.total;
                state.pagination.skip = action.payload.skip;
                state.pagination.limit = action.payload.limit;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Create todo
        builder
            .addCase(createTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todos.unshift(action.payload); // Add to beginning
                state.pagination.total += 1;
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update todo
        builder
            .addCase(updateTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.todos.findIndex((t) => t.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete todo
        builder
            .addCase(deleteTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = state.todos.filter((t) => t.id !== action.payload);
                state.pagination.total -= 1;
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Toggle complete
        builder
            .addCase(toggleTodoComplete.pending, (state) => {
                state.error = null;
            })
            .addCase(toggleTodoComplete.fulfilled, (state, action) => {
                const index = state.todos.findIndex((t) => t.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(toggleTodoComplete.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { setFilters, clearFilters, setPage, clearError, loadOfflineQueue, clearOfflineQueue } = todoSlice.actions;
export default todoSlice.reducer;

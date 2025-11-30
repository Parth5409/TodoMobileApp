/**
 * AsyncStorage utility functions for secure data persistence
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/constants/config';
import type { User, Todo } from '@/constants/types';

// Token management
export const storeToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } catch (error) {
        console.error('Error storing token:', error);
        throw error;
    }
};

export const getToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};

export const removeToken = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
        console.error('Error removing token:', error);
        throw error;
    }
};

// User data management
export const storeUser = async (user: User): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
        console.error('Error storing user:', error);
        throw error;
    }
};

export const getUser = async (): Promise<User | null> => {
    try {
        const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER);
        return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
};

export const removeUser = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
        console.error('Error removing user:', error);
        throw error;
    }
};

/**
 * Clear all storage (logout)
 */
export const clearStorage = async (): Promise<void> => {
    try {
        await AsyncStorage.multiRemove([
            STORAGE_KEYS.TOKEN,
            STORAGE_KEYS.USER,
            STORAGE_KEYS.CACHED_TODOS,
            STORAGE_KEYS.OFFLINE_QUEUE,
        ]);
    } catch (error) {
        console.error('Error clearing storage:', error);
    }
};

// Cached todos for offline support
export const storeCachedTodos = async (todos: Todo[]): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.CACHED_TODOS, JSON.stringify(todos));
    } catch (error) {
        console.error('Error storing cached todos:', error);
        throw error;
    }
};

export const getCachedTodos = async (): Promise<Todo[]> => {
    try {
        const todosJson = await AsyncStorage.getItem(STORAGE_KEYS.CACHED_TODOS);
        return todosJson ? JSON.parse(todosJson) : [];
    } catch (error) {
        console.error('Error getting cached todos:', error);
        return [];
    }
};

// Offline queue for sync
export const storeOfflineQueue = async (queue: any[]): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(queue));
    } catch (error) {
        console.error('Error storing offline queue:', error);
        throw error;
    }
};

export const getOfflineQueue = async (): Promise<any[]> => {
    try {
        const queueJson = await AsyncStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE);
        return queueJson ? JSON.parse(queueJson) : [];
    } catch (error) {
        console.error('Error getting offline queue:', error);
        return [];
    }
};

export const clearOfflineQueue = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.OFFLINE_QUEUE);
    } catch (error) {
        console.error('Error clearing offline queue:', error);
        throw error;
    }
};

// Clear all app data (for logout)
export const clearAllData = async (): Promise<void> => {
    try {
        await AsyncStorage.multiRemove([
            STORAGE_KEYS.TOKEN,
            STORAGE_KEYS.USER,
            STORAGE_KEYS.CACHED_TODOS,
            STORAGE_KEYS.OFFLINE_QUEUE,
        ]);
    } catch (error) {
        console.error('Error clearing all data:', error);
        throw error;
    }
};

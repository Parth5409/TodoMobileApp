/**
 * Authentication API service
 */

import api from './api';
import type { LoginRequest, SignupRequest, AuthResponse, User } from '@/constants/types';

export const authService = {
    /**
     * Login with email and password
     */
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    /**
     * Signup new user
     */
    signup: async (userData: SignupRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/signup', userData);
        return response.data;
    },

    /**
     * Get current user data
     */
    getMe: async (): Promise<User> => {
        const response = await api.get<User>('/auth/me');
        return response.data;
    },

    /**
     * Update user profile
     */
    updateProfile: async (data: { name?: string }): Promise<User> => {
        const response = await api.put<User>('/auth/me', data);
        return response.data;
    },
};

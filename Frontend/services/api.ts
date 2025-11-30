/**
 * Axios API client configuration with interceptors
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/constants/config';
import { getToken, clearStorage } from './storage';

// Create axios instance
const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add JWT token to requests
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        try {
            const token = await getToken();
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error getting token:', error);
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (error.response) {
            // Server responded with error status
            const status = error.response.status;
            const data: any = error.response.data;

            switch (status) {
                case 401:
                    // Unauthorized - token expired or invalid
                    console.error('Unauthorized access - please login again');
                    // Clear storage to force re-login
                    await clearStorage();
                    break;
                case 403:
                    console.error('Forbidden - insufficient permissions');
                    break;
                case 404:
                    console.error('Resource not found');
                    break;
                case 500:
                    console.error('Server error - please try again later');
                    break;
                default:
                    console.error(`API Error: ${status}`, data);
            }

            // Return formatted error
            return Promise.reject({
                status,
                message: data?.message || data?.detail || 'An error occurred',
                data,
            });
        } else if (error.request) {
            // Request made but no response received
            console.error('Network error - please check your connection');
            return Promise.reject({
                status: 0,
                message: 'Network error - please check your internet connection',
            });
        } else {
            // Something else happened
            console.error('Request error:', error.message);
            return Promise.reject({
                status: -1,
                message: error.message || 'An unexpected error occurred',
            });
        }
    }
);

export default api;

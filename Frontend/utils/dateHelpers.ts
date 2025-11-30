/**
 * Date helper utilities
 */

import { format, isAfter, isBefore, isToday, isPast, parseISO } from 'date-fns';

/**
 * Format date to readable string
 */
export const formatDate = (date: string | Date, formatStr: string = 'MMM dd, yyyy'): string => {
    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;
        return format(dateObj, formatStr);
    } catch (error) {
        return 'Invalid date';
    }
};

/**
 * Check if a date is overdue
 */
export const isOverdue = (dueDate: string | Date): boolean => {
    try {
        const dateObj = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
        return isPast(dateObj) && !isToday(dateObj);
    } catch (error) {
        return false;
    }
};

/**
 * Check if a date is today
 */
export const isDueToday = (dueDate: string | Date): boolean => {
    try {
        const dateObj = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
        return isToday(dateObj);
    } catch (error) {
        return false;
    }
};

/**
 * Get relative date string (e.g., "Today", "Tomorrow", "Overdue")
 */
export const getRelativeDateString = (dueDate: string | Date): string => {
    try {
        const dateObj = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;

        if (isToday(dateObj)) {
            return 'Today';
        }

        if (isPast(dateObj)) {
            return 'Overdue';
        }

        return formatDate(dateObj);
    } catch (error) {
        return 'Invalid date';
    }
};

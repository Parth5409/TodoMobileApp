/**
 * Todo App Theme - Clean White UI with Orange Accents
 * A modern, professional theme designed for maximum visual appeal
 */

import { Platform } from 'react-native';

// Primary color palette
export const Colors = {
  // Main brand colors
  primary: '#FF6B35',        // Vibrant orange
  primaryDark: '#E85A2A',    // Darker orange for pressed states
  primaryLight: '#FF8C61',   // Lighter orange for highlights
  
  // Background colors
  background: '#FFFFFF',      // Pure white
  backgroundSecondary: '#F8F9FA', // Light gray for cards
  backgroundTertiary: '#F1F3F5',  // Slightly darker for sections
  
  // Text colors
  text: '#2D3436',           // Dark gray for primary text
  textSecondary: '#636E72',  // Medium gray for secondary text
  textLight: '#B2BEC3',      // Light gray for disabled/placeholder
  
  // Status colors
  success: '#00B894',        // Green for completed tasks
  error: '#FF6B6B',          // Red for errors and overdue
  warning: '#FDCB6E',        // Yellow for warnings
  info: '#74B9FF',           // Blue for info
  
  // UI elements
  border: '#DFE6E9',         // Light border
  borderLight: '#F1F3F5',    // Very light border
  shadow: 'rgba(0, 0, 0, 0.08)', // Subtle shadow
  overlay: 'rgba(0, 0, 0, 0.5)', // Modal overlay
  
  // Category colors
  category: {
    work: '#6C5CE7',         // Purple
    personal: '#FF6B35',     // Orange
    study: '#00B894',        // Green
    shopping: '#FDCB6E',     // Yellow
    other: '#74B9FF',        // Blue
  },
  
  // Priority colors
  priority: {
    low: '#B2BEC3',          // Gray
    medium: '#FDCB6E',       // Yellow
    high: '#FF6B6B',         // Red
  },
};

// Spacing system (8px base)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Shadows
export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Typography
export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});


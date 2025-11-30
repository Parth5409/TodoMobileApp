/**
 * Beautiful custom Button component
 */

import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacityProps,
} from 'react-native';
import { Colors, BorderRadius, Spacing, Typography, Shadows } from '@/constants/theme';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    variant = 'primary',
    size = 'medium',
    loading = false,
    fullWidth = false,
    icon,
    disabled,
    style,
    ...props
}) => {
    const buttonStyle = [
        styles.base,
        styles[variant],
        styles[`${size}Size`],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
    ].filter(Boolean);

    const textStyle = [
        styles.text,
        styles[`${variant}Text`],
        styles[`${size}Text`],
        disabled && styles.disabledText,
    ].filter(Boolean);

    return (
        <TouchableOpacity
            style={buttonStyle}
            disabled={disabled || loading}
            activeOpacity={0.7}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? Colors.background : Colors.primary}
                    size="small"
                />
            ) : (
                <>
                    {icon && <>{icon}</>}
                    <Text style={textStyle}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BorderRadius.md,
        gap: Spacing.sm,
    },

    // Variants
    primary: {
        backgroundColor: Colors.primary,
        ...Shadows.small,
    },
    secondary: {
        backgroundColor: Colors.backgroundSecondary,
        ...Shadows.small,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    ghost: {
        backgroundColor: 'transparent',
    },

    // Sizes
    smallSize: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        minHeight: 36,
    },
    mediumSize: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        minHeight: 48,
    },
    largeSize: {
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.lg,
        minHeight: 56,
    },

    // Text styles
    text: {
        fontWeight: '600',
    },
    primaryText: {
        color: Colors.background,
        ...Typography.bodyBold,
    },
    secondaryText: {
        color: Colors.text,
        ...Typography.bodyBold,
    },
    outlineText: {
        color: Colors.primary,
        ...Typography.bodyBold,
    },
    ghostText: {
        color: Colors.primary,
        ...Typography.bodyBold,
    },

    smallText: {
        fontSize: 14,
    },
    mediumText: {
        fontSize: 16,
    },
    largeText: {
        fontSize: 18,
    },

    // States
    fullWidth: {
        width: '100%',
    },
    disabled: {
        opacity: 0.5,
    },
    disabledText: {
        opacity: 0.7,
    },
});

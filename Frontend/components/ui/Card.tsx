/**
 * Beautiful Card component
 */

import React from 'react';
import {
    View,
    StyleSheet,
    ViewProps,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';

interface CardProps extends ViewProps {
    pressable?: boolean;
    onPress?: () => void;
    variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({
    children,
    pressable = false,
    onPress,
    variant = 'default',
    style,
    ...props
}) => {
    const cardStyle = [
        styles.base,
        styles[variant],
        style,
    ];

    if (pressable && onPress) {
        return (
            <TouchableOpacity
                style={cardStyle}
                onPress={onPress}
                activeOpacity={0.8}
                {...props as TouchableOpacityProps}
            >
                {children}
            </TouchableOpacity>
        );
    }

    return (
        <View style={cardStyle} {...props}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    base: {
        backgroundColor: Colors.background,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
    },
    default: {
        ...Shadows.small,
    },
    elevated: {
        ...Shadows.medium,
    },
    outlined: {
        borderWidth: 1,
        borderColor: Colors.border,
    },
});

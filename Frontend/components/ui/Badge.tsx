/**
 * Badge Component
 * Color-coded badges for categories and priorities
 */

import React from 'react';
import { Text, StyleSheet, View, ViewStyle, TextStyle } from 'react-native'; // Import View and TextStyle
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';

interface BadgeProps {
    type: 'category' | 'priority' | 'status';
    value: string;
    label: string;
    size?: 'small' | 'medium';
    // Change the type of style to allow text-specific overrides if needed,
    // or keep ViewStyle if it's primarily for container layout.
    // For this fix, let's assume the external style is for the container.
    style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
    type,
    value,
    label,
    size = 'medium',
    style,
}) => {
    const getBackgroundColor = () => {
        // ... (background color logic remains the same)
        if (type === 'category') {
            const categoryColors: Record<string, string> = {
                work: Colors.category.work,
                personal: Colors.category.personal,
                study: Colors.category.study,
                shopping: Colors.category.shopping,
                other: Colors.category.other,
            };
            return categoryColors[value] || Colors.primary;
        }

        if (type === 'priority') {
            const priorityColors: Record<string, string> = {
                low: Colors.priority.low,
                medium: Colors.priority.medium,
                high: Colors.priority.high,
            };
            return priorityColors[value] || Colors.textSecondary;
        }

        return Colors.primary;
    };

    // 1. Create separate styles for the container (View) and the text (Text)
    const badgeContainerStyle: ViewStyle = {
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.sm,
        backgroundColor: getBackgroundColor(), // Move background color here
        overflow: 'hidden', // Move overflow here
        // The remaining ViewStyle properties from styles.badge
    };

    const badgeTextStyle: TextStyle = {
        ...Typography.caption,
        color: Colors.background,
        fontWeight: '600',
        // The remaining TextStyle properties from styles.badge
    };

    // 2. Use a <View> to apply the container styles (including `style` prop)
    return (
        <View
            style={[
                badgeContainerStyle,
                size === 'small' ? styles.badgeContainerSmall : null,
                // Apply the external ViewStyle prop here
                style,
            ]}
        >
            {/* 3. Use <Text> to apply the text styles */}
            <Text
                style={[
                    badgeTextStyle,
                    size === 'small' ? styles.badgeTextSmall : null,
                ]}
            >
                {label}
            </Text>
        </View>
    );
};

// 4. Update StyleSheet to reflect the separation
const styles = StyleSheet.create({
    badgeContainerSmall: {
        paddingHorizontal: Spacing.xs,
        paddingVertical: 2,
    },
    badgeTextSmall: {
        fontSize: 10,
    },
    // The previous `styles.badge` properties are now split and applied inline/in `badgeContainerStyle`
});
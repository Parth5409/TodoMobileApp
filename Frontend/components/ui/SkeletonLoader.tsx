/**
 * Skeleton Loader component for loading states
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';

interface SkeletonLoaderProps {
    width?: number | string;
    height?: number;
    borderRadius?: number;
    style?: ViewStyle;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
    width = '100%',
    height = 20,
    borderRadius = BorderRadius.sm,
    style,
}) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    return (
        <Animated.View
            style={[
                styles.skeleton,
                {
                    width: width as any,
                    height,
                    borderRadius,
                    opacity,
                },
                style,
            ]}
        />
    );
};

// Skeleton card for todo items
export const TodoSkeleton: React.FC = () => {
    return (
        <View style={styles.todoSkeleton}>
            <View style={styles.todoHeader}>
                <SkeletonLoader width={24} height={24} borderRadius={BorderRadius.full} />
                <View style={styles.todoContent}>
                    <SkeletonLoader width="70%" height={18} />
                    <SkeletonLoader width="90%" height={14} style={{ marginTop: Spacing.xs }} />
                </View>
            </View>
            <View style={styles.todoBadges}>
                <SkeletonLoader width={60} height={24} borderRadius={BorderRadius.sm} />
                <SkeletonLoader width={60} height={24} borderRadius={BorderRadius.sm} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: Colors.backgroundTertiary,
    },
    todoSkeleton: {
        backgroundColor: Colors.background,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
    },
    todoHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: Spacing.sm,
    },
    todoContent: {
        flex: 1,
        marginLeft: Spacing.md,
    },
    todoBadges: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
});

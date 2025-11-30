/**
 * Analytics Card Component
 * Displays todo statistics with beautiful circular progress
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from './ui/Card';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import type { TodoAnalytics } from '@/constants/types';

interface AnalyticsCardProps {
    analytics: TodoAnalytics;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ analytics }) => {
    const { total, completed, pending, completionPercentage } = analytics;

    return (
        <Card variant="elevated" style={styles.container}>
            <Text style={styles.title}>Your Progress</Text>

            <View style={styles.statsContainer}>
                {/* Circular Progress */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressCircle}>
                        <Text style={styles.percentageText}>{Math.round(completionPercentage)}%</Text>
                        <Text style={styles.percentageLabel}>Complete</Text>
                    </View>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{total}</Text>
                        <Text style={styles.statLabel}>Total</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={[styles.statValue, { color: Colors.success }]}>{completed}</Text>
                        <Text style={styles.statLabel}>Completed</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={[styles.statValue, { color: Colors.primary }]}>{pending}</Text>
                        <Text style={styles.statLabel}>Pending</Text>
                    </View>
                </View>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
    },
    title: {
        ...Typography.h3,
        color: Colors.text,
        marginBottom: Spacing.md,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.lg,
    },
    progressContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressCircle: {
        width: 100,
        height: 100,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.backgroundSecondary,
        borderWidth: 8,
        borderColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    percentageText: {
        ...Typography.h2,
        color: Colors.primary,
        fontWeight: '700',
    },
    percentageLabel: {
        ...Typography.small,
        color: Colors.textSecondary,
    },
    statsGrid: {
        flex: 1,
        gap: Spacing.sm,
    },
    statItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.xs,
    },
    statValue: {
        ...Typography.h3,
        color: Colors.text,
        fontWeight: '700',
    },
    statLabel: {
        ...Typography.body,
        color: Colors.textSecondary,
    },
});

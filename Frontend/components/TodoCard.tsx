/**
 * Todo Card Component
 * Beautiful card for displaying individual todo items
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import type { Todo } from '@/constants/types';
import { TODO_CATEGORIES, TODO_PRIORITIES } from '@/constants/config';
import { formatDate, isOverdue, isDueToday } from '@/utils/dateHelpers';
import * as Haptics from 'expo-haptics';

interface TodoCardProps {
    todo: Todo;
    onToggleComplete: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
    onPress?: () => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({
    todo,
    onToggleComplete,
    onDelete,
    onPress,
}) => {
    const category = TODO_CATEGORIES.find((c) => c.value === todo.category);
    const priority = TODO_PRIORITIES.find((p) => p.value === todo.priority);

    const handleToggle = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onToggleComplete(todo.id, !todo.completed);
    };

    const handleDelete = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        onDelete(todo.id);
    };

    const overdueStatus = todo.dueDate && !todo.completed && isOverdue(todo.dueDate);
    const dueTodayStatus = todo.dueDate && !todo.completed && isDueToday(todo.dueDate);

    return (
        <Card
            pressable={!!onPress}
            onPress={onPress}
            style={[
                styles.container,
                todo.completed && styles.completedContainer,
            ]}
        >
            <View style={styles.header}>
                {/* Checkbox */}
                <TouchableOpacity
                    onPress={handleToggle}
                    style={[
                        styles.checkbox,
                        todo.completed && styles.checkboxCompleted,
                    ]}
                >
                    {todo.completed && (
                        <Ionicons name="checkmark" size={18} color={Colors.background} />
                    )}
                </TouchableOpacity>

                {/* Content */}
                <View style={styles.content}>
                    <Text
                        style={[
                            styles.title,
                            todo.completed && styles.titleCompleted,
                        ]}
                        numberOfLines={2}
                    >
                        {todo.title}
                    </Text>

                    {todo.description && (
                        <Text
                            style={[
                                styles.description,
                                todo.completed && styles.descriptionCompleted,
                            ]}
                            numberOfLines={2}
                        >
                            {todo.description}
                        </Text>
                    )}

                    {/* Badges */}
                    <View style={styles.badges}>
                        {category && (
                            <Badge
                                type="category"
                                value={todo.category}
                                label={`${category.icon} ${category.label}`}
                                size="small"
                            />
                        )}
                        {priority && (
                            <Badge
                                type="priority"
                                value={todo.priority}
                                label={priority.label}
                                size="small"
                            />
                        )}
                    </View>

                    {/* Due Date */}
                    {todo.dueDate && (
                        <View style={styles.dueDateContainer}>
                            <Ionicons
                                name="calendar-outline"
                                size={14}
                                color={overdueStatus ? Colors.error : dueTodayStatus ? Colors.warning : Colors.textSecondary}
                            />
                            <Text
                                style={[
                                    styles.dueDate,
                                    overdueStatus && styles.overdue,
                                    dueTodayStatus && styles.dueToday,
                                ]}
                            >
                                {formatDate(todo.dueDate)}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Delete Button */}
                <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                    <Ionicons name="trash-outline" size={20} color={Colors.error} />
                </TouchableOpacity>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
    },
    completedContainer: {
        opacity: 0.7,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    checkboxCompleted: {
        backgroundColor: Colors.success,
        borderColor: Colors.success,
    },
    content: {
        flex: 1,
    },
    title: {
        ...Typography.bodyBold,
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    titleCompleted: {
        textDecorationLine: 'line-through',
        color: Colors.textSecondary,
    },
    description: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.sm,
    },
    descriptionCompleted: {
        textDecorationLine: 'line-through',
    },
    badges: {
        flexDirection: 'row',
        gap: Spacing.xs,
        marginBottom: Spacing.sm,
    },
    dueDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
    },
    dueDate: {
        ...Typography.small,
        color: Colors.textSecondary,
    },
    overdue: {
        color: Colors.error,
        fontWeight: '600',
    },
    dueToday: {
        color: Colors.warning,
        fontWeight: '600',
    },
    deleteButton: {
        padding: Spacing.xs,
        marginLeft: Spacing.sm,
    },
});

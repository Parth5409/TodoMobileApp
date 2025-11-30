/**
 * Add Todo Modal
 * Modal for creating new todos
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { todoSchema, type TodoFormData } from '@/utils/validation';
import DateTimePicker from '@react-native-community/datetimepicker';

interface AddTodoModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: TodoFormData) => void;
    loading?: boolean;
}

const CATEGORIES = [
    { value: 'work', label: 'Work', icon: 'briefcase', color: Colors.category.work },
    { value: 'personal', label: 'Personal', icon: 'person', color: Colors.category.personal },
    { value: 'study', label: 'Study', icon: 'book', color: Colors.category.study },
    { value: 'shopping', label: 'Shopping', icon: 'cart', color: Colors.category.shopping },
    { value: 'other', label: 'Other', icon: 'ellipsis-horizontal', color: Colors.category.other },
];

const PRIORITIES = [
    { value: 'low', label: 'Low', color: Colors.priority.low },
    { value: 'medium', label: 'Medium', color: Colors.priority.medium },
    { value: 'high', label: 'High', color: Colors.priority.high },
];

export const AddTodoModal: React.FC<AddTodoModalProps> = ({
    visible,
    onClose,
    onSubmit,
    loading = false,
}) => {
    const [showDatePicker, setShowDatePicker] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm<TodoFormData>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            title: '',
            description: '',
            category: 'personal',
            priority: 'medium',
            dueDate: undefined,
        },
    });

    const selectedCategory = watch('category');
    const selectedPriority = watch('priority');
    const dueDate = watch('dueDate');

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleFormSubmit = (data: TodoFormData) => {
        onSubmit(data);
        reset();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Add New Todo</Text>
                        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color={Colors.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        {/* Title */}
                        <Controller
                            control={control}
                            name="title"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    label="Title"
                                    placeholder="Enter todo title"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    error={errors.title?.message}
                                />
                            )}
                        />

                        {/* Description */}
                        <Controller
                            control={control}
                            name="description"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    label="Description (Optional)"
                                    placeholder="Enter description"
                                    value={value || ''}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    error={errors.description?.message}
                                    multiline
                                    numberOfLines={3}
                                    style={{ height: 80 }}
                                />
                            )}
                        />

                        {/* Category */}
                        <Text style={styles.label}>Category</Text>
                        <View style={styles.optionsGrid}>
                            {CATEGORIES.map((cat) => (
                                <TouchableOpacity
                                    key={cat.value}
                                    style={[
                                        styles.optionButton,
                                        selectedCategory === cat.value && {
                                            backgroundColor: cat.color,
                                            borderColor: cat.color,
                                        },
                                    ]}
                                    onPress={() => setValue('category', cat.value as any)}
                                >
                                    <Ionicons
                                        name={cat.icon as any}
                                        size={20}
                                        color={selectedCategory === cat.value ? Colors.background : cat.color}
                                    />
                                    <Text
                                        style={[
                                            styles.optionText,
                                            selectedCategory === cat.value && styles.optionTextSelected,
                                        ]}
                                    >
                                        {cat.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Priority */}
                        <Text style={styles.label}>Priority</Text>
                        <View style={styles.priorityRow}>
                            {PRIORITIES.map((pri) => (
                                <TouchableOpacity
                                    key={pri.value}
                                    style={[
                                        styles.priorityButton,
                                        selectedPriority === pri.value && {
                                            backgroundColor: pri.color,
                                            borderColor: pri.color,
                                        },
                                    ]}
                                    onPress={() => setValue('priority', pri.value as any)}
                                >
                                    <Text
                                        style={[
                                            styles.priorityText,
                                            selectedPriority === pri.value && styles.priorityTextSelected,
                                        ]}
                                    >
                                        {pri.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Due Date */}
                        <Text style={styles.label}>Due Date (Optional)</Text>
                        <TouchableOpacity
                            style={styles.dateButton}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
                            <Text style={styles.dateText}>
                                {dueDate ? new Date(dueDate).toLocaleDateString() : 'Select date'}
                            </Text>
                        </TouchableOpacity>

                        {showDatePicker && (
                            <DateTimePicker
                                value={dueDate ? new Date(dueDate) : new Date()}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={(event, selectedDate) => {
                                    setShowDatePicker(Platform.OS === 'ios');
                                    if (selectedDate) {
                                        setValue('dueDate', selectedDate.toISOString());
                                    }
                                }}
                            />
                        )}

                        {dueDate && (
                            <TouchableOpacity
                                style={styles.clearDateButton}
                                onPress={() => setValue('dueDate', undefined)}
                            >
                                <Text style={styles.clearDateText}>Clear date</Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Button
                            title="Cancel"
                            variant="outline"
                            onPress={handleClose}
                            style={{ flex: 1 }}
                        />
                        <Button
                            title="Add Todo"
                            variant="primary"
                            onPress={handleSubmit(handleFormSubmit)}
                            loading={loading}
                            style={{ flex: 1 }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: Colors.background,
        borderTopLeftRadius: BorderRadius.xl,
        borderTopRightRadius: BorderRadius.xl,
        maxHeight: '90%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderLight,
    },
    title: {
        ...Typography.h2,
        color: Colors.text,
    },
    closeButton: {
        padding: Spacing.xs,
    },
    content: {
        padding: Spacing.lg,
    },
    label: {
        ...Typography.bodyBold,
        color: Colors.text,
        marginBottom: Spacing.sm,
        marginTop: Spacing.md,
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        borderWidth: 2,
        borderColor: Colors.borderLight,
        backgroundColor: Colors.background,
    },
    optionText: {
        ...Typography.body,
        color: Colors.text,
    },
    optionTextSelected: {
        color: Colors.background,
        fontWeight: '600',
    },
    priorityRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    priorityButton: {
        flex: 1,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.md,
        borderWidth: 2,
        borderColor: Colors.borderLight,
        alignItems: 'center',
    },
    priorityText: {
        ...Typography.body,
        color: Colors.text,
    },
    priorityTextSelected: {
        color: Colors.background,
        fontWeight: '600',
    },
    dateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.borderLight,
        backgroundColor: Colors.backgroundSecondary,
    },
    dateText: {
        ...Typography.body,
        color: Colors.text,
    },
    clearDateButton: {
        alignSelf: 'flex-start',
        marginTop: Spacing.sm,
    },
    clearDateText: {
        ...Typography.caption,
        color: Colors.error,
    },
    footer: {
        flexDirection: 'row',
        gap: Spacing.md,
        padding: Spacing.lg,
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
    },
});

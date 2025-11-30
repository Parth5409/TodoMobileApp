/**
 * Profile Screen
 * User profile with name editing and logout
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout, updateUserProfile } from '@/store/authSlice';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { profileSchema, type ProfileFormData } from '@/utils/validation';
import Toast from 'react-native-toast-message';

export default function ProfileScreen() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, loading } = useAppSelector((state) => state.auth);
    const [isEditing, setIsEditing] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || '',
        },
    });

    const onSubmit = async (data: ProfileFormData) => {
        try {
            await dispatch(updateUserProfile(data)).unwrap();
            setIsEditing(false);
            Toast.show({
                type: 'success',
                text1: 'Profile Updated',
                text2: 'Your name has been updated successfully',
            });
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Update Failed',
                text2: error || 'Failed to update profile',
            });
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await dispatch(logout());
                        router.replace('/(auth)/login');
                    },
                },
            ]
        );
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                </View>

                {/* Avatar */}
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {user ? getInitials(user.name) : '??'}
                        </Text>
                    </View>
                </View>

                {/* User Info Card */}
                <Card variant="elevated" style={styles.card}>
                    <View style={styles.infoRow}>
                        <Ionicons name="person-outline" size={20} color={Colors.primary} />
                        <View style={styles.infoContent}>
                            {isEditing ? (
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            placeholder="Enter your name"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            error={errors.name?.message}
                                            autoFocus
                                        />
                                    )}
                                />
                            ) : (
                                <>
                                    <Text style={styles.infoLabel}>Name</Text>
                                    <Text style={styles.infoValue}>{user?.name}</Text>
                                </>
                            )}
                        </View>
                        {!isEditing && (
                            <TouchableOpacity
                                onPress={() => setIsEditing(true)}
                                style={styles.editButton}
                            >
                                <Ionicons name="pencil" size={18} color={Colors.primary} />
                            </TouchableOpacity>
                        )}
                    </View>

                    {isEditing && (
                        <View style={styles.editActions}>
                            <Button
                                title="Cancel"
                                variant="outline"
                                size="small"
                                onPress={() => {
                                    setIsEditing(false);
                                    reset();
                                }}
                                style={{ flex: 1 }}
                            />
                            <Button
                                title="Save"
                                variant="primary"
                                size="small"
                                onPress={handleSubmit(onSubmit)}
                                loading={loading}
                                style={{ flex: 1 }}
                            />
                        </View>
                    )}

                    <View style={[styles.infoRow, styles.infoRowBorder]}>
                        <Ionicons name="mail-outline" size={20} color={Colors.primary} />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Email</Text>
                            <Text style={styles.infoValue}>{user?.email}</Text>
                        </View>
                    </View>
                </Card>

                {/* App Info */}
                <Card variant="outlined" style={styles.card}>
                    <Text style={styles.cardTitle}>About</Text>
                    <View style={styles.infoRow}>
                        <Ionicons name="information-circle-outline" size={20} color={Colors.textSecondary} />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Version</Text>
                            <Text style={styles.infoValue}>1.0.0</Text>
                        </View>
                    </View>
                </Card>

                {/* Logout Button */}
                <Button
                    title="Logout"
                    variant="outline"
                    onPress={handleLogout}
                    icon={<Ionicons name="log-out-outline" size={20} color={Colors.error} />}
                    style={styles.logoutButton}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundSecondary,
    },
    content: {
        padding: Spacing.lg,
        paddingTop: Spacing.xl,
        paddingBottom: Spacing.xl,
    },
    header: {
        marginBottom: Spacing.xl,
    },
    title: {
        ...Typography.h1,
        color: Colors.text,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        ...Typography.h1,
        color: Colors.background,
        fontWeight: '700',
    },
    card: {
        marginBottom: Spacing.md,
    },
    cardTitle: {
        ...Typography.h3,
        color: Colors.text,
        marginBottom: Spacing.md,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
    },
    infoRowBorder: {
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
        marginTop: Spacing.md,
        paddingTop: Spacing.md,
    },
    infoContent: {
        flex: 1,
        marginLeft: Spacing.md,
    },
    infoLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs,
    },
    infoValue: {
        ...Typography.bodyBold,
        color: Colors.text,
    },
    editButton: {
        padding: Spacing.sm,
    },
    editActions: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginTop: Spacing.md,
    },
    logoutButton: {
        marginTop: Spacing.lg,
        borderColor: Colors.error,
    },
});

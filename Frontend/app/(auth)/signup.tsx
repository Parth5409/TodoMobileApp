/**
 * Signup Screen
 * Beautiful registration screen
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { signupSchema, type SignupFormData } from '@/utils/validation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { signup, clearError } from '@/store/authSlice';
import Toast from 'react-native-toast-message';

export default function SignupScreen() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: SignupFormData) => {
        try {
            dispatch(clearError());
            const result = await dispatch(signup(data)).unwrap();
            Toast.show({
                type: 'success',
                text1: 'Account Created!',
                text2: `Welcome, ${result.user.name}!`,
            });
            router.replace('/(tabs)');
        } catch (err: any) {
            Toast.show({
                type: 'error',
                text1: 'Signup Failed',
                text2: err || 'Please try again',
            });
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.logo}>✓</Text>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Sign up to get started with your todos</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Full Name"
                                placeholder="Enter your name"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                error={errors.name?.message}
                                icon="person-outline"
                                autoCapitalize="words"
                                autoComplete="name"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                error={errors.email?.message}
                                icon="mail-outline"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Password"
                                placeholder="Create a password (min 6 characters)"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                error={errors.password?.message}
                                icon="lock-closed-outline"
                                secureTextEntry={!showPassword}
                                rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                onRightIconPress={() => setShowPassword(!showPassword)}
                                autoCapitalize="none"
                            />
                        )}
                    />

                    <Button
                        title="Create Account"
                        onPress={handleSubmit(onSubmit)}
                        loading={loading}
                        fullWidth
                        variant="primary"
                    />

                    {/* Login Link */}
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                            <Text style={styles.loginLink}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: Spacing.lg,
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacing.xxl,
    },
    logo: {
        fontSize: 64,
        color: Colors.primary,
        marginBottom: Spacing.md,
    },
    title: {
        ...Typography.h1,
        color: Colors.text,
        marginBottom: Spacing.sm,
    },
    subtitle: {
        ...Typography.body,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Spacing.lg,
    },
    loginText: {
        ...Typography.body,
        color: Colors.textSecondary,
    },
    loginLink: {
        ...Typography.bodyBold,
        color: Colors.primary,
    },
});

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTodos, deleteTodo, toggleTodoComplete, createTodo } from '@/store/todoSlice';
import { AnalyticsCard } from '@/components/AnalyticsCard';
import { TodoCard } from '@/components/TodoCard';
import { AddTodoModal } from '@/components/AddTodoModal';
import { TodoSkeleton } from '@/components/ui/SkeletonLoader';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import type { TodoAnalytics } from '@/constants/types';
import type { TodoFormData } from '@/utils/validation';
import Toast from 'react-native-toast-message';

export default function DashboardScreen() {
  const dispatch = useAppDispatch();
  const { todos, loading, pagination } = useAppSelector((state) => state.todos);
  const { user } = useAppSelector((state) => state.auth);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      await dispatch(fetchTodos({})).unwrap();
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error || 'Failed to load todos',
      });
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadTodos();
    setRefreshing(false);
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await dispatch(toggleTodoComplete({ id, completed })).unwrap();
      Toast.show({
        type: 'success',
        text1: completed ? 'Task completed!' : 'Task reopened',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error || 'Failed to update todo',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteTodo(id)).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Todo deleted',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error || 'Failed to delete todo',
      });
    }
  };

  const handleCreateTodo = async (data: TodoFormData) => {
    try {
      await dispatch(createTodo(data)).unwrap();
      setModalVisible(false);
      Toast.show({
        type: 'success',
        text1: 'Todo created!',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error || 'Failed to create todo',
      });
    }
  };

  // Calculate analytics
  const analytics: TodoAnalytics = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    pending: todos.filter((t) => !t.completed).length,
    completionPercentage: todos.length > 0
      ? (todos.filter((t) => t.completed).length / todos.length) * 100
      : 0,
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📝</Text>
      <Text style={styles.emptyTitle}>No todos yet</Text>
      <Text style={styles.emptyText}>
        Tap the + button to create your first todo
      </Text>
    </View>
  );

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello{user ? ` ${user.name}` : ''}!</Text>
          <Text style={styles.subtitle}>Let's get things done</Text>
        </View>
      </View>

      <AnalyticsCard analytics={analytics} />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your Todos</Text>
        <Text style={styles.todoCount}>{pagination.total} tasks</Text>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoCard
            todo={item}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={!loading ? renderEmpty : null}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      />

      {/* FAB for adding todos */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={28} color={Colors.background} />
      </TouchableOpacity>

      {/* Add Todo Modal */}
      <AddTodoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreateTodo}
        loading={loading}
      />

      {loading && !refreshing && (
        <View style={styles.loadingContainer}>
          <TodoSkeleton />
          <TodoSkeleton />
          <TodoSkeleton />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  listContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: 100, // Extra space for FAB
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  greeting: {
    ...Typography.h1,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    marginTop: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
  },
  todoCount: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl * 2,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: Spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loadingContainer: {
    padding: Spacing.md,
  },
});

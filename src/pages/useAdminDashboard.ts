import { useEffect, useState } from 'react';
import { getUsers, deleteUser as deleteUserApi, updateUser as updateUserApi } from '../services/adminService';
import type { User } from '../types';

export function useAdminDashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<User>>({});
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getUsers();
            setUsers(data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch users", err);
            setError("Failed to load user list.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteUserApi(id);
            setUsers(users.filter(u => u.id !== id));
        } catch (err) {
            console.error("Failed to delete user", err);
            // Global interceptor handles toast
        }
    };

    const startEdit = (user: User) => {
        setError(null);
        setEditingId(user.id);
        setEditForm(user);
    };

    const cancelEdit = () => {
        setError(null);
        setEditingId(null);
        setEditForm({});
    };

    const saveEdit = async () => {
        if (!editingId) return;
        setError(null);

        try {
            const updatedUser = await updateUserApi(editingId, editForm);
            setUsers(users.map(u => u.id === editingId ? updatedUser : u));
            setEditingId(null);
            setEditForm({});
        } catch (err) {
            console.error("Failed to update user", err);
        }
    };

    return {
        users,
        loading,
        error,
        editingId,
        editForm,
        setEditForm,
        startEdit,
        cancelEdit,
        saveEdit,
        handleDelete
    };
}

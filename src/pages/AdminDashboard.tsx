import { useEffect, useState } from 'react';
import api from '../services/api';
import { Trash2, Edit, Save, X } from 'lucide-react';

interface User {
    id: number;
    username: string;
    email: string;
    currentLevel: number;
    currentXp: number;
    streak: number;
    role: string;
}

export default function AdminDashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<User>>({});

    const fetchUsers = () => {
        api.get('/admin/users').then(res => setUsers(res.data));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            await api.delete(`/admin/users/${id}`);
            fetchUsers();
        }
    };

    const startEdit = (user: User) => {
        setEditingId(user.id);
        setEditForm(user);
    };

    const saveEdit = async () => {
        if (!editingId) return;
        await api.put(`/admin/users/${editingId}`, editForm);
        setEditingId(null);
        fetchUsers();
    };

    return (
        <div className="p-6 md:p-12 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-ctp-text mb-8">Admin Dashboard</h1>

            <div className="bg-ctp-surface0 rounded-2xl border border-ctp-surface1 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-ctp-mantle text-ctp-subtext1 text-xs uppercase">
                    <tr>
                        <th className="p-4">ID</th>
                        <th className="p-4">Username</th>
                        <th className="p-4">Level</th>
                        <th className="p-4">XP</th>
                        <th className="p-4">Streak</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-b border-ctp-surface1 last:border-0 hover:bg-ctp-surface1/30">
                            <td className="p-4 text-ctp-overlay1">#{user.id}</td>
                            <td className="p-4 font-bold text-ctp-text">{user.username}</td>

                            {editingId === user.id ? (
                                <>
                                    <td className="p-2"><input type="number" className="bg-ctp-base p-2 rounded w-20" value={editForm.currentLevel} onChange={e => setEditForm({...editForm, currentLevel: parseInt(e.target.value)})} /></td>
                                    <td className="p-2"><input type="number" className="bg-ctp-base p-2 rounded w-24" value={editForm.currentXp} onChange={e => setEditForm({...editForm, currentXp: parseInt(e.target.value)})} /></td>
                                    <td className="p-2"><input type="number" className="bg-ctp-base p-2 rounded w-20" value={editForm.streak} onChange={e => setEditForm({...editForm, streak: parseInt(e.target.value)})} /></td>
                                    <td className="p-2">
                                        <select className="bg-ctp-base p-2 rounded" value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value})}>
                                            <option value="USER">USER</option>
                                            <option value="ADMIN">ADMIN</option>
                                        </select>
                                    </td>
                                    <td className="p-4 flex gap-2">
                                        <button onClick={saveEdit} className="text-ctp-green"><Save size={18} /></button>
                                        <button onClick={() => setEditingId(null)} className="text-ctp-red"><X size={18} /></button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="p-4 text-ctp-blue">{user.currentLevel}</td>
                                    <td className="p-4 text-ctp-mauve">{user.currentXp}</td>
                                    <td className="p-4 text-ctp-peach">{user.streak}</td>
                                    <td className="p-4 text-ctp-subtext0">{user.role}</td>
                                    <td className="p-4 flex gap-3">
                                        <button onClick={() => startEdit(user)} className="text-ctp-blue hover:text-ctp-text"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(user.id)} className="text-ctp-red hover:text-ctp-maroon"><Trash2 size={18} /></button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
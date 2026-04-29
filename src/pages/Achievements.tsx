import { useState } from 'react';
import { AlertCircle, Edit, Save, Trash2, X, Loader2 } from 'lucide-react';
import { useAdminDashboard } from './useAdminDashboard';

export default function AdminDashboard() {
    const {
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
    } = useAdminDashboard();

    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-ctp-mauve animate-spin" />
        </div>
    );

    return (
        <div className="p-6 md:p-12 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-ctp-text mb-8">Admin Dashboard</h1>

            {error && (
                <div className="bg-ctp-red/10 border border-ctp-red/20 text-ctp-red p-4 rounded-xl mb-6 flex items-center gap-2">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            <div className="bg-ctp-surface0 rounded-2xl border border-ctp-surface1 overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className="bg-ctp-mantle text-ctp-subtext1 text-xs uppercase tracking-wider">
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
                                <tr key={user.id}
                                    className="border-b border-ctp-surface1 last:border-0 hover:bg-ctp-surface1/30 transition-colors">
                                    <td className="p-4 text-ctp-overlay1 font-mono">#{user.id}</td>

                                    {editingId === user.id ? (
                                        <>
                                            <td className="p-2">
                                                <input
                                                    type="text"
                                                    className="bg-ctp-base p-2 rounded w-full min-w-[120px] border border-ctp-surface2 focus:border-ctp-mauve outline-none text-ctp-text"
                                                    value={editForm.username || ''}
                                                    onChange={e => setEditForm({ ...editForm, username: e.target.value })}
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    className="bg-ctp-base p-2 rounded w-20 border border-ctp-surface2 focus:border-ctp-mauve outline-none text-ctp-text"
                                                    value={editForm.currentLevel}
                                                    onChange={e => setEditForm({
                                                        ...editForm,
                                                        currentLevel: parseInt(e.target.value)
                                                    })}
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className="bg-ctp-base p-2 rounded w-24 border border-ctp-surface2 focus:border-ctp-mauve outline-none text-ctp-text"
                                                    value={editForm.currentXp}
                                                    onChange={e => setEditForm({
                                                        ...editForm,
                                                        currentXp: parseInt(e.target.value)
                                                    })}
                                                />
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className="bg-ctp-base p-2 rounded w-20 border border-ctp-surface2 focus:border-ctp-mauve outline-none text-ctp-text"
                                                    value={editForm.streak}
                                                    onChange={e => setEditForm({
                                                        ...editForm,
                                                        streak: parseInt(e.target.value)
                                                    })}
                                                />
                                            </td>
                                            <td className="p-2">
                                                <select
                                                    className="bg-ctp-base p-2 rounded border border-ctp-surface2 focus:border-ctp-mauve outline-none text-ctp-text"
                                                    value={editForm.role}
                                                    onChange={e => setEditForm({ ...editForm, role: e.target.value })}
                                                >
                                                    <option value="USER">USER</option>
                                                    <option value="ADMIN">ADMIN</option>
                                                </select>
                                            </td>
                                            <td className="p-4 flex gap-2">
                                                <button onClick={saveEdit}
                                                    className="p-2 bg-ctp-green/10 text-ctp-green rounded-lg hover:bg-ctp-green/20 transition-colors"
                                                    title="Save">
                                                    <Save size={18} />
                                                </button>
                                                <button onClick={cancelEdit}
                                                    className="p-2 bg-ctp-red/10 text-ctp-red rounded-lg hover:bg-ctp-red/20 transition-colors"
                                                    title="Cancel">
                                                    <X size={18} />
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="p-4 font-bold text-ctp-text">{user.username}</td>
                                            <td className="p-4 text-ctp-blue font-mono">{user.currentLevel}</td>
                                            <td className="p-4 text-ctp-mauve font-mono">{user.currentXp.toLocaleString()}</td>
                                            <td className="p-4 text-ctp-peach font-mono">{user.streak}</td>
                                            <td className="p-4">
                                                <span className={`
                                                    px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide
                                                    ${user.role === 'ADMIN'
                                                        ? 'bg-ctp-red/10 text-ctp-red border border-ctp-red/20'
                                                        : 'bg-ctp-blue/10 text-ctp-blue border border-ctp-blue/20'}
                                                `}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="p-4 flex gap-3 items-center">
                                                <button onClick={() => startEdit(user)}
                                                    className="text-ctp-overlay2 hover:text-ctp-blue transition-colors"
                                                    title="Edit User">
                                                    <Edit size={18} />
                                                </button>
                                                
                                                {deleteConfirmId === user.id ? (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-ctp-red font-medium">Delete?</span>
                                                        <button onClick={() => {
                                                            handleDelete(user.id);
                                                            setDeleteConfirmId(null);
                                                        }} className="text-ctp-red hover:text-ctp-red/80 font-bold text-xs bg-ctp-red/10 px-2 py-1 rounded">Yes</button>
                                                        <button onClick={() => setDeleteConfirmId(null)} className="text-ctp-subtext0 hover:text-ctp-text text-xs bg-ctp-surface2 px-2 py-1 rounded">No</button>
                                                    </div>
                                                ) : (
                                                    <button onClick={() => setDeleteConfirmId(user.id)}
                                                        className="text-ctp-overlay2 hover:text-ctp-red transition-colors"
                                                        title="Delete User">
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
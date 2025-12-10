import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

interface StudyProgram {
    id: number;
    name: string;
}

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();

    const [programs, setPrograms] = useState<StudyProgram[]>([]);
    const [serverError, setServerError] = useState('');

    // 1. Fetch Majors on Load
    useEffect(() => {
        api.get('/auth/study-programs')
            .then(res => setPrograms(res.data))
            .catch(err => console.error("Failed to load majors", err));
    }, []);

    // 2. Handle Form Submit
    const onSubmit = async (data: any) => {
        try {
            // Ensure ID is a number
            const payload = { ...data, studyProgramId: Number(data.studyProgramId) };

            const response = await api.post('/auth/register', payload);

            // Auto-login
            login(response.data.token, response.data.username);
            navigate('/dashboard');
        } catch (err: any) {
            // Handle backend errors (e.g. "Username already taken")
            setServerError(err.response?.data || 'Registration failed');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100 p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account 🚀</h2>

                {serverError && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                        {serverError}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                        {...register('username', { required: true, minLength: 3 })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        placeholder="Student123"
                    />
                    {errors.username && <span className="text-red-500 text-xs">Username is required (min 3 chars)</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        {...register('email', { required: true })}
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        placeholder="you@university.edu"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Major</label>
                    <select
                        {...register('studyProgramId', { required: true })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white transition"
                    >
                        <option value="">-- Choose your Program --</option>
                        {programs.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                    {errors.studyProgramId && <span className="text-red-500 text-xs">Please select a major</span>}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        {...register('password', { required: true, minLength: 6 })}
                        type="password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        placeholder="••••••••"
                    />
                    {errors.password && <span className="text-red-500 text-xs">Password too short (min 6 chars)</span>}
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white font-bold p-3 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg">
                    Start Leveling Up
                </button>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Log in</Link>
                </p>
            </form>
        </div>
    );
}
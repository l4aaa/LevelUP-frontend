import { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { register, handleSubmit } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onSubmit = async (data: any) => {
        try {
            const response = await api.post('/auth/login', data);
            login(response.data.token, response.data.username);
            navigate('/dashboard');
        } catch (err: any) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">LevelUp Login</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <input
                    {...register('username')}
                    placeholder="Username"
                    className="w-full p-2 mb-2 border rounded"
                />
                <input
                    {...register('password')}
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-4 border rounded"
                />

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Sign In
                </button>
            </form>
        </div>
    );
}
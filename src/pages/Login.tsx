import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import { loginUser } from '../services/authService';
import { ROLES, ERROR_MESSAGES } from '../constants';
import type { LoginPayload } from '../types';

export default function Login() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginPayload>();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onSubmit = async (data: LoginPayload) => {
        setError('');
        try {
            const response = await loginUser(data);
            login(response.token, response.username, response.role);

            if (response.role === ROLES.ADMIN) {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch {
            setError(ERROR_MESSAGES.INVALID_CREDENTIALS);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-ctp-base p-4 relative overflow-hidden">
            <Link
                to="/"
                className="absolute top-6 left-6 flex items-center gap-2 text-ctp-subtext0 hover:text-ctp-text transition-colors z-50 font-medium"
            >
                <ArrowLeft size={20} />
                <span>Back to Home</span>
            </Link>

            <div className="absolute top-10 left-10 w-64 h-64 bg-ctp-mauve/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-ctp-blue/20 rounded-full blur-3xl"></div>

            <form onSubmit={handleSubmit(onSubmit)}
                className="bg-ctp-surface0 p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-ctp-surface1 relative z-10">
                <div className="flex justify-center mb-6">
                    <div className="bg-ctp-mauve p-3 rounded-xl text-ctp-base">
                        <Gamepad2 size={32} />
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-2 text-center text-ctp-text">Welcome Back</h2>
                <p className="text-center text-ctp-subtext0 mb-6 text-sm">Resume your learning journey</p>

                {error && <div
                    className="bg-ctp-red/10 border border-ctp-red/20 text-ctp-red text-sm p-3 rounded-lg mb-4 text-center">{error}</div>}

                <div className="space-y-4">
                    <div>
                        <label htmlFor="username"
                            className="block text-xs font-bold text-ctp-subtext0 uppercase mb-1 ml-1">Username</label>
                        <input
                            id="username"
                            {...register('username', { 
                                required: 'Username is required',
                                minLength: { value: 3, message: 'Username must be at least 3 characters' }
                            })}
                            className="w-full p-3 bg-ctp-mantle border border-ctp-surface1 rounded-xl text-ctp-text focus:outline-none focus:border-ctp-mauve focus:ring-1 focus:ring-ctp-mauve transition-all placeholder-ctp-overlay1"
                            placeholder="e.g. PlayerOne"
                        />
                        {errors.username && <span className="text-ctp-red text-xs ml-1">{errors.username.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="password"
                            className="block text-xs font-bold text-ctp-subtext0 uppercase mb-1 ml-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            {...register('password', { 
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be at least 6 characters' }
                            })}
                            className="w-full p-3 bg-ctp-mantle border border-ctp-surface1 rounded-xl text-ctp-text focus:outline-none focus:border-ctp-mauve focus:ring-1 focus:ring-ctp-mauve transition-all placeholder-ctp-overlay1"
                            placeholder="••••••••"
                        />
                        {errors.password && <span className="text-ctp-red text-xs ml-1">{errors.password.message}</span>}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-ctp-mauve hover:bg-ctp-mauve/90 disabled:opacity-50 disabled:cursor-not-allowed text-ctp-base font-bold p-3 rounded-xl mt-8 transition-transform active:scale-95"
                >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>

                <p className="mt-6 text-center text-sm text-ctp-subtext0">
                    New player? <Link to="/register"
                        className="text-ctp-blue hover:text-ctp-sapphire font-semibold hover:underline">Create
                        Account</Link>
                </p>
            </form>
        </div>
    );
}

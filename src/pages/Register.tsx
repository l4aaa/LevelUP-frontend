import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import api from '../services/api';
import {useAuth} from '../context/AuthContext';
import {Link, useNavigate} from 'react-router-dom';
import {ArrowLeft, Rocket} from 'lucide-react';
import {isAxiosError} from "axios";

interface StudyProgram {
    id: number;
    name: string;
}

interface RegisterFormData {
    username: string;
    email: string;
    studyProgramId: string;
    password: string;
}

export default function Register() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {login} = useAuth();
    const navigate = useNavigate();
    const [programs, setPrograms] = useState<StudyProgram[]>([]);
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        api.get('/auth/study-programs')
            .then(res => setPrograms(res.data))
            .catch(err => console.error(err));
    }, []);

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const payload = {...data, studyProgramId: Number(data.studyProgramId)};

            const response = await api.post('/auth/register', payload);
            login(response.data.token, response.data.username, response.data.role);

            if (response.data.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            if (isAxiosError(err) && err.response) {
                const data = err.response.data;
                const message = typeof data === 'string' ? data : (data as { message?: string })?.message;
                setServerError(message || 'Registration failed');
            } else {
                setServerError('Registration failed');
            }
        }
    };

    const inputClass = "w-full p-3 bg-ctp-mantle border border-ctp-surface1 rounded-xl text-ctp-text focus:outline-none focus:border-ctp-blue focus:ring-1 focus:ring-ctp-blue transition-all placeholder-ctp-overlay1";

    return (
        <div className="flex min-h-screen items-center justify-center bg-ctp-base p-4 relative">
            <Link
                to="/"
                className="absolute top-6 left-6 flex items-center gap-2 text-ctp-subtext0 hover:text-ctp-text transition-colors z-50 font-medium"
            >
                <ArrowLeft size={20}/>
                <span>Back to Home</span>
            </Link>

            <div
                className="absolute top-0 right-0 w-96 h-96 bg-ctp-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

            <form onSubmit={handleSubmit(onSubmit)}
                  className="bg-ctp-surface0 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-ctp-surface1 relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-block p-3 bg-ctp-blue/20 rounded-2xl mb-4 text-ctp-blue">
                        <Rocket size={32}/>
                    </div>
                    <h2 className="text-3xl font-bold text-ctp-text">Join LevelUp</h2>
                    <p className="text-ctp-subtext0 mt-1">Start your gamified learning adventure</p>
                </div>

                {serverError && (
                    <div
                        className="bg-ctp-red/10 text-ctp-red p-3 rounded-lg mb-6 text-sm border border-ctp-red/20 text-center">
                        {serverError}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label
                            className="block text-xs font-bold text-ctp-subtext0 uppercase mb-1 ml-1">Username</label>
                        <input
                            {...register('username', {required: true, minLength: 3, maxLength: 20})}
                            className={inputClass}
                            placeholder="Student123"
                        />
                        {errors.username && <span className="text-ctp-red text-xs ml-1">3-20 characters required</span>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-ctp-subtext0 uppercase mb-1 ml-1">Email</label>
                        <input
                            {...register('email', {required: true})}
                            type="email"
                            className={inputClass}
                            placeholder="you@university.edu"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-ctp-subtext0 uppercase mb-1 ml-1">Major</label>
                        <select
                            {...register('studyProgramId', {required: true})}
                            className={inputClass}
                        >
                            <option value="">Select your Program...</option>
                            {programs.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                        {errors.studyProgramId &&
                            <span className="text-ctp-red text-xs ml-1">Please select a program</span>}
                    </div>

                    <div>
                        <label
                            className="block text-xs font-bold text-ctp-subtext0 uppercase mb-1 ml-1">Password</label>
                        <input
                            {...register('password', {required: true, minLength: 6})}
                            type="password"
                            className={inputClass}
                            placeholder="••••••••"
                        />
                        {errors.password && <span className="text-ctp-red text-xs ml-1">Min 6 chars required</span>}
                    </div>
                </div>

                <button type="submit"
                        className="w-full bg-ctp-blue hover:bg-ctp-blue/90 text-ctp-base font-bold p-3.5 rounded-xl mt-8 transition-transform active:scale-95 shadow-lg shadow-ctp-blue/20">
                    Create Account
                </button>

                <p className="mt-6 text-center text-sm text-ctp-subtext0">
                    Already have an account? <Link to="/login" className="text-ctp-mauve font-semibold hover:underline">Log
                    in</Link>
                </p>
            </form>
        </div>
    );
}
import api from './api';
import { API_PATHS } from '../constants';
import type { AuthResponse, StudyProgram } from '../types';

export const loginUser = async (data: unknown): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(API_PATHS.LOGIN, data);
    return response.data;
};

export const registerUser = async (data: unknown): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(API_PATHS.REGISTER, data);
    return response.data;
};

export const getStudyPrograms = async (): Promise<StudyProgram[]> => {
    const response = await api.get<StudyProgram[]>(API_PATHS.STUDY_PROGRAMS);
    return response.data;
};

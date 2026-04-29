import api from './api';
import { API_PATHS } from '../constants';
import type { User } from '../types';

export const getUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>(API_PATHS.USERS);
    return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
    await api.delete(API_PATHS.USER(id));
};

export const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
    const response = await api.put<User>(API_PATHS.USER(id), data);
    return response.data;
};

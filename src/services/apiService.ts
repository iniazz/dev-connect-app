import axios, { AxiosResponse } from 'axios';
import { User } from '../user'

const API_BASE_URL = 'https://localhost:7249/api';

export const apiService = {
    getUsers: (): Promise<AxiosResponse<User[]>> => {
      return axios.get(`${API_BASE_URL}/User`);
    },

    getUsersById: (id: number) => {
        return axios.get(`${API_BASE_URL}/User/${id}`);
    },
  
    createUser: (userWithoutId: Omit<User, 'id'>): Promise<AxiosResponse<void>> => {
        return axios.post(`${API_BASE_URL}/User`, userWithoutId);
    },
  
    updateUser: (id: number, userWithoutId: Omit<User, 'id'>): Promise<AxiosResponse<void>> => {
        return axios.put(`${API_BASE_URL}/User/${id}`, userWithoutId);
    },
  
    deleteUser: (id: number): Promise<AxiosResponse<void>> => {
      return axios.delete(`${API_BASE_URL}/User/${id}`);
    },
};

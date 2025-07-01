import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../axios';


interface LoginPayload {
  username: string;
  password: string;
}

interface RegisterPayload {
  username: string;
  password: string;
}

export const useAuthService = () => {
  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: LoginPayload) => {
      const res = await axiosInstance.post('/api/v1/auth/login', {
        username,
        password,
      });

      return res.data;
    },
  });

  const registerMutation = useMutation({
    mutationFn: async ({ username, password }: RegisterPayload) => {
      const res = await axiosInstance.post('/api/v1/auth/register', {
        username,
        password,
        role: 'admin',
      });

      return res.data;
    },
  });

  return {
    data: {
      login: loginMutation.data,
      register: registerMutation.data,
    },
    method: {
      login: loginMutation,
      register: registerMutation,
    },
  };
};

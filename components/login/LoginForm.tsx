'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import FullscreenSpinner from '../shared/FullScreenSpinner';
import { useAuthQuery } from '@/lib/query/auth';
import { Eye, EyeOff } from "lucide-react";
import useAuthStore from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';


export default function LoginForm() {
  const {method} = useAuthQuery();
  const [form, setForm] = useState({ username: '', password: '' });
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const {setToken, setRefreshToken } = useAuthStore.getState();
  const router = useRouter();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    method.login.mutate({
        username: form.username,
        password: form.password,
    }, {
      onSuccess: (data: {access_token: string, refresh_token:string}) => {
        setToken(data.access_token);
        setRefreshToken(data.refresh_token);
        setIsLoading(false);
        setAlert({ type: "success", message: 'Berhasil login' });
        router.push("/dashboard/categories");
      },
      onError: (error: any) => {
        setAlert({ type: "error", message: error.response.data.message });
        setIsLoading(false);
      }
    });
  };



  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timeout);
    }
  }, [alert]);


  return (
    <div className="flex flex-col items-center">
      {isLoading === true && <FullscreenSpinner/>}
      {alert && (
        <Alert
          variant={alert.type === 'success' ? 'default' : 'destructive'}
          className="mb-4 w-80"
        >
          {alert.type === 'success' ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertTriangle className="h-4 w-4" />
          )}
          <AlertTitle>
            {alert.type === 'success' ? 'Success' : 'Error'}
          </AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl text-gray-900 font-semibold text-center">
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 pr-10"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute rounded-lg right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-900">
          Don't have an account?{' '}
          <Link
            href="/register"
            className="text-blue-600 hover:underline hover:cursor-pointer"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

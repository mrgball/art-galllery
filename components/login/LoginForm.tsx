'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import FullscreenSpinner from '../ui/FullScreenSpinner';
import { useAuthQuery } from '@/lib/query/auth';

export default function LoginForm() {
  const {data, method} = useAuthQuery();
  const [form, setForm] = useState({ username: '', password: '' });
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    method.login.mutate({
        username: form.username,
        password: form.password,
    });
  };

  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => setAlert(null), 4000);
      return () => clearTimeout(timeout);
    }
  }, [alert]);

  return (
    <div className="flex flex-col items-center">
      {method.login.isPending && <FullscreenSpinner/>}
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

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

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

'use client';

import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import FullscreenSpinner from '../ui/FullScreenSpinner';
import { useEffect, useState } from 'react';
import { useAuthQuery } from '@/lib/query/auth';

export default function RegisterForm() {
    const {data, method} = useAuthQuery();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
    } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleSubmit = (e: React.FormEvent) =>  {
    e.preventDefault();

    setIsLoading(true);
    
    method.register.mutate({
      username: form.name,
      password: form.password,
    }, {
        onSuccess: (data) => {
            setAlert({ type: "success", message: data.message });
            setIsLoading(false);
        },
        onError: (error: any) => {
            setAlert({ type: "error", message: error.message });
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
        variant={alert.type === "success" ? "default" : "destructive"}
        className="mb-4 w-80"
      >
        {alert.type === "success" ? (
          <CheckCircle className="h-4 w-4" />
        ) : (
          <AlertTriangle className="h-4 w-4" />
        )}
        <AlertTitle>{alert.type === "success" ? "Success" : "Error"}</AlertTitle>
        <AlertDescription>{alert.message}</AlertDescription>
      </Alert>
    )}

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-80 space-y-4"
    >
      <h2 className="text-xl text-gray-900 font-semibold text-center">Register</h2>
      <input
        type="text"
        placeholder="Username"
        className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
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
        Register
      </button>
      <p className="text-center text-sm text-black">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
            Login
        </Link>
      </p>
    </form>
  </div>
);

}



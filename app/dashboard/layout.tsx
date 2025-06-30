// app/dashboard/layout.tsx
'use client'

import Sidebar from "@/components/shared/Sidebar";
import TokenExpiredDialog from "@/components/shared/TokenExpiredDialog";
import { isTokenExpired } from "@/lib/helper";
import useAuthStore from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
   const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();
  const { token, logout } = useAuthStore();

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      setShowDialog(true);
    }
  }, [token]);

  const handleConfirm = () => {
    logout();
    setShowDialog(false);
    router.push("/login");
  };


  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    <TokenExpiredDialog isOpen={showDialog} onConfirm={handleConfirm} />
    </div>
  );
}

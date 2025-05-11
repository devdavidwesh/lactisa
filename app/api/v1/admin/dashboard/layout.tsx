"use client"

import { Sidebar } from "@/components/adminDashboard/sidebar/Sidebar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Link, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const user = useCurrentUser();
  if (user?.role !== "ADMIN") {
    return (
      <div className="flex items-center justify-center flex-col space-y-6 min-h-screen px-4 text-red-500 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <ShieldCheck className="w-32 h-32 md:w-48 md:h-48" /> {/* responsive icon */}
            <p className="text-2xl md:text-3xl font-semibold">401: Unauthorized</p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl text-white bg-primary hover:bg-primary/80 transition"
          >
            Back to Home page
          </Link>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 text-white p-6 space-y-6">
            <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 bg-muted">
        {children}
      </main>
    </div>
  );
}

"use client";

import Dashboard from "@/components/userdashboard/Dashboard";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

const Page =  () => {
  const user = useCurrentUser();
  if (user?.role !== "USER") {
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
    <div>
      <Dashboard />
    </div>
    
  )
}

export default Page
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, LayoutDashboard, MessageCircleMore, NotebookPen, Users } from "lucide-react";

export const RouteSelect = () => {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  if (!currentPath) return null; // or a skeleton if you prefer

  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/api/v1/admin/dashboard"
        className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm transition ${
          currentPath === "/api/v1/admin/dashboard"
            ? "bg-green-100 text-stone-950 shadow"
            : "hover:bg-stone-200 text-stone-500"
        }`}
      >
        <LayoutDashboard className="text-violet-500" />
        Dashboard
      </Link>

      <Link
        href="/api/v1/admin/dashboard/announcements"
        className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm transition ${
          currentPath === "/api/v1/admin/dashboard/announcements"
            ? "bg-green-100 text-stone-950 shadow"
            : "hover:bg-stone-200 text-stone-500"
        }`}
      >
        <Bell className="text-red-500"/>
        Announcements
      </Link>

       <Link
      href="/api/v1/admin/dashboard/members"
      className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm transition ${
        currentPath === "/api/v1/admin/dashboard/members"
          ? "bg-green-100 text-stone-950 shadow"
          : "hover:bg-stone-200 text-stone-500"
      }`}
    >
      <Users className="text-blue-500" />
      Members
    </Link>

      <Link
        href="/api/v1/admin/dashboard/messages"
        className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm transition ${
          currentPath === "/api/v1/admin/dashboard/messages"
            ? "bg-green-100 text-stone-950 shadow"
            : "hover:bg-stone-200 text-stone-500"
        }`}
      >
        <MessageCircleMore className="text-primary" />
        Messages
      </Link>

      <Link
        href="/api/v1/admin/dashboard/updates"
        className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm transition ${
          currentPath === "/api/v1/admin/dashboard/updates"
            ? "bg-green-100 text-stone-950 shadow"
            : "hover:bg-stone-200 text-stone-500"
        }`}
      >
        <NotebookPen className="text-amber-400" />
        Updates
      </Link>
    </div>
  );
};

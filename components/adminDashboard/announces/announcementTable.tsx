'use client';

import { getAnnouncements } from "@/actions/admindashboard";
import { BellPlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type announcement = {
  announcementId: string;
  title: string;
  type: string;
  content: string;
  visibleFrom: Date;
  visibleTo: Date;
  createdById: string;
  creator: string;
  createdAt: Date;
  updatedAt: Date;
}

const AnnouncementTable = () => {
  const [announcements, setAnnouncements] = useState<announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAnnouncements();
      setAnnouncements(data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto max-w-[400px] sm:max-w-[580px] lg:max-w-full">
      <div className="min-w-[1000px] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Announcements</h2>
          <Link 
            href="/api/v1/admin/dashboard/announcements/create" 
            className="flex gap-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/85 transition whitespace-nowrap"
          >
            <BellPlus className="text-amber-400" />
            Create New Announcement
          </Link>
        </div>

        <div className="rounded-lg border shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Created By</th>
                <th className="p-3">Type</th>
                <th className="p-3">Title</th>
                <th className="p-3">Content</th>
                <th className="p-3">Visible From</th>
                <th className="p-3">Visible To</th>
                <th className="p-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 13 }).map((_, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="p-3">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : announcements.length > 0 ? (
                announcements.map((a, i) => (
                  <tr key={a.announcementId} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-3 align-top">{a.creator || "Unknown"}</td>
                    <td className="p-3 align-top">{a.type}</td>
                    <td className="p-3 align-top">{a.title}</td>
                    <td className="p-3 align-top max-w-xs break-words whitespace-pre-wrap">{a.content}</td>
                    <td className="p-3 align-top">{a.visibleFrom.toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })}</td>
                    <td className="p-3 align-top">{a.visibleTo.toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })}</td>
                    <td className="p-3 align-top">{a.createdAt.toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">No announcements found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementTable;

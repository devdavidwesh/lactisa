'use client';

import { getAdminMessages } from "@/actions/admindashboard";
import { useEffect, useState } from "react";

type MessageType = {
    sender: string;
    senderId?: string;
    message: string;
    createdAt: Date;
}

const MessagesTable = () => {
  const [announcements, setAnnouncements] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const messages = await getAdminMessages();
      setAnnouncements(messages || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto max-w-[400px] sm:max-w-[580px] lg:max-w-full">
      <div className="min-w-[600px] p-6 space-y-4"> {/* Reduced min-width */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Messages</h2>
        </div>

        <div className="rounded-lg border shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Sender</th>
                <th className="p-3">Sender ID</th>
                <th className="p-3">Message</th>
                <th className="p-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 13 }).map((_, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {Array.from({ length: 4 }).map((_, j) => (
                      <td key={j} className="p-3">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : announcements.length > 0 ? (
                announcements.map((a, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-3 align-top">{a.sender || "Unknown"}</td>
                    <td className="p-3 align-top">{a.senderId || "User"}</td>
                    <td className="p-3 align-top">{a.message}</td>
                    <td className="p-3 align-top">
                      {a.createdAt.toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">No announcements found</td> {/* Changed colSpan to 3 */}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MessagesTable;
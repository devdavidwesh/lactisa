"use client";

import React, { useEffect, useState } from "react";
import { getActiveUsers, getAnnouncements } from "@/actions/userdashboard";
import Container from "../Container";

interface Announcement {
  title: string;
  type: string;
  content: string;
  visibleTo: Date;
  createdAt: Date;
}

const Dash = () => {
  const [activeUserCount, setActiveUserCount] = useState<number | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getActiveUsers();
      if (result?.count) {
        setActiveUserCount(result.count);
      }
      setLoadingUsers(false);
    };

    const fetchAnnouncements = async () => {
      const fetchedAnnouncements = await getAnnouncements();
      setAnnouncements(fetchedAnnouncements);
      setLoadingAnnouncements(false);
    };

    fetchUsers();
    fetchAnnouncements();
  }, []);

  return (
    <Container>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl text-primary font-semibold mb-4">Dashboard</h1>

        {/* Active Members */}
        <div className="bg-white shadow-md rounded-lg p-4 border border-stone-200">
          <h2 className="text-lg font-semibold mb-2">Active Members</h2>
          {loadingUsers ? (
            <div className="h-4 w-32 bg-stone-300 rounded animate-pulse" />
          ) : activeUserCount !== null ? (
            <p className="text-stone-600 font-semibold">
              Active Users: {activeUserCount}
            </p>
          ) : (
            <p className="text-stone-500">No active members found.</p>
          )}
        </div>

        {/* Announcements */}
        <div className="bg-white shadow-md rounded-lg p-4 border border-stone-200">
          <h2 className="text-lg font-semibold mb-2">Announcements</h2>
          {loadingAnnouncements ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-3 bg-stone-100 rounded-lg animate-pulse">
                  <div className="h-4 w-48 bg-stone-300 rounded mb-1" />
                  <div className="h-4 w-64 bg-stone-300 rounded" />
                </div>
              ))}
            </div>
          ) : announcements.length > 0 ? (
            <ul className="space-y-2">
              {announcements.map((announcement, i) => (
                <li key={i} className="p-3 bg-stone-100 rounded-lg">
                  <h3 className="text-sm font-semibold">{announcement.title}</h3>
                  <p className="text-xs text-stone-600">{announcement.content}</p>
                  <span className="text-xs text-stone-400">
                    Created:{" "}
                    {new Date(announcement.createdAt).toLocaleString("en-KE", {
                      timeZone: "Africa/Nairobi",
                    })}
                  </span>
                  <br />
                  <span className="text-xs text-stone-400">
                    Valid until:{" "}
                    {new Date(announcement.visibleTo).toLocaleString("en-KE", {
                      timeZone: "Africa/Nairobi",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-stone-500">No announcements available.</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Dash;

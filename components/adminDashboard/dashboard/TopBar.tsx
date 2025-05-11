"use client"

import { useCurrentUser } from "@/hooks/useCurrentUser";
import React, { useEffect, useState } from "react";
import { FiCalendar } from "react-icons/fi";

export const TopBar = () => {
  const user = useCurrentUser();
  const [nairobiTime, setNairobiTime] = useState("");

  const getGreeting = (): string => {
    const hours = new Date().toLocaleTimeString("en-KE", {
      timeZone: "Africa/Nairobi",
      hour12: false,
      hour: "2-digit",
    });

    const hour = parseInt(hours, 10);

    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    const getLiveNairobiTime = () => {
      const dateTime = new Date().toLocaleString("en-KE", {
        timeZone: "Africa/Nairobi",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });

      setNairobiTime(dateTime);
    };

    getLiveNairobiTime(); // Set initial time
    const interval = setInterval(getLiveNairobiTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup function
  }, []);

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">
            🚀 {getGreeting()}, {user?.name?.trim().split(/\s+/)[0]}
          </span>
          <span className="text-xs block text-stone-500">{nairobiTime}</span>
        </div>
        <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
          <FiCalendar />
          <span>Prev 6 Months</span>
        </button>
      </div>
    </div>
  );
};

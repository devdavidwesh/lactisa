"use client";

import { getUserStats } from "@/actions/admindashboard";
import React, { useEffect, useState } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

export const StatCards = () => {
  const [stats, setStats] = useState<{ totalUsers: number; inactiveUsers: number; totalAdmins: number; totalMessages: number } | null>(null);

  useEffect(() => {
    async function fetchStats() {
      const data = await getUserStats();
      if (data) {
        setStats(data);
      } else {
        setStats(null); 
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-3 gap-4">
      {stats ? (
        <>
          <Card
            title="Total Users"
            value={stats.totalUsers.toString()}
            pillText="100%"
            trend="up"
            period="All registered users"
          />
          <Card
            title="Inactive Users"
            value={stats.inactiveUsers.toString()}
            pillText={`${((stats.inactiveUsers / stats.totalUsers) * 100).toFixed(2)}%`}
            trend="down"
            period="Users with inactive accounts"
          />
          <Card
            title="Total Admins"
            value={stats.totalAdmins.toString()}
            pillText={`${((stats.totalAdmins / stats.totalUsers) * 100).toFixed(2)}%`}
            trend="up"
            period="Admin accounts"
          />
          <Card
            title="Total Messages"
            value={stats.totalMessages.toString()}
            pillText={`${((stats.totalMessages / stats.totalUsers) * 100).toFixed(2)}%`}
            trend="up"
            period="Messages sent"
          />
        </>
      ) : (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      )}
    </div>
  );
};

const Card = ({
  title,
  value,
  pillText,
  trend,
  period,
}: {
  title: string;
  value: string;
  pillText: string;
  trend: "up" | "down";
  period: string;
}) => {
  return (
    <div className="p-4 md:p-6 rounded-lg border border-stone-300 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6">
        <div className="mb-3 sm:mb-0">
          <h3 className="text-stone-500 mb-1 sm:mb-2 text-sm md:text-base">{title}</h3>
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold">{value}</p>
        </div>

        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded-full ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
        </span>
      </div>

      <p className="text-xs md:text-sm text-stone-500">{period}</p>
    </div>
  );
};

const SkeletonCard = () => {
  return (
    <div className="p-4 md:p-6 rounded-lg border border-stone-300 bg-white shadow-sm animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6">
        <div className="mb-3 sm:mb-0">
          <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-8 w-32 bg-gray-300 rounded"></div>
        </div>
        <div className="h-6 w-12 bg-gray-200 rounded"></div>
      </div>
      <div className="h-4 w-36 bg-gray-200 rounded"></div>
    </div>
  );
};
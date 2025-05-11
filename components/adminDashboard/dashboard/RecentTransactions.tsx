"use client";

import React, { useEffect, useState } from "react";
import { activateUser, deactivateUser, getPaginatedUsers } from "@/actions/admindashboard";
import { MoreVertical } from "lucide-react";
import toast from "react-hot-toast";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  school: string;
  course: string;
  password: string;
  emailVerified?: Date | null;
  status: "ACTIVE" | "INACTIVE"
  role: "ADMIN" | "USER"
  activatedBy?: string | null;
  deactivatedBy?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

const RecentTransactions = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleToggleDropdown = (userId: string) => {
    setOpenDropdown(openDropdown === userId ? null : userId);
  };

  const handleActivateUser = (userId: string) => {
    activateUser(userId);
    setOpenDropdown(null);
    toast.success("User Activated");
  };

  const handleDeactivateUser = (userId: string) => {
    deactivateUser(userId);
    setOpenDropdown(null);
    toast.error("User Deactivated")
  };

  useEffect(() => {
    const fetchData = async () => {
            setLoading(true);
            const data = await getPaginatedUsers(page, 5);
            setUsers(data?.users || []);
            setFilteredUsers(data?.users || []);
            setTotalPages(data?.totalPages || 1);
            setLoading(false);
    };

    fetchData();
}, [page]);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  return (
    <div className="overflow-x-auto max-w-[400px] sm:max-w-[580px] lg:max-w-full">
        <div className="p-4 rounded-lg border border-stone-300 bg-white shadow-sm m-3 min-w-[900px]">
          <h3 className="mb-4 font-medium text-lg">Users</h3>

          {/* Search Field */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring focus:ring-stone-200 outline-none"
            />
          </div>

          <div className="w-full">
            <div className="min-w-max">
              <table className="min-w-max w-full border-collapse">
                <thead className="bg-stone-50">
                  <tr className="text-sm text-stone-600">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone Number</th>
                    <th className="p-3 text-left">Registered at</th>
                    <th className="p-3 text-left">Role</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    [...Array(5)].map((_, index) => (
                      <tr key={index} className="animate-pulse bg-stone-100">
                        <td className="p-3 border-t border-stone-200 whitespace-nowrap">
                          <div className="h-4 w-24 bg-stone-200 rounded"></div>
                        </td>
                        <td className="p-3 border-t border-stone-200 whitespace-nowrap">
                          <div className="h-4 w-32 bg-stone-200 rounded"></div>
                        </td>
                        <td className="p-3 border-t border-stone-200 whitespace-nowrap">
                          <div className="h-4 w-20 bg-stone-200 rounded"></div>
                        </td>
                        <td className="p-3 border-t border-stone-200 whitespace-nowrap">
                          <div className="h-4 w-28 bg-stone-200 rounded"></div>
                        </td>
                        <td className="p-3 border-t border-stone-200 whitespace-nowrap">
                          <div className="h-6 w-6 bg-stone-200 rounded-full"></div>
                        </td>
                        <td className="p-3 border-t border-stone-200 whitespace-nowrap">
                          <div className="h-4 w-16 bg-stone-200 rounded"></div>
                        </td>
                        <td className="p-3 border-t border-stone-200 whitespace-nowrap">
                          <div className="h-4 w-16 bg-stone-200 rounded"></div>
                        </td>
                      </tr>
                    ))
                  ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <tr
                        key={user.id}
                        className={`text-sm ${index % 2 === 0 ? "bg-white" : "bg-stone-50"}`}
                      >
                        <td className="p-3 border-t border-stone-200 whitespace-nowrap">{user.name}</td>
                        <td className="p-3 border-t border-stone-200 whitespace-nowrap">{user.email}</td>
                        <td className="p-3 border-t border-stone-200 whitespace-nowrap">{user.phone}</td>
                        <td className="p-3 border-t border-stone-200 whitespace-nowrap">
                          {new Date(user.createdAt)
                            .toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })
                            .toString()}
                        </td>
                        <td className="p-3 border-t border-stone-200 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                              user.role === "ADMIN"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.role.charAt(0)}
                          </span>
                        </td>
                        <td className="p-3 border-t border-stone-200 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.status === "INACTIVE"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="p-3 border-t border-stone-200 whitespace-nowrap relative">
                          <button
                            onClick={() => handleToggleDropdown(user.id)}
                            className="p-2 rounded-full hover:bg-stone-200"
                          >
                            <MoreVertical size={18} />
                          </button>

                          {openDropdown === user.id && (
                            <div className="absolute flex flex-col right-0 mt-2 w-40 bg-white shadow-md border border-stone-200 rounded-md z-10">
                              <button
                                onClick={() => handleActivateUser(user.id)}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-stone-100"
                              >
                                Activate Account
                              </button>
                              <button
                                onClick={() => handleDeactivateUser(user.id)}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-stone-100"
                              >
                                Deactivate Account
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center p-4 text-stone-500">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>


          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1 || loading}
              className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-stone-50 transition-colors"
            >
              Previous
            </button>

            <span className="text-sm text-stone-600">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
              disabled={page === totalPages || loading}
              className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-stone-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
  );
};

export default RecentTransactions;

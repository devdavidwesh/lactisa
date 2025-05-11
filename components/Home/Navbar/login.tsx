"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Link from "next/link";
import { FiUser, FiLogOut, FiGrid } from "react-icons/fi";
import toast from "react-hot-toast";

const Login = () => {
  const user = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); 
    toast.success("Logout success");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="hidden lg:flex relative">
      {user ? (
        <div className="flex items-center gap-2" ref={dropdownRef}>
          {/* User Icon */}
          <div
            className="bg-primary p-2 rounded-full cursor-pointer relative"
            onClick={toggleDropdown}
          >
            <FiUser className="text-secondary/75 text-xl" />
          </div>

          <span className="text-sm font-medium">
            {user.name?.trim().split(/\s+/)[0] || "User"}
          </span>
          {user.role === "ADMIN" && (
             <span className="text-sm font-medium">
                {user.role?.trim().split(/\s+/)[0] || "User"}
              </span>
        )} 

          {isOpen && (
            <div className="absolute top-12 right-0 bg-white shadow-md border border-gray-200 rounded-md w-40">
              <ul className="flex flex-col">
                <li>
                  <Link
                    href = {user?.role === "USER" ? "/user/dashboard" : "/api/v1/admin/dashboard"}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <FiGrid className="text-gray-600" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout} 
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    <FiLogOut className="text-gray-600" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/auth/login" className="border-2 border-secondary p-1 rounded-lg">
            Login
          </Link>
          <Link href="/auth/register" className="border-2 border-secondary p-2 rounded-lg">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Login;

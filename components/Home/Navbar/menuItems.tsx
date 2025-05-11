"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Calendar, Home, Images, Info, LandPlot, LayoutDashboard, Library, LogOut, Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

const MenuItems = () => {
    const user = useCurrentUser();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = useCallback(() => {
        setIsDropdownOpen(prev => !prev);
      }, []);

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen((state) => !state);
    }, [])

    const pathName = usePathname();
    const navItems = [
        {
            label: "Home",
            path: "/",
            icon: Home
        },
        {
            label: "About Us",
            path: "/about",
            icon: Info
        },
        {
            label: "Programs",
            path: "/programs",
            icon: LandPlot
        },
        {
            label: "Events",
            path: "/events",
            icon: Calendar
        },
        {
            label: "Resources",
            path: "/resources",
            icon: Library
        },
        {
            label: "Gallery",
            path: "/gallery",
            icon: Images
        },
    ]
  return (
    <div>
        {/* desktop view */}
        <div className="hidden lg:flex">
           {navItems.map((item, index) => (
            <div key={index} className = "mx-4 relative group">
                <Link href = {item.path}>{item.label}</Link>
                <span className={`absolute left-0 bottom-0 w-0 h-[2px] bg-secondary transition-all duration-300
                        ${pathName === item.path ? "w-full" : ""} group-hover:w-full `}
                ></span>
            </div>
           ))}
        </div>

        {/* md and smaller screens */}
        {/* trigger */}
        <div className = "lg:hidden flex items-center">
           <Menu size={34} className="text-primary" onClick = {toggleSidebar} />
        </div>

        <div className={`fixed inset-0 z-40 transition-all duration-500 ${isSidebarOpen ? "visible" : "invisible"}`}>
                {/* Overlay */}
                <div
                    className={`absolute inset-0 bg-black transition-opacity duration-400 ${
                        isSidebarOpen ? "opacity-35" : "opacity-0"
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                ></div>

                {/* Sidebar */}
                <div
                    className={`fixed rounded-l-sm inset-y-0 right-0 w-64 bg-navcolor text-black shadow-lg transform transition-transform duration-400 ease-in-out ${
                        isSidebarOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="relative flex justify-center">
                        <button
                            className="absolute top-4 right-4 text-gray-600 hover:text-black"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X size={34} className="text-primary" />
                        </button>

                    <Link href = "/">
                        <Image
                            src="/logo.jpeg"
                            height={140}
                            width={140}
                            alt="logo"
                            className="rounded-2xl align-middle my-2"
                            onClick={toggleSidebar}
                        />
                    </Link>
                        
                    </div>

                    {/* Sidebar Navigation */}
                    <nav className="mt-1 space-y-3 p-4">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.path}
                                className="flex items-center space-x-2 p-2 sm:hover:bg-green-200 rounded transition-all duration-300"
                                onClick={toggleSidebar}
                            >
                                <item.icon className="text-secondary"/>
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                        {/* login buttons */}
                    { user? (
                        <div 
                            onClick={toggleDropdown}
                            className = "relative flex ml-6 gap-3"
                            >
                            <Image src = "/user.jpg" height={20} width={20} alt = "user" className="rounded-full" />
                            <p>{user?.name?.split(" ")[0]}</p>
                            {isDropdownOpen && 
                                <div
                                    onClick={toggleSidebar} 
                                    className="absolute right-16 top-6 mt-2 w-40 bg-white border-2 rounded-lg shadow-lg p-2 border-secondary">
                                {/* Dashboard Link */}
                                <Link
                                  href={user.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"}
                                  className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                                >
                                  <LayoutDashboard className="w-5 h-5 text-primary" /> Dashboard
                                </Link>
                            
                                {/* Logout Button */}
                                <button
                                  onClick={() => {
                                    signOut({ callbackUrl: '/' }); 
                                    toast.success("Logout success");
                                }}
                                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                                >
                                  <LogOut className="w-5 h-5 text-primary" /> Logout
                                </button>
                              </div>
                              }
                        </div>

                    ) : (
                    <div className="mt-6 flex items-center justify-center gap-5">
                        <Link href = "/auth/login" className="border-2 border-secondary p-2 rounded-lg">Login</Link>
                        <Link href = "/auth/register" className = "border-2 border-secondary p-2 rounded-lg">Register</Link>
                    </div>
                    )}


                </div>
            </div>
    </div>
  )
}

export default MenuItems
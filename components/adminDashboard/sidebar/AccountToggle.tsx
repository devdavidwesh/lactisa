import { useCurrentUser } from "@/hooks/useCurrentUser";
import Image from "next/image";
import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export const AccountToggle = () => {
  const user = useCurrentUser();
  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <Image
          src="/logo.jpeg"
          alt="avatar"
          width={20}
          height = {20}
          className="size-8 rounded shrink-0 bg-violet-500 shadow"
        />
        <div className="text-start">
          <span className="text-sm font-bold block text-primary">LACTISA V 0.0.1</span>
          <span className="text-xs block text-stone-500">{user?.email}</span>
        </div>

        <FiChevronDown className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs" />
        <FiChevronUp className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs" />
      </button>
    </div>
  );
};

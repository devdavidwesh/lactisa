"use client";

import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Link href = "/">
          <Image
              src="/logo.jpeg"
              height={60}
              width={60}
              alt="logo"
              className="rounded-2xl"
          />
        </Link>
        <Link href = "/">
          <p className="text-black">
              LACTISA
          </p>
        </Link>
        
    </div>
  )
}

export default Logo
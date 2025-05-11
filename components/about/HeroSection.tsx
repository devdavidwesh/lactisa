"use client";

import Image from "next/image";

const AboutHero = () => {
  return (
        <section className="relative w-full h-[29.5rem] flex items-center justify-center">
            <Image
                src = "/bursary.jpeg" 
                width={3000}
                height={3000}
                alt = "heroImage"
                className="absolute w-full h-full object-cover"
            />

            <div className = "absolute inset-0 h-[29.5rem] bg-gray-500 backdrop-opacity-70 mix-blend-multiply"></div>

          <header className="absolute z-10 translate-y-0.1 flex flex-col items-center gap-3 transform">
              <h1 className="text-white font-bold text-3xl lg:text-4xl text-center">We are a unifying body for tertiary students in <br /> Laikipia County.</h1>
              <h1 className="text-secondary font-bold text-4xl text-center">&#123;LACTISA&#125;</h1>
          </header>

              
        </section>
  )
}

export default AboutHero
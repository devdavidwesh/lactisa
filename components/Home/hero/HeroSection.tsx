"use client";

import Image from "next/image";

const HeroSection = () => {
  return (
        <section className="relative w-full h-[29.5rem] flex items-center justify-center">
            <Image
                src = "/herodesktop.jpeg" 
                width={3000}
                height={3000}
                alt = "heroImage"
                className="absolute w-full h-full object-cover"
            />

            <div className = "absolute inset-0 h-[29.5rem] bg-gray-500 backdrop-opacity-70 mix-blend-multiply"></div>

          <div className="absolute z-10 top-3 flex flex-col items-center gap-3 transform">
              <Image
                  src="/logo.jpeg"
                  height={180}
                  width={180}
                  alt="logo"
                  className="rounded-2xl hover:scale-110 transition duration-500"
              />
              <h1 className="text-white font-bold text-3xl lg:text-4xl text-center">LAIKIPIA COUNTY TERTIARY INSITUTIONS <br /> STUDENTS ASSOCIATION</h1>
              <h1 className="text-secondary font-bold text-4xl text-center">&#123;LACTISA&#125;</h1>
            </div>

              <div className="hidden lg:inline-block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3/4 bg-white shadow-lg p-3 rounded-xl border-4 border-primary">
                <div className="flex items-center justify-evenly">
                    <div className="flex flex-col items-center">
                      <Image
                        src="/education.png"
                        height={180}
                        width={180}
                        alt="logo"
                        className="rounded-3xl h-22 w-22 hover:scale-110 transition duration-500"
                      />
                      <p>Education</p>
                    </div>
                    <div className = "w-[3px] h-20 bg-secondary"></div>
                    <div className="flex flex-col items-center">
                      <Image
                        src="/youthemp.png"
                        height={180}
                        width={180}
                        alt="logo"
                        className="rounded-3xl h-22 w-22 hover:scale-110 transition duration-500"
                      />
                      <p>Youth Empowerment</p>
                    </div>
                    <div className = "w-[3px] h-20 bg-secondary"></div>
                    <div className="flex flex-col items-center">
                      <Image
                        src="/community.png"
                        height={180}
                        width={180}
                        alt="logo"
                        className="rounded-3xl h-22 w-22 hover:scale-110 transition duration-500"
                      />
                      <p>Community development</p>
                    </div>
                    <div className = "w-[3px] h-20 bg-secondary"></div>
                    <div className="flex flex-col items-center">
                      <Image
                        src="/climate.png"
                        height={180}
                        width={180}
                        alt="logo"
                        className="rounded-3xl h-22 w-22 hover:scale-110 transition duration-500"
                      />
                      <p>Climate Action</p>
                    </div>
                </div>
              </div>
        </section>
  )
}

export default HeroSection
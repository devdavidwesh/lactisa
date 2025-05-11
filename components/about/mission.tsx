"use client";

import Image from "next/image";
import Container from "../Container";

const Mission = () => {
  return (
    <section className="p-4 sm:p-6 xl:px-20 relative overflow-hidden" id = "mision">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/dotsedit.jpg"
          alt="dots"
          fill 
          className="object-cover backdrop-blur-3xl"
        />
      </div>

      {/* Content */}
      <Container>
        <div className="relative z-10 mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="col-span-1 lg:px-7 bg-white/90 p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl text-primary font-bold mb-4">Our Mission</h1>
                <p className="mb-6 text-gray-700">
                To promote the values of peace, unity, and cohesion among the students; create social-economic
                interaction and development at large academic excellence, research, and transformative leadership.
                Our mission is to empower all students to make sustainable decisions and to adapt to the
                continuously changing education and global markets.
                </p>
                <h1 className="text-xl text-primary font-bold mb-4">Our Vision</h1>
                <p className="text-gray-700">
                To be a leading and dynamic organization that empowers students, fosters academic excellence, and
                promotes a supportive community, ensuring that every student has the opportunity to achieve their
                full potential and contribute positively to society.
                </p>
            </div>

            <div className="col-span-1 relative">
                <div className="bg-secondary h-10/12 w-10/12 absolute right-0 top-0"></div>
                <div className="absolute top-10 right-7">
                        <Image
                            src="/aboutus.jpeg"
                            width={1200}
                            height={1200}
                            alt="us"
                            className="w-full rounded-lg shadow-lg hidden 2xl:flex"
                        />
                        <Image
                            src="/group.jpeg"
                            width={1200}
                            height={1200}
                            alt="us"
                            className="w-full rounded-lg shadow-lg hidden lg:flex 2xl:hidden"
                        />
                    </div>
            </div>
        </div>

        <div className=" lg:hidden col-span-1 relative min-h-[300px]">
            <div className="bg-secondary h-10/12 w-10/12 absolute right-0 top-0"></div>

            <div className="absolute top-10 right-7 w-full max-w-[90%] lg:max-w-[80%]">
              <Image
                src="/group.jpeg"
                width={1200}
                height={1200}
                alt="us"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>

      </Container>
    </section>
  );
};

export default Mission;
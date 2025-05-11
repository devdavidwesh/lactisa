"use client";

import Image from "next/image";
import Container from "../../Container";

const achievements = [
  {
    title: "LACTISA Bursary",
    description:
      "LACTISA has successfully advocated for the allocation of bursaries to financially disadvantaged students. We encourage students to register with us for timely updates on bursary applications.",
    image: "/1.png",
    alt: "Bursary Icon",
  },
  {
    title: "Campus Reps",
    description:
      "LACTISA has appointed campus representatives in 70% of higher institutions, facilitating smooth communication and service delivery across various institutions.",
    image: "/2.png",
    alt: "Campus Reps Icon",
  },
  {
    title: "Mentorship Programs",
    description:
      "LACTISA has implemented mentorship programs in 10 secondary schools, guiding and inspiring students through engaging sessions on academics, career choices, and personal development.",
    image: "/3.png",
    alt: "Mentorship Icon",
  },
  {
    title: "Inter-county Benchmark",
    description:
      "LACTISA embarked on an insightful intercounty benchmarking activity to enhance organizational effectiveness by learning from various student associations across different counties.",
    image: "/4.png",
    alt: "Benchmark Icon",
  },
];

const Achievements = () => {
  return (
    <section className="p-6" id = "achievements">
      <Container>
        <h2 className="my-5 md:my-7 text-2xl lg:text-3xl text-primary text-center">
          Our Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map(({ title, description, image, alt }, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-400"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={image}
                  height={1300}
                  width={1300}
                  alt={alt}
                  className="rounded-3xl w-16 h-16"
                />
                <h4 className="text-primary text-xl font-semibold">{title}</h4>
              </div>
              <p className="mt-4 text-gray-700">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Achievements;

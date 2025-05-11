import Image from "next/image";
import Container from "../Container";

const Mentorship = () => {
  return (
    <section className="p-4 sm:p-6 md:p-8 2xl:px-12" id = "student_mentorship">
      <Container>
        <div>
          <h2 className="my-2 text-lg sm:text-xl md:text-2xl text-primary">
            Student Mentorship
          </h2>

          {/* Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="text-center lg:text-left">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                In 2024, LACTISA successfully hosted several high school mentorship and career 
                guidance programs aimed at inspiring and empowering students to make informed 
                decisions about their futures. 

                Through interactive sessions, our members shared valuable insights on career 
                paths, personal development, and overcoming challenges in academic and social 
                life. Building on the success of last year&apos;s programs, we are excited to 
                announce that we will resume these mentorship and career initiatives this April 2025. 

                <br /> <br />
                Our goal is to continue guiding and motivating students toward achieving their 
                dreams and realizing their potential. Together, we strive to shape a brighter 
                future for the next generation.
              </p>
            </div>

            {/* Image Section */}
            <div className="flex justify-center">
              <Image 
                width={1000}
                height={1000}
                alt="student mentorship"
                src="/studentment1.jpeg"
                className="rounded-xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-full 2xl:h-[22rem] hover:scale-105 transition duration-400"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Mentorship;

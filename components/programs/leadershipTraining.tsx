import Image from "next/image";
import Container from "../Container";

const LeadershipTraining = () => {
  return (
    <section className="p-4 sm:p-6 md:p-8 2xl:px-12" id = "leadership_empowerment">
      <Container>
        <div>
          <h2 className="my-4 text-lg sm:text-xl md:text-2xl text-primary text-center lg:text-left">
            Leadership Development
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <Image 
                width={1000}
                height={1000}
                alt="Leadership Training"
                src="/leadership.jpeg"
                className="rounded-xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-full 2xl:h-[22rem] hover:scale-105 transition duration-400"
              />
            </div>

            <div className="text-center lg:text-left">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                <strong>The LACTISA Leadership Development Program</strong> is a comprehensive initiative designed to nurture
                visionary and ethical leaders through structured training, mentorship, and experiential learning. 
                By offering tiered learning modules—from foundational principles to advanced strategic leadership—
                the program equips students with critical skills in decision-making, collaboration, and community impact. 

                <br /> <br />
                It fosters a sustainable network of empowered individuals committed to driving positive change, supported 
                by continuous workshops, peer-learning opportunities, and measurable leadership outcomes. Through this 
                holistic approach, LACTISA cultivates a pipeline of transformative leaders capable of addressing complex 
                challenges and inspiring progress within their communities.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LeadershipTraining;

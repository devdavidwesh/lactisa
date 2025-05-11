import Image from "next/image";
import Container from "../Container";

const WomenEmpowerment = () => {
  return (
    <section className="p-4 sm:p-6 md:p-8 2xl:px-12" id = "women_empowerment">
      <Container>
        <div>
          <h2 className="my-4 text-lg sm:text-xl md:text-2xl text-primary text-center lg:text-left">
            Women Empowerment
          </h2>

          {/* Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

            <div className="text-center lg:text-left order-2 lg:order-none">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                <strong>The LACTISA Women Empowerment Program</strong> is a sustained initiative that tackles
                menstrual inequity through comprehensive support systems, combining regular sanitary
                product distribution with ongoing health education to combat period stigma in schools. 

                <br /><br />

                More than just material provision, the program creates safe spaces for dialogue about
                reproductive health while tracking school attendance patterns to measure intervention
                effectiveness, ensuring girls can pursue education with dignity. 

                <br /><br />

                By integrating pad drives with mentorship opportunities and advocacy training, we foster 
                long-term solutions that address both immediate needs and systemic barriers to gender 
                equality in education.
              </p>
            </div>

            <div className="flex justify-center order-1 lg:order-none">
              <Image 
                width={1500}
                height={1500}
                alt="Women Empowerment"
                src="/girl.jpeg"
                className="rounded-xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full 2xl:h-[22rem] hover:scale-105 transition duration-400"
              />
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default WomenEmpowerment;

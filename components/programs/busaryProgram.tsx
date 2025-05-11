import Image from "next/image";
import Container from "../Container";

const BusaryProgram = () => {
  return (
    <section className="p-4 sm:p-6 md:p-8 2xl:px-12" id = "leadership_empowerment">
      <Container>
        <div>
          <h2 className="my-4 text-lg sm:text-xl md:text-2xl text-primary text-center lg:text-left">
            Busary Program
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <Image 
                width={1000}
                height={1000}
                alt="Leadership Training"
                src="/busaryprogram.jpeg"
                className="rounded-xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-full 2xl:h-[22rem] hover:scale-105 transition duration-400"
              />
            </div>

            <div className="text-center lg:text-left">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              At Lactisa, we are committed to ensuring that every student, regardless of financial background,
               has the opportunity to pursue their education without unnecessary barriers. Through our <strong>Busary Program</strong>
                , in partnership with <strong>Laikipia County government</strong>, we actively advocate for bursary allocations to support financially disadvantaged
                 students who rely on our organization for assistance. <br />
            Our program operates with a structured approach, ensuring that eligible students receive timely 
            updates on bursary applications, disbursements, and other crucial financial aid opportunities. 
            By registering with Lactisa, students gain access to a well-organized network that keeps them 
            informed about available resources, allowing them to focus on their academic goals without 
            financial strain.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BusaryProgram;

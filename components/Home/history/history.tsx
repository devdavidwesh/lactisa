"use client";

import Image from "next/image";
import Container from "../../Container";

const History = () => {
  return (
    <section id = "history">
      <Container>
        <div className="p-4 md:p-8 lg:mt-4">
          <h2 className="my-2 md:my-4 text-2xl lg:text-3xl text-primary text-center">
            Our History
          </h2>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            <div className="md:col-span-5 col-span-12 flex justify-center">
                <Image
                  src="/history.png"
                  height={1300}
                  width={1300}
                  alt="logo"
                  className="rounded-3xl max-w-[400px] w-80 h-80 hover:scale-110 transition duration-500"
                />
              </div>

              <div className="md:col-span-7 col-span-12">
                <p className="2xl:my-6 2xl:p-7">
                  <span>
                    <strong>LACTISA</strong>,
                        the Laikipia County Tertiary Institutions Students
                        Association, was established in 2021 through the collaboration
                        of like-minded students who shared a common vision to
                        advocate for the interests of students hailing from Laikipia
                        County in various tertiary institutions across the country. This
                        initiative arose from a recognition of the absence of a unified
                        platform capable of addressing the challenges faced by
                        students within their respective educational institutions.
                  </span>
                  <br /> <br />

                  <span>
                    <strong>LACTISA&apos;s</strong> primary objective is to address issues that are
                    universally relevant to students from Laikipia County, unifying
                    their voices and collectively working towards solutions. By
                    creating a common ground for students, the association aims
                    to foster a supportive community that transcends individual
                    institutions, promoting the overall well-being and academic
                    success of Laikipia students.
                  </span> 
                  <br /> <br />

                </p>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default History;

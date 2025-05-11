"use client";

import Image from "next/image";
import Container from "../../Container";

const Summary = () => {
  return (
    <section>
      <Container>
        <div className="p-4 md:p-8 lg:mt-16">
          <h2 className="my-5 md:my-7 text-2xl lg:text-3xl text-primary text-center">
            Know LACTISA
          </h2>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-7 col-span-12">
                <p className="2xl:my-6 2xl:p-7">
                  <span>
                    <strong>LACTISA</strong>, the Laikipia County Tertiary
                    Institutions Students Association, stands out as a dynamic
                    organization committed to uniting, educating, and
                    championing for students representation in matters that
                    concern them at a national level.
                  </span>
                  <br /> <br />

                  <span>
                    The <strong>Laikipia County Tertiary Institutions Students
                    Association &#40;LACTISA&#41;</strong> serves as a unifying body for
                    students in tertiary education within Laikipia County. This
                    association plays a crucial role in fostering a sense of
                    community and collaboration among students from various
                    tertiary institutions, providing a platform for them to
                    collectively address shared concerns and advocate for their
                    common interests.
                  </span> 
                  <br /> <br />

                  <span>
                    <strong>LACTISA</strong> is dedicated to promoting academic
                    excellence, cultural diversity, and social engagement among
                    its members. Through organizing events, seminars, and
                    community outreach programs, the association seeks to
                    enhance the overall educational experience of its members
                    while contributing positively to the wider community. By
                    facilitating communication and cooperation between
                    different tertiary institutions, <strong>LACTISA</strong> aims to create a
                    supportive environment that empowers students and enables
                    them to thrive academically and socially during their
                    educational journey in Laikipia County.
                  </span>
                </p>
              </div>

              <div className="md:col-span-5 col-span-12 flex justify-center">
                <Image
                  src="/summary.png"
                  height={1300}
                  width={1300}
                  alt="logo"
                  className="rounded-3xl w-full max-w-[400px] md:max-w-full h-[28rem] hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Summary;

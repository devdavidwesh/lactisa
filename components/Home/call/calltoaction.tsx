"use client";

import { Handshake } from "lucide-react";
import Container from "../../Container";
import Link from "next/link";
import Image from "next/image";

const CallToAction = () => {
  return (
    <section className="mb-16 px-4">
      <Container>
        <h5 className="text-center my-4 md:my-8 text-primary text-3xl font-semibold md:text-3xl">
          Join us Today
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col items-center md:justify-center text-center md:text-left">
            <div className="p-5">
              <p className="text-lg md:text-xl leading-relaxed">
                With a focus on education, community service, job creation, and
                recreation activities, LACTISA aims to&nbsp;
                <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-secondary">
                  <span className="relative text-white dark:text-gray-950">
                    uplift
                  </span>
                </span>
                &nbsp;the welfare and future prospects of the coming generation.
                Through educational initiatives, the organization seeks to
                foster academic&nbsp;
                <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-secondary">
                  <span className="relative text-white dark:text-gray-950">
                    excellence
                  </span>
                </span>
                &nbsp;and knowledge dissemination, while community service
                endeavors aim to make a positive impact on the local community.
              </p>
            </div>

            <div className="p-5 flex flex-col items-center md:justify-center gap-4">
              <Handshake size={60} className="text-primary md:size-30" />
              <Link
                href="/auth/register"
                className="text-lg md:text-xl bg-primary px-6 py-3 md:p-3 rounded-xl md:rounded-2xl text-white hover:scale-105 transition duration-500"
              >
                Join Us Today
              </Link>
            </div>
          </div>

          {/* Right Side (Image) */}
          <div>
            <Image
              src="/beamember.jpeg"
              height={1300}
              width={1300}
              alt="logo"
              className="rounded-3xl w-full h-auto md:h-[30rem] hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CallToAction;

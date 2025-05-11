"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const Stand = () => {
  const [startCount, setStartCount] = useState(false);
  const { ref } = useInView({
    triggerOnce: true, // Trigger only once
    onChange: (isInView) => {
      if (isInView) setStartCount(true);
    },
  });

  return (
    <section className="p-4" ref={ref}>
      <div className="px-5">
        <h3 className="text-xl md:text-2xl lg:text-3xl text-black text-center">
          Where we stand
        </h3>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 m-6 md:m-10">

        <div className="flex flex-col gap-2 md:gap-5 items-center">
          <p className="text-4xl md:text-[3rem] font-bold md:font-normal text-primary text-center">
            {startCount && <CountUp start={0} end={43} duration={2} />}+
          </p>
          <p className="text-base md:text-xl text-center">Representatives</p>
        </div>

        <div className="flex flex-col gap-2 md:gap-5 items-center">
          <p className="text-4xl md:text-[3rem] font-bold md:font-normal text-primary text-center">
            {startCount && <CountUp start={0} end={1121} duration={3} />}+
          </p>
          <p className="text-base md:text-xl text-center">Members</p>
        </div>

        <div className="flex flex-col gap-2 md:gap-5 items-center">
          <p className="text-4xl md:text-[3rem] font-bold md:font-normal text-primary text-center">
            {startCount && <CountUp start={0} end={38} duration={2} />}+
          </p>
          <p className="text-base md:text-xl text-center">Schools</p>
        </div>
      </div>
    </section>
  );
};

export default Stand;
import React from 'react';
import Container from '../Container';
import Image from 'next/image';

const MissTourism = () => {
  return (
    <Container>
      <div className="p-6">
        <h2 className="my-4 text-lg sm:text-xl md:text-2xl text-primary text-center lg:text-left">
          Likipia Mr & Miss Tourism
        </h2>

        <p className="text-center my-4 text-sm sm:text-base md:text-lg leading-relaxed">
        LACTISA&apos;s Participation in Laikipia County Mr. and Miss Tourism
        As part of our commitment to empowering and showcasing the talents
         of our members, <strong>LACTISA</strong> participated in the Laikipia County Mr. 
         and Miss Tourism event. We were proudly represented by seven members
          who embodied confidence, creativity, and the spirit of unity.

        </p>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="w-full h-48 sm:h-56 md:h-64 lg:h-72 relative">
              <Image
                src={`/tour${num}.jpeg`}
                alt="Leadership Summit"
                fill
                className="object-fill rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default MissTourism;

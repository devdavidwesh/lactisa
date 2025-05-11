import React from 'react';
import Container from '../Container';
import Image from 'next/image';

const LeadershipSummit = () => {
  return (
    <Container>
      <div className="p-6">
        <h2 className="my-4 text-lg sm:text-xl md:text-2xl text-primary text-center lg:text-left">
          LACTISA Leadership Summit
        </h2>

        <p className="text-center my-4 text-sm sm:text-base md:text-lg leading-relaxed">
          In our efforts to nurture strong, visionary leaders, LACTISA hosted the LACTISA Leaders&apos;
          One-Day Leadership Summit in Rumuruti last year 2024. This event brought together our student
          leaders to discuss leadership principles, share experiences, and build a network of empowered 
          individuals committed to positive change.
          This year, 2025, we took a step further by organizing the LACTISA Executive Leadership Summit at the Kenya
          Institute of Special Education (KISE) in Nairobi. This summit focused on advanced leadership skills, strategic
          planning, and effective decision-making, equipping our executive members to lead with impact and purpose.
          We remain committed to molding leaders who will drive meaningful transformation within their communities.
        </p>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="w-full h-48 sm:h-56 md:h-64 lg:h-72 relative">
              <Image
                src={`/lead${num}.jpeg`}
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

export default LeadershipSummit;

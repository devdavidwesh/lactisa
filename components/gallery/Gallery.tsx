"use client";

import Image from "next/image";
import Container from "../Container";

const Gallery = () => {
  const galleryImages = [
    { imgSrc: "/gallery/aboutus.jpeg", alt: "aboutus" },
    { imgSrc: "/gallery/beamember.jpeg", alt: "beamember" },
    { imgSrc: "/gallery/bench.jpeg", alt: "bench" },
    { imgSrc: "/gallery/clap.jpeg", alt: "clap" },
    { imgSrc: "/gallery/dance.jpeg", alt: "dance" },
    { imgSrc: "/gallery/govvisit.jpeg", alt: "govvisit" },
    { imgSrc: "/gallery/graduates.jpeg", alt: "graduates" },
    { imgSrc: "/gallery/group.jpeg", alt: "group" },
    { imgSrc: "/gallery/group1.jpeg", alt: "group1" },
    { imgSrc: "/gallery/hero.jpeg", alt: "hero" },
    { imgSrc: "/gallery/lac.jpeg", alt: "lac" },
    { imgSrc: "/gallery/leaderandcharlene.jpeg", alt: "leaderandcharlene" },
    { imgSrc: "/gallery/leaders.jpeg", alt: "leaders" },
    { imgSrc: "/gallery/prize.jpeg", alt: "prize" },
    { imgSrc: "/gallery/sign.jpeg", alt: "sign" },
    { imgSrc: "/gallery/summit.jpeg", alt: "summit" },
    { imgSrc: "/gallery/tour1.jpeg", alt: "tour1" },
    { imgSrc: "/gallery/tour2.jpeg", alt: "tour2" },
  ];

  return (
    <Container>
      <h2 className="text-2xl font-bold text-center text-primary m-5">Gallery</h2>
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {galleryImages.map((image, index) => (
          <div key={index} className="relative w-full h-48 sm:h-56 md:h-64 lg:h-64 overflow-hidden rounded-lg shadow-lg">
            <Image
              src={image.imgSrc}
              alt={image.alt}
              layout="fill"
              className="rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Gallery;

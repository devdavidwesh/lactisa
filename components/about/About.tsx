"use client";

import History from "../Home/history/history";
import CoreValues from "./coreValues";
import Faq from "./Faq";
import AboutHero from "./HeroSection";
import Leaders from "./leaders";
import Mission from "./mission";
import Stand from "./stand";

const About = () => {
  return (
    <div>
        <AboutHero />
        <Mission />
        <CoreValues />
        <History />
        <Leaders />
        <Faq />
        <Stand />
    </div>
  )
}

export default About;
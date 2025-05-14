"use client";

import { motion } from "framer-motion";
import { Compass, Network, Users, Lightbulb, Trophy, Scale } from "lucide-react";
import Container from "../Container";

const CoreValues = () => {
  const values = [
    {
      value: "Discovery",
      description: "Create opportunities for learning beyond the classroom",
      icon: Compass,
    },
    {
      value: "Connections",
      description: "Build inter-institutional relationships to enhance engagement in the campus community",
      icon: Network,
    },
    {
      value: "Community",
      description: "Respect for others and the creation of a safe and inclusive environment",
      icon: Users,
    },
    {
      value: "Innovation",
      description: "Design and support programs, venues, and resources that cultivate student expression",
      icon: Lightbulb,
    },
    {
      value: "Excellence",
      description: "Critical assessment and use of appropriate resources to achieve successful outcomes",
      icon: Trophy,
    },
    {
      value: "Balance",
      description: "Commitment to personal and professional life, growth, and resource management",
      icon: Scale,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
      },
    },
  };

  return (
    <section className="p-4 sm:p-6 md:p-8 lg:p-12 2xl:p-14" id="core_values">
      <Container>
        <h1 className="text-2xl text-center text-primary font-bold mb-4">Core Values</h1>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {values.map((itemData, index) => {
            const Icon = itemData.icon;
            return (
              <motion.div
                key={index}
                className="bg-navcolor p-6 rounded-lg shadow-md text-center flex flex-col items-center hover:shadow-lg transition-shadow"
                variants={item}
              >
                <div className="mb-4 p-3 bg-primary/10 rounded-full">
                  <Icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{itemData.value}</h3>
                <p className="text-gray-800">{itemData.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
};

export default CoreValues;













// "use client";

// import { motion } from "framer-motion";
// import { Compass, Network, Users, Lightbulb, Trophy, Scale } from "lucide-react";
// import Container from "../Container";

// const CoreValues = () => {
//   const values = [
//     {
//       value: "Discovery",
//       description: "Create opportunities for learning beyond the classroom",
//       icon: Compass,
//     },
//     {
//       value: "Connections",
//       description: "Build inter-institutional relationships to enhance engagement in the campus community",
//       icon: Network,
//     },
//     {
//       value: "Community",
//       description: "Respect for others and the creation of a safe and inclusive environment",
//       icon: Users,
//     },
//     {
//       value: "Innovation",
//       description: "Design and support programs, venues, and resources that cultivate student expression",
//       icon: Lightbulb,
//     },
//     {
//       value: "Excellence",
//       description: "Critical assessment and use of appropriate resources to achieve successful outcomes",
//       icon: Trophy,
//     },
//     {
//       value: "Balance",
//       description: "Commitment to personal and professional life, growth, and resource management",
//       icon: Scale,
//     },
//   ];

//   return (
//     <section className="p-4 sm:p-6 md:p-8 lg:p-12 2xl:p-14" id="core_values">
//       <Container>
//         <h1 className="text-2xl text-center text-primary font-bold mb-4">Core Values</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
//           {values.map((item, index) => (
//             <motion.div
//               key={index}
//               className="bg-navcolor p-6 rounded-lg shadow-md text-center flex flex-col items-center hover:shadow-lg transition-shadow"
//               initial={{ opacity: 0, y: 50 }} 
//               animate={{ opacity: 1, y: 0 }} 
//               transition={{ duration: 0.5, delay: index * 0.2 }} 
//             >
//               <div className="mb-4 p-3 bg-primary/10 rounded-full">
//                 <item.icon className="w-8 h-8 text-secondary" />
//               </div>
//               <h3 className="text-xl font-bold text-primary mb-2">{item.value}</h3>
//               <p className="text-gray-800">{item.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default CoreValues;
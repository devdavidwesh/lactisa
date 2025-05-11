import Container from "@/components/Container";
import Image from "next/image";

const Messages = () => {
  const messages = [
    {
      role: "President, LACTISA",
      personName: "Sam Kinuthia",
      imagesrc: "/prezo.jpeg",
      message: `As the President of the Laikipia County Tertiary Institutions Students Association (LACTISA)
      and one of its pioneers, I am driven by a deep passion for education, leadership, and community development.
      Currently pursuing a Master's in Cooperative Management at the Cooperative University of Kenya, I believe
      that education is a powerful tool for transforming lives and building a progressive society.
      LACTISA is not just an association—it's a movement. We strive to create a strong network among students across Laikipia
      County, promote educational excellence, and address the unique challenges facing young people in our community. 
      By streamlining young leadership, embracing intergenerational dialogues, and encouraging active participation, 
      we aim to create lasting, meaningful changes in the education sector, youth sector, and the broader community.
      `,
    },
    {
      role: "Vice President, LACTISA",
      personName: "Jane Wanjiku Mathenge",
      imagesrc: "/jane-vc.jpeg",
      message: `As the Vice President of the Laikipia County Tertiary Institutions Students Association (LACTISA),
       I am dedicated to fostering unity, leadership, and growth among our members. My mission is to empower students
        by creating opportunities that enhance their academic, professional, and personal development.
      My vision for LACTISA is to build a strong, united, and influential student body that actively advocates for our welfare,
      representation, and sustainable progress.
      I am also a passionate advocate for climate-smart agriculture and sustainable development. I believe in promoting 
      environmentally friendly agricultural practices that ensure food security, economic empowerment, and a better future 
      for generations to come. Through my leadership, I strive to inspire and drive positive change in our communities.`,
    },
    {
      role: "Secretary General, LACTISA",
      personName: "Peter Karroy",
      imagesrc: "/secgen.jpeg",
      message: `As the Secretary-General of LACTISA and an undergraduate student at Kenyatta University,
       I am committed to driving transformative leadership, advocacy, and impactful initiatives that empower
      communities and foster sustainable development. My mission is to champion inclusivity, innovation, 
      and strategic partnerships that address critical societal challenges, ensuring that LACTISA remains a
      dynamic force for positive change. Through proactive engagement, policy advocacy, and capacity-building
      programs, I will work tirelessly to amplify voices, bridge gaps, and create opportunities that enhance
      social and economic empowerment for all.`,
    },
  ];

  return (
    <section className="p-6" id = "exec_message">
        <Container>
            <h2 className="my-2 md:my-4 text-2xl lg:text-3xl text-primary text-center">
                From the executive
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {messages.map((leader, index) => (
                <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md text-center"
                >
                    <div className="flex justify-center">
                    <div className="w-24 md:w-40 h-24 md:h-40 rounded-full overflow-hidden border-4 border-primary">
                        <Image
                        src={leader.imagesrc}
                        alt={leader.personName}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover"
                        />
                    </div>
                    </div>

                    <div className="mt-4">
                    <h3 className="text-xl font-bold text-primary">
                        {leader.personName}
                    </h3>
                    <p className="text-gray-600 text-sm">{leader.role}</p>
                    </div>

                    <div className="mt-4 text-gray-700 relative">
                    <span className="absolute -top-4 left-0 text-6xl text-primary opacity-20">
                        “
                    </span>
                    <p className="italic">{leader.message}</p>
                    <span className="absolute -bottom-4 right-0 text-6xl text-primary opacity-20">
                        ”
                    </span>
                    </div>
                </div>
                ))}
            </div>
        </Container>
    </section>
  );
};

export default Messages;


// Young leadership is not merely about holding titles; it is about influence, integrity, and a commitment to making a 
//       difference. True leadership starts with self-awareness and the courage to challenge the status quo. As young leaders, 
//       we must embrace responsibility, respect diversity, and remain open to learning from those who came before us.
//       As the youth of Laikipia, we must rise above limitations, inspire each other, and take action that uplifts not just 
//       ourselves but our entire community. Let's lead with vision, serve with humility, and commit to creating a legacy that 
//       will be remembered for generations.
//       Together, we can build a Laikipia where education is valued, leadership is inclusive, and opportunities are accessible to all.
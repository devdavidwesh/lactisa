"use client"

import Image from "next/image"
import { FaLinkedin, FaPhone } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import Container from "../Container"
import Link from "next/link"

const Leaders = () => {
  const execLeaders = [
    {
        name: "Sam Kinuthia",
        role: "Chairperson",
        phone: "0724807660",
        linkedinUrl: "/",
        twitter: "/",
        course: "Bachelors in Co-operative Business, Masters Student at The Co-operative University of Kenya",
        imageSrc: "/sam.png",
      },
      {
        name: "Jane W. Mathenge",
        role: "Vice Chairperson",
        phone: "0724807660",
        linkedinUrl: "/",
        twitter: "/",
        course: "Bachelors in Agribusiness Management at Egerton University",
        imageSrc: "/jane.png",
      },
      {
        name: "Peter Karroy",
        role: "Secretary General",
        phone: "0724807660",
        linkedinUrl: "/",
        twitter: "/",
        course: "Bachelors at Kenyatta University",
        imageSrc: "/peter.png",
      },
]

const leaders = [
      {
        name: "Dennis Mwangi",
        role: "Finance Secretary",
        phone: "0724807660",
        linkedinUrl: "/",
        twitter: "/",
        course: "/",
        imageSrc: "/dennis.png",
    },
    {
        name: "Benard Maina",
        role: "Publicity Director",
        phone: "0724807660",
        linkedinUrl: "/",
        twitter: "/",
        course: "/",
        imageSrc: "/benard.png",
    },
    {
        name: "Bebina Lesurmat",
        role: "Secretary",
        phone: "0724807660",
        linkedinUrl: "/",
        twitter: "/",
        course: "/",
        imageSrc: "/sec.png",
    },
    {
        name: "Joseph Maina",
        role: "PWD Representative",
        phone: "0724807660",
        linkedinUrl: "/",
        twitter: "/",
        course: "/",
        imageSrc: "/joseph.png",
    },
    {
        name: "Keter Emmanuel",
        role: "Laikipia West Sub-County Representative",
        phone: "0724807660",
        linkedinUrl: "/",
        twitter: "/",
        course: "/",
        imageSrc: "/keter.png",
    },
    {
        name: "Ann Kinyua",
        role: "Laikipia East Sub-County Representative",
        phone: "0724807660",
        linkedinUrl: "/",
        twitter: "/",
        course: "/",
        imageSrc: "/ann.png",
    },
    {
        name: "Nahum Sambezi",
        role: "TVETs Representative",
        phone: "0724807660",
        linkedinUrl: "/",
        twitter: "/",
        course: "/",
        imageSrc: "/nahum.png",
    },
    {
        name: "Ewaton Moses",
        role: "Laikipia North Sub-County Representative",
        phone: "0724807660",
        linkedinUrl: "/",
        twitter: "/",
        course: "",
        imageSrc: "/moses.png",
    },
];
               
  return (
    <section className="p-6 xl:px-20" id = "leadership">
      <Container>
            <h2 className="my-5 md:my-7 text-2xl lg:text-3xl text-primary text-center">
              Our Leadership
            </h2>

            <h2 className="my-5 md:my-4 text-xl lg:text23xl text-primary text-center">
              Executive
            </h2>
                        {/* top leaders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-4">
                {execLeaders.map((leader, index) => (
                  <div key={index} className="relative group bg-navcolor shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow p-4">
                    <Image
                      src={leader.imageSrc}
                      alt={leader.name}
                      width={500}
                      height={500}
                      className="w-full h-48 object-contain rounded-full"
                    />
                    <div className="mt-2 text-center">
                      <h3 className="text-lg font-bold">{leader.name}</h3>
                      <p className="text-gray-600 text-sm">{leader.role}</p>
                      {leader.course && <p className="text-xs text-gray-600">{leader.course}</p>}
                    </div>

                    <div className="absolute top-0 right-0 h-48 w-14 flex flex-col items-center justify-center gap-6 bg-black/80 text-secondary translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out rounded-l-xl p-2">
                      {leader.phone && (
                        <Link href={`tel:${leader.phone}`} className="hover:text-gray-300">
                          <FaPhone size={20} />
                        </Link>
                      )}
                      {leader.linkedinUrl && (
                        <Link href={leader.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                          <FaLinkedin size={20} />
                        </Link>
                      )}
                      {leader.twitter && (
                        <Link href={leader.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                          <FaXTwitter size={20} />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
            </div>

              {/* other Leaers */}
            <h2 className="my-7 md:my-4 text-xl lg:text23xl text-primary text-center">
              Section Heads
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {leaders.map((leader, index) => (
                  <div key={index} className="relative group bg-gray-200 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow p-4">
                    <Image
                      src={leader.imageSrc}
                      alt={leader.name}
                      width={500}
                      height={500}
                      className="w-full h-48 object-contain rounded-full"
                    />
                    <div className="mt-2 text-center">
                      <h3 className="text-lg font-bold">{leader.name}</h3>
                      <p className="text-gray-600 text-sm">{leader.role}</p>
                      {leader.course && <p className="text-xs text-gray-600">{leader.course}</p>}
                    </div>

                    <div className="absolute top-0 right-0 h-48 w-14 flex flex-col items-center justify-center gap-6 bg-black/80 text-secondary translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out rounded-l-xl p-2">
                      {leader.phone && (
                        <Link href={`tel:${leader.phone}`} className="hover:text-gray-300">
                          <FaPhone size={20} />
                        </Link>
                      )}
                      {leader.linkedinUrl && (
                        <Link href={leader.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                          <FaLinkedin size={20} />
                        </Link>
                      )}
                      {leader.twitter && (
                        <Link href={leader.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                          <FaXTwitter size={20} />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
            </div>
        </Container>
    </section>
  )
}

export default Leaders
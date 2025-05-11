"use client";

import Image from "next/image";
import Container from "../../Container";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FiFacebook } from "react-icons/fi";
import Link from "next/link";
import navigationLinks from "./footerLinks"; // Ensure correct path

const footerData = {
  contact: [
    { icon: <FiFacebook size={27} />, text: "LACTISA" },
    { icon: <FaInstagram size={27} />, text: "LACTISA" },
    { icon: <MdOutlineEmail size={27} />, text: "lactisa031@gmail.com" },
    { icon: <FaWhatsapp size={27} />, text: "+254724807660" },
  ],
};


const splitIntoColumns = (array: { label: string; link: string }[], numCols: number) => {
  const columns: { label: string; link: string }[][] = Array.from({ length: numCols }, () => []);
  array.forEach((item, index) => {
    columns[index % numCols].push(item);
  });
  return columns;
};

const Footer = () => {
  const columns = splitIntoColumns(navigationLinks, 4);

  return (
    <footer>
      <div className="px-4 md:px-8 pb-10 w-full bg-gray-200 rounded-t-[5rem]">
        <Container>
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/logo.jpeg"
              width={500}
              height={500}
              alt="Logo"
              className="h-32 w-32 md:h-40 md:w-40 rounded-b-2xl"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 text-center md:text-left">
            <div className="grid gap-y-4 text-black">
              <h6 className="text-primary">Contact us:</h6>
              {footerData.contact.map((item, index) => (
                <div key={index} className="flex items-center justify-center md:justify-start gap-2">
                  {item.icon} <p>{item.text}</p>
                </div>
              ))}
            </div>

            {columns.map((column, colIndex) => (
              <div key={colIndex} className="grid gap-y-4 text-black">
                <h6 className="text-primary">Quick Links</h6>
                {column.map(({ label, link }, index) => (
                  <Link key={index} href={link} className="hover:text-secondary transition duration-150">
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;

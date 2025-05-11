"use client";

import Image from "next/image";
import Container from "../Container";
import { BookCheck, ChartCandlestick, Folders, LibraryBig, NotepadText, Search, TicketCheck, Video, X } from "lucide-react";
import React, { useState } from "react";
import { resources } from "./resources";

type ResourceType = "all" | "forms" | "videos" | "blogs" | "reports" | "publications" | "tickets";

const ResourcesDocsPage = () => {
  const [selectedType, setSelectedType] = useState<ResourceType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter(resource => {
    const matchesType = selectedType === "all" || resource.type === selectedType;
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getIconComponent = (type: string) => {
    switch(type) {
      case "forms": return <NotepadText size={24} />;
      case "videos": return <Video size={24} />;
      case "blogs": return <LibraryBig size={24} />;
      case "reports": return <ChartCandlestick size={24} />;
      case "publications": return <BookCheck size={24} />;
      case "tickets": return <TicketCheck size={24} />;
      default: return <Folders size={24} />;
    }
  };

  return (
    <Container>
      <div className="p-2 sm:p-4 md:p-6 lg:p-8">
        <h2 className="my-2 md:my-2 text-2xl lg:text-3xl text-primary text-center">
          Resource Center
        </h2>
        
        {/* Responsive Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">        
          <div className="flex justify-center">
            <Image 
              src="/recenter.jpg" 
              alt="Center image"
              width={400}
              height={400}
              className="h-48 2xl:h-72 sm:h-64 w-full object-cover rounded-lg"
              priority
            />
          </div>

          <div className="flex justify-center">
            <Image 
              src="/center.jpg" 
              alt="Center image"
              width={400}
              height={400}
              className="h-48 2xl:h-72 sm:h-64 w-full object-cover rounded-lg"
              priority
            />
          </div>

          <div className="flex justify-center">
            <Image
              src="/ladycenter.jpg"
              alt="Lady at center"
              width={400}
              height={400}
              className="h-48 2xl:h-72 sm:h-64 w-full object-cover rounded-lg"
              priority
            />
          </div>
        </div>

        {/* Responsive Filter Section */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <p className="text-xl sm:text-2xl text-center">Filter by type:</p>
          
          <div className="grid grid-cols-5 sm:grid-cols-4 md:flex md:flex-wrap justify-center gap-3 md:gap-4 lg:gap-6">
            {/* All Button */}
            <button 
              onClick={() => setSelectedType("all")}
              className="flex items-center justify-center gap-1 sm:gap-2 flex-col"
            >
              <div className={`p-1 sm:p-2 flex items-center text-amber-400 justify-center rounded-full ${selectedType === "all" ? "ring-2 sm:ring-4 ring-amber-400" : ""} bg-primary w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20`}>
                <Folders className="w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10" />
              </div>
              <p className="text-sm sm:text-sm md:text-base">All</p>
            </button>

            {/* Other Filter Buttons */}
            {[
              { type: "forms", icon: <NotepadText />, label: "Forms" },
              { type: "videos", icon: <Video />, label: "Videos" },
              { type: "blogs", icon: <LibraryBig />, label: "Blogs" },
              { type: "reports", icon: <ChartCandlestick />, label: "Reports" },
              { type: "publications", icon: <BookCheck />, label: "Publications" },
              { type: "tickets", icon: <TicketCheck />, label: "Tickets" },
            ].map((item) => (
              <button 
                key={item.type}
                onClick={() => setSelectedType(item.type as ResourceType)}
                className="flex items-center justify-center gap-1 sm:gap-2 flex-col"
              >
                <div className={`p-1 sm:p-2 flex items-center text-amber-400 justify-center rounded-full ${selectedType === item.type ? "ring-2 sm:ring-4 ring-amber-400" : ""} bg-primary w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20`}>
                  {React.cloneElement(item.icon, { className: "w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10" })}
                </div>
                <p className="text-sm sm:text-sm md:text-base">{item.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Search Field */}
        <div className="mb-6 w-full max-w-md mx-auto px-4 sm:px-0">
          <div className="relative flex items-center">
            <div className="absolute left-3 text-gray-400">
              <Search className="w-5 h-5 sm:w-5 sm:h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Search resources..." 
              className="w-full h-12 pl-9 sm:pl-10 pr-9 sm:pr-10 py-1 sm:py-2 text-sm sm:text-base border-2 border-primary rounded-lg outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-gray-500 hover:text-primary transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 p-2 sm:p-4">
          {filteredResources.map((resource) => (
            <div 
              key={`${resource.type}-${resource.name}`}
              className="flex flex-col items-center p-3 sm:p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-2 sm:mb-3 p-3 sm:p-4 bg-white rounded-full">
                {getIconComponent(resource.type)}
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-medium text-center mb-1 sm:mb-2">{resource.name}</h3>
              {resource.type === "forms" && (
                <div className="flex items-center gap-1 sm:gap-2 text-primary mt-1 sm:mt-2">
                  <NotepadText className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-sm">PDF Document</span>
                </div>
              )}
              <a 
                href={resource.source} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-2 sm:mt-4 px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                View Resource
              </a>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ResourcesDocsPage;
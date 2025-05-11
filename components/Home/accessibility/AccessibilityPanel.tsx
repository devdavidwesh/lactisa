// components/AccessibilityPanel.tsx
'use client';

import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useAccessibility } from './AccessibilityContext';
import { FaWheelchair } from 'react-icons/fa';

export const AccessibilityPanel = () => {
  const { 
    settings, 
    toggleHighContrast, 
    toggleLargeText, 
    toggleUnderlineLinks, 
    resetAccessibility 
  } = useAccessibility();
  
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Debugging
  useEffect(() => {
  }, [isOpen]);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-20 left-4 z-[1000]"> {/* Increased z-index */}
      {/* Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        aria-label="Accessibility options"
        aria-expanded={isOpen}
        className="p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primaryFade transition-colors"
      >
        {isOpen ? <X size={24} /> : <FaWheelchair size={24} />}
      </button>

      {/* Panel that slides in - Added border for visibility during debugging */}
      <div
        ref={panelRef}
        className={`absolute left-14 top-0 bg-white shadow-lg rounded-lg p-4 w-64 transition-all duration-300 ease-in-out border-2 border-secondary ${isOpen ? 'translate-x-0 opacity-100 visible' : '-translate-x-80 opacity-0 invisible'}`}
        style={{ zIndex: 1001 }} // Ensure panel is above other elements
      >
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <FaWheelchair size={20} className="text-secondary" />
          Accessibility Options
        </h2>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => {
              toggleHighContrast();
            }}
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded ${settings.highContrast ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <div className={`w-4 h-4 rounded-full border ${settings.highContrast ? 'bg-white border-white' : 'bg-transparent border-gray-400'}`}></div>
            High Contrast
          </button>
          
          {/* Other buttons remain the same */}
          <button 
            onClick={toggleLargeText}
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded ${settings.largeText ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <div className={`w-4 h-4 rounded-full border ${settings.largeText ? 'bg-white border-white' : 'bg-transparent border-gray-400'}`}></div>
            Large Text
          </button>
          
          <button 
            onClick={toggleUnderlineLinks}
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded ${settings.underlineLinks ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <div className={`w-4 h-4 rounded-full border ${settings.underlineLinks ? 'bg-white border-white' : 'bg-transparent border-gray-400'}`}></div>
            Underline Links
          </button>
          
          <button 
            onClick={resetAccessibility}
            className="px-3 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200 mt-2 flex items-center gap-2 justify-center"
          >
            <X size={16} />
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};
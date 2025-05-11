// components/AccessibilityToolbar.tsx
'use client';

import { useAccessibility } from "./AccessibilityContext";


export const AccessibilityToolbar = () => {
  const { 
    settings, 
    toggleHighContrast, 
    toggleLargeText, 
    toggleUnderlineLinks, 
    resetAccessibility 
  } = useAccessibility();

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2">
      <h2 className="font-bold text-sm mb-1">Accessibility</h2>
      <button 
        onClick={toggleHighContrast}
        className={`px-3 py-1 text-sm rounded ${settings.highContrast ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        High Contrast
      </button>
      <button 
        onClick={toggleLargeText}
        className={`px-3 py-1 text-sm rounded ${settings.largeText ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        Large Text
      </button>
      <button 
        onClick={toggleUnderlineLinks}
        className={`px-3 py-1 text-sm rounded ${settings.underlineLinks ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        Underline Links
      </button>
      <button 
        onClick={resetAccessibility}
        className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 mt-2"
      >
        Reset All
      </button>
    </div>
  );
};
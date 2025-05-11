'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type AccessibilitySettings = {
  highContrast: boolean;
  largeText: boolean;
  underlineLinks: boolean;
};

type AccessibilityContextType = {
  settings: AccessibilitySettings;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleUnderlineLinks: () => void;
  resetAccessibility: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    underlineLinks: false
  });

  const toggleHighContrast = () => {
    setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const toggleLargeText = () => {
    setSettings(prev => ({ ...prev, largeText: !prev.largeText }));
  };

  const toggleUnderlineLinks = () => {
    setSettings(prev => ({ ...prev, underlineLinks: !prev.underlineLinks }));
  };

  const resetAccessibility = () => {
    setSettings({
      highContrast: false,
      largeText: false,
      underlineLinks: false
    });
  };

  return (
    <AccessibilityContext.Provider 
      value={{ 
        settings, 
        toggleHighContrast, 
        toggleLargeText, 
        toggleUnderlineLinks, 
        resetAccessibility 
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
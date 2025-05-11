// components/AccessibilityGlobalStyles.tsx
'use client';

import { useEffect } from 'react';
import { useAccessibility } from './AccessibilityContext';

export const AccessibilityGlobalStyles = () => {
  const { settings } = useAccessibility();

  useEffect(() => {
    // Apply classes to the root element
    const html = document.documentElement;
    
    if (settings.highContrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }
    
    if (settings.largeText) {
      html.classList.add('large-text');
    } else {
      html.classList.remove('large-text');
    }
    
    if (settings.underlineLinks) {
      html.classList.add('underline-links');
    } else {
      html.classList.remove('underline-links');
    }
  }, [settings]);

  return null;
};
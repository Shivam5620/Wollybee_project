'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const ScrollHandler = () => {
  const [lastScrollY, setLastScrollY] = useState(600);
  const pathname = usePathname(); // Get the current pathname

  const controlHeaderVisibility = () => {
    const header = document.getElementById('wollybee-header');

    if (window.innerWidth <= 768) {
      if (window.scrollY > 100) {
        if (window.scrollY > lastScrollY) {
          // Add the Tailwind class to hide the header (translate it up)
          header?.classList.add('-translate-y-full');
        } else {
          // Remove the Tailwind class to show the header
          header?.classList.remove('-translate-y-full');
        }
        setLastScrollY(window.scrollY);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', controlHeaderVisibility);

    return () => {
      window.removeEventListener('scroll', controlHeaderVisibility);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const header = document.getElementById('wollybee-header');
    header?.classList.remove('-translate-y-full'); // Show header on path change
    setLastScrollY(window.scrollY); // Reset last scroll position
  }, [pathname]);

  return null; // No UI to render, just logic
};

export default ScrollHandler;

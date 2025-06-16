'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook to determine if the viewport is considered "desktop" size.
 * It listens to viewport changes and updates the state accordingly.
 * 
 * /!\ This should only be used in components where you can't handle the media query directly in CSS,
 * mostly for accessibility concerns, avoiding double rendering on screen readers.
 */

const desktopBreakpoint = '90rem';

export function useIsDesktop() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        // Skip SSR
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia(`screen and (min-width: ${desktopBreakpoint})`);

        const handleResize = () => setIsDesktop(mediaQuery.matches);

        // Initial check
        handleResize();

        // Listen to viewport changes
        mediaQuery.addEventListener('change', handleResize);

        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    return isDesktop;
}

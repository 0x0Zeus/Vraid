'use client'

import { useEffect, useState} from 'react'

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      // Initial check
      checkIfMobile();

      // Add event listner for window resize
      window.addEventListener('resize', checkIfMobile);

      // Clean up
      return () => window.removeEventListener('resize', checkIfMobile);
    }
  }, [])

  return isMobile
}

export default useMobile
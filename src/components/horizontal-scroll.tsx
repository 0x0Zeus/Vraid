'use client'

import { useEffect } from 'react'

const useHorizontalScroll = () => {
  useEffect(() => {
    const handleWheel = (e: Event) => {
      const wheelEvent = e as WheelEvent;
      if (wheelEvent.deltaY !== 0) {
        e.preventDefault()
        const element = e.currentTarget as HTMLElement
        element.scrollLeft += wheelEvent.deltaY
      }
    }
    
    const handleMouseEnter = () => {
      document.body.style.overflow = 'hidden'
    }
    
    const handleMouseLeave = () => {
      document.body.style.overflow = ''
    }
    
    const setupScrollElements = () => {
      const scrollElements = document.querySelectorAll('.horizontal-scroll')
      
      scrollElements.forEach((element) => {
        element.addEventListener('wheel', handleWheel, { passive: false })
        element.addEventListener('mouseenter', handleMouseEnter)
        element.addEventListener('mouseleave', handleMouseLeave)
      })
      
      return () => {
        scrollElements.forEach((element) => {
          element.removeEventListener('wheel', handleWheel)
          element.removeEventListener('mouseenter', handleMouseEnter)
          element.removeEventListener('mouseleave', handleMouseLeave)
        })
      }
    }
    
    const cleanup = setupScrollElements()
    
    window.addEventListener('resize', setupScrollElements)
    
    return () => {
      cleanup()
      window.removeEventListener('resize', setupScrollElements)
    }
  }, [])
}

export default useHorizontalScroll

'use client'

import { createContext, useContext, useState } from "react";

type Display = 'list' | 'grid'

interface DisplayContextType {
  displayWay: Display
  toggleDisplayWay: () => void
}

const DisplayContext = createContext<DisplayContextType | undefined>(undefined)

export function DisplayProvider({children}: {children: React.ReactNode}) {
  const [displayWay, setDisplayWay] = useState<Display>('list')

  const toggleDisplayWay = () => {
    setDisplayWay(displayWay === 'list' ? 'grid' : 'list')
  }

  return (
    <DisplayContext.Provider value={{displayWay, toggleDisplayWay}}>
      {children}
    </DisplayContext.Provider>
  )
}

export function useDisplay() {
  const context = useContext(DisplayContext)
  if (context === undefined) {
    throw new Error('useDisplay must be used within a DisplayProvider')
  }
  return context
}
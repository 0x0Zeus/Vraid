'use client'

import { ChosenDataType, EventContextType, eventData } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";

const EventContext = createContext<EventContextType | null>(null)

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [event, setEvent] = useState<eventData | undefined>(undefined)
  const [chosenIndex, setChosenIndex] = useState<ChosenDataType>({ type: null, num: 0 })
  const [market, setMarket] = useState<'sell' | 'buy'>('buy')

  useEffect(() => {
    console.log("=====", chosenIndex)
  }, [chosenIndex])

  return (
    <EventContext.Provider value={{ event, setEvent, chosenIndex, setChosenIndex, market, setMarket }}>
      { children }
    </EventContext.Provider >
  )
}

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
}

export default EventContext
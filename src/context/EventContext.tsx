'use client'

import { EventContextType, eventData } from "@/lib/types";
import { createContext, useContext, useState } from "react";

const EventContext = createContext<EventContextType | null>(null)

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [event, setEvent] = useState<eventData | undefined>(undefined)

  return (
    <EventContext.Provider value={{ event, setEvent }}>
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
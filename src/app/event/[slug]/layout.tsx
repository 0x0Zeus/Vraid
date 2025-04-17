import { EventProvider } from "@/context/EventContext"

const EventLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <EventProvider>
        {children}
      </EventProvider>
    </>
  )
}

export default EventLayout
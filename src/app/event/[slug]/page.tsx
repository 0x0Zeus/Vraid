'use client'

import Chart from "@/components/event/Chart";
import MarketCard from "@/components/event/MarketCard";
import SubMarkets from "@/components/event/SubMarkets";
import { useEventContext } from "@/context/EventContext";
import { events } from "@/lib/events";
import { eventData } from "@/lib/types";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react"

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  // Get the corresponding event data from the slug
  const { slug } = use(params);
  const {event, setEvent} = useEventContext()
  
  useEffect(() => {
    const data = events.find((event: eventData) => event.slug === slug);
    setEvent(data);
  }, [])

  // Monitoring scroll action
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  // changing buy or sell
  const [market, setMarket] = useState<'sell' | 'buy'>('buy');
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  
  const changeMarket = (m: string) => {
    setMarket(m as 'sell' | 'buy');
  }
  
  const changeSelectedPrice = (index: number) => {
    setSelectedPrice(index);
  }

  return (
    <div className="p-10 flex items-start justify-between gap-6">
      <div className="space-y-10 flex-1 relative">
        <div
          ref={headerRef}
          className={`flex items-center gap-3 sticky top-[130px] backdrop-blur-[20px] z-10 py-5 border-b ${scrolled ? ' border-[#d9d9d9]/30' : 'border-none'}`}>
          <Image
            src={`/${event?.icon}.png`}
            alt={event?.title || "Event"}
            width={256}
            height={256}
            className={`transition-all duration-300 ${scrolled ? 'h-8 w-auto' : 'h-12 w-auto'}`}
          />
          <span className={`font-bold transition-all duration-300 ${scrolled ? 'text-lg' : 'text-2xl'}`}>{event?.title}</span>
        </div>
        <p className="border border-[#d9d9d9]/30 rounded-md p-10 py-6">{event?.des}</p>
        <div className="border border-[#d9d9d9]/30 rounded-md p-10 w-full h-[500px]">
          <Chart />
        </div>
        <div className="border border-[#d9d9d9]/30 rounded-md p-10 w-full">
          <SubMarkets market={market} changeSelectedPrice={changeSelectedPrice} />
        </div>
      </div>
      <MarketCard market={market} selectedPrice={selectedPrice} changeMarket={changeMarket} />
    </div>
  )
}

export default Page
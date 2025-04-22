"use client";

import Chart from "@/components/event/Chart";
import MarketCard from "@/components/event/MarketCard";
import SubMarkets from "@/components/event/SubMarkets";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEventContext } from "@/context/EventContext";
import { events } from "@/lib/events";
import { eventData } from "@/lib/types";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  
  // Get the corresponding event data from the slug
  const { slug } = use(params);
  const { event, setEvent } = useEventContext();

  useEffect(() => {
    const data = events.find((event: eventData) => event.slug === slug);
    setEvent(data);
  }, [slug, setEvent]);

  // Monitoring scroll action
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // changing buy or sell
  const [market, setMarket] = useState<"sell" | "buy">("buy");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeMarket = (m: string) => {
    setMarket(m as "sell" | "buy");
  };

  const changeSelectedIndex = (index: number) => {
    setSelectedPrice(index);
  };

  // Function to open modal on mobile
  const openMarketCardModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="md:p-6 lg:p-10 flex flex-col lg:flex-row items-start justify-between gap-6">
      <div className="space-y-6 md:space-y-8 lg:space-y-10 flex-1 relative w-full max-sm:mb-10">
        <div
          ref={headerRef}
          className={`p-4 flex items-center gap-3 sticky top-[60px] sm:top-[70px] md:top-[100px] lg:top-[130px] backdrop-blur-[20px] z-10 py-3 md:py-4 lg:py-5 border-b ${
            scrolled ? " border-[#d9d9d9]/30" : "border-none"
          }`}
        >
          <Image
            src={`/${event?.icon}.svg`}
            alt={event?.title || "Event"}
            width={256}
            height={256}
            className={`transition-all duration-300 ${
              scrolled
                ? "h-6 md:h-7 lg:h-8 w-auto"
                : "h-8 md:h-10 lg:h-12 w-auto"
            }`}
          />
          <span
            className={`font-bold transition-all duration-300 ${
              scrolled
                ? "text-base md:text-lg"
                : "text-lg md:text-xl lg:text-2xl"
            }`}
          >
            {event?.title}
          </span>
        </div>
        <p className="mx-4 border border-[#d9d9d9]/30 rounded-md p-4 md:p-6 lg:p-10 py-4 md:py-5 lg:py-6">
          {event?.des}
        </p>
        <div className="p-4">
          <div className="border border-[#d9d9d9]/30 rounded-md p-4 md:p-6 lg:p-10 w-full h-[300px] md:h-[400px] lg:h-[500px]">
            <Chart />
          </div>
        </div>
        <div className="p-4">
          <div className="border border-[#d9d9d9]/30 rounded-md p-4 md:p-6 lg:p-10 w-full">
            <SubMarkets
              changeSelectedIndex={changeSelectedIndex}
              openMarketCardModal={openMarketCardModal}
            />
          </div>
        </div>
      </div>

      {/* Desktop version */}
      <div className="max-sm:hidden w-full lg:w-auto mt-6 lg:mt-0">
        <MarketCard selectedPrice={selectedPrice} />
      </div>

      {/* Mobile version as Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <div className="p-4">
          <DialogContent className="w-full max-w-md border-[#d9d9d9]/30">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription>
                
              </DialogDescription>
            </DialogHeader>
            <MarketCard selectedPrice={selectedPrice} />
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default Page;

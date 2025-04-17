'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { eventData, price } from "@/lib/types";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Input } from "../ui/input";
import MarketTrader from "./market/MarketTrader";
import { useEventContext } from "@/context/EventContext";

const MarketCard = (
  {
    market,
    selectedPrice,
    changeMarket
  }: {
    market: 'buy' | 'sell';
    selectedPrice: number;
    changeMarket: (market: string) => void
  }) => {

  const { event } = useEventContext();
  // Get chosen sub market data
  const [prices, setPrices] = useState<price>();
  useEffect(() => {
    if (event !== undefined) {
      const priceList = event[market as keyof typeof event] as price[]
      setPrices(priceList[selectedPrice])
    }
  }, [market, selectedPrice, event])

  const [marketType, setMarketType] = useState<'market' | 'limit'>('market');
  // const [profit, setProfit] = useState<number>(0)

  // const [limitPrice, setLimitPrice] = useState<number>(0)
  // const [shares, setShares] = useState<number>(1)

  // useEffect(() => {
  //   if (prices && prices[selectedPrice]?.yes !== undefined) {
  //     setLimitPrice(prices[selectedPrice].yes)
  //   }
  // }, [prices, selectedPrice])

  return (
    <div className="border border-[#d9d9d9]/30 rounded-md py-5 w-[350px] sticky top-[170px] self-start">
      <div className="flex items-center gap-5 px-7">
        <Image
          src={`/${event?.icon}.png`}
          alt={event?.title || "Event"}
          width={256}
          height={256}
          className={`h-8 w-auto`}
        />
        <span className="text-lg font-medium">${prices?.outcome}</span>
      </div>
      <div className="mt-5">
        <Tabs defaultValue="buy" className="">
          <div className="border-b border-[#d9d9d9]/30 px-7 flex items-end justify-between">
            <TabsList className="bg-transparent space-x-5">
              <TabsTrigger value="buy" onClick={() => changeMarket('buy')} className="hover:text-[#ff4500] cursor-pointer data-[state=active]:text-[#ff4500] px-0 text-lg border-b hover:border-[#ff4500] data-[state=active]:border-[#ff4500] transitaion-all duration-300 ease-initial">
                Buy
              </TabsTrigger>
              <TabsTrigger value="sell" onClick={() => changeMarket('sell')} className="hover:text-[#ff4500] cursor-pointer data-[state=active]:text-[#ff4500] px-0 text-lg border-b hover:border-[#ff4500] data-[state=active]:border-[#ff4500] transitaion-all duration-300 ease-initial">
                Sell
              </TabsTrigger>
            </TabsList>
            <Select onValueChange={(value) => setMarketType(value as 'market' | 'limit')}>
              <SelectTrigger className="border-none focus-visible:ring-0 cursor-pointer">
                <SelectValue placeholder="Market" />
              </SelectTrigger>
              <SelectContent className="bg-black border-[#d9d9d9]/30 text-white" align="end">
                <SelectItem value="market" className="focus:bg-[#d9d9d9]/10 focus:text-white">Market</SelectItem>
                <SelectItem value="limit" className="focus:bg-[#d9d9d9]/10 focus:text-white">Limit</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <TabsContent value="buy" >
            <MarketTrader type="buy" marketType={marketType} prices={prices} />
          </TabsContent>
          <TabsContent value="sell">
            <MarketTrader type="sell" marketType={marketType} prices={prices} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default MarketCard
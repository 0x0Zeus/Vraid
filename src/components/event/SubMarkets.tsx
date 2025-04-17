import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useEventContext } from "@/context/EventContext";
import { price } from "@/lib/types";
import { useEffect, useState } from "react";

const SubMarkets = (
  {
    market,
    changeSelectedPrice
  }: {
    market: 'sell' | 'buy';
    changeSelectedPrice: (index: number) => void
  }) => {
  const { event } = useEventContext()

  // Get sub market data
  const [prices, setPrices] = useState<price[]>([]);
  useEffect(() => {
    if (event !== undefined) {
      const priceList = event[market as keyof typeof event] as price[]
      setPrices(priceList)
    }
  }, [market, event])

  return (
    <Table>
      <TableHeader className="">
        <TableRow className="border-[#d9d9d9]/30 text-lg font-medium">
          <TableCell className="pl-10">
            OUTCOME
          </TableCell>
          <TableCell className="w-[300px] pr-10">
            CHANCE %
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prices.map((price, index) => (
          <TableRow key={index} className="border-[#d9d9d9]/30 text-base hover:bg-[#ffffff]/10 cursor-pointer" onClick={() => changeSelectedPrice(index)}>
            <TableCell className="pl-10">
              <div className="flex flex-col py-2">
                <p className="">${price.outcome.toLocaleString()}</p>
                <p>${event?.volume.toLocaleString()} VOL</p>
              </div>
            </TableCell>
            <TableCell className="pr-10">
              <div className="flex gap-5">
                <span className="text-right">{price.chance}%</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { }}
                    className={`relative px-3 h-7 rounded-full bg-[#00FFB2]/20 text-[#00FFB2] text-sm cursor-pointer group hover:bg-[#00FFB2]/50`}
                  >
                    <span className="block capitalize">{market} Yes {price.yes}¢</span>
                  </button>
                  <button
                    onClick={() => { }}
                    className={`relative px-3 h-7 rounded-full bg-[#FF6B00]/20 text-[#FF6B00] text-sm cursor-pointer group hover:bg-[#FF6B00]/50`}
                  >
                    <span className="block capitalize">{market} No {price.no}¢</span>
                  </button>
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default SubMarkets
import { Button } from "@/components/ui/button"
import { price } from "@/lib/types"
import MarketBuy from "./buy/MarketBuy"
import LimitBuy from "./buy/LimitBuy"
import MarketSell from "./sell/MarketSell"
import LimitSell from "./sell/LimitSell"
import { useEffect, useState } from "react"

const MarketTrader = ({
  type,
  marketType,
  prices,
}: {
  type: 'buy' | 'sell'
  marketType: 'market' | 'limit'
  prices: price | undefined
}) => {
  const [chosenIndex, setChosenIndex] = useState<'yes' | 'no'>('yes')
  const [chosenPrice, setChosenPrice] = useState<number | undefined>()

  useEffect(() => {
    setChosenPrice(prices?.[chosenIndex] ?? 0)
  }, [prices, chosenIndex])

  return (
    <div className="flex flex-col items-center w-full  px-7">
      <div className="flex items-center gap-2 py-5 w-full justify-around">
        <button
          onClick={() => setChosenIndex('yes')}
          className={`
            relative w-32 h-10 rounded-full text-[#00FFB2] text-base cursor-pointer group transition-all duration-300 ease-initial
            ${chosenIndex === 'yes'
              ? 'bg-[#00FFB2]/50 text-white'
              : 'bg-[#00FFB2]/20'
            }
            hover:bg-[#00FFB2]/50 hover:text-white
          `}
        >
          <span className="block">Yes {prices?.yes}¢</span>
        </button>
        <button
          onClick={() => setChosenIndex('no')}
          className={`
          relative w-32 h-10 rounded-full text-[#ff6b00] text-base cursor-pointer group transition-all duration-300 ease-initial
          ${chosenIndex === 'no'
              ? 'bg-[#ff6b00]/50 text-white'
              : 'bg-[#ff6b00]/20'
            }
          hover:bg-[#ff6b00]/50 hover:text-white
        `}
        >
          <span className="block">No {prices?.no}¢</span>
        </button>
      </div>
      {
        type === 'buy' ?
          marketType === 'market' ?
            <MarketBuy price={chosenPrice} /> :
            <LimitBuy price={chosenPrice} /> :
          marketType === 'market' ?
            <MarketSell prices={prices} /> :
            <LimitSell prices={prices} />
      }
      <div className="px-5 w-full">
        <Button variant="outline" className="capitalize w-full cursor-pointer hover:shadow-[0_0_10px_rgba(255,69,0)] text-[#ff4500] border-[#ff4500]/80 hover:bg-[#ff4500]/80 hover:text-white text-lg">
          login to trade
        </Button>
      </div>
    </div>
  )
}

export default MarketTrader
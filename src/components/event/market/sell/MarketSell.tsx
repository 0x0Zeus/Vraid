import { Input } from "@/components/ui/input"
import { price } from "@/lib/types"
import { useState } from "react"

const SHARES_MAX = 999;

const MarketSell = ({ price }: { price: number | undefined }) => {
  const [shares, setShares] = useState<number>(0)

  return (
    <>
      <div className="w-full flex items-end justify-between text-lg mb-5">
        <span>Shares</span>
        <Input
          value={`${shares}`}
          onChange={(e) => setShares(parseInt(e.target.value))}
          className="text-right border border-[#d9d9d9]/30 rounded-md focus-visible:ring-0 w-[100px]"
        />
      </div>
      <div className="flex items-end justify-end w-full gap-2 mb-5">
        <button
          onClick={() => setShares(Math.floor(SHARES_MAX * 0.25))}
          className="text-sm border border-[#d9d9d9]/30 rounded-md bg-transparent h-8 w-12 cursor-pointer hover:bg-[#d9d9d9]/30"
        >
          25%
        </button>
        <button
          onClick={() => setShares(Math.floor(SHARES_MAX * 0.50))}
          className="text-sm border border-[#d9d9d9]/30 rounded-md bg-transparent h-8 w-12 cursor-pointer hover:bg-[#d9d9d9]/30"
        >
          50%
        </button>
        <button
          onClick={() => setShares(SHARES_MAX)}
          className="text-sm border border-[#d9d9d9]/30 rounded-md bg-transparent h-8 w-12 cursor-pointer hover:bg-[#d9d9d9]/30"
        >
          Max
        </button>
      </div>
      {shares > 0 && (
        <div className="border-t-2 border-[#d9d9d9]/30 w-full flex items-end justify-between py-5">
          <span className="text-lg font-medium">Profit</span>
          <span className="text-2xl font-medium text-[#00FFB2]">${price ? (shares * price / 100).toFixed(2) : 0}</span>
        </div>
      )}
    </>
  )
}

export default MarketSell
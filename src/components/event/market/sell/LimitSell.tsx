import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { price } from "@/lib/types"
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const SHARE_MIN = 0;
const SHARE_MAX = 999;

const LimitSell = ({ price }: { price: number | undefined }) => {
  const [limitPrice, setLimitPrice] = useState<number>(0);
  const [shares, setShares] = useState<number>(0)

  const clampShares = (value: number) => Math.min(SHARE_MAX, Math.max(SHARE_MIN, value))

  useEffect(() => {
    setLimitPrice(price ?? 0)
  }, [price])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/^\¢/, ""); // Remove leading $
    // Remove all non-digit/non-dot characters
    value = value.replace(/[^0-9.]/g, "");
    // Allow only one decimal point
    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }
    // Remove leading zeros unless it's like "0." or "0"
    if (value.startsWith("0") && !value.startsWith("0.") && value.length > 1) {
      value = value.replace(/^0+/, "");
      if (value === "") value = "0";
    }
    setLimitPrice(parseFloat(value) || 0);
  };

  return (
    <>
      <div className="w-full flex items-center justify-between text-base mb-5 ">
        <span className="capitalize">Limit Price</span>
        <div className="flex items-center w-[150px] text-sm">
          <Button variant="outline" className="border border-[#d9d9d9]/30 rounded-r-none border-r-0 cursor-pointer" onClick={() => setLimitPrice(limit => limit - 0.1)}>
            <FaMinus size={14} />
          </Button>
          <Input
            value={`${limitPrice.toString()}¢`}
            onChange={handleChange}
            className="text-center border border-[#d9d9d9]/30 rounded-none focus-visible:ring-0" />
          <Button variant="outline" className="border border-[#d9d9d9]/30 border-l-0 rounded-l-none cursor-pointer" onClick={() => setLimitPrice(limit => limit + 0.1)}>
            <FaPlus size={14} />
          </Button>
        </div>
      </div>
      <div className="border-t-2 border-[#d9d9d9]/30 py-5 w-full">
        <div className="w-full flex items-center justify-between text-base mb-5 ">
          <span className="capitalize">Shares</span>
          <div className="flex items-center w-[150px] text-sm">
            <Input
              value={`${shares}`}
              min={SHARE_MIN}
              max={SHARE_MAX}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10) || SHARE_MIN;
                setShares(clampShares(val));
              }}
              className="text-right border border-[#d9d9d9]/30 rounded-md focus-visible:ring-0" />
          </div>
        </div>
        <div className="w-full flex items-center justify-end gap-2">
          <button
            onClick={() => setShares(Math.floor(SHARE_MAX * 0.25))}
            className="text-sm border border-[#d9d9d9]/30 rounded-md bg-transparent h-8 w-12 cursor-pointer hover:bg-[#d9d9d9]/30"
          >
            25%
          </button>
          <button
            onClick={() => setShares(Math.floor(SHARE_MAX * 0.50))}
            className="text-sm border border-[#d9d9d9]/30 rounded-md bg-transparent h-8 w-12 cursor-pointer hover:bg-[#d9d9d9]/30"
          >
            50%
          </button>
          <button
            onClick={() => setShares(SHARE_MAX)}
            className="text-sm border border-[#d9d9d9]/30 rounded-md bg-transparent h-8 w-12 cursor-pointer hover:bg-[#d9d9d9]/30"
          >
            Max
          </button>
        </div>
      </div>
      {shares > 0 && (
        <div className="w-full space-y-2 py-5 border-t-2 border-[#d9d9d9]/30">
          <div className="w-full flex items-end justify-between">
            <span className="text-lg font-medium">You will Receive</span>
            <span className="text-2xl font-medium text-[#FF6b00]">${(limitPrice / 100 * shares).toFixed(2)}</span>
          </div>
        </div>
      )}
    </>
  )
}

export default LimitSell
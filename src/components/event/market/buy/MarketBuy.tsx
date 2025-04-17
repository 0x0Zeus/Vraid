import { Input } from "@/components/ui/input";
import { price } from "@/lib/types";
import { useState } from "react";

const MarketBuy = ({ price }: { price: number | undefined }) => {
  const [amount, setAmount] = useState<string>("0");

  const amountNumber = parseFloat(amount) || 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/^\$/, ""); // Remove leading $
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
    setAmount(value);
  };

  return (
    <>
      <div className="w-full flex items-end justify-between text-lg mb-5">
        <span>Amount</span>
        <Input
          value={`$${amount}`}
          onChange={handleChange}
          className="text-right border border-[#d9d9d9]/30 rounded-md focus-visible:ring-0 w-[100px]"
        />
      </div>
      <div className="flex items-end justify-end w-full gap-2 mb-5">
        <button
          onClick={() => setAmount(amount => amount += 1)}
          className="text-sm border border-[#d9d9d9]/30 rounded-md bg-transparent h-8 w-12 cursor-pointer hover:bg-[#d9d9d9]/30"
        >
          +$1
        </button>
        <button
          onClick={() => setAmount(amount => amount += 20)}
          className="text-sm border border-[#d9d9d9]/30 rounded-md bg-transparent h-8 w-12 cursor-pointer hover:bg-[#d9d9d9]/30"
        >
          +$20
        </button>
        <button
          onClick={() => setAmount(amount => amount += 100)}
          className="text-sm border border-[#d9d9d9]/30 rounded-md bg-transparent h-8 w-12 cursor-pointer hover:bg-[#d9d9d9]/30"
        >
          +$100
        </button>
        <button
          onClick={() => setAmount(amount => amount += 200)}
          className="text-sm border border-[#d9d9d9]/30 rounded-md bg-transparent h-8 w-12 cursor-pointer hover:bg-[#d9d9d9]/30"
        >
          Max
        </button>
      </div>
      {amountNumber !== 0 && (
        <div className="border-t-2 border-[#d9d9d9]/30 w-full flex items-end justify-between py-5">
          <span className="text-lg font-medium">Profit</span>
          <span className="text-2xl font-medium text-[#00FFB2]">${price ? (amountNumber / price * 100).toFixed(2) : '0.00'}</span>
        </div>
      )}
    </>
  )
}

export default MarketBuy
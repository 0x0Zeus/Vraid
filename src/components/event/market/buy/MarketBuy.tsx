import { Input } from "@/components/ui/input";
import { price } from "@/lib/types";
import { useState } from "react";

const MarketBuy = ({ price }: { price: number | undefined }) => {
  const [amount, setAmount] = useState("0");

  return (
    <>
      <div className="w-full flex items-end justify-between text-lg mb-5">
        <span>Amount</span>
        <Input
          value={`$${amount}`}
          onChange={(e) => {
            let value = e.target.value.replace(/^\$/, "");
            if (/^\d*\.?\d*$/.test(value)) {
              if (value.startsWith('.')) {
                value = '0' + value;
              }
              const normalizedValue = value.replace(/^0+(?=\d)/, '');
              setAmount(normalizedValue === "" ? "0" : normalizedValue)
            }
          }}
          className="text-right border border-[#d9d9d9]/30 rounded-md focus-visible:ring-0 w-[100px]"
        />
      </div>
      <div className="flex items-end justify-end w-full gap-2 mb-5">
        <button
          onClick={() => setAmount((amount) => (Number(amount) + 1).toString())}
          className="text-sm border border-[#d9d9d9]/30 rounded-md bg-transparent h-8 w-12 cursor-pointer hover:bg-[#d9d9d9]/30"
        >
          +$1
        </button>
        <button
          onClick={() =>
            setAmount((amount) => (Number(amount) + 20).toString())
          }
          className="text-sm border border-[#d9d9d9]/30 rounded-md bg-transparent h-8 w-12 cursor-pointer hover:bg-[#d9d9d9]/30"
        >
          +$20
        </button>
        <button
          onClick={() =>
            setAmount((amount) => (Number(amount) + 100).toString())
          }
          className="text-sm border border-[#d9d9d9]/30 rounded-md bg-transparent h-8 w-12 cursor-pointer hover:bg-[#d9d9d9]/30"
        >
          +$100
        </button>
        <button
          onClick={() => setAmount("200")}
          className="text-sm border border-[#d9d9d9]/30 rounded-md bg-transparent h-8 w-12 cursor-pointer hover:bg-[#d9d9d9]/30"
        >
          Max
        </button>
      </div>
      {Number(amount) !== 0 && (
        <div className="border-t-2 border-[#d9d9d9]/30 w-full flex items-end justify-between py-5">
          <span className="text-lg font-medium">Profit</span>
          <span className="text-2xl font-medium text-[#00FFB2]">
            ${price ? ((Number(amount) / price) * 100).toFixed(2) : "0.00"}
          </span>
        </div>
      )}
    </>
  );
};

export default MarketBuy;

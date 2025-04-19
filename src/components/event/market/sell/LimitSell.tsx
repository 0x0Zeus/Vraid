import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { price } from "@/lib/types";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const SHARE_MIN = 0;
const SHARE_MAX = 999;

const LimitSell = ({ price }: { price: number | undefined }) => {
  const [amount, setAmount] = useState("0");
  const [shares, setShares] = useState("0");

  return (
    <>
      <div className="w-full flex items-center justify-between text-base mb-5 ">
        <span className="capitalize">Limit Price</span>
        <div className="flex items-center w-[150px] text-sm">
          <Button
            variant="outline"
            className="border border-[#d9d9d9]/30 rounded-r-none border-r-0 cursor-pointer"
            onClick={() =>
              setAmount((amount) =>
                Math.max(0, parseFloat(amount) - 0.1).toFixed(1)
              )
            }
          >
            <FaMinus size={14} />
          </Button>
          <Input
            value={`${amount}`}
            onChange={(e) => {
              let value = e.target.value.replace(/^\$/, "");
              if (/^\d*\.?\d*$/.test(value)) {
                if (value.startsWith(".")) {
                  value = "0" + value;
                }
                const normalizedValue = value.replace(/^0+(?=\d)/, "");
                setAmount(
                  normalizedValue === ""
                    ? "0"
                    : Number(normalizedValue).toFixed(1)
                );
              }
            }}
            className="text-center border border-[#d9d9d9]/30 rounded-none focus-visible:ring-0"
          />
          <Button
            variant="outline"
            className="border border-[#d9d9d9]/30 border-l-0 rounded-l-none cursor-pointer"
            onClick={() =>
              setAmount((amount) =>
                Math.max(0, parseFloat(amount) + 0.1).toFixed(1)
              )
            }
          >
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
              onChange={(e) => {
                let value = e.target.value.replace(/^\$/, "");
                if (/^\d*\.?\d*$/.test(value)) {
                  if (value.startsWith(".")) {
                    value = "0" + value;
                  }
                  const normalizedValue = value.replace(/^0+(?=\d)/, "");
                  const v = Math.max(
                    SHARE_MIN,
                    Math.min(SHARE_MAX, Number(normalizedValue))
                  );
                  setShares(v.toString());
                }
              }}
              className="text-right border border-[#d9d9d9]/30 rounded-md focus-visible:ring-0"
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-end gap-2">
          <button
            onClick={() => setShares((Math.floor(SHARE_MAX * 0.25)).toString())}
            className="text-sm border border-[#d9d9d9]/30 rounded-md bg-transparent h-8 w-12 cursor-pointer hover:bg-[#d9d9d9]/30"
          >
            25%
          </button>
          <button
            onClick={() => setShares((Math.floor(SHARE_MAX * 0.5)).toString())}
            className="text-sm border border-[#d9d9d9]/30 rounded-md bg-transparent h-8 w-12 cursor-pointer hover:bg-[#d9d9d9]/30"
          >
            50%
          </button>
          <button
            onClick={() => setShares(SHARE_MAX.toString())}
            className="text-sm border border-[#d9d9d9]/30 rounded-md bg-transparent h-8 w-12 cursor-pointer hover:bg-[#d9d9d9]/30"
          >
            Max
          </button>
        </div>
      </div>
      {Number(shares) > 0 && (
        <div className="w-full space-y-2 py-5 border-t-2 border-[#d9d9d9]/30">
          <div className="w-full flex items-end justify-between">
            <span className="text-lg font-medium">You will Receive</span>
            <span className="text-2xl font-medium text-[#FF6b00]">
              ${((Number(amount) / 100) * Number(shares)).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default LimitSell;

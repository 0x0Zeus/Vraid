import { Button } from "@/components/ui/button";
import { price } from "@/lib/types";
import MarketBuy from "./buy/MarketBuy";
import LimitBuy from "./buy/LimitBuy";
import MarketSell from "./sell/MarketSell";
import LimitSell from "./sell/LimitSell";
import { useEffect, useState } from "react";
import { useEventContext } from "@/context/EventContext";
import AuthModal from "@/components/auth/AuthModal";
import RegisterModal from "@/components/modal/RegisterModal";

const MarketTrader = ({
  type,
  marketType,
  prices,
}: {
  type: "buy" | "sell";
  marketType: "market" | "limit";
  prices: price | undefined;
}) => {
  const [chosenPrice, setChosenPrice] = useState<number | undefined>();
  const { chosenIndex, setChosenIndex } = useEventContext();
  const [registerModal, setRegisterModal] = useState<boolean>(false);

  // Get detail price info with chosen index
  useEffect(() => {
    setChosenPrice(prices?.[chosenIndex?.type || "yes"] ?? 0);
  }, [prices, chosenIndex]);

  // Handle Register Modal
  const handleRegisterModal = (open: boolean) => {
    setRegisterModal(open);
  }

  return (
    <div className="flex flex-col items-center w-full  px-7">
      <div className="flex items-center gap-2 py-5 w-full justify-around">
        <button
          onClick={() =>
            setChosenIndex({
              type: "yes",
              num: chosenIndex.num,
            })
          }
          className={`
            relative w-32 h-10 rounded-full text-[#00FFB2] text-base cursor-pointer group transition-all duration-300 ease-initial
            ${
              chosenIndex.type === "yes"
                ? "bg-[#00FFB2]/80 text-white"
                : "bg-[#00FFB2]/20"
            }
            hover:bg-[#00FFB2]/80 hover:text-white
          `}
        >
          <span className="block">Yes {prices?.yes}¢</span>
        </button>

        <button
          onClick={() =>
            setChosenIndex({
              type: "no",
              num: chosenIndex.num,
            })
          }
          className={`
          relative w-32 h-10 rounded-full text-[#ff6b00] text-base cursor-pointer group transition-all duration-300 ease-initial
          ${
            chosenIndex.type === "no"
              ? "bg-[#ff6b00] text-white"
              : "bg-[#ff6b00]/20"
          }
          hover:bg-[#ff6b00] hover:text-white
        `}
        >
          <span className="block">No {prices?.no}¢</span>
        </button>
      </div>
      {type === "buy" ? (
        marketType === "market" ? (
          // Buy Market in Market Trader
          <MarketBuy price={chosenPrice} />
        ) : (
          // Buy Limit in Market Trader
          <LimitBuy price={chosenPrice} />
        )
      ) : marketType === "market" ? (
        // Sell Market in Market Trader
        <MarketSell price={chosenPrice} />
      ) : (
        // Sell Limit in Market Trader
        <LimitSell price={chosenPrice} />
      )}
      <div className="px-5 w-full">
        <Button
          variant="outline"
          onClick={() => setRegisterModal(true)}
          className="capitalize w-full cursor-pointer hover:shadow-[0_0_10px_rgba(255,69,0)] text-[#ff4500] border-[#ff4500]/80 hover:bg-[#ff4500]/80 hover:text-white text-lg"
        >
          login to trade
        </Button>
      </div>
      {/* Open Register Modal if click login to trade button */}
      <RegisterModal open={registerModal} handleRegisterModal={handleRegisterModal} param="login" />
    </div>
  );
};

export default MarketTrader;

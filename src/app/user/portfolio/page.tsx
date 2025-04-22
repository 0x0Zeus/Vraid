"use client";

import Chart from "@/components/event/Chart";
import { Button } from "@/components/ui/button";
import WithdrawModal from "@/components/modal/WithdrawModal";
import { useState } from "react";
import TransferCrypto from "@/components/modal/TransferCrypto";

const Page = () => {
  const [transferCryptoOpen, setTransferCryptoOpen] = useState<boolean>(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState<boolean>(false);

  // Handle Deposit Modal
  const handleTransferCryptoChange = (open: boolean) => {
    setTransferCryptoOpen(open);
  };

  // Handle Withdraw Modal
  const handleWithdrawModal = (open: boolean) => {
    setWithdrawModalOpen(open);
  };

  return (
    <>
      <div className="pt-[30px] max-w-5xl mx-auto space-y-10 mb-[100px] px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Portfolio Card */}
          <div className="border border-[#d9d9d9]/30 rounded-lg p-4 sm:p-6 space-y-3">
            <p className="uppercase">portfolio</p>
            <p className="text-2xl sm:text-3xl font-medium text-[#00ffb2]">$0.00</p>
            <p className="text-sm text-[#d9d9d9]/80">Today</p>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:justify-around">
              <Button
                variant="outline"
                onClick={() => setTransferCryptoOpen(true)}
                className="w-[150px] bg-transparent cursor-pointer hover:shadow-[0_0_10px_rgba(255,69,0)] text-[#ff4500]/80 border-[#ff4500]/80 hover:bg-[#ff4500]/80 hover:text-white text-base sm:text-lg font-medium"
              >
                Deposit
              </Button>
              <Button
                variant="outline"
                onClick={() => setWithdrawModalOpen(true)}
                className="w-[150px] bg-transparent cursor-pointer hover:shadow-[0_0_10px_rgba(255,69,0)] text-[#ff4500]/80 border-[#ff4500]/80 hover:bg-[#ff4500]/80 hover:text-white text-base sm:text-lg font-medium"
              >
                Withdraw
              </Button>
            </div>
          </div>
          {/* Profit/Loss Card */}
          <div className="border border-[#d9d9d9]/30 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start justify-between gap-2">
            <div className="space-y-3 w-full sm:w-fit">
              <p className="uppercase">profit/loss</p>
              <p className="text-2xl sm:text-3xl font-medium text-[#00ffb2]">$0.00</p>
              <p className="text-sm text-[#d9d9d9]/80">All-Time</p>
            </div>
            <div className="w-full h-[200px] sm:h-full mt-4 sm:mt-0">
              <Chart />
            </div>
          </div>
        </div>
      </div>
      <TransferCrypto
        open={transferCryptoOpen}
        handleTransferCryptoChange={handleTransferCryptoChange}
      />
      <WithdrawModal
        open={withdrawModalOpen}
        handleWithdrawModal={handleWithdrawModal}
      />
    </>
  );
};

export default Page;

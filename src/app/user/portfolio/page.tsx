"use client";

import Chart from "@/components/event/Chart";
import { Button } from "@/components/ui/button";
import WithdrawModal from "@/components/modal/WithdrawModal";
import { useState } from "react";
import TransferCrypto from "@/components/modal/TransferCrypto";

const Page = () => {
  const [transferCryptoOpen, setTransferCryptoOpen] = useState<boolean>(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState<boolean>(false);

  const handleTransferCryptoChange = (open: boolean) => {
    setTransferCryptoOpen(open);
  };

  const handleWithdrawModal = (open: boolean) => {
    setWithdrawModalOpen(open);
  };

  return (
    <>
      <div className="pt-[30px] max-w-5xl mx-auto space-y-10 mb-[100px]">
        <div className="grid grid-cols-2 gap-5">
          <div className="border border-[#d9d9d9]/30 rounded-lg p-6 space-y-3">
            <p className="uppercase">portfolio</p>
            <p className="text-3xl font-medium text-[#00ffb2]">$0.00</p>
            <p className="text-sm text-[#d9d9d9]/80">Today</p>
            <div className="flex items-center justify-around">
              <Button
                variant="outline"
                onClick={() => setTransferCryptoOpen(true)}
                className="max-w-[200px] w-full bg-transparent cursor-pointer hover:shadow-[0_0_10px_rgba(255,69,0)] text-[#ff4500]/80 border-[#ff4500]/80 hover:bg-[#ff4500]/80 hover:text-white text-lg font-medium"
              >
                Deposit
              </Button>
              <Button
                variant="outline"
                onClick={() => setWithdrawModalOpen(true)}
                className="max-w-[200px] w-full bg-transparent cursor-pointer hover:shadow-[0_0_10px_rgba(255,69,0)] text-[#ff4500]/80 border-[#ff4500]/80 hover:bg-[#ff4500]/80 hover:text-white text-lg font-medium"
              >
                Withdraw
              </Button>
            </div>
          </div>
          <div className="border border-[#d9d9d9]/30 rounded-lg p-6 flex items-start justify-between gap-2">
            <div className="space-y-3 w-fit">
              <p className="uppercase">profit/loss</p>
              <p className="text-3xl font-medium text-[#00ffb2]">$0.00</p>
              <p className="text-sm text-[#d9d9d9]/80">All-Time</p>
            </div>
            <div className="w-full h-full">
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

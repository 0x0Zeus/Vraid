import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { useState } from "react";
import TransferCrypto from "./TransferCrypto";

const DepositFunds = ({ open, handleDepositFundsChange }: { open: boolean; handleDepositFundsChange: (open: boolean) => void }) => {
  const [transferCryptoOpen, setTransferCryptoOpen] = useState<boolean>(false)

  const handleTransferCryptoChange = (open: boolean) => {
    setTransferCryptoOpen(open)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleDepositFundsChange}>
        <DialogContent className="sm:max-w-md flex flex-col items-center gap-6 border-[#d9d9d9]/30">
          <DialogHeader className="my-5">
            <DialogTitle className="text-2xl font-bold space-x-2 flex items-end justify-center">
              <div className="flex flex-col items-center gap-2">
                <Image
                  src={'/bitcoin.png'}
                  alt="Coin"
                  width={70}
                  height={70}
                  className=""
                />
                <p>Fund your Account</p>
              </div>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Button 
          variant="outline" 
          onClick={() => {
            setTransferCryptoOpen(true)
            handleDepositFundsChange(false)
          }}
          className="max-w-[320px] w-full bg-transparent cursor-pointer hover:shadow-[0_0_10px_rgba(255,69,0)] text-[#ff4500]/80 border-[#ff4500]/80 hover:bg-[#ff4500]/80 hover:text-white">
            Deposit Funds
          </Button>
          <Button
            variant="outline"
            onClick={() => handleDepositFundsChange(false)}
            className="max-w-[320px] w-full bg-transparent cursor-pointer mb-5 hover:shadow-[0_0_10px_rgba(255,69,0)] text-[#ff4500]/80 border-[#ff4500]/80 hover:bg-[#ff4500]/80 hover:text-white">
            Skip for now
          </Button>
        </DialogContent>
      </Dialog>
      <TransferCrypto open={transferCryptoOpen} handleTransferCryptoChange={handleTransferCryptoChange} /> 
    </>
  )
}

export default DepositFunds
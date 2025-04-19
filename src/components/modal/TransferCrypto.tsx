import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { MdCheck, MdContentCopy } from "react-icons/md";

const TransferCrypto = ({ open, handleTransferCryptoChange }: { open: boolean; handleTransferCryptoChange: (open: boolean) => void }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>('0x4A1bb625B33Ccc0bE49Ff56D07c9c940eeb836Be')
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleTransferCryptoChange}>
      <DialogContent className="sm:max-w-md flex flex-col items-center gap-6 border-[#d9d9d9]/30 px-0">
        <DialogHeader className="w-full" >
          <DialogTitle className="flex items-end justify-center space-x-2 text-2xl font-bold">
            Transfer Crypto
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="w-full px-5 py-5 space-y-3">
          <p className="text-xl">Your Deposit Address:</p>
          <div className="border border-[#d9d9d9]/30 rounded-md text-center divide-y divide-[#d9d9d9]/30">
            <p className="py-5">{walletAddress}</p>
            <div className="py-5">
              <Button 
              variant={"outline"} 
              className="max-w-[320px] w-full bg-transparent cursor-pointer hover:shadow-[0_0_10px_rgba(255,69,0)] text-[#ff4500]/80 border-[#ff4500]/80 hover:bg-[#ff4500]/80 hover:text-white"
              onClick={handleCopy}
              >
                {!copied ? 
                <MdContentCopy className="" />
                : <MdCheck className="" />
              }
                Copy Address
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TransferCrypto
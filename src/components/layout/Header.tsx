"use client";

import Image from "next/image";
import Link from "next/link";
import MainMenu from "./MainMenu";
import AuthModal from "../auth/AuthModal";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FaRegUser } from "react-icons/fa6";
import { RiLogoutBoxLine, RiUserSettingsLine } from "react-icons/ri";
import { useState } from "react";
import TransferCrypto from "../auth/TransferCrypto";

const Header = () => {
  const auth = useAuth();
  const [transferCryptoOpen, setTransferCryptoOpen] = useState<boolean>(false);

  const handleTransferCryptoChange = (open: boolean) => {
    setTransferCryptoOpen(open);
  };

  return (
    <>
      <header className="border-b-2 border-[#FFFFFF]/30 backdrop-blur-[20px] max-w-[1440px] mx-auto fixed top-0 left-0 right-0 z-50  font-chakra-petch">
        <div className="h-[80px] flex items-center justify-between px-10 py-5">
          <Link href="/" className="h-full">
            <Image
              src="/logo.png"
              alt="VRAID Logo"
              width={200}
              height={60}
              className="w-auto h-full"
            />
          </Link>
          <div className="flex gap-7.5 h-full items-center">
            {!auth?.logined ? (
              <>
                <AuthModal param="login" />
                <AuthModal param="register" />
              </>
            ) : (
              <>
                <div className="flex items-center gap-5">
                  <Link href="/user/portfolio" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <span>Portfolio</span>
                      <span className="text-[#ff6b00]/80 text-xl font-medium">
                        $200.78
                      </span>
                    </div>
                  </Link>
                  <Link href="#" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <span>Cash</span>
                      <span className="text-[#ff6b00]/80 text-xl font-medium">
                        $10.78
                      </span>
                    </div>
                  </Link>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setTransferCryptoOpen(true)}
                  className="w-fit bg-transparent cursor-pointer hover:shadow-[0_0_10px_rgba(255,69,0)] text-[#ff4500]/80 border-[#ff4500]/80 hover:bg-[#ff4500]/80 hover:text-white text-lg font-medium"
                >
                  Deposit
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger className="border-[#d9d9d9]/30 h-10 border p-2 rounded-full cursor-pointer hover:scale-105 hover:bg-[#d9d9d9]/30 transition-all duration-300 ease-initial focus:outline-none">
                    <FaRegUser className="w-auto h-full text-white" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[200px] text-white bg-black border border-[#d9d9d9]/30"
                    align="end"
                  >
                    <DropdownMenuLabel className="flex items-center p-2 space-x-3">
                      <FaRegUser className="w-6 h-6 text-white rounded-full" />
                      <span className="text-xl capitalize">username</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-[#d9d9d9]/30" />
                    <DropdownMenuGroup className="p-2">
                      <DropdownMenuItem className="focus:bg-[#d9d9d9]/30 focus:text-white">
                        <Link
                          href="/user/profile"
                          className="flex items-center gap-2"
                        >
                          <RiUserSettingsLine className="text-white" />
                          <span className="text-base">Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-[#d9d9d9]/30 focus:text-white">
                        <RiLogoutBoxLine className="text-white" />
                        <span className="text-base">Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
        <MainMenu />
      </header>
      <TransferCrypto
        open={transferCryptoOpen}
        handleTransferCryptoChange={handleTransferCryptoChange}
      />
    </>
  );
};

export default Header;

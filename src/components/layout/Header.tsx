"use client";

import Image from "next/image";
import Link from "next/link";
import MainMenu from "./MainMenu";
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
import { TfiHome, TfiMenuAlt } from "react-icons/tfi";
import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import TransferCrypto from "../modal/TransferCrypto";
import RegisterModal from "../modal/RegisterModal";
import { usePathname, useRouter } from "next/navigation";
import { Router } from "lucide-react";

const Header = () => {
  const { user, setUser, logout } = useAuth();
  const [transferCryptoOpen, setTransferCryptoOpen] = useState<boolean>(false);
  const [registerModal, setRegisterModal] = useState<boolean>(false);
  const [visibleLink, setVisibleLink] = useState<"portfolio" | "cash">(
    "portfolio"
  ); // only for mobile
  const [animationState, setAnimationState] = useState<"fadeIn" | "fadeOut">(
    "fadeIn"
  );

  const handleTransferCryptoChange = (open: boolean) => {
    setTransferCryptoOpen(open);
  };

  const handleRegisterModal = (open: boolean) => {
    setRegisterModal(open);
  };

  const pathname = usePathname();
  const path = pathname.split("/")[2];
  const router = useRouter();

  // Effect to toggle between portfolio and cash links every 3 seconds for mobile
  useEffect(() => {
    if (user.logined) {
      const interval = setInterval(() => {
        // Start fade out
        setAnimationState("fadeOut");

        // After fade out completes, change content and fade in
        setTimeout(() => {
          setVisibleLink((prev) =>
            prev === "portfolio" ? "cash" : "portfolio"
          );
          setAnimationState("fadeIn");
        }, 500); // Half a second for fade out
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [user.logined]);

  return (
    <>
      {/* Header  */}
      <header className="hidden sm:block border-b-2 border-[#FFFFFF]/30 backdrop-blur-[20px] max-w-[1440px] mx-auto fixed top-0 left-0 right-0 z-50  font-chakra-petch">
        <div className="h-[80px] flex items-center justify-between px-10 py-5">
          {/* Logo */}
          <Link href="/" className="h-full">
            <Image
              src="/logo.svg"
              alt="VRAID Logo"
              width={200}
              height={60}
              className="w-auto h-full"
            />
          </Link>
          <div className="flex gap-7.5 h-full items-center">
            {!user.logined ? (
              // Show Login and Register before login
              <>
                <Button
                  variant="outline"
                  onClick={() => handleRegisterModal(true)}
                  className="w-[100px] cursor-pointer hover:shadow-[0_0_10px_rgba(255,69,0)] text-[#ff4500]/80 border-[#ff4500]/80 hover:bg-[#ff4500]/80 hover:text-white"
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleRegisterModal(true)}
                  className="w-[100px] cursor-pointer hover:shadow-[0_0_10px_rgba(255,69,0)] text-[#ff4500]/80 border-[#ff4500]/80 hover:bg-[#ff4500]/80 hover:text-white"
                >
                  Register
                </Button>
              </>
            ) : (
              // After login
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
                {/* Deposit button to open Deposit Modal */}
                <Button
                  variant="outline"
                  onClick={() => setTransferCryptoOpen(true)}
                  className="w-fit bg-transparent cursor-pointer hover:shadow-[0_0_10px_rgba(255,69,0)] text-[#ff4500]/80 border-[#ff4500]/80 hover:bg-[#ff4500]/80 hover:text-white text-lg font-medium"
                >
                  Deposit
                </Button>
                {/* Dropdown Menu for user profile - user avatar, user name, profile button, logout button */}
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
                      <span className="text-xl capitalize">
                        {user.username}
                      </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-[#d9d9d9]/30" />
                    <DropdownMenuGroup className="p-2">
                      <DropdownMenuItem className="focus:bg-[#d9d9d9]/30 focus:text-white">
                        <Link
                          href="/user/profile"
                          className="flex items-center gap-2 w-full"
                        >
                          <RiUserSettingsLine className="text-white" />
                          <span className="text-base flex-1">Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="focus:bg-[#d9d9d9]/30 focus:text-white"
                        onClick={logout}
                      >
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

      {/* Register Modal */}
      <RegisterModal
        open={registerModal}
        handleRegisterModal={handleRegisterModal}
        param="login"
      />

      {/* Deposit Modal - possible after sign in */}
      <TransferCrypto
        open={transferCryptoOpen}
        handleTransferCryptoChange={handleTransferCryptoChange}
      />

      {/* Mobile Navbar - 3 buttons: Menu Button, Home Button, User Button */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full flex items-center justify-around z-50 py-2 backdrop-blur-[30px]">
        {/* Menu Button */}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <TfiMenuAlt className="w-5 h-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black text-white border-[#d9d9d9]/30">
            {[
              "trending",
              "news",
              "politics",
              "economy",
              "culture",
              "geopolitics",
              "pop culture",
              "tech",
              "crypto",
            ].map((item) => (
              <Link
                href={`/market/${item.replaceAll(/\s/g, "-")}`}
                className="capitalize"
                key={item}
              >
                <DropdownMenuItem
                  className={`hover:text-[#ff4500] transition-colors duration-150 ease-initial focus:bg-[#d9d9d9]/30 focus:text-white  focus:cursor-pointer  ${
                    path === item.replaceAll(/\s/g, "-") ? "text-[#ff4500]" : ""
                  }`}
                >
                  {item}
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Home Button */}
        <Link href="/market/trending" className="hover:cursor-pointer">
          <FaHome className="w-7 h-7" />
        </Link>
        {/* User Button */}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <FaRegUser className="w-5 h-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black text-white border-[#d9d9d9]/30">
            {!user.logined ? (
              ["login", "register"].map((item) => (
                <DropdownMenuItem
                  key={item}
                  className={`hover:text-[#ff4500] transition-colors duration-150 ease-initial focus:bg-[#d9d9d9]/30 focus:text-white  capitalize ${
                    path === item.replaceAll(/\s/g, "-") ? "text-[#ff4500]" : ""
                  }`}
                  onClick={() => handleRegisterModal(true)}
                >
                  {item}
                </DropdownMenuItem>
              ))
            ) : (
              <>
                <DropdownMenuLabel className="flex items-center p-2 space-x-2">
                  <FaRegUser className="w-5 h-5 text-white rounded-full" />
                  <span className="text-base capitalize">{user.username}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#d9d9d9]/30" />
                <DropdownMenuGroup className="p-2">
                  <DropdownMenuItem className="focus:bg-[#d9d9d9]/30 focus:text-white">
                    <Link
                      href="/user/profile"
                      className="flex items-center gap-2 w-full"
                    >
                      <RiUserSettingsLine className="text-white" />
                      <span className="text-base flex-1">Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="focus:bg-[#d9d9d9]/30 focus:text-white"
                    onClick={logout}
                  >
                    <RiLogoutBoxLine className="text-white" />
                    <span className="text-base">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Header - Logo, Portfolio and Cash info */}
      <header className="sm:hidden backdrop-blur-[80px] fixed top-0 left-0 right-0 z-50  font-chakra-petch">
        <div className="h-[60px] flex items-center justify-between px-5 py-5">
          <Image
            src="/logo.svg"
            alt="VRAID Logo"
            width={200}
            height={60}
            className="h-10 w-auto"
          />
          {/* possible after sign in */}
          {user.logined && (
            <div className="flex flex-col items-end justify-center h-full">
              <div
                className={`transition-opacity duration-500 ease-in-out ${
                  animationState === "fadeIn" ? "opacity-100" : "opacity-0"
                }`}
              >
                {visibleLink === "portfolio" ? (
                  <Link href="/user/portfolio" className="cursor-pointer">
                    <div className="flex text-sm items-center gap-2">
                      <span>Portfolio:</span>
                      <span className="text-[#ff6b00]/80 text-lg font-medium">
                        $200.78
                      </span>
                    </div>
                  </Link>
                ) : (
                  <Link href="#" className="cursor-pointer">
                    <div className="flex text-sm items-center gap-2">
                      <span>Cash:</span>
                      <span className="text-[#ff6b00]/80 text-lg font-medium">
                        $10.78
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;

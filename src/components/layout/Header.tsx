import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { FaArrowTrendUp } from "react-icons/fa6"
import MainMenu from "./MainMenu"
import AuthModal from "../auth/AuthModal"

const Header = () => {
  return (
    <header className="border-b-2 border-[#FFFFFF]/30 backdrop-blur-[20px] max-w-[1440px] mx-auto fixed top-0 left-0 right-0 z-50">
      <div className="h-[80px] flex items-center justify-between px-10 py-5">
        <Link href="/" className="h-full">
          <Image
            src="/logo.png"
            alt="VRAID Logo"
            width={200}
            height={60}
            className="h-full w-auto"
          />
        </Link>
        <div className="flex gap-7.5 h-full">
          <AuthModal param="login" />
          <AuthModal param="register" />
        </div>
      </div>
      <MainMenu />
    </header>
  )
}

export default Header
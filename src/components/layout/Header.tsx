import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { FaArrowTrendUp } from "react-icons/fa6"
import MainMenu from "./MainMenu"

const Header = () => {
  return (
    <header className="border-b-2 border-[#FFFFFF]/30 backdrop-blur-[20px] max-w-[1440px] mx-auto">
      <div className="h-[70px] flex items-center justify-between px-10 py-5">
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
          <Button variant="outline" className="text-[#00FFB2]/80 border border-[#00FFB2]/80 w-[120px] h-full text-lg font-medium hover:bg-[#00FFB2]/80 hover:text-background cursor-pointer transition-colors duration-150 ease-linear">Log In</Button>
          <Button variant="outline" className="text-[#00FFB2]/80 border border-[#00FFB2]/80 w-[120px] h-full text-lg font-medium hover:bg-[#00FFB2]/80 hover:text-background cursor-pointer transition-colors duration-150 ease-linear">Sign Up</Button>
        </div>
      </div>
      <MainMenu />
    </header>
  )
}

export default Header
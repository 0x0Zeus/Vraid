'use client'

import { list } from "@/lib/list"
import Link from "next/link"
import { FaSearch } from "react-icons/fa"
import { TfiLayoutGrid3, TfiViewListAlt } from "react-icons/tfi";
import useHorizontalScroll from "../horizontal-scroll";
import { usePathname } from "next/navigation";
import { useDisplay } from "@/context/DisplayContext";

const SubMenu = ({ param }: { param: string }) => {
  const pathname = usePathname();
  const path = pathname.split('/')[2];
  const {displayWay, toggleDisplayWay} = useDisplay();

  const items = list[param as keyof typeof list] || [];

  useHorizontalScroll()

  return (
    <div className="flex items-center justify-between px-10">
      <div className="flex items-center space-x-0 overflow-x-auto horizontal-scroll py-5 text-base font-medium">
        {items.map((item: any) => {
          const endpoint = item.toLowerCase().split(' ').join('-');

          return (
          <Link key={item} href={`/${param}/${endpoint}`}
            className={`whitespace-nowrap px-5 py-1 hover:bg-[#ffffff]/30 rounded-full hover:text-[#00FFB2]/80 transition-colors duration-150 ease-initial ${path === endpoint ? 'text-[#00FFB2] bg-[#ffffff]/30' : ''}`}
          >
            {item}
          </Link>
        )})}
      </div>
      <div className="flex items-center space-x-5">
        <div className="relative flex-shrink-0 flex items-center border border-[#ffffff]/30 rounded-full ml-4">
          <input
            type="text"
            placeholder="Search for Results ..."
            className="h-10 px-5 py-3 focus:outline-none w-[250px] focus:border-[#ffffff]/30 focus:ring-0"
          />
          <FaSearch className="absolute right-3" />
        </div>
        <div className="h-10 w-[80px] border border-[#ffffff]/30 rounded-full flex items-center justify-between">
          <button
            onClick={toggleDisplayWay}
            className={`h-[38px] w-[38px] flex items-center justify-center rounded-full transition-all duration-300 ease-in-out  ${displayWay === 'list' ? 'bg-[#ffffff]/30 hover:bg-[#ffffff]/40 ' : 'bg-transparent hover:bg-[#ffffff]/10'}`}
          >
            <TfiViewListAlt />
          </button>
          <button
            onClick={toggleDisplayWay}
            className={`h-[38px] w-[38px] flex items-center justify-center rounded-full transition-all duration-300 ease-in-out  ${displayWay === 'list' ? 'bg-transparent hover:bg-[#ffffff]/10' : 'bg-[#ffffff]/30 hover:bg-[#ffffff]/40'}`}
          >
            <TfiLayoutGrid3 />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SubMenu
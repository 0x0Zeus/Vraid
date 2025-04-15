'use client'

import Link from "next/link"
import { FaArrowTrendUp } from "react-icons/fa6"
import useHorizontalScroll from "../horizontal-scroll"
import { usePathname } from "next/navigation"

const MainMenu = () => {
  useHorizontalScroll();
  const pathname = usePathname();
  const path = pathname.split('/')[1];

  return (
    <div className="px-10 pb-5 h-full flex items-center justify-start gap-5">
      <FaArrowTrendUp className="text-2xl text-[#00FFB2]/80 shrink-0" />
      <ul className="flex gap-5 text-lg font-medium border-r-2 border-white pr-5 shrink-0">
        <li className={`hover:text-[#00FFB2]/80 transition-colors duration-150 ease-initial ${path === 'trending' ? 'text-[#00FFB2]/80' : ''}`}>
          <Link href="/trending">Trending</Link>
        </li>
        <li className={`hover:text-[#00FFB2]/80 transition-colors duration-150 ease-initial ${path === 'new' ? 'text-[#00FFB2]/80' : ''}`}>
          <Link href="/new">New</Link>
        </li>
      </ul>
      <ul className="flex gap-5 text-lg font-medium horizontal-scroll overflow-x-auto">
        {['politics', 'sports', 'crypto', 'tech', 'culture', 'world', 'economy', 'trump', 'elections', 'mentions'].map((item) => (
          <li 
            key={item}
            className={`hover:text-[#00FFB2]/80 transition-colors duration-150 ease-initial ${path === item ? 'text-[#00FFB2]/80' : ''}`}
          >
            <Link href={`/${item}`}>{item.charAt(0).toUpperCase() + item.slice(1)}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MainMenu

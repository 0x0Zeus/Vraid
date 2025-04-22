'use client'

import Link from "next/link"
import { FaArrowTrendUp } from "react-icons/fa6"
import useHorizontalScroll from "../horizontal-scroll"
import { usePathname } from "next/navigation"

const MainMenu = () => {
  // Custom hook for horizontal scroll
  useHorizontalScroll();
  const pathname = usePathname();
  const path = pathname.split('/')[2];

  return (
    // Main menu for desktop - horizontally scroll is possible
    <div className="sm:flex hidden px-10 pb-5 h-full  items-center justify-start gap-5 horizontal-scroll">
      <ul className="flex gap-5 text-lg font-medium pr-5 shrink-0">
        <li className={`hover:text-[#ff4500] transition-colors duration-150 ease-initial ${path === 'trending' ? 'text-[#ff4500]' : ''}`}>
          <Link href="/market/trending" className="flex items-center gap-1"><FaArrowTrendUp className="text-2xl shrink-0" />Trending</Link>
        </li>
        <li className={`hover:text-[#ff4500] transition-colors duration-150 ease-initial ${path === 'news' ? 'text-[#ff4500]' : ''}`}>
          <Link href="/market/news">News</Link>
        </li>
        {['politics', 'economy', 'culture', 'geopolitics', 'pop culture', 'tech', 'crypto'].map((item) => (
          <li 
            key={item}
            className={`hover:text-[#ff4500] transition-colors duration-150 ease-initial ${path === item.replaceAll(/\s/g, '-') ? 'text-[#ff4500]' : ''}`}
          >
            <Link href={`/market/${item.replaceAll(/\s/g, '-')}`} className="capitalize">{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MainMenu

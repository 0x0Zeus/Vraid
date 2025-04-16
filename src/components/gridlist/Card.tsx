import { formatNumber } from "@/lib/functions"
import { marketData } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"
import { GoGift } from "react-icons/go"

const Card = ({ item }: { item: marketData }) => {
  return (
    <div className="border border-[#ffffff]/20 rounded-md p-5 h-[250px] flex flex-col">
      <div className="flex items-center gap-2">
        <Image src={`/${item.net}.png`} alt={item.net} width={100} height={100} className="w-10 h-auto" />
        <Link href={"#"} className="text-base font-medium hover:underline text-nowrap text-ellipsis overflow-hidden hover:text-[#00FFB2]/80">{item.title}</Link>
      </div>
      <ul className="flex flex-col items-center justify-between my-3 gap-2 text-sm overflow-auto vertical-scroll">
        {item.prices.map((price, index) => (
          <li key={index} className="flex items-center justify-between w-full">
            <span>{formatNumber(price.outcome)}</span>
            <div className="flex items-center gap-2">
              <span>{`${price.chance < 1 ? '<1' : price.chance}`}%</span>
              <button
                onClick={() => { }}
                className={`relative w-12 h-7 rounded-full bg-[#00FFB2]/20 text-[#00FFB2] text-sm cursor-pointer group`}
              >
                <span className="block group-hover:invisible">Yes</span>
                <span className="absolute inset-0 flex justify-center items-center invisible group-hover:visible">{price.yes}¢</span>
              </button>
              <button
                onClick={() => { }}
                className={`relative w-12 h-7 rounded-full bg-[#FF6B00]/20 text-[#FF6B00] text-sm cursor-pointer group`}
              >
                <span className="block group-hover:invisible">No</span>
                <span className="absolute inset-0 flex justify-center items-center invisible group-hover:visible">{price.no}¢</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <span className="text-[#ffffff]/60 text-xs">${formatNumber(item.volume)}&nbsp;VOL&nbsp;Monthly</span>
        <button className="cursor-pointer">
          <GoGift />
        </button>
      </div>
    </div>
  )
}

export default Card
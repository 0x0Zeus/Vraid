import { marketData } from "@/lib/types"
import Card from "./Card"
import { useEffect, useState } from "react"

const GridList = ({ data }: { data: marketData[] }) => {
  const [displayedItems, setDisplayedItems] = useState<marketData[]>([]);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setDisplayedItems(data.slice(0, itemsPerPage))
  }, [data])

  useEffect(() => {
    const handleScroll = ( ) => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100
      ) {
        if (displayedItems.length < data.length) {
          const nextItems = data.slice(0, page * itemsPerPage);
          setDisplayedItems(nextItems);
          setPage(page + 1);
        }
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, displayedItems.length, data])

  return (
    <div className="px-10 mt-5 mb-[100px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5">
      {displayedItems.map((item, index) => (
        <Card key={index} item={item} />
      ))}
    </div>
  )
}

export default GridList
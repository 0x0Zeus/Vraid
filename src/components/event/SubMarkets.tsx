import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useEventContext } from "@/context/EventContext";
import { OrderType, price } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { OrderAskData, OrderBidData } from "@/lib/orderData";
import Chart from "./Chart";

const SubMarkets = ({ changeSelectedIndex, openMarketCardModal }: { changeSelectedIndex: (index: number) => void, openMarketCardModal: () => void }) => {
  const { event, market, chosenIndex, setChosenIndex } = useEventContext()

  // Get sub market data
  const [prices, setPrices] = useState<price[]>([]);
  useEffect(() => {
    if (event !== undefined) {
      const priceList = event[market as keyof typeof event] as price[]
      setPrices(priceList)
    }
  }, [market, event])

  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  const toggleRow = (index: number) => {
    changeSelectedIndex(index)
    setExpandedRow(expandedRow === index ? null : index)
  }

  // Handle button click to open modal on mobile
  const handleButtonClick = (e: React.MouseEvent, index: number, type: "yes" | 'no') => {
    e.stopPropagation();
    changeSelectedIndex(index);
    setChosenIndex({type, num: index})
    // Check if we're on mobile
    if (window.innerWidth < 640) {
      openMarketCardModal();
    }
  }

  return (
    <Table className="overflow-auto touch-pan-x">
      <TableHeader className="">
        <TableRow className="border-[#d9d9d9]/30 text-base sm:text-lg font-medium">
          <TableCell className="pl-0 sm:pl-10">
            OUTCOME
          </TableCell>
          <TableCell className="w-[300px] pr-0 sm:pr-10 max-sm:text-center">
            CHANCE %
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prices.map((price, index) => (
          <React.Fragment key={index}>
            <TableRow
              className={`${expandedRow === index ? 'border-none' : 'border-[#d9d9d9]/30'}  text-base hover:bg-[#ffffff]/10 cursor-pointer`}
              onClick={() => toggleRow(index)}
            >
              <TableCell className="pl-0 sm:pl-10">
                <div className="flex flex-col py-2 max-sm:text-sm">
                  <p className="">${price.outcome.toLocaleString()}</p>
                  <p>${event?.volume.toLocaleString()} VOL</p>
                </div>
              </TableCell>
              <TableCell className="pr-0 sm:pr-10">
                <div className="flex gap-5 items-center max-sm:justify-end">
                  <span className="text-right">{price.chance}%</span>
                  <div className="flex max-sm:flex-col items-center gap-2">
                    <button
                      onClick={(e) => handleButtonClick(e, index, 'yes')}
                      className={`relative px-3 h-7 rounded-full  text-sm cursor-pointer group hover:bg-[#00FFB2]/60 hover:text-white
                        ${(chosenIndex?.type === 'yes' && chosenIndex?.num === index) ? 'bg-[#00ffb2]/60 text-white' : 'bg-[#00FFB2]/20 text-[#00FFB2]'}
                        `}
                    >
                      <span className="block capitalize">{market} Yes {price.yes}¢</span>
                    </button>
                    <button
                      onClick={(e) => handleButtonClick(e, index, 'no')}
                      className={`relative px-3 h-7 rounded-full text-sm cursor-pointer group hover:bg-[#FF6B00] hover:text-white
                        ${(chosenIndex?.type === 'no' && chosenIndex?.num === index) ? 'bg-[#FF6B00] text-white' : 'bg-[#FF6B00]/20 text-[#FF6B00]'}
                        `}
                    >
                      <span className="block capitalize">{market} No {price.no}¢</span>
                    </button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
            {expandedRow === index && (
              <TableRow className="border-[#d9d9d9]/30">
                <TableCell colSpan={2} className="px-0">
                  <Tabs defaultValue="order">
                    <div className="border-b border-[#d9d9d9]/30">
                      <TabsList className="bg-transparent rounded-none space-x-4 px-0 sm:px-10">
                        <TabsTrigger
                          className="hover:text-[#ff4500] px-0 border-b hover:border-[#ff4500] data-[state=active]:bg-transparent data-[state=active]:text-[#ff4500] data-[state=active]:border-[#ff4500]"
                          value="order"
                        >
                          Order Book
                        </TabsTrigger>
                        <TabsTrigger
                          className="hover:text-[#ff4500] px-0 border-b hover:border-[#ff4500] data-[state=active]:bg-transparent data-[state=active]:text-[#ff4500] data-[state=active]:border-[#ff4500]"
                          value="graph"
                        >
                          Graph
                        </TabsTrigger>
                        <TabsTrigger
                          className="hover:text-[#ff4500] px-0 border-b hover:border-[#ff4500] data-[state=active]:bg-transparent data-[state=active]:text-[#ff4500] data-[state=active]:border-[#ff4500]"
                          value="resolution">
                          Resolution
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent value="order">
                      <div>
                        <Table className="overflow-auto touch-pan-x">
                          <TableHeader className="">
                            <TableRow className="text-[#d9d9d9]/60">
                              <TableCell className="pl-0 sm:pl-10 w-full">Trade Yes</TableCell>
                              <TableCell className="text-center">Price</TableCell>
                              <TableCell className="text-center">Shares</TableCell>
                              <TableCell className="pr-0 sm:pr-10 text-center">Total</TableCell>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {OrderAskData.map((order: OrderType, index) => (
                              <TableRow key={index} className="border-none">
                                <TableCell className="pl-0 sm:pl-10 ">
                                  <div className="w-fit bg-[#ff6b00]/80 text-white rounded-md capitalize px-3">
                                    {order.tradeYes}
                                  </div>
                                </TableCell>
                                <TableCell className="text-center text-[#ff6b00]/80">
                                  {order.price}¢
                                </TableCell>
                                <TableCell className="text-center">
                                  {order.shares}
                                </TableCell>
                                <TableCell className="pr-0 sm:pr-10 text-center">
                                  ${order.total}
                                </TableCell>
                              </TableRow>
                            ))}
                            <TableRow className="border-[#d9d9d9]/30 border-b border-t text-[#d9d9d9]/60">
                              <TableCell className="pl-0 sm:pl-10">
                                Last: 0.1¢
                              </TableCell>
                              <TableCell className="text-center">
                                Spread: 0.3$
                              </TableCell>
                            </TableRow>
                            {OrderBidData.map((order: OrderType, index) => (
                              <TableRow key={index} className="border-none">
                                <TableCell className="pl-0 sm:pl-10">
                                  <div className="w-fit bg-[#00ffb2]/50 text-white rounded-md capitalize px-3">
                                    {order.tradeYes}
                                  </div>
                                </TableCell>
                                <TableCell className="text-center text-[#00ffb2]">
                                  {order.price}¢
                                </TableCell>
                                <TableCell className="text-center">
                                  {order.shares}
                                </TableCell>
                                <TableCell className="pr-0 sm:pr-10 text-center">
                                  ${order.total}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    <TabsContent value="graph">
                      <div className="h-[500px] py-10">
                        <span className="text-[#d9d9d9]/60 text-xl px-10 pb-5">Yes</span>
                        <Chart />
                      </div>
                    </TabsContent>
                    <TabsContent value="resolution">
                      <button className="w-fit mx-10 my-5 border border-[#d9d9d9]/30 rounded-full px-5 py-1 cursor-pointer hover:bg-[#d9d9d9]/30 transition-all duration-200 ease-initial">Propose Resolution</button>
                    </TabsContent>
                  </Tabs>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  )
}

export default SubMarkets
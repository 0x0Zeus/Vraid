'use client'

import PageNum from "@/components/pageNum";
import SelectBox from "@/components/selectBox";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import data from "@/lib/data";
import { useState, use, useEffect } from "react";
import { GoGift } from "react-icons/go";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { HoverCard, HoverCardTrigger } from "./ui/hover-card";
import { HoverCardContent } from "@radix-ui/react-hover-card";

const TableList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [display, setDisplay] = useState<number>(10);
  const [pageNum, setPageNum] = useState(1);
  const totalPage = Math.ceil(data.length / display);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    } else {
      return num.toString();
    }
  };

  const setDisplayCount = (num: number) => {
    setDisplay(num);
    setPageNum(1);
  }

  const setPage = (num: number) => {
    setPageNum(num)
  }

  return (
    <div className="px-10 mt-5 mb-[100px]">
      <div className="border border-[#ffffff]/30">
        <Table>
          <TableHeader className="">
            <TableRow className="text-base font-medium h-12 border-[#ffffff]/20 bg-[#ffffff]/20">
              <TableHead className="text-left pl-5 md:pl-10">Market</TableHead>
              <TableHead className="text-center">Volume</TableHead>
              <TableHead className="text-center">Outcome</TableHead>
              <TableHead className="text-left pr-5 md:pr-10">Chance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(10)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="pl-5 md:pl-10 text-left">
                      <Skeleton className="" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="" />
                    </TableCell>
                    <TableCell className="text-left pr-5 md:pr-10">
                      <Skeleton className="" />
                    </TableCell>
                  </TableRow>
                ))
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4} rowSpan={10} className="text-center text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            ) : data && data.length > 0 ? (
              data.slice(display * (pageNum - 1), display * pageNum).map((item, i) => (
                <TableRow
                  key={i}
                  className={`text-base h-12 border-none ${i % 2 === 1 ? 'bg-[#ffffff]/10' : ''}`}
                >
                  <TableCell className="pl-5 md:pl-10 text-left">{item.title}</TableCell>
                  <TableCell className="text-center">
                    ${formatNumber(item.volume)} VOL Montly
                  </TableCell>
                  <TableCell className="text-center">
                    <HoverCard>
                      <HoverCardTrigger>${formatNumber(item.prices[0].outcome)}</HoverCardTrigger>
                      <HoverCardContent align="end" className=" bg-white">
                        <Table className="bg-black border border-[#ffffff]/30">
                          <TableBody>
                            {item.prices.map((price, index) => (
                              <TableRow className="bg-[#000000] border-[#ffffff]/30" key={index}>
                                <TableCell className="text-left pl-5">
                                  ${formatNumber(price.outcome)}
                                </TableCell>
                                <TableCell className="text-left">
                                  {`${price.chance < 1 ? '<1' : price.chance}`}%
                                </TableCell>
                                <TableCell className="text-left pr-5">
                                  <div className=" flex items-center gap-2">
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
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                  <TableCell className="text-left pr-5 md:pr-10 flex items-center justify-start gap-4">
                    {item.prices[0].chance}%
                    <div className="flex items-center gap-2 ">
                      <button
                        onClick={() => { }}
                        className={`relative w-12 h-7 rounded-full bg-[#00FFB2]/20 text-[#00FFB2] text-sm cursor-pointer group`}
                      >
                        <span className="block group-hover:invisible">Yes</span>
                        <span className="absolute inset-0 flex justify-center items-center invisible group-hover:visible">{item.prices[0].yes}¢</span>
                      </button>
                      <button
                        onClick={() => { }}
                        className={`relative w-12 h-7 rounded-full bg-[#FF6B00]/20 text-[#FF6B00] text-sm cursor-pointer group`}
                      >
                        <span className="block group-hover:invisible">No</span>
                        <span className="absolute inset-0 flex justify-center items-center invisible group-hover:visible">{item.prices[0].no}¢</span>
                      </button>
                    </div>
                    <button className="cursor-pointer">
                      <GoGift />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} rowSpan={10} className="text-center text-muted-foreground">
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <span>Display: </span>
          <SelectBox clickOption={setDisplayCount} displayValue={display} />
        </div>
        <div>
          <PageNum setPage={setPage} pageNum={pageNum} totalPage={totalPage} />
        </div>
      </div>
    </div>
  )
}

export default TableList
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { TabsContent, TabsList } from "@radix-ui/react-tabs";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa6";

const Page = () => {
  const { user, setUser } = useAuth();

  return (
    <div className="pt-5 sm:pt-[30px] max-w-5xl mx-auto space-y-6 md:space-y-10 mb-[60px] md:mb-[100px] sm:px-10 px-5">
      <div className="space-y-6 md:space-y-10">
        {/* User info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          <FaRegUser size={50} className="rounded-full sm:size-[60px]" />
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-xl sm:text-2xl font-semibold">
              {user.username}
            </h1>
            <p className="text-[#d9d9d9]/80 text-sm sm:text-base truncate max-w-[280px] sm:max-w-none text-ellipsis">
              0x4A1bb625B33Ccc0bE49Ff56D07c9c940eeb836Be
            </p>
          </div>
        </div>
        <div className="grid min-[300px]:grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
          <div className="border border-[#d9d9d9]/30 rounded-md p-4 sm:p-5 space-y-1 sm:space-y-2">
            <Image
              src="/position.svg"
              alt="Positions Value"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <p className="text-[#d9d9d9]/80 text-sm sm:text-base">
              Positions Value
            </p>
            <p className="text-base sm:text-lg">$0.00</p>
          </div>
          <div className="border border-[#d9d9d9]/30 rounded-md p-4 sm:p-5 space-y-1 sm:space-y-2">
            <Image
              src="/pnl.svg"
              alt="Profit/loss"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <p className="text-[#d9d9d9]/80 text-sm sm:text-base">
              Profit/Loss
            </p>
            <p className="text-base sm:text-lg">$0.00</p>
          </div>
          <div className="border border-[#d9d9d9]/30 rounded-md p-4 sm:p-5 space-y-1 sm:space-y-2">
            <Image
              src="/volume.svg"
              alt="Volume traded"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <p className="text-[#d9d9d9]/80 text-sm sm:text-base">
              Volume traded
            </p>
            <p className="text-base sm:text-lg">$0.00</p>
          </div>
          <div className="border border-[#d9d9d9]/30 rounded-md p-4 sm:p-5 space-y-1 sm:space-y-2">
            <Image
              src="/traded.svg"
              alt="Markets traded"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <p className="text-[#d9d9d9]/80 text-sm sm:text-base">
              Markets traded
            </p>
            <p className="text-base sm:text-lg">$0.00</p>
          </div>
        </div>
      </div>
      <div className="">
        <Tabs defaultValue="position">
          <TabsList>
            <div className="border-b border-[#d9d9d9]/30 space-x-4 sm:space-x-8 whitespace-nowrap">
              <TabsTrigger
                value="position"
                className="text-base sm:text-lg border-b-2 data-[state=active]:border-[#ff4500] data-[state=active]:text-[#ff4500] px-0 py-1 cursor-pointer"
              >
                Positions
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="text-base sm:text-lg border-b-2 data-[state=active]:border-[#ff4500] data-[state=active]:text-[#ff4500] px-0 py-1 cursor-pointer"
              >
                Activity
              </TabsTrigger>
            </div>
          </TabsList>
          <TabsContent value="position">
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <Table className="text-sm sm:text-base min-w-[600px]">
                <TableHeader>
                  <TableRow className="border-none text-[#d9d9d9]/80">
                    <TableCell className="w-full pl-4 sm:pl-0">
                      Market
                    </TableCell>
                    <TableCell className="px-6 sm:px-10">AVG</TableCell>
                    <TableCell className="px-6 sm:px-10">CURRENT</TableCell>
                    <TableCell className="px-6 sm:px-10">VALUE</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No Positions Found
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="activity">
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <Table className="text-sm sm:text-base min-w-[500px]">
                <TableHeader>
                  <TableRow className="border-none text-[#d9d9d9]/80">
                    <TableCell className="pl-4 sm:pl-0 w-[80px] sm:w-[100px]">
                      TYPE
                    </TableCell>
                    <TableCell className="w-full">Market</TableCell>
                    <TableCell className="pr-4 sm:pr-0 text-right">
                      AMOUNT
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-sm">
                  <TableRow className="border-none">
                    <TableCell className="pl-4 sm:pl-0">Redeem</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Image
                          src="/bitcoin.svg"
                          alt="BTC"
                          width={20}
                          height={20}
                          className="w-4 h-4 sm:w-5 sm:h-5"
                        />
                        <span className="line-clamp-1 sm:line-clamp-none">
                          What Price will Bitcoin hit in April?
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-4 sm:pr-0">
                      $0.00
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-none">
                    <TableCell className="pl-4 sm:pl-0">BUY</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Image
                          src="/bitcoin.svg"
                          alt="BTC"
                          width={20}
                          height={20}
                          className="w-4 h-4 sm:w-5 sm:h-5"
                        />
                        <span className="line-clamp-1 sm:line-clamp-none">
                          What Price will Bitcoin hit in April?
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-4 sm:pr-0">
                      $0.00
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-none">
                    <TableCell className="pl-4 sm:pl-0">SELL</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Image
                          src="/bitcoin.svg"
                          alt="BTC"
                          width={20}
                          height={20}
                          className="w-4 h-4 sm:w-5 sm:h-5"
                        />
                        <span className="line-clamp-1 sm:line-clamp-none">
                          What Price will Bitcoin hit in April?
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-4 sm:pr-0">
                      $0.00
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent, TabsList } from "@radix-ui/react-tabs";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa6";

const Page = () => {
  return (
    <div className="pt-[30px] max-w-5xl mx-auto space-y-10 mb-[100px]">
      <div className="space-y-10">
        <div className="flex items-center gap-5">
          <FaRegUser size={60} className="rounded-full" />
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">User</h1>
            <p className="text-[#d9d9d9]/80">
              0x4A1bb625B33Ccc0bE49Ff56D07c9c940eeb836Be
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <div className="border border-[#d9d9d9]/30 rounded-md p-5 space-y-2">
            <Image
              src="/position.png"
              alt="Positions Value"
              width={50}
              height={50}
            />
            <p className="text-[#d9d9d9]/80">Positions Value</p>
            <p className="text-lg">$0.00</p>
          </div>
          <div className="border border-[#d9d9d9]/30 rounded-md p-5 space-y-2">
            <Image src="/pnl.png" alt="Profit/loss" width={50} height={50} />
            <p className="text-[#d9d9d9]/80">Profit/Loss</p>
            <p className="text-lg">$0.00</p>
          </div>
          <div className="border border-[#d9d9d9]/30 rounded-md p-5 space-y-2">
            <Image
              src="/volume.png"
              alt="Volume traded"
              width={50}
              height={50}
            />
            <p className="text-[#d9d9d9]/80">Volume traded</p>
            <p className="text-lg">$0.00</p>
          </div>
          <div className="border border-[#d9d9d9]/30 rounded-md p-5 space-y-2">
            <Image
              src="/traded.png"
              alt="Markets traded"
              width={50}
              height={50}
            />
            <p className="text-[#d9d9d9]/80">Markets traded</p>
            <p className="text-lg">$0.00</p>
          </div>
        </div>
      </div>
      <div>
        <Tabs defaultValue="position">
          <TabsList>
            <div className="border-b border-[#d9d9d9]/30 space-x-8">
              <TabsTrigger
                value="position"
                className="text-lg border-b-2 data-[state=active]:border-[#ff4500] data-[state=active]:text-[#ff4500] px-0 py-1 cursor-pointer"
              >
                Positions
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="text-lg border-b-2 data-[state=active]:border-[#ff4500] data-[state=active]:text-[#ff4500] px-0 py-1 cursor-pointer"
              >
                Activity
              </TabsTrigger>
            </div>
          </TabsList>
          <TabsContent value="position">
            <Table className="text-base">
              <TableHeader>
                <TableRow className="border-none text-[#d9d9d9]/80">
                  <TableCell className="w-full pl-0">Market</TableCell>
                  <TableCell className="px-10">AVG</TableCell>
                  <TableCell className="px-10">CURRENT</TableCell>
                  <TableCell className="px-10">VALUE</TableCell>
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
          </TabsContent>
          <TabsContent value="activity">
            <Table className="text-base">
              <TableHeader>
                <TableRow className="border-none text-[#d9d9d9]/80 ">
                  <TableCell className="pl-0 w-[100px]">TYPE</TableCell>
                  <TableCell className="w-full">Market</TableCell>
                  <TableCell className="pr-0 text-right">AMOUNT</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="text-sm">
                <TableRow className="border-none">
                  <TableCell className="pl-0">Redeem</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/bitcoin.png"
                        alt="BTC"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span>What Price will Bitcoin hit in April?</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">$0.00</TableCell>
                </TableRow>
                <TableRow className="border-none">
                  <TableCell className="pl-0">BUY</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/bitcoin.png"
                        alt="BTC"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span>What Price will Bitcoin hit in April?</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">$0.00</TableCell>
                </TableRow>
                <TableRow className="border-none">
                  <TableCell className="pl-0">SELL</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/bitcoin.png"
                        alt="BTC"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span>What Price will Bitcoin hit in April?</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">$0.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;

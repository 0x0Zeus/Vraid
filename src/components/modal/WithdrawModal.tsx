import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";

const withdrawSchema = z.object({
  address: z.string(),
  amount: z.string(),
});

const WithdrawModal = ({
  open,
  handleWithdrawModal,
}: {
  open: boolean;
  handleWithdrawModal: (open: boolean) => void;
}) => {
  const form = useForm<z.infer<typeof withdrawSchema>>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      address: "",
      amount: "",
    },
  });

  const onSubmit = (values: z.infer<typeof withdrawSchema>) => {
    console.log("eee", values)
    form.reset();
    handleWithdrawModal(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleWithdrawModal}>
        <DialogContent className="sm:max-w-md flex flex-col items-center gap-6 border-[#d9d9d9]/30">
          <DialogHeader className="my-5">
            <DialogTitle className="flex items-end justify-center space-x-2 text-2xl font-bold">
              <p>Withdraw</p>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="w-full max-w-[320px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="0x4A1bb625B33Ccc0bE49Ff56D07c9c940eeb836Be"
                          {...field}
                          className="flex-1 border-[#d9d9d9]/30"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          className="flex-1 border-[#d9d9d9]/30"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="max-w-[320px] w-full bg-transparent cursor-pointer hover:shadow-[0_0_10px_rgba(255,69,0)] text-[#ff4500]/80 border-[#ff4500]/80 hover:bg-[#ff4500]/80 hover:text-white mt-10"
                >
                  Withdraw
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WithdrawModal;

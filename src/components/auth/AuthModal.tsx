'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { Checkbox } from "../ui/checkbox"
import Image from "next/image"
import { useState } from "react"

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

const AuthModal = ({ param }: { param: string }) => {
  const [auth, setAuth] = useState<string>(param)
  const [googleInitialized, setGoogleInitialized] = useState<boolean>(false)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    }
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log("login", values)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[100px] cursor-pointer hover:shadow-[0_0_10px_rgba(255,69,0)] text-[#ff4500]/80 border-[#ff4500]/80 hover:bg-[#ff4500]/80 hover:text-white">
          {param === "login" ? "Login" : "Register"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col items-center gap-6 border-[#d9d9d9]/30">
        <DialogHeader className="my-5">
          <DialogTitle className="text-2xl font-bold space-x-2 flex items-end justify-center">
            <span>Welcome to</span>
            <Image src="/logo.png" alt='Logo' width={300} height={100} className="h-8 w-auto" />
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Button variant="outline" className="max-w-[320px] w-full bg-[#2ela47] text-white hover:bg-white hover:text-black cursor-pointer border-[#d9d9d9]/30">
          <Image
            src={'/google.png'}
            alt="Google"
            width={256}
            height={256}
            className="h-5 w-auto mr-2"
          />
          Connect with Google
        </Button>
        <div className="flex justify-between items-center w-full">
          <div className="border-b border-[#d9d9d9]/30 w-[100px] flex-1"></div>
          <span className="flex-shrink-0 mx-5">OR</span>
          <div className="border-b border-[#d9d9d9]/30 w-[100px] flex-1"></div>
        </div>
        <div className="w-full max-w-[320px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start w-full justify-between">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} className="flex-1 border-[#d9d9d9]/30 rounded-r-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="cursor-pointer rounded-l-none bg-transparent border border-[#d9d9d9]/30 border-l-0 hover:bg-white hover:text-black">
                Continue
              </Button>
            </form>
          </Form>
        </div>
        <div className="max-w-[320px] w-full flex items-center justify-between mb-5">
          <Button variant={"outline"} className="cursor-pointer rounded-md bg-transparent border border-[#d9d9d9]/30 hover:bg-white">
            <Image
              src={'/phantom.png'}
              alt="Phantom"
              width={20}
              height={20}
              className="w-auto h-5"
            />
          </Button>
          <Button variant={"outline"} className="cursor-pointer rounded-md bg-transparent border border-[#d9d9d9]/30 hover:bg-white">
            <Image
              src={'/metamask.png'}
              alt="Metamask"
              width={20}
              height={20}
              className="h-5 w-auto"
            />
          </Button>
          <Button variant={"outline"} className="cursor-pointer rounded-md bg-transparent border border-[#d9d9d9]/30 hover:bg-white">
            <Image
              src={'/Coinbase.png'}
              alt="Coinbase"
              width={20}
              height={20}
              className="h-5 w-auto"
            />
          </Button>
          <Button variant={"outline"} className="cursor-pointer rounded-md bg-transparent border border-[#d9d9d9]/30 hover:bg-white">
            <Image
              src={'/WalletConnect.png'}
              alt="Walletconnect"
              width={20}
              height={20}
              className="h-5 w-auto"
            />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal
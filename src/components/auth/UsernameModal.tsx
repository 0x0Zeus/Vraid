import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import DepositFunds from "./DepositFunds"

const usernameSchema = z.object({
  username: z.string()
})

const UsernameModal = ({ open, handleUsernameModalChange }: { open: boolean; handleUsernameModalChange: (open: boolean) => void }) => {
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  // const [usernameModal, setUsernameModal] = useState<boolean>(false)
  const [depositFundsOpen, setDepositFundsOpen] = useState(false)

  const usernameForm = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    }
  })

  const onUsernameSubmit = async (values: z.infer<typeof usernameSchema>) => {
    if (values.username === 'Super') {
      usernameForm.reset()
      handleUsernameModalChange(false)
      setTimeout(() => {
        setDepositFundsOpen(true)
      }, 100)
    } else {
      usernameForm.setError('username', {
        type: 'manual',
        message: 'This username is already taken'
      })
    }
  }

  const handleUsernameInput = (value: string) => {
    const v = value.replace(/\s+/g, '-')
    usernameForm.setValue('username', v)
  }

  const handleDepositFundsChange = (open: boolean) => {
    setDepositFundsOpen(open)
    if (!open) {
      usernameForm.reset()
    }
  }
  
  return (
    <>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-md flex flex-col items-center gap-6 border-[#d9d9d9]/30">
          <DialogHeader className="my-5">
            <DialogTitle className="text-2xl font-bold space-x-2 flex items-end justify-center">Choose your name</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Form {...usernameForm}>
            <form onSubmit={usernameForm.handleSubmit(onUsernameSubmit)} className="w-full space-y-6 text-center mb-5">
              <FormField
                control={usernameForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your username"
                        {...field}
                        onChange={(e) => handleUsernameInput(e.target.value)}
                        className="max-w-[320px] mx-auto border-[#d9d9d9]/30 "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isCheckingUsername}
                className="w-full bg-transparent  border mx-auto cursor-pointer max-w-[320px] hover:shadow-[0_0_10px_rgba(255,69,0)] text-[#ff4500]/80 border-[#ff4500]/80 hover:bg-[#ff4500]/80 hover:text-white">
                {isCheckingUsername ? 'Checking...' : 'Continue'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <DepositFunds open={depositFundsOpen} handleDepositFundsChange={handleDepositFundsChange} />
    </>
  )
}

export default UsernameModal
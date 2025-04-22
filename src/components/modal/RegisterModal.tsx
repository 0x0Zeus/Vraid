import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import UsernameModal from "./UsernameModal";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useAuth } from "@/context/AuthContext";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const RegisterModal = ({
  open,
  handleRegisterModal,
  param,
}: {
  open: boolean;
  handleRegisterModal: (open: boolean) => void;
  param: "login" | "register";
}) => {
  const { user, setUser } = useAuth();
  const [usernameModal, setUsernameModal] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log("login", values);
    form.reset();

    setUser({
      email: values.email,
      username: user.username,
      logined: true,
    });

    handleRegisterModal(false);
    setTimeout(() => {
      setUsernameModal(true);
    }, 100);
  };

  const handleUsernameModalChange = (open: boolean) => {
    setUsernameModal(open);
    if (!open) {
      form.reset();
    }
  };

  /* For mobile, when click login button on navbar, this register modal open.
  Then close this modal. At that time, the error causes. You can't click anything on the screen.
  So, I used useEffect to prevent this error. */
  useEffect(() => {
    return () => {
      document.body.style.pointerEvents = "auto"
    }
  }, [open])

  return (
    <>
      <Dialog open={open} onOpenChange={handleRegisterModal}>
        <DialogContent className="sm:max-w-md flex flex-col items-center gap-6 border-[#d9d9d9]/30">
          <DialogHeader className="my-5">
            <DialogTitle className="text-2xl font-bold space-x-2 flex items-end justify-center">
              <span>Welcome to</span>
              <Image
                src="/logo.svg"
                alt="Logo"
                width={300}
                height={100}
                className="h-8 w-auto"
              />
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Button
            variant="outline"
            className="max-w-[320px] w-full bg-[#2ela47] text-white hover:bg-white hover:text-black cursor-pointer border-[#d9d9d9]/30"
          >
            <Image
              src={"/google.svg"}
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
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-start w-full justify-between"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                          className="flex-1 border-[#d9d9d9]/30 rounded-r-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="cursor-pointer rounded-l-none bg-transparent border border-[#d9d9d9]/30 border-l-0 hover:bg-white hover:text-black"
                >
                  Continue
                </Button>
              </form>
            </Form>
          </div>
          <div className="max-w-[320px] w-full flex items-center justify-between mb-5">
            <Button
              variant={"outline"}
              className="cursor-pointer rounded-md bg-transparent border border-[#d9d9d9]/30 hover:bg-white"
            >
              <Image
                src={"/phantom.svg"}
                alt="Phantom"
                width={20}
                height={20}
                className="w-auto h-5"
              />
            </Button>
            <Button
              variant={"outline"}
              className="cursor-pointer rounded-md bg-transparent border border-[#d9d9d9]/30 hover:bg-white"
            >
              <Image
                src={"/metamask.svg"}
                alt="Metamask"
                width={20}
                height={20}
                className="h-5 w-auto"
              />
            </Button>
            <Button
              variant={"outline"}
              className="cursor-pointer rounded-md bg-transparent border border-[#d9d9d9]/30 hover:bg-white"
            >
              <Image
                src={"/coinbase.svg"}
                alt="Coinbase"
                width={20}
                height={20}
                className="h-5 w-auto"
              />
            </Button>
            <Button
              variant={"outline"}
              className="cursor-pointer rounded-md bg-transparent border border-[#d9d9d9]/30 hover:bg-white"
            >
              <Image
                src={"/walletconnect.svg"}
                alt="Walletconnect"
                width={20}
                height={20}
                className="h-5 w-auto"
              />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <UsernameModal
        open={usernameModal}
        handleUsernameModalChange={handleUsernameModalChange}
      />
    </>
  );
};

export default RegisterModal;

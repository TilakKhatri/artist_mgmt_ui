import { Metadata } from "next";
import Link from "next/link";
import UserRegistrationForm from "@/components/forms/register-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AudioWaveform } from "lucide-react";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function RegisterPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 hidden md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 bg-zinc-900 text-white lg:flex dark:border-r">
        <div className="relative z-20 flex items-center text-lg font-medium">
          <AudioWaveform width={24} height={24} />
        </div>
        <div className="h-full w-full flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-white">
            Welcome to Artist Management System
          </h1>
          <p className="text-lg text-white font-semibold mt-4">
            Easy to manage with one click
          </p>
        </div>
        <div className="relative z-20 mt-auto">All reserved @Tilak Khatri </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details to create your account
            </p>
          </div>
          <UserRegistrationForm />
        </div>
      </div>
    </div>
  );
}

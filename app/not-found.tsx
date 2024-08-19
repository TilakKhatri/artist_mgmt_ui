"use client";

import { Button } from "@/components/ui/button";
import { FlagIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Error() {
  const router = useRouter();
  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        <FlagIcon className="w-20 h-20 mx-auto" />
        <h1
          color="blue-gray"
          className="mt-10 !text-3xl !leading-snug md:!text-4xl"
        >
          Error 404 <br /> It looks like something went wrong.
        </h1>
        <h2 className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          Don&apos;t worry,Please try refreshing the page or come back later.
        </h2>
        <Button
          onClick={() => router.push("/")}
          variant="primary"
          className="w-full px-4 md:w-[8rem]"
        >
          Back
        </Button>
      </div>
    </div>
  );
}

export default Error;

"use client";
import { Button } from "@/components/ui/button";
import { FlagIcon } from "lucide-react";

// Error boundaries must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <div className="h-screen mx-auto grid place-items-center text-center px-8">
          <div>
            <FlagIcon className="w-20 h-20 mx-auto" />
            <h1
              color="blue-gray"
              className="mt-10 !text-3xl !leading-snug md:!text-4xl"
            >
              {error.message} <br /> It looks like something went wrong.
            </h1>
            <h2 className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
              Don&apos;t worry,Please try refreshing the page or come back
              later.
            </h2>
            <p>{error.message}</p>
            <Button
              onClick={() => reset()}
              variant="primary"
              className="w-full px-4 md:w-[8rem]"
            >
              Try Again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}

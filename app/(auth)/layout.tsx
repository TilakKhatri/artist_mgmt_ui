"use client";

import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { loginStatus } = useSelector((state: any) => state.user);
  // console.log(loginStatus);
  if (loginStatus) {
    router.push(`/dashboard`);
  }
  if (!loginStatus) {
    router.push("/");
  }
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}

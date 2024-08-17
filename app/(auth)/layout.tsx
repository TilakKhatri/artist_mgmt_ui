"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { loginStatus } = useSelector((state: any) => state.user);
  if (loginStatus) {
    router.push(`/dashboard`);
  }
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

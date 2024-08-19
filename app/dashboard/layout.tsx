"use client";

import { useRouter } from "next/navigation";

import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { useSelector } from "react-redux";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { loginStatus } = useSelector((state: any) => state.user);
  console.log(
    "layout dashboard",
    useSelector((state: any) => state.user)
  );
  if (!loginStatus) {
    router.push(`/`);
  }
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full flex-1 overflow-hidden">
        <Header />
        <div className="space-y-2 mx-6">{children}</div>
      </main>
    </div>
  );
}

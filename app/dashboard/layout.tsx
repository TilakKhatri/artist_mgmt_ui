import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
// import { ScrollArea } from "@/components/ui/scroll-area";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "Admin dashboard for artist management system",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

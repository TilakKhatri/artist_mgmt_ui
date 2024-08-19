"use client";
import React, { useState } from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import { navItems } from "@/constants/data";
import { cn } from "@/lib/utils";
import { AudioWaveform, ChevronLeft } from "lucide-react";
// import { useSidebar } from '@/hooks/useSidebar';
import Link from "next/link";

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  //   const { isMinimized, toggle } = useSidebar();
  const [isMinimized, setIsMinimized] = useState(false);
  const handleToggle = () => {
    console.log("toggle");
    setIsMinimized((prev) => !prev);
  };

  return (
    <aside
      className={cn(
        `relative  h-screen flex-none border-r bg-card transition-[width] duration-500 md:block`,
        !isMinimized ? "w-72" : "w-[72px]",
        className
      )}
    >
      <div className="hidden p-5 pt-10 lg:block">
        <Link
          href={"https://github.com/Kiranism/next-shadcn-dashboard-starter"}
          target="_blank"
        >
          <AudioWaveform width={24} height={24} />
        </Link>
      </div>
      <ChevronLeft
        className={cn(
          "absolute -right-3 top-10 z-50  cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          isMinimized && "rotate-180"
        )}
        onClick={() => handleToggle()}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </aside>
  );
}

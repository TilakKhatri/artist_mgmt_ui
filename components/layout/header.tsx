import { cn } from "@/lib/utils";

import { UserNav } from "./user-nav";

export default function Header() {
  return (
    <header className="sticky inset-x-0 top-0 w-full">
      <nav className="flex items-center  px-4 py-2 justify-end mx-6">
        {/* <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div> */}
        <div className="flex items-center gap-2">
          <UserNav />
        </div>
      </nav>
    </header>
  );
}

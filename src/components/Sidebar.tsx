"use client";

import Box from "./Box";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        href: "/products",
        active: pathname === "/products",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex flex-row align-top items-start justify-start">
      <div
        className="
            hidden 
            md:flex 
            flex-col 
            gap-y-2 
            bg-black 
            h-screen
            w-[300px] 
            p-2
            "
      >
        <Box>
          {/* <div className="flex flex-col gap-y-4 px-5 py-4">
                    <h1 className="text-white">Home page</h1>
                    <h1 className="text-white">Search</h1>
                </div> */}

          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <div className="text-white mx-5 my-5 font-bold">Saved ChatBots</div>
          {/* <div className="text-white mx-5"> Psychology </div> */}
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto w-full">{children}</main>
    </div>
  );
}

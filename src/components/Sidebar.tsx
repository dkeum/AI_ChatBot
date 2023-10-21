"use client";

import Box from "./Box";

interface SidebarProps {
    children: React.ReactNode;
  }


  export default function Sidebar ({children}: SidebarProps){
    return(
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
                <div className="flex flex-col gap-y-4 px-5 py-4">
                    <h1 className="text-white">Home page</h1>
                    <h1 className="text-white">Search</h1>
                </div>
                </Box>
                <Box className="overflow-y-auto h-full">
                <div className="text-white">Live Ai Bots Categories</div>
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto">
                {children}
            </main>
      </div>
    )

  }
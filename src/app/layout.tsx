import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Chatbot",
  description: "Talk to your favorite AI Chatbots",
};

// import { usePathname } from "next/navigation";
// const hideSideBarPages = ["/success"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname();
  // const hideSideBar = hideSideBarPages.includes(pathname);

  // if (hideSideBar) {
  //   return (
  //     <html lang="en">
  //       <body className={inter.className}>{children}</body>
  //     </html>
  //   );
  // }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}

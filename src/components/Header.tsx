import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export default function Header({ children, className }: HeaderProps) {
  return (
    <div>
      <div
        className={twMerge(
          "flex flex-row justify-between w-full bg-neutral-900 border-b-4 border-indigo-500 py-10",
          className
        )}
      >
        <h1 className="text-white mx-5 font-bold ">AI CHAT BOTS</h1>
        <div className="flex flex-row text-white mx-5 gap-x-5">
          <Link href="/sign-up">
            <button className="text-white font-bold mr-5 mt-2">Sign Up</button>
          </Link>

          <Link href="/login">
            <button className="bg-white text-black font-bold hover:bg-gray-200  py-2 px-4 rounded-full">
              Login
            </button>
          </Link>

          <Link href="/pricing">
            <button className="bg-white text-black font-bold hover:bg-gray-200  py-2 px-4 rounded-full">
              Pricing
            </button>
          </Link>
        </div>
      </div>

      {children}
    </div>
  );
}

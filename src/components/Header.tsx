import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
//@ts-ignore
import type { Database } from "@/lib/database.types";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";
import BillingButton from "./BillingButton";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export default async function Header({ children, className }: HeaderProps) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const { data, error } = await supabase.auth.getSession();
  let { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("email", data.session?.user.email);

  let hasBilling: boolean;
  if (profile) {
    hasBilling = true;
  } else {
    hasBilling = false;
  }

  const isUserLoggedIn = data.session?.user.role === "authenticated";

  return (
    <div>
      <div
        className={twMerge(
          " h-[135px] w-full bg-black border-b-2 border-indigo-500 ",
          className
        )}
      >
        <div className="flex flex-row justify-between h-[115px] rounded-lg bg-neutral-900 py-2 items-center mt-2 pr-5">
          <h1 className="text-white mx-5 font-bold ">AI CHAT BOTS</h1>

          <div className="flex flex-row text-white mx-5 gap-x-5">
            {isUserLoggedIn ? (
              <LogoutButton />
            ) : (
              <>
                <Link href="/create-account">
                  <button className="text-white font-bold mr-5 mt-2">
                    Sign Up
                  </button>
                </Link>

                <Link href="/login">
                  <button className="bg-white text-black font-bold hover:bg-gray-200  py-2 px-4 rounded-full">
                    Login
                  </button>
                </Link>
              </>
            )}

            {isUserLoggedIn && <BillingButton hasBilling={hasBilling} />}

            <Link href="/pricing">
              <button className="bg-white text-black font-bold hover:bg-gray-200  py-2 px-4 rounded-full">
                Pricing
              </button>
            </Link>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}

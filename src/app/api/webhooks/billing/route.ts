import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


import type { Database } from "@/lib/database.types";
import { stripe } from "@/stripe/stripe";
import { SITE_URL } from "@/app/util/SITE_URL";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ message: "unauthorized" });
  }

  // console.log(user.user?.email)
  const { data: profile } = await supabase
    .from("profile")
    .select("stripe_customer_id")
    //@ts-ignore
    .eq("email", user.user?.email)
    .single();

  // console.log("this is the profile")
  // console.log(profile);

  if (!profile) {
    return Response.json({ message: "No profile in database" });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id ?? "",
    return_url: SITE_URL,
  });

  return NextResponse.json({ url: session });
}

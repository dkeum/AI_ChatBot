import { stripe } from "@/stripe/stripe";
import { supabase } from "@/supabase/supabase";
// import {cors} from "micro-cors";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// const corss = cors({
//   allowMethods: ["POST", "HEAD"],
// });


export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature") ?? "";
  const signingSecret = process.env.STRIPE_SIGNING_SECRET ?? "";

  // console.log(body);
  // console.log(signature);
  // console.log(signingSecret);

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, signingSecret);
    console.log("webhook signature sucess");
  } catch (e) {
    console.log("webhook signature failed");
    return NextResponse.json({ status: 400 });
  }

  try {
    switch (event.type) {
      case "customer.subscription.updated":
        await updateSubscription(event);
      case "customer.subscription.deleted":
        await deleteSubscription(event);
    }
  } catch {}

  return NextResponse.json({ event: event, success: true, status: 200 });
}

async function updateSubscription(event: any) {
  const subscription = event.data.object;
  const stripe_customer_id = subscription.customer;
  const subscription_status = subscription.status;
  const price = subscription.items.data[0].price.id;
  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("stripe_customer_id", stripe_customer_id)
    .single();


    const updatedSubscription = {
      subscription_status,
      price,
    };

  if (profile) {
   
    await supabase
      .from("profile")
      .update(updatedSubscription)
      .eq("stripe_customer_id", stripe_customer_id);
  } else {
    const customer = await stripe.customers.retrieve(stripe_customer_id);

    //@ts-ignore
    const name = customer.name;
    //@ts-ignore
    const email = customer.email;
    const newProfile = {
      name,
      email,
      stripe_customer_id,
      price,
    };

    await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: newProfile,
    });


    await supabase
      .from("profile")
      .insert({name: name, email: email, stripe_customer_id:stripe_customer_id,price:price})
      .select();
  }
}

async function deleteSubscription(event : any) {
    const subscription = event.data.object;
    const stripe_customer_id = subscription.customer;
    const subscription_status = subscription.status;
    const deletedSubscription = {
        subscription_status,
        price: null,
    }
    await supabase
      .from("profile")
      .update(deleteSubscription)
      .eq("stripe_customer_id", stripe_customer_id);

}

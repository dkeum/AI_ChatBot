"use client";

import { useState } from "react";
import { pricesProps, priceProps } from "../page";
import { SITE_URL } from "@/app/util/SITE_URL";
import { loadStripe } from "@stripe/stripe-js";

interface PricePlansProps {
  plan: pricesProps;
}

export interface ProcessEnv {
  [key: string]: string | undefined;
}

const PricePlans: React.FC<PricePlansProps> = ({ plan }) => {
  const [pricingPlan, setPricingPlan] = useState("month");
  const [redirecting,setRedirecting] = useState(false);
  const [price, setPrice] = useState(9.99);

  // console.log("this is the plan below");
  // console.log(plan);

  // @ts-ignore
  const pricePlan = plan.find(
    (pricePlan: priceProps) => pricePlan.interval === pricingPlan
  );

  const togglePlan = () => {
    const interval = pricingPlan === "month" ? "year" : "month";
    setPricingPlan(interval);
    // @ts-ignore
    const updatedPricePlan = plan.find(
      (pricePlan: priceProps) => pricePlan.interval === interval
    );
    setPrice(updatedPricePlan.price);
  };

  const onCheckout = async () => {
    setRedirecting(true);
    // const response = await fetch(`${SITE_URL}/api/checkout/${pricePlan.id}`);
    const response = await fetch(`${SITE_URL}/api/checkout/`,{
      method: "post",
      body: JSON.stringify({ pricePlanId : pricePlan.id})
    });
    
    console.log("this is pricePlan.id")
    console.log(pricePlan.id);
    const data = await response.json();
    // console.log("this is the data below for response")
    // console.log(data);

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
    );
    await stripe?.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center border-2 border-black">
      <h1 className="my-10 text-3xl font-bold">Pricing Plans</h1>
      <div className="flex flex-col gap-y-5 border-l-2 border-t-2 border-r-4 border-b-4 border-black drop-shadow-2xl rounded-lg">
        <div className="flex flex-row align-middle mt-10 ml-5 mr-9">
          <span className="ml-3 text-sm text-gray-900 dark:text-gray-300 mr-4 font-bold">
            Monthly
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onChange={togglePlan}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          <span className="ml-3 text-sm font-bold text-gray-900 dark:text-gray-300">
            Yearly
          </span>
        </div>

        {<h1 className="text-center font-bold text-2xl">{pricePlan.name}</h1>}
        {
          <p className="text-center">
            Just ${price} / {pricingPlan}
          </p>
        }
        <button
          onClick={onCheckout}
          disabled={redirecting}
          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mb-5 mx-4"
        >
          {redirecting ?  "Loading..." : "Buy Now"}
        </button>
      </div>
    </div>
  );
};

export default PricePlans;

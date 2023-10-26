"use client";

import { SITE_URL } from "@/app/util/SITE_URL";

interface BillingButtonProps {
  hasBilling: boolean;
}

const BillingButton = ({ hasBilling }: BillingButtonProps) => {
  const response = async () => {
    if (hasBilling) {
      const response = await fetch(`${SITE_URL}/api/webhooks/billing/`);
    //   console.log(response)
     
      const data = await response.json();

    //   console.log(data);
    //   console.log(data.url.url)
      if(response){
        window.location.href = data.url.url;
      }
     

    //   console.log("this is the response")
    //   console.log(response);


    } else {
      alert("No Bill to Pay");
    }
  };

  return (
    <button
      onClick={response}
      className="bg-white text-black font-bold hover:bg-gray-200  py-2 px-4 rounded-full"
    >
      Billing
    </button>
  );
};

export default BillingButton;

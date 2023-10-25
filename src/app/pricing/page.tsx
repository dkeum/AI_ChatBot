import { stripe } from "@/stripe/stripe"
import Stripe from "stripe";
import PriceBenefits from "./components/PriceBenefits";
import PricePlans from "./components/PricePlans";


export interface priceProps{
    name: string;
    id: number;
    price: number;
    interval : Stripe.Price.Recurring.Interval;
}

export interface pricesProps{
    plan: priceProps[];
}


export default async function PricingPage(){
    const {data: prices} = await stripe.prices.list();
    const plans:pricesProps[] =[];

    
    for( let price in prices){
        
        // @ts-ignore
        const price_info = await stripe.products.retrieve(prices[price].product);
        // console.log("this is the price below");
        // console.log(prices[price])
        
        plans.push(
            // @ts-ignore
            {name: price_info.name, 
             id: prices[price].id, 
             // @ts-ignore
             price: prices[price].unit_amount/100, 
             // @ts-ignore
             interval: prices[price].recurring.interval})
    }
        

    return(
        <div className="flex flex-row h-screen w-full">
            <div className="h-screen w-1/2">
                {// @ts-ignore
                <PricePlans plan={plans}/>}
            </div>
            <div className="h-screen w-1/2">
                <PriceBenefits/>
            </div>
        </div>
    )
}
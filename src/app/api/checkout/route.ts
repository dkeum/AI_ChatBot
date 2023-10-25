import { SITE_URL } from "@/app/util/page"
import { stripe } from "@/stripe/stripe"

// export async function POST(
//     request: Request,
//     { params }: { params: { slug: string } }
//   ) {
//     const price = params.slug 
    
//     const session = await stripe.checkout.sessions.create(
//         {
//             mode:'subscription',
//             payment_method_types: ['card'],
//             line_items: [{price: price, quantity: 1}],
//             success_url: `${SITE_URL}/success`,
//             cancel_url: `${SITE_URL}/pricing`,
//         }
//     )
    
//     return Response.json(session);
    
//   }


export async function POST(
  req: Request
) {
  const body = await req.json();
  if (!body.pricePlanId ) {
    throw new Error("Missing pricePlan_id");
  }

  const session = await stripe.checkout.sessions.create(
      {
          mode:'subscription',
          payment_method_types: ['card'],
          line_items: [{
            price: body.pricePlanId, 
            quantity: 1
          }],
          success_url: `${SITE_URL}/success`,
          cancel_url: `${SITE_URL}/pricing`,
      }
  )

  
  return Response.json(session);
}
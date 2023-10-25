export default function PriceBenefits() {
  const benefits = [
    {
      title: "Low Price",
      benefits:
        "Save Big. Get everything with a super low monthly subscription",
    },
    {
      title: "No Limits",
      benefits: "Get complete access to everything on the site",
    },
    {
      title: "Cancel Anytime",
      benefits: " Pause or Stop your subscription whenever"  
    },
  ];

  return (
  <div className="h-screen w-full bg-black flex sm:flex-row md:flex-col gap-y-5 align-middle justify-center items-center ">
      
       {benefits.map((item, i)=>(
        <div className="text-white w-2/5" key={i}>
            <h1 className="text-3xl font-bold mb-3">{item.title}</h1>
            <p>{item.benefits}</p>
        </div>
    ))}
  </div>
  );
}

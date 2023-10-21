import { supabase } from "@/supabase/supabase";
import AICard from "./components/AICard";



export default async function ProductPage() {
let { data: chatBots , error } = await supabase.from('chatBot').select('*');
if (error) {
    console.error("Error fetching chatBots:", error);
    return {
    notFound: true, // Handle the error as needed
    };
}
  console.log(chatBots);

  return (
    <div className="bg-black h-screen w-full flex flex-col justify-center items-center align-middle ">
     
      <div className="flex flex-col">
        <h1 className="text-white font-bold text-3xl justify-center items-center text-center">Chatbots</h1> 
      <div className="flex sm:flex-col sm:gap-y-5 gap-x-2 md:flex-row justify-center">
      {chatBots && chatBots.map(item=>(
            <AICard image={item.img_url} name={item.name} slug={item.slug} description={item.description} key={item.id} isLocked={false}/>
         
      ))}
      </div>

      </div>
    </div>
  );
}




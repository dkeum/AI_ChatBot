import { supabase } from "@/supabase/supabase";
import AICard from "./components/AICard";

export default async function ProductPage() {
  let { data: chatBots, error } = await supabase
    .from("chatBot")
    .select("id,name,slug,description,img_url,content_id, isLocked");

  if (error) {
    console.error("Error fetching chatBots:", error);
    return (
      <div> There seems to be an erorr...</div>
    );

  }
  console.log("This is the product page information below")
  console.log(chatBots);
  console.log(error)

  return (
    <div className="bg-black h-screen w-full flex flex-col justify-center items-center align-middle ">
      <div className="flex flex-col">
        <h1 className="text-white font-bold text-3xl justify-center items-center text-center mb-10">
          Chat with AI Chatbots
        </h1>
        <div className="flex sm:flex-col sm:gap-y-5 gap-x-10 md:flex-row justify-center">
          {chatBots &&
            chatBots.map((item) => (
              <AICard
                image={item.img_url}
                name={item.name}
                slug={item.slug}
                description={item.description}
                key={item.id}
                id={item.content_id}
                isLocked={item.isLocked}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

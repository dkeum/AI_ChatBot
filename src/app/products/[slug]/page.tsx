"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AIChatbot({ params }: { params: { slug: string } }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const supabase = createClientComponentClient();

  const searchParams = useSearchParams();
  const id = searchParams.get("Id");
  const [chatsrc, setChatsrc] = useState(
    "https://www.stack-ai.com/embed/ae575f46-44ce-4241-909b-af2a76c5b9cb/c04bed43-c4df-4f99-a2b7-c7831087b75b/6531eadd42fd281cfc0e3208"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: chatBot_profile } = await supabase
          .from("chatBot")
          .select("name,img_url,description,category")
          //@ts-ignore
          .eq("content_id", parseInt(id)).single();

          console.log("this is the chatBot_profile")
          console.log(chatBot_profile);
          setName(chatBot_profile!.name); 
          setImage(chatBot_profile!.img_url);
          setDescription(chatBot_profile!.description)
          setCategory(chatBot_profile!.category);

        const { data: chatBot_content, error } = await supabase
          .from("chatBot_content")
          .select("chatbot_url")
          //@ts-ignore
          .eq("id", parseInt(id));

        if (error) {
          //@ts-ignore
          setError("Error fetching data");
        } else if (chatBot_content && chatBot_content.length > 0) {
          setChatsrc(chatBot_content[0].chatbot_url);
        }

        setLoading(false);
      } catch (error) {
        //@ts-ignore
        setError("Error fetching data: " + error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-black h-screen w-full flex sm:flex-col md:flex-row items-center justify-center relative">


    
      <div className="text-white text-3xl flex flex-col gap-y-10">
        <h1 className="text-white text-5xl font-bold mb-10 mr-10">Chat with <br/>{name}</h1>
        <Image src={image} alt={params.slug} width={300} height={300} className=""/>
        <h1 className="text-white">{description}</h1>
        <h1 className="text-white">Expert in {category}</h1>

      </div>
      <div className="w-[400px] h-[620px] ms-5">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <iframe
            src={chatsrc}
            width="400px"
            height="620px"
            id=""
            //@ts-ignore
            style={{
              display: "block",
              position: "fixed",
              border: "none",
              overflow: "hidden",
              zIndex: "9999999999",
              backgroundColor: "transparent",
              borderRadius: "10px",
            }}
          />
        </>
      )}
      </div>
    </div>
  );
}

"use client";

import { createClient } from "@supabase/supabase-js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AIChatbot({ params }: { params: { slug: string } }) {
 
 
    const searchParams = useSearchParams();
  const id = searchParams.get("Id");
  const [chatsrc, setChatsrc] = useState(
    "https://www.stack-ai.com/embed/ae575f46-44ce-4241-909b-af2a76c5b9cb/c04bed43-c4df-4f99-a2b7-c7831087b75b/6531eadd42fd281cfc0e3208"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  }, [id]);

  return (
    <div className="bg-black h-screen w-full flex sm:flex-col md:flex-row items-center justify-center relative">
       <h1 className="text-white text-3xl font-bold absolute top-28"> Chat with {params.slug} </h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
         
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
        
      )}
    </div>
  );
}

import Image from 'next/image'
import hero from "@/assets/hero.jpeg";
import Header from '@/components/Header';
import Link from 'next/link';


export default function Home() {
  return (
    <div className="flex flex-col">
    
    <div className="flex flex-col items-center relative justify-center bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 h-screen">
      <Header className="absolute top-0 left-0">
        <div className="flex sm:flex-col sm:gap-y-10 md:flex-row md:gap-x-10 ">
          <div className="text-center w-72">
            <h1 className="text-4xl font-bold">Welcome to Chatting with AI Bots</h1>
            <p className="mt-4">Introducing our AI chatbot, your ultimate companion for staying up-to-date with your favorite YouTube stars!</p>
          </div>
          <Image 
            src={hero}
            alt="hero"
            width={400}
            height={400}
          />
        </div>
        </Header>
        <Link href="/products">
          <button className="bg-black hover:bg-gray-900 text-white text-2xl font-bold py-2 px-4 border border-blue-700 rounded mt-10"> Explore AI Chat Bots </button>
        </Link>
        
      </div>
    
    
    </div>
    
  )
}

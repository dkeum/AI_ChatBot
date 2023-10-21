"use client";
import { twMerge } from "tailwind-merge";

import Image from "next/image";
import Link from "next/link";

interface AICardProps{
    image: string;
    name:string;
    slug:string;
    description: string;
    className ?: string;
    isLocked ?: boolean;
}


export default function AICard({image,name,slug,description,className,isLocked=true}: AICardProps){
    return(
        <div className={twMerge("max-w-sm w-[250px] lg:max-w-full lg:flex ", className)}>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal ">
                <div className="mb-8">
                {isLocked && <p className="text-sm text-gray-600 flex items-center">
                    <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                    </svg>
                    Members only
                </p>} 
                <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
                    <Image src={image} alt={name} width={192} height={192}/>
                </div>
                <div className="text-gray-900 font-bold text-xl mb-2">{name}</div>
                <p className="text-gray-700 text-base">{description}</p>
                </div>
                <div className="flex items-center justify-center">
                   {!isLocked && <Link href={`/products/${slug}`} >
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ">Chat with me</button>
                    </Link>
                    }
                </div>
            </div>
        </div>
    );
} 
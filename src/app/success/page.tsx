import Link from "next/link";

export default function SuccesPage(){
    return(
        <div className="bg-black h-screen w-full flex flex-col justify-center align-middle items-center ">


            <h1 className="text-white text-4xl font-bold">Congratulation!</h1>
            <p className="text-white ">You have access to all the AI chatbots <br/> Enjoy </p>

            <Link href="/login">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Started</button>

            </Link>

        </div>
    )    
}
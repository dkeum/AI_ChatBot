"use client";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation';


const LogoutButton = () => {
    const router = useRouter();
    const supabase = createClientComponentClient();
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
      };
    
  return (
    <button  onClick={handleSignOut} className="bg-white text-black font-bold hover:bg-gray-200  py-2 px-4 rounded-full">
      Logout
    </button>
  );
};

export default LogoutButton;

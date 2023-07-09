'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();
  return (
        <div className="flex items-center justify-center text-xl font-bold text-rose-500">
        <Image 
            onClick={() => router.push('/')}
            alt='logo'
            src = '/images/logo.png'
            className="cursor-pointer md:block mr-2" 
            height='30'
            width='30'
         />
         homestay
        </div>

  )
}

export default Logo
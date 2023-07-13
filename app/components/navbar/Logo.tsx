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
            src = '/images/logo1.png'
            className="cursor-pointer md:block" 
            height='35'
            width='35'
         />
         homestay
        </div>

  )
}

export default Logo
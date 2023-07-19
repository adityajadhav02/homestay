'use client';

import useSearchModal from '@/app/hooks/useSearchModal';
import {BiSearch} from 'react-icons/bi';


const Search = () => {

    const searchModal = useSearchModal();


  return (
    <div 
        onClick={searchModal.onOpen}
    className="
        border-[1px]
        py-2
        w-full
        rounded-full
        shadow-sm
        hover:shadow-md
        md:w-auto
        transition
        cursor-pointer
    ">

        <div className="flex flex-row items-center justify-between">
            <div className="font-semibold text-sm px-6"> Anywhere</div>
            <div 
            className="
                hidden
                sm:block 
                text-sm 
                px-6 
                border-x-[1px] 
                flex-1 
                text-center 
                font-semibold
                ">
                Any week
            </div>
            <div className="
                text-sm
                pl-6
                pr-2
                flex
                items-center
                flex-row
                text-gray-600
                gap-3
            ">
                <div className="hidden sm:block">Add Guests</div>
                <div className="
                    p-2
                    bg-rose-500
                    text-white
                    rounded-full

                ">
                    <BiSearch size={18} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search
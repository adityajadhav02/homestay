'use client';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

const UserMenu = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() =>{
        setIsOpen((prev) => !prev);
    },[]);

    const registerModal = useRegisterModal()

  return (
    <div className="relative">
        <div className="flex flex-row gap-3 items-center">
            <div 
                onClick={() =>{}}
                className="
                    hidden
                    md:block
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    hover:bg-neutral-100
                    text-sm
                    transition
                    cursor-pointer
                ">
                Become a host
            </div>
            <div
                onClick={toggleOpen}
                className="
                    p-4
                    md:py-1
                    md:px-2
                    border
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    transition
                    hover:shadow-md
                "
            >
                <AiOutlineMenu />
                <div className="hidden md:block">
                    <Avatar />
                </div>
            </div>
        </div>  

        {isOpen  &&(
            <div className="
                absolute
                shadow-md
                rounded-xl
                w-[40vw]
                bg-white
                md:w-3/4
                overflow-hidden
                right-0
                top-12
                text-sm
            ">
                <div className="flex flex-col cursor-pointer">
                    <>
                        <MenuItem 
                            onClick={() =>{}}
                            label="Login"
                        />
                        <MenuItem 
                            onClick={registerModal.onOpen}
                            label="Signup"
                        />
                    </>
                </div>

            </div>
        )}
    </div>
  )
}

export default UserMenu
'use client';

import {IconType} from "react-icons";

interface ButtonProps{
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}
const Button:React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon:Icon
}) => {
  return (
    <button 
        onClick={onClick}
        disabled={disabled}
    className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transistion
        w-full
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'border-black' : 'border-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'py-1': 'py-3'}
        ${small ? 'text-sm': 'text-md'}
        ${small ? 'font-light': 'font-semibold'}
        ${small ? 'border': 'border-2'}

    `}>
        {Icon && (
            <Icon
                size={24}
                className="absolute top-3 left-4"
            />
        )}
        {label}
    </button>
  )
}

export default Button
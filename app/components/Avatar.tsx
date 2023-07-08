'use client';
import Image from "next/image";

interface AvatarProps{
    src?: string | null | undefined;
};

const Avatar: React.FC<AvatarProps> = ({src}) => {
  return (
    <Image
        alt="avatar"
        src= {src ? src : '/images/avatar.png'}
        className="rounded-full"
        height='30'
        width='30'
    />
  )
}

export default Avatar
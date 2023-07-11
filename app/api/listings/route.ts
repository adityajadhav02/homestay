import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";
import { parseConfigFileTextToJson } from "typescript";

export async function POST (request: Request) {
    const currentUser = await getCurrentUser();

    if(!currentUser) return NextResponse.error();

    const body = await request.json();

    const {
        title,
        description,
        imageSrc,
        category,
        guestCount,
        roomCount, 
        bathroomCount,
        price,
        location
    } = body;

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            guestCount,
            roomCount, 
            bathroomCount,
            price: parseInt(price, 10),
            locationValue: location.value,
            userId: currentUser.id
        }
    })
    
    return NextResponse.json(listing);
}

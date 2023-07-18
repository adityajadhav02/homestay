import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';

interface IParams {
    reservationId?: string;
}

export async function DELETE (
    request: Request,
    {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) return NextResponse.error();

    const {reservationId} = params;
    if(!reservationId || typeof reservationId !== 'string')
    throw new Error('Invalid reservationId');

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            // both the user that has booked and the owner can cancel the reservation
            OR: [
                {userId: currentUser.id},
                {listing: {userId: currentUser.id}}
            ]
        }
    });

    return NextResponse.json(reservation);
}


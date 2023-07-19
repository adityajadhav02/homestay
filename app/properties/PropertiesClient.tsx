'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

const PropertiesClient:React.FC<PropertiesClientProps> = ({
    listings, 
    currentUser
}) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success('Listing removed.');
            router.refresh();
        })
        .catch((err) =>{
            toast.error('Something went wrong');
        })
        .finally(() =>{
            setDeletingId('');
        })

    }, [router]);
  return (
    <Container>
        <Heading
            title="My Properties"
            subtitle="Places that I am hosting."
        />
        <div 
            className="
            mt-10
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
            "
        >
            {listings.map((listing: any) => (
            <ListingCard
                key={listing.id}
                data={listing}
                actionId={listing.id}
                onAction={onCancel}
                disabled={deletingId === listing.id}
                actionLabel="Delete property listing"
                currentUser={currentUser}
            />
            ))}
        </div>
    </Container>

  )
}

export default PropertiesClient
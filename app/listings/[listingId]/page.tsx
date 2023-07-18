// cannot use hooks here since it is a server component

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({params}: {params: IParams}) => {

  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if(!listing){
      return (
            <EmptyState />
      )
  }

  return (
    <ClientOnly>
      <ListingClient
        listing= {listing}
        currentUser= {currentUser}
        reservations= {reservations}
      />
    </ClientOnly>
  )
}

export default ListingPage
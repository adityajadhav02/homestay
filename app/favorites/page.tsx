import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";

import FavoritesClient from "./FavoritesClient"; 

const FavoritesPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite places."
        />
    );
  }

  return (
      <FavoritesClient
        listings={listings}
        currentUser={currentUser}
      />
  );
}
 
export default FavoritesPage;
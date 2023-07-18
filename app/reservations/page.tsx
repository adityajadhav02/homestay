import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Login to your account."
            />
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    });

    if(reservations.length === 0){
        return(
            <EmptyState 
                title="No reservations found"
                subtitle="Looks like you don't have any reservations on your property."
            />
        )
    }

    return (
        <ReservationsClient 
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default ReservationsPage;
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getHotelsWithAvailableRooms } from "../services/searchService";

import { HotelRoomsInfoDiv } from "../components/HotelRoomsInfoDiv";
import { SearchRoomsForm } from "../components/SearchRoomsForm";

export function SearchRoomsResultPage() {
    const [searchParams] = useSearchParams();
    const [hotelsWithAvailableRooms, setHotelsWithAvailableRooms] = useState([]);

    useEffect(() => {
        getHotelsWithAvailableRooms(searchParams)
            .then(hotels => setHotelsWithAvailableRooms(hotels))
            // TODO: Render the validation errors in the search form.
            .catch(error => alert(`${error.status} ${error.title}`));
    }, [searchParams]);

    return (
        <main>
            <section>
                <h1>Try another options</h1>
                <SearchRoomsForm
                    initCityId={searchParams.get('cityId')}
                    initCheckInDate={searchParams.get('checkInLocal')}
                    initCheckOutDate={searchParams.get('checkOutLocal')}
                />
            </section>
            <section>
                <h1>Here what we have</h1>
                {hotelsWithAvailableRooms.length > 0
                    ? hotelsWithAvailableRooms.map(hotel => <HotelRoomsInfoDiv key={hotel.id} hotel={hotel} />)
                    : <p>There are no available rooms with this criteria.</p>}
            </section>
        </main>
    );
}
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getHotelsWithAvailableRooms } from "../services/searchService";
import { HotelWithRoomsDiv } from "../components/HotelWithRoomsDiv";

export function SearchResultPage() {
    const [searchParams, setSearchParams] = useSearchParams([]);
    const [hotelsWithAvailableRooms, setHotelsWithAvailableRooms] = useState([]);

    useEffect(() => {
        async function fetchData() {
            return await getHotelsWithAvailableRooms(searchParams);
        }

        fetchData()
            .then(hotels => setHotelsWithAvailableRooms(hotels))
            // TODO: Render the validation errors in the search form.
            .catch(error => alert(`${error.status} ${error.title}`));
    }, [searchParams]);

    return (
        <main>
            <section>
                <h1>Here what we have</h1>
                {hotelsWithAvailableRooms.map(hotel => <HotelWithRoomsDiv key={hotel.id} hotel={hotel} />)}
            </section>
        </main>
    );
}
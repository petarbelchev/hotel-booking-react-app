import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getHotelsWithAvailableRooms } from "../services/searchService";
import { markAsFavorite } from "../services/hotelsService";

import { HotelRoomsInfoDiv } from "../components/HotelRoom/HotelRoomsInfoDiv";
import { SearchRoomsForm } from "../components/HotelRoom/SearchRoomsForm";

import { AuthContext } from "../contexts/AuthContext";

export function SearchRoomsResultPage() {
    const [searchParams] = useSearchParams();
    const { user } = useContext(AuthContext);
    const [hotelsWithAvailableRooms, setHotelsWithAvailableRooms] = useState([]);

    useEffect(() => {
        getHotelsWithAvailableRooms(searchParams, user?.token)
            .then(hotels => setHotelsWithAvailableRooms(hotels))
            // TODO: Render the validation errors in the search form.
            .catch(error => alert(`${error.status} ${error.title}`));
    }, [searchParams, user?.token]);

    const favoriteClickHandler = async (hotelId) => {
        try {
            const response = await markAsFavorite(hotelId, user?.token);

            setHotelsWithAvailableRooms(state => {
                const newState = [...state];
                const hotel = newState.find(hotel => hotel.id === hotelId);
                hotel.isUserFavoriteHotel = response.isFavorite;
                return newState;
            });
        } catch (error) {
            alert(`${error.status} ${error.title}`);
        }
    };

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
                    ? hotelsWithAvailableRooms.map(hotel => <HotelRoomsInfoDiv
                        key={hotel.id}
                        hotel={hotel}
                        onFavoriteClickHandler={favoriteClickHandler}
                    />)
                    : <p>There are no available rooms with this criteria.</p>}
            </section>
        </main>
    );
};
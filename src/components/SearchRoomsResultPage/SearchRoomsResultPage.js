import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getHotelsWithAvailableRooms } from "../../services/searchService";
import { markAsFavorite } from "../../features/Hotel/Manage/features/Favorite/favoriteButtonService";

import { HotelWithAvailableRooms } from "./HotelWithAvailableRooms/HotelWithAvailableRooms";

import { AuthContext } from "../../contexts/AuthContext";
import styles from "./SearchRoomsResultPage.module.css";
import { useSearchRooms } from "../../features/SearchRooms/useSearchRooms";

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

    const searchRoomsForm = useSearchRooms().getSearchRoomsForm(
        searchParams.get('cityId'),
        searchParams.get('checkInLocal'),
        searchParams.get('checkOutLocal')
    );

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
        <main className={styles.container}>
            <section className={styles.search}>
                <h1>Try another options</h1>
                {searchRoomsForm}
            </section>

            <section className={styles.results}>
                <h1>Here what we have</h1>

                <div>
                    {hotelsWithAvailableRooms.length > 0
                        ? hotelsWithAvailableRooms.map(hotel => <HotelWithAvailableRooms
                            key={hotel.id}
                            hotel={hotel}
                            onFavoriteClickHandler={favoriteClickHandler}
                        />)
                        : <p>There are no available rooms with this criteria.</p>
                    }
                </div>
            </section>
        </main>
    );
};
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SearchRoomsForm, getHotelsWithAvailableRooms } from 'features/SearchRooms';
import { AuthContext } from 'contexts/AuthContext';

import { AvailableHotelRooms } from './AvailableHotelRooms';
import styles from './SearchRoomsResultPage.module.css';

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

    return (
        <main className={styles.container}>
            <section className={styles.search}>
                <h1>Try another options</h1>
                {<SearchRoomsForm
                    initCityId={searchParams.get('cityId')}
                    initCheckInDate={searchParams.get('checkInLocal')}
                    initCheckOutDate={searchParams.get('checkOutLocal')}
                />}
            </section>

            <section className={styles.results}>
                <h1>Here what we have</h1>

                <div>
                    {hotelsWithAvailableRooms.length > 0
                        ? hotelsWithAvailableRooms.map(hotel => <AvailableHotelRooms
                            key={hotel.id}
                            hotel={hotel}
                        />)
                        : <p>There are no available rooms with this criteria.</p>
                    }
                </div>
            </section>
        </main>
    );
};
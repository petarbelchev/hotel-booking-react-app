import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Room } from './Room';
import { PrimaryButton } from 'UI/Buttons/PrimaryButton';
import { getImage } from 'features/Hotel/Manage/features/Images';

import styles from './AvailableHotelRooms.module.css';
import { useFavoriteButton } from 'features/Hotel/Manage/features/Favorite';

export function AvailableHotelRooms({ hotel }) {
    const [hotelState, setHotelState] = useState(hotel);
    const [mainImage, setMainImage] = useState(null);
    const favoriteButton = useFavoriteButton(hotelState, setHotelState);
    const navigate = useNavigate();

    if (hotel.mainImageId && !mainImage) {
        getImage(hotel.mainImageId).then(image => setMainImage(URL.createObjectURL(image)));
    }

    return (
        <div className={styles.container}>
            <div className={styles.hotel}>
                <div className={styles.content}>
                    {mainImage && <img className={styles.hotelImage} src={mainImage} alt={hotel.name} />}

                    <div className={styles.title}>
                        <h2>{hotel.name}</h2>
                        {favoriteButton}
                    </div>

                    <p>{hotel.description}</p>
                    <span>Rating: {hotel.ratings?.rating} from {hotel.ratings?.ratingsCount} votes</span>
                    <p>{hotel.city?.name}</p>

                    <PrimaryButton
                        name="More Details"
                        onClick={() => navigate(`/hotels/${hotel.id}`)}
                    />
                </div>

                <div className={styles.rooms}>
                    {hotel.availableRooms.map(room => <Room key={room.id} room={room} />)}
                </div>
            </div>
        </div>
    );
}
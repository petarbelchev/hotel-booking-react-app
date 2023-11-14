import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PrimaryButton } from "../Buttons/PrimaryButton";
import { FavoriteButton } from "../Buttons/FavoriteButton";
import { Room } from "./Room";

import { getImage } from "../../services/imagesService";
import styles from "./HotelWithAvailableRooms.module.css";

export function HotelWithAvailableRooms({ hotel, onFavoriteClickHandler }) {
    const [mainImage, setMainImage] = useState(null);
    const navigate = useNavigate();

    if (hotel.mainImageId && !mainImage) {
        getImage(hotel.mainImageId).then(image => setMainImage(URL.createObjectURL(image)));
    }

    return (
        <div className={styles.container}>
            <div className={styles.hotel}>
                <div className={styles.content}>
                    {mainImage && <img src={mainImage} alt={hotel.name} />}

                    <div className={styles.title}>
                        <h2>{hotel.name}</h2>
                        <FavoriteButton
                            hotelId={hotel.id}
                            isPressed={hotel.isUserFavoriteHotel}
                            onClick={onFavoriteClickHandler}
                        />
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
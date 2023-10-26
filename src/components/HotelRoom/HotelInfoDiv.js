import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { Image } from "../Image";
import styles from "./HotelInfoDiv.module.css";

export function HotelInfoDiv({
    hotel,
    onFavoriteClickHandler,
    children,
}) {
    const { user } = useContext(AuthContext);

    const clickHandler = () => onFavoriteClickHandler(hotel.id);

    return (
        <div>
            <div className={styles.title}>
                <h2>{hotel.name}</h2>
                {user && <span onClick={clickHandler} className={styles.favoriteBtn}>
                    <Image
                        src={process.env.PUBLIC_URL + (hotel.isUserFavoriteHotel ? '/full-heart.png' : '/empty-heart.png')}
                        alt="Favorite hotel icon"
                    />
                </span>}
            </div>

            <div>
                <p>{hotel.description}</p>
                <span>Rating: {hotel.ratings?.rating} from {hotel.ratings?.ratingsCount} votes</span>
                {hotel.usersWhoFavoritedCount > 0 && <span> | Favorited from {hotel.usersWhoFavoritedCount} people</span>}
            </div>

            <div>
                <span>{hotel.city?.name}{hotel.address && `, ${hotel.address}`}</span>

                {hotel.owner && <>
                    <span> | Owner: {hotel.owner?.firstName} {hotel.owner?.lastName}</span>
                    <span> | Rooms: {hotel.roomsCount}</span>
                </>}
            </div>
            {children}
        </div>
    );
};
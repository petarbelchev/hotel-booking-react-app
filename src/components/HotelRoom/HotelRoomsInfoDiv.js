import { useNavigate } from "react-router-dom";

import { PrimaryButton } from "../Buttons/PrimaryButton";
import { Image } from "../Image";
import { RoomInfoDiv } from "./RoomInfoDiv";
import { HotelInfoDiv } from "./HotelInfoDiv";

import { useImages } from "../../hooks/useImages";

import styles from "./HotelRoomsInfoDiv.module.css";

export function HotelRoomsInfoDiv({
    hotel,
    onFavoriteClickHandler,
}) {
    const mainImage = useImages(hotel.mainImageId);
    const navigate = useNavigate();

    const moreDetailsClickHandler = () => navigate(`/hotels/${hotel.id}`);

    return (
        <div className={styles.hotelRoomsDiv}>
            <div className={styles.hotelDiv}>
                {mainImage && <Image src={mainImage} alt={hotel.name} />}

                <div>
                    <HotelInfoDiv hotel={hotel} onFavoriteClickHandler={onFavoriteClickHandler}>
                        <div>
                            <PrimaryButton onClick={moreDetailsClickHandler} name="More Details" />
                        </div>
                    </HotelInfoDiv>
                </div>
            </div>

            <div className={styles.roomsDiv}>
                {hotel.availableRooms.map(room => <RoomInfoDiv key={room.id} room={room} />)}
            </div>
        </div>
    );
}
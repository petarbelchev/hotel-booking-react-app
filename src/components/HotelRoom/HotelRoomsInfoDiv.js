import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PrimaryButton } from "../Buttons/PrimaryButton";
import { RoomInfoDiv } from "./RoomInfoDiv";
import { HotelInfoDiv } from "./HotelInfoDiv";

import { getImage } from "../../services/imagesService";

import styles from "./HotelRoomsInfoDiv.module.css";

export function HotelRoomsInfoDiv({
    hotel,
    onFavoriteClickHandler,
}) {
    const [mainImage, setMainImage] = useState(null);
    const navigate = useNavigate();

    if (hotel.mainImageId && !mainImage) {
        getImage(hotel.mainImageId).then(image => setMainImage(URL.createObjectURL(image)));
    }

    const moreDetailsClickHandler = () => navigate(`/hotels/${hotel.id}`);

    return (
        <div className={styles.hotelRoomsDiv}>
            <div className={styles.hotelDiv}>
                {mainImage && <img src={mainImage} alt={hotel.name} />}

                <div>
                    <HotelInfoDiv hotel={hotel} onFavoriteClickHandler={onFavoriteClickHandler} >
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
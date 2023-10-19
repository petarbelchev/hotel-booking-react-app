import { useNavigate } from "react-router-dom";

import { Button } from "../Buttons/Button";
import { Image } from "../Image";
import { RoomInfoDiv } from "./RoomInfoDiv";

import { useImage } from "../../hooks/useImage";

import "./HotelRoomsInfoDiv.css";

export function HotelRoomsInfoDiv({ hotel }) {
    const mainImage = useImage(hotel.mainImageId);
    const navigate = useNavigate();
    const onMoreDetailsClick = () => navigate(`/hotels/${hotel.id}`);

    return (
        <div className="hotelRoomsDiv">
            <div className="hotelDiv">
                {mainImage && <Image src={mainImage} alt={hotel.name} />}

                <div>
                    <h2>{hotel.name}</h2>
                    <span>{hotel.city.name}</span>
                    <span> | {hotel.description}</span>
                    <span> | Rating: {hotel.ratings.rating} from {hotel.ratings.ratingsCount} votes</span>
                    {hotel.isUserFavoriteHotel && <p>You mark this hotel as favorite.</p>}

                    <div>
                        <Button onClick={onMoreDetailsClick} name="More Details" />
                    </div>
                </div>
            </div>

            <div className="roomsDiv">
                {hotel.availableRooms.map(room => <RoomInfoDiv key={room.id} room={room} />)}
            </div>
        </div>
    );
}
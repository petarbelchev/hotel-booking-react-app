import { RoomInfoDiv } from "../RoomInfoDiv/RoomInfoDiv";

import { useImage } from "../../hooks/useImage";

import "./HotelRoomsInfoDiv.css";

export function HotelRoomsInfoDiv({ hotel }) {
    const mainImage = useImage(hotel.mainImageId);

    return (
        <div className="hotelRoomsDiv">
            <div className="hotelDiv">
                {
                    mainImage &&
                    <div className="imageDiv">
                        <img src={mainImage} alt="Hotel." />
                    </div>
                }

                <div>
                    <h2>{hotel.name}</h2>
                    <span>{hotel.city.name}</span>
                    <span> | {hotel.description}</span>
                    <span> | Rating: {hotel.ratings.rating} from {hotel.ratings.ratingsCount} votes</span>
                    {hotel.isUserFavoriteHotel && <p>You mark this hotel as favorite.</p>}
                </div>
            </div>

            <div className="roomsDiv">
                {hotel.availableRooms.map(room => <RoomInfoDiv key={room.id} room={room} />)}
            </div>
        </div>
    );
}
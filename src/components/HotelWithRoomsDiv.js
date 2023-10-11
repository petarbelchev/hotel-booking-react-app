import { RoomListItem } from "./RoomListItem";

import { useImage } from "../hooks/useImage";

export function HotelWithRoomsDiv({ hotel }) {
    const mainImage = useImage(hotel.mainImageId);

    return (
        <div style={{ borderStyle: "solid" }}>
            <h3>
                {hotel.name} - <span>{hotel.city.name}</span> - <span>Average Rating: {hotel.ratings.rating} from {hotel.ratings.ratingsCount} votes</span>
            </h3>
            <p>{hotel.description}</p>
            {hotel.isUserFavoriteHotel && <p>You mark this hotel as favorite.</p>}
            {mainImage && <img src={mainImage} alt="Hotel main image." />}
            <ul>
                {hotel.availableRooms.map(room => <RoomListItem key={room.id} room={room} />)}
            </ul>
        </div>
    );
}
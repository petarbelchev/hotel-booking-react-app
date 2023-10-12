import { RoomListItem } from "./RoomDiv";

import { useImage } from "../hooks/useImage";

export function HotelWithRoomsDiv({ hotel }) {
    const mainImage = useImage(hotel.mainImageId);

    return (
        <div style={{ borderStyle: "solid", margin: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto auto", justifyContent: "space-around", margin: "10px" }}>
                <div style={{ gridColumnStart: 1, gridColumnEnd: 2 }}>
                    {mainImage && <img src={mainImage} alt="Hotel main image." />}
                </div>

                <div>
                    <h3>
                        {hotel.name} - <span>{hotel.city.name}</span> - <span>Average Rating: {hotel.ratings.rating} from {hotel.ratings.ratingsCount} votes</span>
                    </h3>
                    <p>{hotel.description}</p>
                    {hotel.isUserFavoriteHotel && <p>You mark this hotel as favorite.</p>}
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto", justifyContent: "space-between" }}>
                {hotel.availableRooms.map(room => <RoomListItem key={room.id} room={room} />)}
            </div>
        </div>
    );
}
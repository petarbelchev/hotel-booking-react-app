import { RoomInfoDiv } from "./RoomInfoDiv";

import { useImage } from "../hooks/useImage";

export function HotelRoomsInfoDiv({ hotel }) {
    const mainImage = useImage(hotel.mainImageId);

    return (
        <div style={{ borderStyle: "solid", margin: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto auto", margin: "10px" }}>
                {mainImage &&
                    <div style={{ gridColumnStart: 1, gridColumnEnd: 2 }}>
                        <img src={mainImage} alt="Hotel." />
                    </div>
                }

                <div>
                    <h2>{hotel.name}</h2>
                    <p>{hotel.city.name}</p>
                    <p>{hotel.description}</p>
                    <p>Rating: {hotel.ratings.rating} from {hotel.ratings.ratingsCount} votes</p>
                    {hotel.isUserFavoriteHotel && <p>You mark this hotel as favorite.</p>}
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto", justifyContent: "space-between" }}>
                {hotel.availableRooms.map(room => <RoomInfoDiv key={room.id} room={room} />)}
            </div>
        </div>
    );
}
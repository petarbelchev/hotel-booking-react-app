import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getHotel } from "../services/hotelsService";
import { AuthContext } from "../contexts/AuthContext";
import { useImage } from "../hooks/useImage";

export function HotelDetailsPage() {
    const { user } = useContext(AuthContext);
    const [hotel, setHotel] = useState(null);
    const { hotelId } = useParams();
    const mainImage = useImage(hotel && hotel.mainImageId);

    useEffect(() => {
        getHotel(hotelId, user.token)
            .then(hotelData => setHotel(hotelData))
            .catch(error => alert(`${error.status} ${error.title}`));
    }, [hotelId, user.token]);

    return (
        <main>
            <section>
                <h1>Hotel Details</h1>
                {hotel && (
                    <div style={{ borderStyle: "solid", margin: "20px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "auto auto", justifyContent: "space-around", margin: "10px" }}>
                            <div style={{ gridColumnStart: 1, gridColumnEnd: 2 }}>
                                {mainImage && <img src={mainImage} alt="Hotel." />}
                            </div>

                            <div>
                                <h2>{hotel.name}</h2>
                                <p>{hotel.city.name}, {hotel.address}</p>
                                <p>{hotel.description}</p>
                                <p>Rating: {hotel.ratings.rating} from {hotel.ratings.ratingsCount} votes</p>
                                <p>Rooms: {hotel.roomsCount}</p>
                                <p>Owner: {hotel.owner.firstName} {hotel.owner.lastName}</p>
                                <p>Favorited from {hotel.usersWhoFavoritedCount} people</p>
                                {hotel.isUserFavoriteHotel && <p>You mark this hotel as favorite.</p>}
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
};

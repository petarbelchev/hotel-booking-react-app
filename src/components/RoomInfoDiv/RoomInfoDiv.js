import { useImage } from "../../hooks/useImage";

import "./RoomInfoDiv.css";

export function RoomInfoDiv({ room, children }) {
    const mainImage = useImage(room.mainImageId);

    return (
        <div className="container">
            {mainImage && <div><img src={mainImage} alt="Room." /></div>}
            <div className="content">
                <h3>{room.roomType === 0 ? "Single" : room.roomType === 1 ? "Double" : "Apartment"}</h3>
                <div>
                    <span>Price: </span>
                    <span>{room.pricePerNight} BGN</span>
                </div>
                <div>
                    <span>Capacity: </span>
                    <span>{room.capacity}</span>
                </div>
                <div>
                    <span>Number: </span>
                    <span>{room.number}</span>
                </div>
                {room.hasAirConditioner && <p>- Has AC.</p>}
                {room.hasBalcony && <p>- Has Balcony.</p>}
                {room.hasKitchen && <p>- Has Kitchen.</p>}
                {room.isSmokingAllowed && <p>- Smoking Allowed.</p>}
            </div>
            {children}
        </div>
    );
}
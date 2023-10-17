import { useImage } from "../hooks/useImage";

export function RoomInfoDiv({ room, children }) {
    const mainImage = useImage(room.mainImageId);

    return (
        <div style={{ margin: "20px", borderStyle: "double", listStyleType: "none", display: "inline-block" }}>
            {mainImage && <img src={mainImage} alt="Room." />}
            <h3>{room.roomType === 0 ? "Single" : room.roomType === 1 ? "Double" : "Apartment"}</h3>
            <p>Price: {room.pricePerNight} BGN</p>
            <p>Capacity: {room.capacity}</p>
            <p>Number: {room.number}</p>
            {room.hasAirConditioner && <p>- Has AC.</p>}
            {room.hasBalcony && <p>- Has Balcony.</p>}
            {room.hasKitchen && <p>- Has Kitchen.</p>}
            {room.isSmokingAllowed && <p>- Smoking Allowed.</p>}
            {children}
        </div>
    );
}
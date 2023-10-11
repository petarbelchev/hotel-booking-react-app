import { useImage } from "../hooks/useImage";

export function RoomListItem({ room }) {
    const mainImage = useImage(room.mainImageId);
    
    return (
        <li style={{
            margin: "20px",
            borderStyle: "double",
            listStyleType: "none",
            display: "inline-block",
        }}>
            <h3>{room.roomType}</h3>
            <p>Price: {room.pricePerNight} BGN</p>
            <p>Capacity: {room.capacity}</p>
            <p>Number: {room.number}</p>
            {room.hasAirConditioner && <p>- Has AC.</p>}
            {room.hasBalcony && <p>- Has Balcony.</p>}
            {room.hasKitchen && <p>- Has Kitchen.</p>}
            {room.isSmokingAllowed && <p>- Smoking Allowed.</p>}
            {mainImage && <img src={mainImage} alt="Room main image." />}
        </li>
    );
}
import { useState } from 'react';
import { getImage } from 'services/imagesService';
import styles from './Room.module.css';

export function Room({ room }) {
    const [mainImage, setMainImage] = useState(null);

    if (room.mainImageId && !mainImage) {
        getImage(room.mainImageId).then(image => setMainImage(URL.createObjectURL(image)));
    }

    const roomType = room.roomType === 0 ? "Single" : room.roomType === 1 ? "Double" : "Apartment";

    return (
        <div className={styles.container}>
            {mainImage && <img
                className={styles.image}
                src={mainImage}
                alt={'Room ' + room.number}
                width="120px"
            />}
            
            <div className={styles.content}>
                <h3>{roomType} - {room.pricePerNight} BGN, {room.capacity} persons</h3>
                <span>Number: {room.number}.</span>
                {room.hasAirConditioner && <span> Has AC.</span>}
                {room.hasBalcony && <span> Has Balcony.</span>}
                {room.hasKitchen && <span> Has Kitchen.</span>}
                {room.isSmokingAllowed && <span> Smoking Allowed.</span>}
            </div>
        </div>
    );
}
import styles from "./AddEditRoomDiv.module.css";

export function AddEditRoomDiv({ roomIdx, room, onChangeHandler, children }) {
    const changeHandler = (e) => onChangeHandler(e, roomIdx);

    return (
        <div className={styles.roomContent}>
            <label htmlFor="number">Room Number:</label>
            <input
                id="number"
                name="number"
                type="text"
                value={room.number}
                onChange={changeHandler}
                required
            />

            <label htmlFor="capacity">Capacity:</label>
            <input
                id="capacity"
                name="capacity"
                type="number"
                min="1"
                value={room.capacity}
                onChange={changeHandler}
                required
            />

            <label htmlFor="pricePerNight">Price Per Night:</label>
            <input
                id="pricePerNight"
                name="pricePerNight"
                type="number"
                min="0"
                value={room.pricePerNight}
                onChange={changeHandler}
                required
            />

            <label htmlFor="roomType">Room Type:</label>
            <select id="roomType" name="roomType" value={room.roomType} onChange={changeHandler}>
                <option value="0" key="0">Single</option>
                <option value="1" key="1">Double</option>
                <option value="2" key="2">Apartment</option>
            </select>

            <input
                id="hasAirConditioner"
                name="hasAirConditioner"
                type="checkbox"
                className={styles.checkBox}
                checked={room.hasAirConditioner}
                onChange={changeHandler}
            />
            <label htmlFor="hasAirConditioner">AC</label><br/>

            <input
                id="hasBalcony"
                name="hasBalcony"
                type="checkbox"
                className={styles.checkBox}
                checked={room.hasBalcony}
                onChange={changeHandler}
            />
            <label htmlFor="hasBalcony">Balcony</label><br/>

            <input
                id="hasKitchen"
                name="hasKitchen"
                type="checkbox"
                className={styles.checkBox}
                checked={room.hasKitchen}
                onChange={changeHandler}
            />
            <label htmlFor="hasKitchen">Kitchen</label><br/>

            <input
                id="isSmokingAllowed"
                name="isSmokingAllowed"
                type="checkbox"
                className={styles.checkBox}
                checked={room.isSmokingAllowed}
                onChange={changeHandler}
            />
            <label htmlFor="isSmokingAllowed">Smoking Allowed</label><br/>

            {children}
        </div>
    );
};

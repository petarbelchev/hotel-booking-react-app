import styles from "./AddEditRoomDiv.module.css";
import { PrimaryButton } from "../../../../../components/Buttons/PrimaryButton";
import { DangerButton } from "../../../../../components/Buttons/DangerButton";

export function AddEditRoomDiv({ roomIdx, room, onChangeHandler, onDeleteRoomClickHandler }) {
    const changeHandler = (e) => onChangeHandler(e, roomIdx);

    return (
        <div className={styles.roomContent}>
            <label htmlFor={"number" + roomIdx}>Room Number:</label>
            <input
                id={"number" + roomIdx}
                name="number"
                type="text"
                value={room.number}
                onChange={changeHandler}
                required
            />

            <label htmlFor={"capacity" + roomIdx}>Capacity:</label>
            <input
                id={"capacity" + roomIdx}
                name="capacity"
                type="number"
                min="1"
                value={room.capacity}
                onChange={changeHandler}
                required
            />

            <label htmlFor={"pricePerNight" + roomIdx}>Price Per Night:</label>
            <input
                id={"pricePerNight" + roomIdx}
                name="pricePerNight"
                type="number"
                min="0"
                value={room.pricePerNight}
                onChange={changeHandler}
                required
            />

            <label htmlFor={"roomType" + roomIdx}>Room Type:</label>
            <select
                id={"roomType" + roomIdx}
                name="roomType"
                value={room.roomType}
                onChange={changeHandler}
            >
                <option value="0" key="0">Single</option>
                <option value="1" key="1">Double</option>
                <option value="2" key="2">Apartment</option>
            </select>

            <input
                id={"hasAirConditioner" + roomIdx}
                name="hasAirConditioner"
                type="checkbox"
                className={styles.checkBox}
                checked={room.hasAirConditioner}
                onChange={changeHandler}
            />
            <label htmlFor={"hasAirConditioner" + roomIdx}>AC</label><br />

            <input
                id={"hasBalcony" + roomIdx}
                name="hasBalcony"
                type="checkbox"
                className={styles.checkBox}
                checked={room.hasBalcony}
                onChange={changeHandler}
            />
            <label htmlFor={"hasBalcony" + roomIdx}>Balcony</label><br />

            <input
                id={"hasKitchen" + roomIdx}
                name="hasKitchen"
                type="checkbox"
                className={styles.checkBox}
                checked={room.hasKitchen}
                onChange={changeHandler}
            />
            <label htmlFor={"hasKitchen" + roomIdx}>Kitchen</label><br />

            <input
                id={"isSmokingAllowed" + roomIdx}
                name="isSmokingAllowed"
                type="checkbox"
                className={styles.checkBox}
                checked={room.isSmokingAllowed}
                onChange={changeHandler}
            />
            <label htmlFor={"isSmokingAllowed" + roomIdx}>Smoking Allowed</label><br />

            <PrimaryButton type="submit" name={room.id ? "Update Room" : "Create Room"} />
            {room.id && <DangerButton onClick={onDeleteRoomClickHandler} name="Delete Room" />}
        </div>
    );
};

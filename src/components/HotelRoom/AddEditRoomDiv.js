import { CheckBox } from "../CheckBox";
import { Dropdown } from "../Dropdown";
import { InputField } from "../InputField";

import styles from "./AddEditRoomDiv.module.css";

export function AddEditRoomDiv({
    roomIdx,
    room,
    onChange,
    children,
}) {
    return (
        <div className={styles.container}>
            <InputField
                type="text"
                labelName="Room Number"
                paramName="number"
                value={room.number}
                onChange={(e) => onChange(e, roomIdx)}
                required={true}
            />
            <InputField
                type="number"
                labelName="Capacity"
                paramName="capacity"
                value={room.capacity}
                onChange={(e) => onChange(e, roomIdx)}
                required={true}
            />
            <InputField
                type="number"
                labelName="Price Per Night"
                paramName="pricePerNight"
                value={room.pricePerNight}
                onChange={(e) => onChange(e, roomIdx)}
                required={true}
            />
            <Dropdown
                labelName="Room Type"
                paramName="roomType"
                items={[
                    { id: 0, name: "Single" },
                    { id: 1, name: "Double" },
                    { id: 2, name: "Apartment" }
                ]}
                value={room.roomType}
                onSelectChange={(e) => onChange(e, roomIdx)}
            />
            <CheckBox
                labelName="Has Air Conditioner"
                paramName="hasAirConditioner"
                checked={room.hasAirConditioner}
                onChange={(e) => onChange(e, roomIdx)}
            />
            <CheckBox
                labelName="Has Balcony"
                paramName="hasBalcony"
                checked={room.hasBalcony}
                onChange={(e) => onChange(e, roomIdx)}
            />
            <CheckBox
                labelName="Has Kitchen"
                paramName="hasKitchen"
                checked={room.hasKitchen}
                onChange={(e) => onChange(e, roomIdx)}
            />
            <CheckBox
                labelName="Is Smoking Allowed"
                paramName="isSmokingAllowed"
                checked={room.isSmokingAllowed}
                onChange={(e) => onChange(e, roomIdx)}
            />
            {children}
        </div>
    );
};

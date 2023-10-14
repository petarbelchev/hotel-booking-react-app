export function AddRoomDiv({ roomIndex }) {
    return (
        <div style={{ borderStyle: "double", marginTop: "10px", marginBottom: "10px", padding: "10px" }}>
            <div>
                <label htmlFor="number">Room Number:</label>
                <input type="text" name={`rooms[${roomIndex}].number`} required />
            </div>
            <div>
                <label htmlFor="capacity">Capacity:</label>
                <input type="number" name={`rooms[${roomIndex}].capacity`} required />
            </div>
            <div>
                <label htmlFor="pricePerNight">Price Per Night:</label>
                <input type="number" name={`rooms[${roomIndex}].pricePerNight`} required />
            </div>
            <div>
                <label htmlFor="roomType">Room Type:</label>
                <select type="number" name={`rooms[${roomIndex}].roomType`} required>
                    <option value={0}>Single</option>
                    <option value={1}>Double</option>
                    <option value={2}>Apartment</option>
                </select>
            </div>
            <div>
                <label htmlFor="hasAirConditioner">Has Air Conditioner:</label>
                <input type="checkbox" name={`rooms[${roomIndex}].hasAirConditioner`} defaultValue={true} />
            </div>
            <div>
                <label htmlFor="hasBalcony">Has Balcony:</label>
                <input type="checkbox" name={`rooms[${roomIndex}].hasBalcony`} defaultValue={true} />
            </div>
            <div>
                <label htmlFor="hasKitchen">Has Kitchen:</label>
                <input type="checkbox" name={`rooms[${roomIndex}].hasKitchen`} defaultValue={true} />
            </div>
            <div>
                <label htmlFor="isSmokingAllowed">Is Smoking Allowed:</label>
                <input type="checkbox" name={`rooms[${roomIndex}].isSmokingAllowed`} defaultValue={true} />
            </div>
        </div>
    );
}
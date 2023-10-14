import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AddRoomDiv } from "../components/AddRoomDiv";
import { Dropdown } from "../components/Dropdown";
import { useCities } from "../hooks/useCities";
import { addHotel } from "../services/hotelsService";
import { AuthContext } from "../contexts/AuthContext";

export function AddHotelPage() {
    const [rooms, setRooms] = useState([]);
    const cities = useCities();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    function onClickAddRoom() {
        setRooms(state => [...state, <AddRoomDiv key={state.length} roomIndex={state.length} />])
    }

    function onAddHotelSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const roomsData = Array.from(formData.keys())
            .filter(key => key.startsWith('rooms'))
            .reduce((rooms, key) => {
                const [roomIndex, field] = key.match(/\[(\d+)\]\.(\w+)/).slice(1, 3);
                !rooms[roomIndex] && (rooms[roomIndex] = {});

                const fieldValue = field.startsWith('has') || field.startsWith('is')
                    ? Boolean(formData.get(key))
                    : field === 'roomType'
                        ? Number(formData.get(key))
                        : formData.get(key);

                rooms[roomIndex][field] = fieldValue;

                return rooms;
            }, []);

        const hotel = {
            name: formData.get('name'),
            address: formData.get('address'),
            cityId: formData.get('cityId'),
            description: formData.get('description'),
            rooms: roomsData,
        };

        addHotel(hotel, user.token)
            .then(({ id }) => navigate(`/hotels/${id}`))
            // TODO: Render validation errors.
            .catch(error => alert(`${error.status} ${error.title}!`));
    }

    return (
        <main>
            <section>
                <h1>Add a Hotel</h1>
                <form onSubmit={onAddHotelSubmit} style={{ borderStyle: "solid", padding: "10px" }}>
                    <div>
                        <label htmlFor="name">Hotel Name:</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" name="address" required />
                    </div>
                    <div>
                        <Dropdown labelName={"City:"} items={cities} paramName={"cityId"} />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" required />
                    </div>
                    <div>
                        {rooms}
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <button onClick={onClickAddRoom}>Add Room</button>
                        <button type="submit">Add Hotel</button>
                    </div>
                </form>
            </section>
        </main>
    );
};

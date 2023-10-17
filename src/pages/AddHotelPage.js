import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AddEditRoomDiv } from "../components/AddEditRoomDiv";
import { Button } from "../components/Button";
import { AddEditHotelDiv } from "../components/AddEditHotelDiv";

import { addHotel } from "../services/hotelsService";
import { AuthContext } from "../contexts/AuthContext";
import { useHotel } from "../hooks/useHotel";

export function AddHotelPage() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { hotel, changeHandler, addRoom, setCityId, } = useHotel({
        name: '',
        address: '',
        cityId: 0,
        description: '',
        rooms: [],
    });

    const onAddRoomClick = () => addRoom();

    const onAddHotelClick = () => {
        addHotel(
            hotel, user.token
        ).then(({ id }) =>
            navigate(`/hotels/${id}`)
        ).catch(error =>
            // TODO: Render validation errors.
            alert(`${error.status} ${error.title}!`)
        );
    }

    return (
        <main>
            <section>
                <h1>Add a Hotel</h1>

                <AddEditHotelDiv
                    hotel={hotel}
                    onChange={changeHandler}
                    setCityId={setCityId}
                >
                    <div>
                        {hotel.rooms.map((room, index) =>
                            <AddEditRoomDiv
                                key={index}
                                roomIdx={index}
                                room={room}
                                onChange={changeHandler}
                            />
                        )}
                    </div>

                    <div>
                        <Button onClick={onAddRoomClick} name="Add Room" />
                        <Button onClick={onAddHotelClick} name="Add Hotel" />
                    </div>
                </AddEditHotelDiv>
            </section>
        </main>
    );
};

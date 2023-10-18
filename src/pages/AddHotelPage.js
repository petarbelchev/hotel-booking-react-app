import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/Button";
import { SubmitButton } from "../components/SubmitButton";
import { AddEditHotelForm } from "../components/AddEditHotelForm/AddEditHotelForm";
import { AddEditRoomDiv } from "../components/AddEditRoomDiv";

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

    const onAddRoomClick = (e) => {
        e.preventDefault();
        addRoom();
    };

    const onAddHotelSubmit = (e) => {
        e.preventDefault();

        addHotel(hotel, user.token)
            .then(({ id }) => navigate(`/hotels/${id}`))
            // TODO: Render validation errors.
            .catch(error => alert(`${error.status} ${error.title}!`));
    };

    return (
        <main>
            <section>
                <h1>Add a Hotel</h1>

                <AddEditHotelForm
                    hotel={hotel}
                    setCityId={setCityId}
                    onChange={changeHandler}
                    onSubmit={onAddHotelSubmit}
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
                        <SubmitButton name="Add Hotel" />
                    </div>
                </AddEditHotelForm>
            </section>
        </main>
    );
};

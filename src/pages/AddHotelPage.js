import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/Buttons/Button";
import { SubmitButton } from "../components/Buttons/SubmitButton";
import { AddEditHotelForm } from "../components/HotelRoom/AddEditHotelForm";
import { AddEditRoomDiv } from "../components/HotelRoom/AddEditRoomDiv";

import { useForm } from "../hooks/useForm";
import { useCities } from "../hooks/useCities";
import { useRoomForms } from "../hooks/useRoomForms";

import { addHotel } from "../services/hotelsService";
import { AuthContext } from "../contexts/AuthContext";

export function AddHotelPage() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const cities = useCities();

    const { form: hotelForm, setForm: setHotelForm, changeHandler: hotelChangeHandler } = useForm({
        name: '',
        address: '',
        cityId: 0,
        description: '',
    });

    const { roomForms, addRoomToForm, roomFormsChangeHandler } = useRoomForms();

    useEffect(() => {
        setHotelForm(state => ({ ...state, cityId: cities[0]?.id }));
    }, [cities, setHotelForm]);

    const onAddRoomClick = (e) => {
        e.preventDefault();
        addRoomToForm();
    };

    const onAddHotelSubmit = (e) => {
        e.preventDefault();
        const hotel = {
            ...hotelForm,
            rooms: roomForms
        };

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
                    hotel={hotelForm}
                    onChange={hotelChangeHandler}
                    onSubmit={onAddHotelSubmit}
                    cities={cities}
                >
                    <div>
                        {roomForms.map((room, index) =>
                            <AddEditRoomDiv
                                key={index}
                                roomIdx={index}
                                room={room}
                                onChange={roomFormsChangeHandler}
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

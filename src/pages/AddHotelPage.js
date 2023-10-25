import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PrimaryButton } from "../components/Buttons/PrimaryButton";
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
    const roomForms = useRoomForms();
    
    const {
        form: hotelForm,
        setForm: setHotelForm,
        formChangeHandler: hotelFormChangeHandler
    } = useForm({
        name: '',
        address: '',
        cityId: 0,
        description: '',
    });    

    useEffect(() => {
        setHotelForm(state => ({
            ...state,
            cityId: cities[0]?.id
        }));
    }, [cities, setHotelForm]);

    const addRoomClickHandler = (e) => {
        e.preventDefault();
        roomForms.addRoomToForm();
    };

    const addHotelSubmitHandler = async (e) => {
        e.preventDefault();
        const hotel = {
            ...hotelForm,
            rooms: roomForms.forms
        };

        try {
            const { id } = await addHotel(hotel, user.token);
            navigate(`/hotels/${id}`);
        } catch (error) {
            // TODO: Render validation errors.
            alert(`${error.status} ${error.title}!`);
        }
    };

    return (
        <main>
            <section>
                <h1>Add a Hotel</h1>

                <AddEditHotelForm
                    hotel={hotelForm}
                    onChange={hotelFormChangeHandler}
                    onSubmit={addHotelSubmitHandler}
                    cities={cities}
                >
                    <div>
                        {roomForms.forms.map((room, index) =>
                            <AddEditRoomDiv
                                key={index}
                                roomIdx={index}
                                room={room}
                                onChange={roomForms.formsChangeHandler}
                            />
                        )}
                    </div>

                    <div>
                        <PrimaryButton onClick={addRoomClickHandler} name="Add Room" />
                        <PrimaryButton type="submit" name="Add Hotel" />
                    </div>
                </AddEditHotelForm>
            </section>
        </main>
    );
};

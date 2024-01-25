import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PrimaryButton } from 'UI/Buttons/PrimaryButton';
import { AuthContext } from 'contexts/AuthContext';
import { useCities } from 'hooks/useCities';
import { useRoomForms } from 'hooks/useRoomForms';

import { AddRoomDiv } from './AddRoomDiv';
import { addHotel } from '../services/addHotelService';
import styles from './AddHotelForm.module.css';

export function AddHotelForm() {
    const cities = useCities();
    const [hotelForm, setHotelForm] = useState({ name: '', address: '', cityId: 0, description: '', });
    const roomForms = useRoomForms();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setHotelForm(state => ({ ...state, cityId: cities[0]?.id }));
    }, [cities, setHotelForm]);

    const hotelFormChangeHandler = (e) => setHotelForm(state => ({ ...state, [e.target.name]: e.target.value }));

    const addRoomClickHandler = (e) => {
        e.preventDefault();
        roomForms.addRoomToForm();
    };

    const addHotelSubmitHandler = async (e) => {
        e.preventDefault();
        const hotel = { ...hotelForm, rooms: roomForms.forms };

        try {
            const { id } = await addHotel(hotel, user.token);
            navigate(`/hotels/${id}`);
        } catch (error) {
            // TODO: Render validation errors.
            alert(`${error.status} ${error.title}!`);
        }
    };

    return (
        <form onSubmit={addHotelSubmitHandler}>
            <div id={styles.hotelContent}>
                <label htmlFor="name">Hotel Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={hotelForm.name}
                    onChange={hotelFormChangeHandler}
                    required
                />

                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={hotelForm.address}
                    onChange={hotelFormChangeHandler}
                    required
                />

                <label htmlFor="cityId">City:</label>
                <select id="cityId" name="cityId" value={hotelForm.cityId} onChange={hotelFormChangeHandler}>
                    {cities.map(city => <option key={city.id} value={city.id}> {city.name}</option>)}
                </select>

                <label htmlFor="description">Description:</label>
                <textarea
                    type="textarea"
                    id="description"
                    name="description"
                    value={hotelForm.description}
                    onChange={hotelFormChangeHandler}
                    rows="5"
                    required
                />
            </div>

            <div id={styles.rooms}>
                {roomForms.forms.map((room, index) =>
                    <AddRoomDiv
                        key={index}
                        roomIdx={index}
                        room={room}
                        onChangeHandler={roomForms.formsChangeHandler}
                    />
                )}
            </div>

            <div id={styles.buttons}>
                <PrimaryButton onClick={addRoomClickHandler} name="Add Room" />
                <PrimaryButton type="submit" name="Add Hotel" />
            </div>
        </form>
    );
};
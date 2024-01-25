import { useState } from 'react';

import { useCities } from 'hooks/useCities';
import { PrimaryButton } from 'UI/Buttons/PrimaryButton';

import styles from './EditHotelForm.module.css';

export function EditHotelForm({ hotel, onCancelClickHandler, onSubmitHandler }) {
    const cities = useCities();
    const [hotelForm, setHotelForm] = useState({ 
        name: hotel.name, 
        address: hotel.address,  
        description: hotel.description,
        cityId: hotel.city.id
    });
    const onChangeHandler = (e) => setHotelForm(state => ({ ...state, [e.target.name]: e.target.value }))

    return (
        <form onSubmit={(e) => onSubmitHandler(e, hotelForm)}>
            <div className={styles.hotelContent}>
                <label htmlFor="name">Hotel Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={hotelForm.name}
                    onChange={onChangeHandler}
                    required
                />

                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={hotelForm.address}
                    onChange={onChangeHandler}
                    required
                />

                <label htmlFor="cityId">City:</label>
                <select id="cityId" name="cityId" value={hotelForm.cityId} onChange={onChangeHandler}>
                    {cities.map(city => <option key={city.id} value={city.id}> {city.name}</option>)}
                </select>

                <label htmlFor="description">Description:</label>
                <textarea
                    type="textarea"
                    id="description"
                    name="description"
                    value={hotelForm.description}
                    onChange={onChangeHandler}
                    rows="5"
                    required
                />
            </div>

            <div className={styles.editButtons}>
                <PrimaryButton onClick={onCancelClickHandler} name="Cancel" />
                <PrimaryButton type="submit" name="Update Hotel" />
            </div>
        </form>
    );
};
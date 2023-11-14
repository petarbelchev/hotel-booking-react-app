import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDateValidator } from "../../hooks/useDateValidator";
import { useCities } from "../../hooks/useCities";

import { PrimaryButton } from "../Buttons/PrimaryButton";
import styles from "./SearchRoomsForm.module.css";

export function SearchRoomsForm({
    initCityId,
    initCheckInDate,
    initCheckOutDate,
}) {
    const cities = useCities();
    const [cityId, setCityId] = useState(initCityId || '0');
    const dateValidator = useDateValidator(initCheckInDate, initCheckOutDate);
    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();

        navigate('/search-result?' +
            `cityId=${cityId}&` +
            `checkInLocal=${dateValidator.checkInDate}&` +
            `checkOutLocal=${dateValidator.checkOutDate}`
        );
    };

    const cityChangeHandler = (e) => setCityId(e.target.value);

    return (
        <form className={styles.form} onSubmit={searchSubmitHandler}>
            <label htmlFor="cityId">Choose a city:</label>
            <select id="cityId" name="cityId" value={cityId} onChange={cityChangeHandler}>
                {cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}
            </select>

            <label htmlFor="checkInLocal">From:</label>
            <input
                name="checkInLocal"
                type="date"
                onChange={dateValidator.onDateChange}
                min={dateValidator.checkInMinDate.toISOString().split("T")[0]}
                max={dateValidator.checkInMaxDate?.toISOString().split("T")[0]}
                value={dateValidator.checkInDate}
                required
            />

            <label htmlFor="checkOutLocal">To:</label>
            <input
                name="checkOutLocal"
                type="date"
                onChange={dateValidator.onDateChange}
                min={dateValidator.checkOutMinDate.toISOString().split("T")[0]}
                value={dateValidator.checkOutDate}
                required
            />

            <PrimaryButton type="submit" name="Search" />
        </form>
    );
};
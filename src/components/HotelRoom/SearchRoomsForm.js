import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Select } from "../Select";
import { PrimaryButton } from "../Buttons/PrimaryButton";

import { useDateValidator } from "../../hooks/useDateValidator";
import { useCities } from "../../hooks/useCities";

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
        <form
            className={styles.roomsForm}
            onSubmit={searchSubmitHandler}
        >
            <Select
                labelName={'Choose a city:'}
                paramName={'cityId'}
                items={cities}
                value={cityId}
                onSelectChange={cityChangeHandler}
            />
            
            <div>
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
            </div>

            <div>
                <label htmlFor="checkOutLocal">To:</label>
                <input
                    name="checkOutLocal"
                    type="date"
                    onChange={dateValidator.onDateChange}
                    min={dateValidator.checkOutMinDate.toISOString().split("T")[0]}
                    value={dateValidator.checkOutDate}
                    required
                />
            </div>
            
            <PrimaryButton type="submit" name="Search" />
        </form>
    );
};
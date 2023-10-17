import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Dropdown } from "./Dropdown";
import { SubmitButton } from "./SubmitButton";

import { useDateValidator } from "../hooks/useDateValidator";
import { useCities } from "../hooks/useCities";

export function SearchRoomsForm({
    initCityId,
    initCheckInDate,
    initCheckOutDate,
}) {
    const cities = useCities();
    const [cityId, setCityId] = useState(initCityId || '0');
    const dateValidator = useDateValidator(initCheckInDate, initCheckOutDate);
    const navigate = useNavigate();

    const onSearchSubmit = (e) => {
        e.preventDefault();

        navigate('/search-result?' +
            `cityId=${cityId}&` +
            `checkInLocal=${dateValidator.checkInDate}&` +
            `checkOutLocal=${dateValidator.checkOutDate}`
        );
    };

    const onCityChange = (e) => setCityId(e.target.value);

    return (
        <form onSubmit={onSearchSubmit}>
            <Dropdown
                labelName={'Choose a city:'}
                paramName={'cityId'}
                items={cities}
                value={cityId}
                onSelectChange={onCityChange}
            />
            <label htmlFor="checkInLocal">From:</label>
            <input
                id="checkInLocal"
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
                id="checkOutLocal"
                name="checkOutLocal"
                type="date"
                onChange={dateValidator.onDateChange}
                min={dateValidator.checkOutMinDate.toISOString().split("T")[0]}
                value={dateValidator.checkOutDate}
                required
            />
            <SubmitButton name="Search" />
        </form>
    );
};
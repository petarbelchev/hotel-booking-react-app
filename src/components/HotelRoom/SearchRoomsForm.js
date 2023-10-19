import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Dropdown } from "../Dropdown";
import { SubmitButton } from "../Buttons/SubmitButton";

import { useDateValidator } from "../../hooks/useDateValidator";
import { useCities } from "../../hooks/useCities";

import "./SearchRoomsForm.css";

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
        <form className="roomsForm" onSubmit={onSearchSubmit}>
            <Dropdown
                labelName={'Choose a city:'}
                paramName={'cityId'}
                items={cities}
                value={cityId}
                onSelectChange={onCityChange}
            />
            <div>
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
            </div>
            <div>
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
            </div>
            <SubmitButton name="Search" />
        </form>
    );
};
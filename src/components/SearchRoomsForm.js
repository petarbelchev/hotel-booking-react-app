import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Dropdown } from "./Dropdown";
import { Button } from "./Button";

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
    
    const onSearchClick = () => {
        if (!dateValidator.checkInDate || !dateValidator.checkOutDate) {
            alert('Please enter Check-In and CheckOut dates!')
        } else {
            navigate('/search-result?' +
                `cityId=${cityId}&` +
                `checkInLocal=${dateValidator.checkInDate}&` +
                `checkOutLocal=${dateValidator.checkOutDate}`
            );
        }
    };

    const onCityChange = (e) => setCityId(e.target.value);

    return (
        <div>
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
            />
            <label htmlFor="checkOutLocal">To:</label>
            <input
                id="checkOutLocal"
                name="checkOutLocal"
                type="date"
                onChange={dateValidator.onDateChange}
                min={dateValidator.checkOutMinDate.toISOString().split("T")[0]}
                value={dateValidator.checkOutDate}
            />
            <Button onClick={onSearchClick} name="Search" />
        </div>
    );
}
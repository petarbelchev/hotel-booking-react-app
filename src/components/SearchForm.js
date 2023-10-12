import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Dropdown } from "../components/Dropdown";
import { useDateValidator } from "../hooks/useDateValidator";
import { getCities } from "../services/citiesService";

export function SearchForm({
    initCityId,
    initCheckInDate,
    initCheckOutDate,
}) {
    const [cities, setCities] = useState([]);
    const [cityId, setCityId] = useState(initCityId || '0');
    const navigate = useNavigate();

    const dateConfig = useDateValidator(
        initCheckInDate,
        initCheckOutDate
    );

    useEffect(() => {
        getCities().then(cities => setCities(cities));
    }, []);

    function onSearchSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const queryString = new URLSearchParams(formData).toString();
        navigate(`/search-result?${queryString}`);
    }

    function onSelectChange(e) {
        setCityId(e.target.value);
    }

    return (
        <form onSubmit={onSearchSubmit}>
            <Dropdown
                labelName={'Choose a city:'}
                paramName={'cityId'}
                items={cities}
                value={cityId}
                onSelectChange={onSelectChange}
            />
            <label htmlFor="checkInLocal">From:</label>
            <input
                id="checkInLocal"
                name="checkInLocal"
                type="date"
                onChange={dateConfig.onDateChange}
                min={dateConfig.checkInMinDate.toISOString().split("T")[0]}
                max={dateConfig.checkInMaxDate?.toISOString().split("T")[0]}
                value={dateConfig.checkInDate}
            />
            <label htmlFor="checkOutLocal">To:</label>
            <input
                id="checkOutLocal"
                name="checkOutLocal"
                type="date"
                onChange={dateConfig.onDateChange}
                min={dateConfig.checkOutMinDate.toISOString().split("T")[0]}
                value={dateConfig.checkOutDate}
            />
            <button type="submit">Search</button>
        </form>
    );
}
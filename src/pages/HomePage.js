import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Dropdown } from "../components/Dropdown";
import { getCities } from "../services/citiesService";
import { useDateConfigurator } from "../hooks/useDateConfigurator";

export function HomePage() {
    const navigate = useNavigate();
    const [cities, setCities] = useState([]);
    const dateConfig = useDateConfigurator();

    function onSearchSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchParams = new URLSearchParams(formData).toString();
        navigate(`/search-result?${searchParams}`);
    }

    useEffect(() => {
        async function fetchData() {
            return await getCities();
        }

        fetchData().then(cities => setCities(cities));
    }, []);

    return (
        <main>
            <section>
                <h1>Find your next vacation</h1>
                <form onSubmit={onSearchSubmit}>
                    <Dropdown
                        labelName={'Choose a city:'}
                        paramName={'cityId'}
                        items={cities}
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
            </section>
        </main>
    );
};
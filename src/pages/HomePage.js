import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Dropdown } from "../components/Dropdown";
import { getCities } from "../services/citiesService";

export function HomePage() {
    const navigate = useNavigate();
    const [cities, setCities] = useState([]);

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
                    <Dropdown labelName={'Choose a city:'} paramName={'cityId'} items={cities} />
                    <label htmlFor="checkInLocal">From:</label>
                    <input type="datetime-local" id="checkInLocal" name="checkInLocal" />
                    <label htmlFor="checkOutLocal">To:</label>
                    <input type="datetime-local" id="checkOutLocal" name="checkOutLocal" />
                    <button type="submit">Search</button>
                </form>
            </section>
        </main>
    );
};
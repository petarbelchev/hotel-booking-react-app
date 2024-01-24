import { useState, useEffect } from "react";

import { getCities } from "./citiesService";

export function useCities() {
    const [cities, setCities] = useState([]);
    
    useEffect(() => {
        getCities().then(setCities);
    }, []);

    return cities;
}
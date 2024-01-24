import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { getHotel } from "../hotelService";

export function useHotel(hotelId) {
    const { user } = useContext(AuthContext);
    const [hotel, setHotel] = useState({});

    useEffect(() => {
        hotelId && getHotel(hotelId, user?.token)
            .then(hotelData => setHotel(state => ({ ...state, ...hotelData })))
            .catch(error => alert(`${error.status} ${error.title}`));
    }, [hotelId, user?.token, setHotel]);

    return { hotel, setHotel };
};
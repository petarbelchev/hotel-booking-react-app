import { useState, useEffect, useContext } from "react";

import { getHotel, updateHotel } from "../services/hotelsService";
import { getHotelRooms, updateRoom } from "../services/roomsService";

import { AuthContext } from "../contexts/AuthContext";

export function useHotel(initHotelValues, hotelId) {
    const { user } = useContext(AuthContext);
    const [hotel, setHotel] = useState(initHotelValues);

    useEffect(() => {
        hotelId && getHotel(
            hotelId, user.token
        ).then(hotelData => {
            setHotel(hotelData);
        }).catch(error => alert(`${error.status} ${error.title}`));
    }, [hotelId, user.id, user.token]);

    const changeHandler = (e, roomIdx) => {
        const fieldName = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        setHotel(state => {
            const newState = { ...state };

            roomIdx !== undefined
                ? newState.rooms[roomIdx][fieldName] = value
                : newState[fieldName] = value;

            return newState;
        });
    };

    const addRoom = () => {
        setHotel(state => ({
            ...state,
            rooms: [...state.rooms, {
                number: '',
                capacity: 0,
                pricePerNight: 0,
                roomType: 0,
                hasAirConditioner: false,
                hasBalcony: false,
                hasKitchen: false,
                isSmokingAllowed: false,
            }]
        }));
    };

    const setCityId = (cityId) => setHotel(state => ({
        ...state,
        cityId: cityId,
    }));

    const loadRooms = () => {
        getHotelRooms(
            hotelId, user.token
        ).then(roomsData => {
            setHotel(state => ({ ...state, rooms: roomsData }));
        });
    };

    const saveRoom = (roomIdx, room) => {
        updateRoom(
            room.id, room, user.token
        ).then(roomData => {
            setHotel(state => {
                const newState = { ...state };
                newState.rooms[roomIdx] = roomData;
                return newState;
            });
        });
    };

    const saveHotel = (formData) => {
        updateHotel(
            hotelId, formData, user.token
        ).then(data => {
            setHotel(state => ({ ...state, ...data }));
        });
    };

    return {
        hotel,
        changeHandler,
        addRoom,
        loadRooms,
        saveRoom,
        saveHotel,
        setCityId,
    };
};
import { useEffect, useContext } from "react";

import { getHotel, updateHotel } from "../services/hotelsService";
import { getHotelRooms, createRoom, updateRoom, removeRoom } from "../services/roomsService";

import { AuthContext } from "../contexts/AuthContext";
import { useForm } from "./useForm";

export function useHotel(initHotelValues, hotelId) {
    const { user } = useContext(AuthContext);
    const { form: hotel, setForm: setHotel, changeHandler } = useForm(initHotelValues);

    useEffect(() => {
        hotelId && getHotel(hotelId)
            .then(hotelData => setHotel(state => ({ ...state, ...hotelData })))
            .catch(error => alert(`${error.status} ${error.title}`));
    }, [hotelId, setHotel]);

    const setCityId = (cityId) => {
        setHotel(state => ({
            ...state,
            cityId: cityId,
        }));
    };

    const addRoom = () => {
        setHotel(state => ({
            ...state,
            rooms: [
                ...state.rooms,
                {
                    number: '',
                    capacity: 0,
                    pricePerNight: 0,
                    roomType: 0,
                    hasAirConditioner: false,
                    hasBalcony: false,
                    hasKitchen: false,
                    isSmokingAllowed: false,
                },
            ],
        }));
    };

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

    const createNewRoom = (hotelId, roomIdx, room) => {
        createRoom(
            hotelId, room, user.token
        ).then(roomData => {
            setHotel(state => {
                const newState = { ...state };
                newState.rooms[roomIdx] = roomData;
                newState.roomsCount++;
                return newState;
            });
        });
    };

    const deleteRoom = (roomId) => {
        removeRoom(
            roomId, user.token
        ).then(setHotel(state => ({
            ...state,
            rooms: state.rooms.filter(room => room.id !== roomId),
            roomsCount: state.roomsCount - 1,
        })));
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
        createNewRoom,
        deleteRoom,
        saveHotel,
        setCityId,
    };
};
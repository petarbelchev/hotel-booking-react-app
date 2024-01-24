import { useState } from "react";

export function useRoomForms() {
    const [forms, setForms] = useState([]);

    const formsChangeHandler = (event, roomIdx) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        setForms(state => {
            let newState = [...state];
            newState[roomIdx][name] = value;

            return newState;
        });
    };

    const addRoomToForm = () => {
        setForms(state => [
            ...state,
            {
                number: '',
                capacity: 1,
                pricePerNight: 0,
                roomType: 0,
                hasAirConditioner: false,
                hasBalcony: false,
                hasKitchen: false,
                isSmokingAllowed: false,
            }
        ]);
    };

    return {
        forms,
        setForms,
        addRoomToForm,
        formsChangeHandler,
    };
};
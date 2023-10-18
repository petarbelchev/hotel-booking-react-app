import { useState } from "react";

export function useForm(initValues) {
    const [form, setForm] = useState(initValues);

    const changeHandler = (event, roomIdx) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' 
            ? event.target.checked 
            : event.target.value;
        setForm(state => {
            const newState = { ...state };
            roomIdx !== undefined
                ? newState.rooms[roomIdx][name] = value
                : newState[name] = value;
            return newState;
        });
    };

    return { form, setForm, changeHandler };
};
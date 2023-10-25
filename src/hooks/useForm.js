import { useState } from "react";

export function useForm(initValues) {
    const [form, setForm] = useState(initValues);

    const formChangeHandler = (event, roomIdx) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        setForm(state => {
            let newState;

            if (roomIdx !== undefined) {
                newState = [...state];
                newState[roomIdx][name] = value
            } else {
                newState = { ...state };
                newState[name] = value;
            }

            return newState;
        });
    };

    return {
        form,
        setForm,
        formChangeHandler
    };
};
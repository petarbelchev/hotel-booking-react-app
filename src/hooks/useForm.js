import { useState } from "react";

export function useForm(initValues) {
    const [form, setForm] = useState(initValues);

    const changeHandler = (event) => {
        const { name, value } = event.target;

        setForm(state => ({ ...state, [name]: value }));
    };

    return { form, setForm, changeHandler };
};
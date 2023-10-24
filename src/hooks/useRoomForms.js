import { useForm } from "./useForm";

export function useRoomForms() {
    const {
        form: roomForms,
        setForm: setRoomForms,
        changeHandler: roomFormsChangeHandler
    } = useForm([]);

    const addRoomToForm = () => {
        setRoomForms(state => [
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
        roomForms,
        setRoomForms,
        addRoomToForm,
        roomFormsChangeHandler
    };
};
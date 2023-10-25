import { useForm } from "./useForm";

export function useRoomForms() {
    const {
        form: forms,
        setForm: setForms,
        formChangeHandler: formsChangeHandler
    } = useForm([]);

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
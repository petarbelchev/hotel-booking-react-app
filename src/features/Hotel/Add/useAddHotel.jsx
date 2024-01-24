import { AddHotelForm } from "./components/AddHotelForm";

const getAddHotelForm = () => <AddHotelForm />;

export function useAddHotel() {
    return { getAddHotelForm };
};
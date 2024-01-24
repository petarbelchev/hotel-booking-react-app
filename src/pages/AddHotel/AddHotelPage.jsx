import { useAddHotel } from "../../features/Hotel/Add/useAddHotel";
import styles from "./AddHotelPage.module.css";

export function AddHotelPage() {
    const addHotelForm = useAddHotel().getAddHotelForm();

    return (
        <section>
            <h1 id={styles.heading}>Add a Hotel</h1>

            {addHotelForm}
        </section>
    );
};

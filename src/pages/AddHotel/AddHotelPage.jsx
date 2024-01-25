import { AddHotelForm } from 'features/Hotel/Add';
import styles from './AddHotelPage.module.css';

export function AddHotelPage() {
    return (
        <section>
            <h1 id={styles.heading}>Add a Hotel</h1>
            <AddHotelForm />
        </section>
    );
};

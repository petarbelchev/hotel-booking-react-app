import { SearchRoomsForm } from 'features/SearchRooms';
import styles from './HomePage.module.css';

export function HomePage() {
    return (
        <section id={styles.mainSection}>
            <h1>Find your next vacation</h1>
            <div id={styles.form}><SearchRoomsForm /></div>
        </section>
    );
};
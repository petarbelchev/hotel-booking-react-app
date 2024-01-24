import { useSearchRooms } from "../../features/SearchRooms/useSearchRooms";
import styles from "./HomePage.module.css";

export function HomePage() {
    const searchRoomsForm = useSearchRooms().getSearchRoomsForm();

    return (
        <section id={styles.mainSection}>
            <h1>Find your next vacation</h1>
            <div id={styles.form}>{searchRoomsForm}</div>
        </section>
    );
};
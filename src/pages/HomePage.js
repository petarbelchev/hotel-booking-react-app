import { SearchRoomsForm } from "../components/HotelRoom/SearchRoomsForm";
import styles from "./HomePage.module.css";

export function HomePage() {
    return (
        <section className={styles.container}>
            <h1>Find your next vacation</h1>
            <SearchRoomsForm />
        </section>
    );
};
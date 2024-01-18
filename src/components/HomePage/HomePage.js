import { SearchRoomsForm } from "../Forms/SearchRoomsForm";
import styles from "./HomePage.module.css";

export function HomePage() {
    return (
        <section className={styles.container}>
            <h1>Find your next vacation</h1>
            <div id={styles.formContainer}><SearchRoomsForm /></div>
        </section>
    );
};
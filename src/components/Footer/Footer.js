import styles from "./Footer.module.css";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            © {year} Hotel Booking, owner: Petar Belchev - All Rights Reserved!
        </footer>
    );
};
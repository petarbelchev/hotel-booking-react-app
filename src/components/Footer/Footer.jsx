import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer id={styles.footer}>
            © {new Date().getFullYear()} <a href='https://github.com/petarbelchev/hotel-booking-react-app'>Hotel Booking GitHub Repository</a> - All Rights Reserved!
        </footer>
    );
};
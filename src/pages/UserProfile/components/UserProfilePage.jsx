import { UserProfileDiv } from 'features/User';
import styles from './UserProfilePage.module.css';

export function UserProfilePage() {
    return (
        <section id={styles.container}>
            <h1>User Profile Page</h1>
            <UserProfileDiv />
        </section>
    );
}
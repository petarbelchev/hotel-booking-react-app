import { LoginForm } from 'features/Auth';
import styles from './LoginPage.module.css';

export function LoginPage() {
    return (
        <section id={styles.mainSection}>
            <h1>Login Page</h1>
            <LoginForm />
        </section>
    );
};
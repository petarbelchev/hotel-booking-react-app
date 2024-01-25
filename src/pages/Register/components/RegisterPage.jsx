import { RegisterForm } from 'features/Auth';
import styles from './RegisterPage.module.css';

export function RegisterPage() {
    return (
        <section id={styles.mainSection}>
            <h1>Register Page</h1>
            <RegisterForm />
        </section>
    );
};
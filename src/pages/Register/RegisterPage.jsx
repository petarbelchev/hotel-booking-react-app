import { useAuth } from "../../features/Auth/useAuth";
import styles from "./RegisterPage.module.css";

export function RegisterPage() {
    const getRegisterForm = useAuth().getRegisterForm();

    return (
        <section id={styles.mainSection}>
            <h1>Register Page</h1>

            {getRegisterForm}
        </section>
    );
};
import { useAuth } from "../../features/Auth/useAuth";
import styles from "./LoginPage.module.css";

export function LoginPage() {
    const loginForm = useAuth().getLoginForm();

    return (
        <section id={styles.mainSection}>
            <h1>Login Page</h1>

            {loginForm}
        </section>
    );
};
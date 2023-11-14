import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { PrimaryButton } from "../../components/Buttons/PrimaryButton";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";
import { login } from "../../services/authService";

import styles from "./LoginPage.module.css";

export function LoginPage() {
    const { addUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { form, formChangeHandler } = useForm({ email: '', password: '' });

    const loginSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const authData = await login(form);
            addUser(authData);
            navigate('/');
        } catch (error) {
            // TODO: Render the validation errors in the login form.
            alert(`${error.status} ${error.title}`);
        }
    };

    return (
        <section className={styles.container}>
            <h1>Login Page</h1>

            <form className={styles.form} onSubmit={loginSubmitHandler}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={formChangeHandler}
                    required={true}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={formChangeHandler}
                    required={true}
                />

                <div>
                    <PrimaryButton type="submit" name="Login" />
                </div>
            </form>
        </section>
    );
};
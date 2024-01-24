import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../authService";
import { AuthContext } from "../../../contexts/AuthContext";
import { PrimaryButton } from "../../../components/Buttons/PrimaryButton";

import styles from "./LoginForm.module.css";

export function LoginForm() {
    const [form, setForm] = useState({ email: '', password: '' });
    const { addUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const formChangeHandler = (e) => setForm(state => ({ ...state, [e.target.name]: e.target.value }));

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
        <form id={styles.form} onSubmit={loginSubmitHandler}>
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
    );
};
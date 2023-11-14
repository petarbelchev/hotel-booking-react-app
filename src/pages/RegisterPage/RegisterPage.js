import { useNavigate } from "react-router-dom";

import { PrimaryButton } from "../../components/Buttons/PrimaryButton";
import { register } from "../../services/authService";
import { useForm } from "../../hooks/useForm";

import styles from "./RegisterPage.module.css";

export function RegisterPage() {
    const navigate = useNavigate();
    const { form, formChangeHandler } = useForm({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
    });

    const registerSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            await register(form);
            navigate('/login');
        } catch (error) {
            // TODO: Render the validation errors in the register form.
            alert(`${error.status} ${error.title}`);
        }
    };

    return (
        <section className={styles.container}>
            <h1>Register Page</h1>

            <form className={styles.form} onSubmit={registerSubmitHandler}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={formChangeHandler}
                    required={true}
                />

                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={form.firstName}
                    onChange={formChangeHandler}
                    required={true}
                />

                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={form.lastName}
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

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={formChangeHandler}
                    required={true}
                />

                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={formChangeHandler}
                    required={true}
                />

                <div>
                    <PrimaryButton type="submit" name="Register" />
                </div>
            </form>
        </section>
    );
};
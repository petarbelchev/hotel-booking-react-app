import { useNavigate } from "react-router-dom";

import { register } from "../services/authService";

export function RegisterPage() {
    const navigate = useNavigate();

    async function onRegisterSubmit(e) {
        e.preventDefault();
        const credentials = Object.fromEntries(new FormData(e.target));

        try {
            await register(credentials);
            navigate('/login');
        } catch (error) {
            // TODO: Render the validation errors in the register form.
            console.log(error);
        }
    }

    return (
        <>
            <h1>Register Page</h1>

            <form onSubmit={onRegisterSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" />
                </div>
                <div>
                    <label htmlFor="lastName">First Name:</label>
                    <input type="text" id="lastName" name="lastName" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" />
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </>
    );
};
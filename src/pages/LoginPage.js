import { useNavigate } from "react-router-dom";

import { useUser } from "../hooks/useUser";
import { login } from "../services/authService";

export function LoginPage() {
    const { addUser } = useUser();
    const navigate = useNavigate();

    async function onLoginSubmit(e) {
        e.preventDefault();
        const credentials = Object.fromEntries(new FormData(e.target));

        try {
            const authData = await login(credentials);
            addUser(authData);
            navigate('/');
        } catch (error) {
            // TODO: Render the validation errors in the login form.
            console.log(error);
        }
    };

    return (
        <>
            <h1>Login Page</h1>

            <form onSubmit={onLoginSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </>
    );
};
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { InputField } from "../components/InputField";
import { PrimaryButton } from "../components/Buttons/PrimaryButton";

import { AuthContext } from "../contexts/AuthContext";
import { useForm } from "../hooks/useForm";
import { login } from "../services/authService";

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
        <main>
            <section>
                <h1>Login Page</h1>

                <form onSubmit={loginSubmitHandler} style={{ border: "solid", display: "inline-block" }}>
                    <InputField
                        labelName="Email"
                        paramName="email"
                        type="email"
                        value={form.email}
                        onChange={formChangeHandler}
                        required={true}
                    />
                    <InputField
                        labelName="Password"
                        paramName="password"
                        type="password"
                        value={form.password}
                        onChange={formChangeHandler}
                        required={true}
                    />

                    <div>
                        <PrimaryButton type="submit" name="Login" />
                    </div>
                </form>
            </section>
        </main>
    );
};
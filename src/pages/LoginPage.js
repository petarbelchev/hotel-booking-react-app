import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { InputField } from "../components/InputField";
import { SubmitButton } from "../components/SubmitButton";

import { AuthContext } from "../contexts/AuthContext";
import { useForm } from "../hooks/useForm";
import { login } from "../services/authService";

export function LoginPage() {
    const { addUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { form, changeHandler } = useForm({ email: '', password: '' });

    const onLoginSubmit = (e) => {
        e.preventDefault();

        if (Object.values(form).includes('')) {
            alert('Please fill out all fields!');
        } else {
            login(form)
                .then(authData => {
                    addUser(authData);
                    navigate('/');
                })
                // TODO: Render the validation errors in the login form.
                .catch(error => alert(`${error.status} ${error.title}`));
        }
    };

    return (
        <main>
            <section>
                <h1>Login Page</h1>

                <form onSubmit={onLoginSubmit}>
                    <InputField
                        labelName="Email"
                        paramName="email"
                        type="email"
                        value={form.email}
                        onChange={changeHandler}
                        required={true}
                    />
                    <InputField
                        labelName="Password"
                        paramName="password"
                        type="password"
                        value={form.password}
                        onChange={changeHandler}
                        required={true}
                    />

                    <div>
                        <SubmitButton name="Login" />
                    </div>
                </form>
            </section>
        </main>
    );
};
import { useNavigate } from "react-router-dom";

import { InputField } from "../components/InputField";
import { PrimaryButton } from "../components/Buttons/PrimaryButton";

import { register } from "../services/authService";
import { useForm } from "../hooks/useForm";

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
        <main>
            <section>
                <h1>Register Page</h1>

                <form onSubmit={registerSubmitHandler} style={{ border: "solid", display: "inline-block" }}>
                    <InputField
                        labelName="Email"
                        paramName="email"
                        type="email"
                        value={form.email}
                        onChange={formChangeHandler}
                        required={true}
                    />
                    <InputField
                        labelName="First Name"
                        paramName="firstName"
                        type="text"
                        value={form.firstName}
                        onChange={formChangeHandler}
                        required={true}
                    />
                    <InputField
                        labelName="Last Name"
                        paramName="lastName"
                        type="text"
                        value={form.lastName}
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
                    <InputField
                        labelName="Confirm Password"
                        paramName="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={formChangeHandler}
                        required={true}
                    />
                    <InputField
                        labelName="Phone Number"
                        paramName="phoneNumber"
                        type="text"
                        value={form.phoneNumber}
                        onChange={formChangeHandler}
                        required={true}
                    />

                    <div>
                        <PrimaryButton type="submit" name="Register" />
                    </div>
                </form>
            </section>
        </main>
    );
};
import { useNavigate } from "react-router-dom";

import { InputField } from "../components/InputField";
import { SubmitButton } from "../components/SubmitButton";

import { register } from "../services/authService";
import { useForm } from "../hooks/useForm";

export function RegisterPage() {
    const navigate = useNavigate();
    const { form, changeHandler } = useForm({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
    });

    const onRegisterSubmit = (e) => {
        e.preventDefault();

        if (Object.values(form).includes('')) {
            alert('Please fill out all fields!');
        } else {
            register(form)
                .then(navigate('/login'))
                // TODO: Render the validation errors in the register form.
                .catch(error => alert(`${error.status} ${error.title}`));
        }
    };

    return (
        <main>
            <section>
                <h1>Register Page</h1>

                <form onSubmit={onRegisterSubmit} style={{ border: "solid", display: "inline-block" }}>
                    <InputField
                        labelName="Email"
                        paramName="email"
                        type="email"
                        value={form.email}
                        onChange={changeHandler}
                        required={true}
                    />
                    <InputField
                        labelName="First Name"
                        paramName="firstName"
                        type="text"
                        value={form.firstName}
                        onChange={changeHandler}
                        required={true}
                    />
                    <InputField
                        labelName="Last Name"
                        paramName="lastName"
                        type="text"
                        value={form.lastName}
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
                    <InputField
                        labelName="Confirm Password"
                        paramName="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={changeHandler}
                        required={true}
                    />
                    <InputField
                        labelName="Phone Number"
                        paramName="phoneNumber"
                        type="text"
                        value={form.phoneNumber}
                        onChange={changeHandler}
                        required={true}
                    />

                    <div>
                        <SubmitButton name="Register" />
                    </div>
                </form>
            </section>
        </main>
    );
};
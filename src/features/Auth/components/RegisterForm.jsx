import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { register } from '../services/authService';
import { PrimaryButton } from 'components/Buttons/PrimaryButton';

import styles from './RegisterForm.module.css';

export function RegisterForm() {
    const [form, setForm] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
    });
    
    const navigate = useNavigate();
    
    const formChangeHandler = (e) => setForm(state => ({ ...state, [e.target.name]: e.target.value }));

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
        <form id={styles.form} onSubmit={registerSubmitHandler}>
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
    );
};
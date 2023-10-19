import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import styles from "./Header.module.css";

export function Header() {
    const { user, removeUser } = useContext(AuthContext);
    const setActiveClass = ({ isActive }) => isActive ? styles.active : "";

    return (
        <header>
            <nav className={styles.topNav}>
                <ul>
                    <li><NavLink to={"/"} className={setActiveClass}>Home</NavLink></li>
                    {
                        user
                            ? <>
                                <li><NavLink to={'/add-hotel'} className={setActiveClass}>Add Hotel</NavLink></li>
                                <li><NavLink to={'/user-profile'} className={setActiveClass}>{user.firstName} {user.lastName}</NavLink></li>
                                <li><Link to={'/'} onClick={removeUser}>Logout</Link></li>
                            </>
                            : <>
                                <li><NavLink to={'/login'} className={setActiveClass}>Login</NavLink></li>
                                <li><NavLink to={'/register'} className={setActiveClass}>Register</NavLink></li>
                            </>
                    }
                </ul>
            </nav>
        </header>
    );
};
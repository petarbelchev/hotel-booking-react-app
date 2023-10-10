import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { LogoutLink } from "../LogoutLink";

import "./Header.css";

export function Header() {
    const { user } = useContext(AuthContext);

    return (
        <header>
            <nav>
                <ul>
                    <li><NavLink to={"/"}>Home</NavLink></li>
                    {
                        user
                            ? <li><LogoutLink /></li>
                            : <>
                                <li><NavLink to={'/register'}>Register</NavLink></li>
                                <li><NavLink to={'/login'}>Login</NavLink></li>
                            </>
                    }
                </ul>
            </nav>
        </header>
    );
};
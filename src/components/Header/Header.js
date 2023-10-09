import { NavLink } from "react-router-dom";

import { LogoutLink } from "../LogoutLink";
import { useUser } from "../../hooks/useUser";

import "./Header.css";

export function Header() {
    const { user } = useUser();

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
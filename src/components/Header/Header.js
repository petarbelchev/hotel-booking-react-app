import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import "./Header.css";

export function Header() {
    const { user, removeUser } = useContext(AuthContext);

    return (
        <header>
            <nav className="topNav">
                <ul>
                    <li><NavLink to={"/"}>Home</NavLink></li>
                    {
                        user
                            ? <>
                                <li><NavLink to={'/add-hotel'}>Add Hotel</NavLink></li>
                                <li><NavLink to={'/user-profile'}>{user.firstName} {user.lastName}</NavLink></li>
                                <li><Link to={'/'} onClick={removeUser}>Logout</Link></li>
                            </>
                            : <>
                                <li><NavLink to={'/login'}>Login</NavLink></li>
                                <li><NavLink to={'/register'}>Register</NavLink></li>
                            </>
                    }
                </ul>
            </nav>
        </header>
    );
};
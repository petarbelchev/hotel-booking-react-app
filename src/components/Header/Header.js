import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import styles from "./Header.module.css";

export function Header() {
    const { user, removeUser } = useContext(AuthContext);

    return (
        <header>
            <nav>
                <ul className={styles.ul}>
                    <li><NavLink to={"/"} className={styles.navLink}>Home</NavLink></li>
                    {
                        user
                            ? <>
                                <li><NavLink to={'/add-hotel'} className={styles.navLink}>Add Hotel</NavLink></li>
                                <li><NavLink to={'/user-profile'} className={styles.navLink}>{user.firstName} {user.lastName}</NavLink></li>
                                <li><Link to={'/'} onClick={removeUser} className={styles.navLink}>Logout</Link></li>
                            </>
                            : <>
                                <li><NavLink to={'/login'} className={styles.navLink}>Login</NavLink></li>
                                <li><NavLink to={'/register'} className={styles.navLink}>Register</NavLink></li>
                            </>
                    }
                </ul>
            </nav>
        </header>
    );
};
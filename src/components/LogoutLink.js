import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

export function LogoutLink() {
    const { removeUser } = useContext(AuthContext);

    return <Link to={'/'} onClick={removeUser}>Logout</Link>
};
import { Link } from "react-router-dom";

import { useUser } from "../hooks/useUser";

export function LogoutLink() {
    const { removeUser } = useUser();
    
    return <Link onClick={removeUser}>Logout</Link>
};
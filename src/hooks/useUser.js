import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

export function useUser() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    function addUser(user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    function removeUser() {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
    };

    return { user, addUser, removeUser };
}
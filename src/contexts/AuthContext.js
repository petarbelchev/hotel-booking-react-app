import { createContext, useState } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem('user'));

    function addUser(user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    function removeUser() {
        setUser(null);
        localStorage.removeItem('user');
        return <Navigate to={'/'} />
    };

    const context = {
        user,
        addUser,
        removeUser,
    };

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
};
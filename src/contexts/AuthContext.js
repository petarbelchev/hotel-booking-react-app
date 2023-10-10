import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    function addUser(user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    function removeUser() {
        setUser(null);
        localStorage.removeItem('user');
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
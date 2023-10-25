import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const addUser = (user) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const removeUser = () => {
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
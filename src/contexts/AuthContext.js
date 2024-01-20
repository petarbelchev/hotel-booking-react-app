import { createContext, useState } from "react";
import { isExpired } from "react-jwt";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            return null;
        }

        if (isExpired(user.token)) {
            localStorage.removeItem('user');
            return null;
        }

        return user;
    });

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
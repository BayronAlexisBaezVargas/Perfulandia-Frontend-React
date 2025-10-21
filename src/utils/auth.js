import React, { createContext, useState, useContext } from 'react';

const AUTH_KEY = 'authUser';
const USERS_KEY = 'users';

const DEFAULT_PROFILE_FIELDS = {
    rut: '',
    address: '',
    phone: '',
};
export function getAuthUser() {
    try {
        const raw = localStorage.getItem(AUTH_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        console.error("Error al leer authUser de localStorage:", error);
        return null;
    }
}
export function setAuthUser(user) {
    if (user) {
        const sessionData = {
            name: user.name,
            email: user.email,
            role: user.role
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(sessionData));
    } else {
        localStorage.removeItem(AUTH_KEY);
    }
}
export function getUsers() {
    try {
        const raw = localStorage.getItem(USERS_KEY);
        const users = raw ? JSON.parse(raw) : [];
        return users.map(user => ({
            ...DEFAULT_PROFILE_FIELDS,
            ...user
        }));
    } catch (error) {
        console.error("Error al leer users de localStorage:", error);
        return [];
    }
}
export function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
export function updateUserProfile(email, updatedFields) {
    const users = getUsers();
    const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

    if (index !== -1) {
        const currentPassword = users[index].password;
        const newPassword = updatedFields.password || currentPassword;

        const updatedUser = {
            ...users[index],
            ...updatedFields,
            password: newPassword,
            role: users[index].role
        };
        users[index] = updatedUser;
        saveUsers(users);
        const authUser = getAuthUser();
        if (authUser && authUser.email.toLowerCase() === email.toLowerCase()) {
            setAuthUser(updatedUser);
        }
        return { success: true, user: updatedUser };
    }
    return { success: false, message: "Usuario no encontrado." };
}
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getAuthUser());

    const handleLogin = (loggedUser) => {
        setAuthUser(loggedUser);
        setUser(loggedUser);
    };

    const handleLogout = () => {
        setAuthUser(null);
        setUser(null);
    };
    const getUserProfileData = () => {
        if (!user) return null;
        const allUsers = getUsers();
        return allUsers.find(u => u.email.toLowerCase() === user.email.toLowerCase());
    };
    const value = {
        user,
        handleLogin,
        handleLogout,
        getUserProfileData,
        updateUserProfile
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
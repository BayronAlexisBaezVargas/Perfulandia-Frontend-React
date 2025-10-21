import React, { createContext, useState, useEffect, useContext } from 'react';

const AUTH_KEY = 'authUser';
const USERS_KEY = 'users';

// Campos de perfil predeterminados para nuevos usuarios
const DEFAULT_PROFILE_FIELDS = {
    rut: '',
    address: '',
    phone: '',
    // No incluir 'password' aquí por seguridad
};

// Función para obtener el usuario de sesión actual
export function getAuthUser() {
    try {
        const raw = localStorage.getItem(AUTH_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        console.error("Error al leer authUser de localStorage:", error);
        return null;
    }
}

// Función para guardar el usuario de sesión actual
export function setAuthUser(user) {
    if (user) {
        // Guardamos solo los datos esenciales de la sesión
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

// Función para obtener todos los usuarios registrados (incluye campos completos)
export function getUsers() {
    try {
        const raw = localStorage.getItem(USERS_KEY);
        const users = raw ? JSON.parse(raw) : [];

        // Asegurar que todos los perfiles tengan los campos extra (para consistencia)
        return users.map(user => ({
            ...DEFAULT_PROFILE_FIELDS,
            ...user
        }));
    } catch (error) {
        console.error("Error al leer users de localStorage:", error);
        return [];
    }
}

// Función para guardar todos los usuarios registrados
export function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Función para actualizar los campos de un usuario y guardar todo
export function updateUserProfile(email, updatedFields) {
    const users = getUsers();
    const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

    if (index !== -1) {
        // Mantenemos la contraseña si no se está actualizando
        const currentPassword = users[index].password;
        const newPassword = updatedFields.password || currentPassword;

        const updatedUser = {
            ...users[index],
            ...updatedFields,
            password: newPassword,
            // Asegurar que el rol no se pierda si se actualiza solo el perfil
            role: users[index].role
        };

        users[index] = updatedUser;
        saveUsers(users);

        // Actualizar la sesión si el usuario actual es el que se editó
        const authUser = getAuthUser();
        if (authUser && authUser.email.toLowerCase() === email.toLowerCase()) {
            setAuthUser(updatedUser);
        }
        return { success: true, user: updatedUser };
    }
    return { success: false, message: "Usuario no encontrado." };
}

// Contexto y Hook para usar la autenticación en componentes React
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

    // Obtiene el perfil completo del usuario actual de la lista maestra
    const getUserProfileData = () => {
        if (!user) return null;
        const allUsers = getUsers();
        // Nota: la sesión guardada en localStorage no incluye password, pero la lista de usuarios sí.
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
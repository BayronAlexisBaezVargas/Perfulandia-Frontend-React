// src/pages/AdminProfile.js

import React, { useState, useEffect } from 'react';
import styles from './AdminProfile.module.css';
import Swal from 'sweetalert2';

// Función auxiliar para obtener y actualizar datos del admin en localStorage
const getAdminData = () => {
    try {
        const raw = localStorage.getItem('authUser');
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        return null;
    }
};

const saveAdminData = (data) => {
    try {
        localStorage.setItem('authUser', JSON.stringify(data));
        return true;
    } catch (error) {
        return false;
    }
};

// Componente AdminProfile recibe las props para sincronizar el estado
function AdminProfile({ authUser, onProfileUpdate }) {
    // Usamos authUser como fuente de verdad
    const initialData = authUser || getAdminData() || { name: 'Admin', email: 'admin@perfulandia.cl', role: 'admin' };

    // Estado para los campos editables
    const [profileData, setProfileData] = useState({
        phone: initialData.phone || '',
        address: initialData.address || '',
        birthdate: initialData.birthdate || '',
    });

    // Sincronizar el estado interno si el prop authUser cambia
    useEffect(() => {
        setProfileData({
            phone: initialData.phone || '',
            address: initialData.address || '',
            birthdate: initialData.birthdate || '',
        });
    }, [initialData.email]); // Dependencia del email/usuario para recargar si cambia la sesión

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = (e) => {
        e.preventDefault();

        const currentAuthUser = getAdminData();

        if (!currentAuthUser) {
            Swal.fire('Error', 'No se pudo verificar la sesión del administrador.', 'error');
            return;
        }

        // 1. Combinar datos
        const updatedData = {
            ...currentAuthUser,
            ...profileData
        };

        // 2. Guardar en localStorage
        const success = saveAdminData(updatedData);

        if (success) {
            Swal.fire({
                icon: 'success',
                title: '¡Guardado!',
                text: 'Tu información de perfil de administrador ha sido actualizada.',
                showConfirmButton: false,
                timer: 1500
            });
            // 3. Notificar al componente Admin.js para actualizar su estado de sesión (nombre en el sidebar)
            if(onProfileUpdate) onProfileUpdate(updatedData);
        } else {
            Swal.fire('Error', 'No se pudieron guardar los cambios. Inténtalo de nuevo.', 'error');
        }
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileCard}>
                <h2 className={styles.title}>Perfil del Administrador</h2>

                <form onSubmit={handleSave}>
                    <div className="row">
                        {/* Columna de Datos de Solo Lectura */}
                        <div className="col-md-6 mb-4">
                            <h4 className="text-white-50 mb-3 border-bottom pb-2">Información de Cuenta</h4>

                            <div className="mb-3">
                                <p className={styles.detailLabel}>Nombre Completo</p>
                                <p className={styles.readOnlyValue}>{initialData.name}</p>
                            </div>

                            <div className="mb-3">
                                <p className={styles.detailLabel}>Correo Electrónico</p>
                                <p className={styles.readOnlyValue}>{initialData.email}</p>
                            </div>

                            <div className="mb-3">
                                <p className={styles.detailLabel}>Rol del Sistema</p>
                                <p className={styles.readOnlyValue}>{initialData.role.toUpperCase()}</p>
                            </div>
                        </div>

                        {/* Columna de Datos Editables */}
                        <div className="col-md-6">
                            <h4 className="text-white-50 mb-3 border-bottom pb-2">Detalles de Contacto y Personales</h4>

                            <div className="mb-3">
                                <label htmlFor="phone" className={styles.label}>Teléfono</label>
                                <input
                                    type="text"
                                    className={`form-control ${styles.formInput}`}
                                    id="phone"
                                    name="phone"
                                    value={profileData.phone}
                                    onChange={handleChange}
                                    placeholder="Ej: +569 1234 5678"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address" className={styles.label}>Dirección</label>
                                <input
                                    type="text"
                                    className={`form-control ${styles.formInput}`}
                                    id="address"
                                    name="address"
                                    value={profileData.address}
                                    onChange={handleChange}
                                    placeholder="Calle, número, comuna"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="birthdate" className={styles.label}>Fecha de Nacimiento</label>
                                <input
                                    type="date"
                                    className={`form-control ${styles.formInput}`}
                                    id="birthdate"
                                    name="birthdate"
                                    value={profileData.birthdate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="d-grid mt-4">
                                <button type="submit" className={`btn btn-lg ${styles.saveButton}`}>
                                    Guardar Cambios
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminProfile;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// --- CAMBIO: Importar useAuth y las utilidades de perfil ---
import { useAuth } from '../utils/auth';
import styles from './Perfil.module.css';

function Perfil() {
    // Obtenemos las funciones de autenticación y manejo de perfil
    const { user, getUserProfileData, updateUserProfile, handleLogout } = useAuth();
    const navigate = useNavigate();

    // Estado local para los campos del formulario
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        rut: '',
        address: '',
        phone: '',
        password: '', // Para la nueva contraseña opcional
    });

    const [statusMessage, setStatusMessage] = useState({ message: '', type: '' });
    const [isSaving, setIsSaving] = useState(false);

    // Cargar datos del perfil completo al montar el componente
    useEffect(() => {
        if (!user) {
            // Si no hay sesión, redirigir
            navigate('/InicioS', { replace: true });
            return;
        }

        // Obtener la información completa del usuario (incluyendo campos extra)
        const fullProfile = getUserProfileData();
        if (fullProfile) {
            setProfileData(prev => ({
                ...prev,
                name: fullProfile.name || '',
                email: fullProfile.email || '',
                rut: fullProfile.rut || '',
                address: fullProfile.address || '',
                phone: fullProfile.phone || '',
                password: '', // Limpiar el campo de password al cargar
            }));
        }
    }, [user, navigate, getUserProfileData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) return; // Evitar si no hay usuario (aunque ya se redirigió)

        setIsSaving(true);
        setStatusMessage({ message: '', type: '' });

        // Campos a guardar (la contraseña se añade si se proporciona)
        const fieldsToUpdate = {
            name: profileData.name.trim(),
            rut: profileData.rut.trim(),
            address: profileData.address.trim(),
            phone: profileData.phone.trim(),
        };

        if (profileData.password) {
            if (profileData.password.length < 6) {
                setStatusMessage({ message: 'La nueva contraseña debe tener al menos 6 caracteres.', type: 'error' });
                setIsSaving(false);
                return;
            }
            fieldsToUpdate.password = profileData.password;
        }

        // La función de utilidad se encarga de guardar en la lista maestra y actualizar la sesión
        const result = updateUserProfile(user.email, fieldsToUpdate);

        if (result.success) {
            setStatusMessage({ message: '¡Perfil actualizado con éxito!', type: 'success' });
            setProfileData(prev => ({ ...prev, password: '' })); // Limpiar el campo de contraseña
        } else {
            setStatusMessage({ message: result.message || 'Error al actualizar perfil.', type: 'error' });
        }

        setIsSaving(false);
    };

    // Si no hay usuario, mostrar nada hasta que el efecto redirija
    if (!user) {
        return null;
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentBox}>
                <h1 className={styles.title}>Mi Perfil de Cliente</h1>
                <p className='text-center text-white-50 mb-4'>Aquí puedes actualizar tu información de contacto y envío.</p>

                {/* Mensajes de estado */}
                {statusMessage.message && (
                    <div className={statusMessage.type === 'success' ? styles.alertSuccess : styles.alertError}>
                        {statusMessage.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="row g-3">
                    {/* Nombre */}
                    <div className="col-md-6">
                        <label htmlFor="name" className={styles.formLabel}>Nombre Completo</label>
                        <input
                            type="text"
                            className={`form-control form-control-lg ${styles.formInput}`}
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Correo (No editable) */}
                    <div className="col-md-6">
                        <label htmlFor="email" className={styles.formLabel}>Correo Electrónico</label>
                        <input
                            type="email"
                            className={`form-control form-control-lg ${styles.formInput}`}
                            id="email"
                            name="email"
                            value={profileData.email}
                            disabled
                        />
                        <small className="text-white-50">El correo no es editable.</small>
                    </div>

                    {/* RUT (Nuevo Campo) */}
                    <div className="col-md-6">
                        <label htmlFor="rut" className={styles.formLabel}>RUT</label>
                        <input
                            type="text"
                            className={`form-control form-control-lg ${styles.formInput}`}
                            id="rut"
                            name="rut"
                            placeholder="Ej: 12.345.678-9"
                            value={profileData.rut}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Teléfono (Nuevo Campo) */}
                    <div className="col-md-6">
                        <label htmlFor="phone" className={styles.formLabel}>Teléfono</label>
                        <input
                            type="tel"
                            className={`form-control form-control-lg ${styles.formInput}`}
                            id="phone"
                            name="phone"
                            placeholder="Ej: +56912345678"
                            value={profileData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Dirección (Nuevo Campo) */}
                    <div className="col-12">
                        <label htmlFor="address" className={styles.formLabel}>Dirección de Envío</label>
                        <input
                            type="text"
                            className={`form-control form-control-lg ${styles.formInput}`}
                            id="address"
                            name="address"
                            placeholder="Calle, número, departamento/casa"
                            value={profileData.address}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Contraseña (Opcional) */}
                    <div className="col-12 mt-4">
                        <h4 className="text-white mb-3">Actualizar Contraseña</h4>
                        <p className='text-white-50'>Solo ingresa algo si deseas cambiar tu contraseña.</p>
                        <div className={styles['form-group']}>
                            <label htmlFor="password" className={styles.formLabel}>Nueva Contraseña (mín. 6 caracteres)</label>
                            <input
                                type="password"
                                name="password"
                                className={`form-control form-control-lg ${styles.formInput}`}
                                placeholder="Deja vacío para no cambiar"
                                id="password"
                                autoComplete="new-password"
                                value={profileData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="col-12 mt-4 d-flex justify-content-between">
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            disabled={isSaving || user.role === 'admin'} // Deshabilitar si es admin (por simplicidad)
                        >
                            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger btn-lg"
                            onClick={handleLogout}
                        >
                            Cerrar Sesión
                        </button>
                    </div>

                    {user.role === 'admin' && (
                        <div className='col-12 text-warning mt-3'>
                            <small>Nota: Las cuentas de Administrador no pueden modificar sus perfiles desde aquí.</small>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Perfil;
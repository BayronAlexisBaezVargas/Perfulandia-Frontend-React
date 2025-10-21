import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InicioS.module.css';
// --- CAMBIO: Importar utilidades de autenticación necesarias ---
import { getUsers, saveUsers, useAuth } from '../utils/auth';

function InicioSesion() {
    // Correos con rol admin
    const ADMIN_EMAILS = new Set([
        'sergionbaezbarria44@gmail.com',
        'marcelo.c@duoc.cl',
    ]);
    const isAdminEmail = (email) => ADMIN_EMAILS.has(String(email).toLowerCase());

    const navigate = useNavigate();
    // Obtener la función handleLogin del contexto
    const { handleLogin } = useAuth();

    // Estado: Login
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPass, setLoginPass] = useState('');
    const [loginMsg, setLoginMsg] = useState('');
    const [loginOk, setLoginOk] = useState(false);

    // Estado: Registro
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPass, setRegPass] = useState('');
    const [regMsg, setRegMsg] = useState('');
    const [regOk, setRegOk] = useState(false);

    // Utilidades de validación (se mantienen)
    const emailValido = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

    const passwordValida = (pass) => String(pass).length >= 6;

    // Handlers
    const handleLoginSubmit = (e) => {
        if (e) e.preventDefault();
        setLoginMsg('');
        setLoginOk(false);

        if (!emailValido(loginEmail)) {
            setLoginMsg('Por favor, ingresa un correo válido.');
            return;
        }
        if (!passwordValida(loginPass)) {
            setLoginMsg('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        // --- CAMBIO: Usar getUsers de utilidades ---
        const users = getUsers();
        const user = users.find((u) => u.email.toLowerCase() === loginEmail.toLowerCase());

        if (!user || user.password !== loginPass) {
            setLoginMsg('Credenciales inválidas. Verifica tu correo y contraseña.');
            return;
        }

        // Determinar rol por correo y preparar los datos de la sesión
        const role = isAdminEmail(loginEmail) ? 'admin' : 'user';
        // Incluir name y email en el objeto de sesión para el contexto/navbar
        const authUser = {
            email: user.email,
            name: user.name,
            role
        };

        // --- CAMBIO: Iniciar sesión usando el contexto ---
        handleLogin(authUser);

        setLoginOk(true);
        setLoginMsg('¡Inicio de sesión exitoso!');

        // Redirigir a /admin o /perfil
        if (role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/perfil'); // Redirigir al perfil del cliente
        }
    };

    const handleRegisterSubmit = (e) => {
        if (e) e.preventDefault();
        setRegMsg('');
        setRegOk(false);

        if (!regName.trim()) {
            setRegMsg('El nombre completo es obligatorio.');
            return;
        }
        if (!emailValido(regEmail)) {
            setRegMsg('Por favor, ingresa un correo válido.');
            return;
        }
        if (!passwordValida(regPass)) {
            setRegMsg('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        // --- CAMBIO: Usar getUsers y saveUsers de utilidades ---
        const users = getUsers();
        const exists = users.some((u) => u.email.toLowerCase() === regEmail.toLowerCase());
        if (exists) {
            setRegMsg('Ya existe una cuenta con ese correo.');
            return;
        }

        // Crear nuevo usuario (se usarán los valores por defecto del perfil en auth.js)
        const role = isAdminEmail(regEmail) ? 'admin' : 'user';
        const nuevo = {
            name: regName.trim(),
            email: regEmail.trim(),
            password: regPass,
            role: role,
        };

        const updated = [...users, nuevo];
        // Guardar la lista completa de usuarios
        saveUsers(updated);

        // Iniciar sesión automáticamente después del registro usando el contexto
        handleLogin({ name: nuevo.name, email: nuevo.email, role: nuevo.role });

        setRegOk(true);
        setRegMsg('Registro exitoso. ¡Sesión iniciada! Redirigiendo a tu perfil.');

        // Redirigir
        if (role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/perfil'); // Redirigir al perfil del cliente
        }
    };

    return (
        <div className={styles.root}>
            <div className="container my-5 bg-dark p-5 rounded-3 ">
                <h1 className="text-center text-white">Iniciar sesion / Registro</h1>
                <p className="text-center text-white">
                    Bienvenido afiliado de perfulandia porfavor ingresa tu usuario y contraseña o registrate
                </p>
                <div className={styles.section}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 text-center py-5">
                                <div className={`${styles.section} pb-5 pt-5 pt-sm-3 text-center`}>
                                    <h6 className="mb-0 pb-3">
                                        <span>Iniciar sesion </span><span>Registro</span>
                                    </h6>

                                    <input
                                        className={styles.checkbox}
                                        type="checkbox"
                                        id="reg-log"
                                        name="reg-log"
                                    />
                                    <label htmlFor="reg-log"></label>

                                    <div className={`${styles['card-3d-wrap']} mx-auto`}>
                                        <div className={styles['card-3d-wrapper']}>
                                            {/* Frente: Login */}
                                            <div className={styles['card-front']}>
                                                <div className={styles['center-wrap']}>
                                                    <div className={`${styles.section} text-center`}>
                                                        <h4 className="mb-4 pb-3">Iniciar sesion</h4>

                                                        <div className={styles['form-group']}>
                                                            <input
                                                                type="email"
                                                                name="Email"
                                                                className={styles['form-style']}
                                                                placeholder="Tu Correo"
                                                                id="email"
                                                                autoComplete="email"
                                                                value={loginEmail}
                                                                onChange={(e) => setLoginEmail(e.target.value)}
                                                            />
                                                            <i className={`${styles['input-icon']} uil uil-at`}></i>
                                                        </div>

                                                        <div className={`${styles['form-group']} mt-2`}>
                                                            <input
                                                                type="password"
                                                                name="Clave"
                                                                className={styles['form-style']}
                                                                placeholder="Tu contraseña"
                                                                id="pass"
                                                                autoComplete="current-password"
                                                                value={loginPass}
                                                                onChange={(e) => setLoginPass(e.target.value)}
                                                            />
                                                            <i className={`${styles['input-icon']} uil uil-lock-alt`}></i>
                                                        </div>

                                                        <p
                                                            id="login-mensaje"
                                                            className={`mt-3 ${loginMsg ? (loginOk ? 'text-success' : 'text-danger') : 'd-none'}`}
                                                        >
                                                            {loginMsg}
                                                        </p>

                                                        <button
                                                            className={`${styles.btn} btn mt-4`}
                                                            type="button"
                                                            onClick={handleLoginSubmit}
                                                        >
                                                            Iniciar sesion
                                                        </button>

                                                        <p className="mb-0 mt-4 text-center">
                                                            <a href="#0" className={styles.link}>Olvido su contraseña?</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Dorso: Registro */}
                                            <div className={styles['card-back']}>
                                                <div className={styles['center-wrap']}>
                                                    <div className={`${styles.section} text-center`}>
                                                        <h4 className="mb-4 pb-3">Registrarse</h4>

                                                        <div className={styles['form-group']}>
                                                            <input
                                                                type="text"
                                                                name="logname"
                                                                className={styles['form-style']}
                                                                placeholder="Tu nombre Completo"
                                                                id="logname"
                                                                autoComplete="name"
                                                                value={regName}
                                                                onChange={(e) => setRegName(e.target.value)}
                                                            />
                                                            <i className={`${styles['input-icon']} uil uil-user`}></i>
                                                        </div>

                                                        <div className={`${styles['form-group']} mt-2`}>
                                                            <input
                                                                type="email"
                                                                name="logemail"
                                                                className={styles['form-style']}
                                                                placeholder="Tu Email"
                                                                id="logemail"
                                                                autoComplete="email"
                                                                value={regEmail}
                                                                onChange={(e) => setRegEmail(e.target.value)}
                                                            />
                                                            <i className={`${styles['input-icon']} uil uil-at`}></i>
                                                        </div>

                                                        <div className={`${styles['form-group']} mt-2`}>
                                                            <input
                                                                type="password"
                                                                name="logpass"
                                                                className={styles['form-style']}
                                                                placeholder="Tu contaseña"
                                                                id="logpass"
                                                                autoComplete="new-password"
                                                                value={regPass}
                                                                onChange={(e) => setRegPass(e.target.value)}
                                                            />
                                                            <i className={`${styles['input-icon']} uil uil-lock-alt`}></i>
                                                        </div>

                                                        <p
                                                            className={`mt-3 ${regMsg ? (regOk ? 'text-success' : 'text-danger') : 'd-none'}`}
                                                        >
                                                            {regMsg}
                                                        </p>

                                                        <a
                                                            href="#"
                                                            className={`${styles.btn} btn mt-4`}
                                                            role="button"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleRegisterSubmit(e);
                                                            }}
                                                        >
                                                            Registrarse
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Fin dorso */}
                                        </div>
                                    </div>
                                    {/* Fin card */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InicioSesion;




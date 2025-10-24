// src/components/Hero.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';

function Hero() {
    const navigate = useNavigate();

    const handleComenzarAhora = () => {
        navigate('/Productos');
    };

    const handleSaberMas = () => {
        navigate('/sobre-nosotros');
    };

    return (
        <section className={styles.heroContainer}>
            <div className={styles.heroContent}>
                {/* Título adaptado al diseño de la imagen */}
                <h1 className={styles.heroTitle}>
                    <span className={styles.heroTitleLeft}>Bienvenido a </span>
                    <span className={styles.heroTitleRight}>Perfulandia</span>
                </h1>

                {/* Subtítulo */}
                <p className={styles.heroSubtitle}>
                    Descubre experiencias únicas y olores inolvidables en esta tienda virtual de fragancias mundiales.
                </p>

                {/* Contenedor de Botones */}
                <div className={styles.buttonGroup}>
                    <button
                        className={styles.primaryButton}
                        onClick={handleComenzarAhora}
                    >
                        Ver catalogo
                    </button>

                    <button
                        className={styles.secondaryButton}
                        onClick={handleSaberMas}
                    >
                        Sobre Nosotros
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Hero;
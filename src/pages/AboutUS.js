// src/pages/AboutUS.js

import React, { useEffect, useRef, useCallback } from 'react';
// Importar el nuevo módulo CSS
import styles from './AboutUS.module.css';


// Datos de la línea de tiempo (reestructurados)
const timelineData = [
    { year: 2021, title: '2021: El Nacimiento de un Sueño', text: 'Marcelo C., un apasionado coleccionista, funda Perfulandia como un proyecto personal. Comienza a operar a través de redes sociales, ofreciendo una cuidada selección de perfumes de diseñador a una pequeña comunidad de aficionados.', delay: 0 },
    { year: 2022, title: '2022: La Primera Oficina y Bodega', text: 'Gracias a una increíble recepción, Perfulandia se establece en su primera oficina en Santiago. Este paso nos permite profesionalizar la logística, ampliar el stock y garantizar envíos más rápidos y seguros a todo el país.', delay: 200 },
    { year: 2023, title: '2023 (Marzo): Expansión de Catálogo', text: 'Marcamos un antes y un después al incorporar las primeras 10 marcas de perfumería de nicho, ofreciendo fragancias exclusivas y difíciles de encontrar en Chile, consolidando nuestra reputación como curadores expertos.', delay: 400 },
    { year: 2023, title: '2023 (Noviembre): Lanzamiento de Perfulandia.cl', text: 'Nace nuestro hogar digital. Lanzamos el sitio web oficial para ofrecer una experiencia de compra superior, con descripciones detalladas, un sistema de pedidos eficiente y un blog para compartir nuestra pasión por la perfumería.', delay: 600 },
    { year: 2024, title: '2024: Nuestro Primer Evento Comunitario', text: 'Realizamos el primer workshop "Descubre tu Aroma" en Santiago, uniendo a más de 50 amantes de los perfumes. Este evento consolida nuestra visión de no ser solo una tienda, sino un punto de encuentro para la comunidad.', delay: 800 },
    { year: 2025, title: '2025: Mirando Hacia el Futuro', text: 'Hoy, con una comunidad de más de 10,000 clientes y un equipo en crecimiento, seguimos tan comprometidos como el primer día. Continuamos en la búsqueda incansable de las próximas joyas olfativas para seguir compartiendo este viaje contigo.', delay: 1000 },
];

// Componente auxiliar para un item de la línea de tiempo
function TimelineItem({ item, position }) {
    // Usamos ref para que el IntersectionObserver lo detecte.
    const itemRef = useRef(null);

    return (
        <div className={`${styles.timelineItem} ${styles[position]}`}>
            <div
                // Asignamos la ref al div de contenido
                ref={itemRef}
                className={`${styles.timelineContent}`}
                // El useEffect de SobreNosotros manejará añadir styles.animateVisible
            >
                <h5 className={styles.cardTitle}>{item.title}</h5>
                <p className="card-text p-1">{item.text}</p>
            </div>
        </div>
    );
}


const SobreNosotros = () => {
    const timelineRef = useRef(null);

    // Lógica para observar el scroll y aplicar la animación
    const setupObserver = useCallback(() => {
        if (!timelineRef.current || !window.IntersectionObserver) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                const item = entry.target;

                // Si es visible, aplica la clase de animación
                if (entry.isIntersecting) {
                    item.style.transitionDelay = `${index * 150}ms`;
                    item.classList.add(styles.animateVisible);
                    // Dejar de observar una vez que se activa
                    observer.unobserve(item);
                }
            });
        }, {
            root: null, // viewport
            threshold: 0.1 // 10% del elemento visible para disparar
        });

        // Observar CADA 'timelineContent' para la animación individual
        // Nota: usamos querySelectorAll para encontrar todos los elementos de contenido
        const items = timelineRef.current.querySelectorAll(`.${styles.timelineContent}`);
        items.forEach((item, index) => {
            // Re-aplicar el delay para que la animación sea secuencial
            item.style.transitionDelay = `${index * 150}ms`;
            observer.observe(item);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // Ejecuta la configuración del observador cuando el componente se monta
        const disconnect = setupObserver();
        return disconnect; // Limpia el observador al desmontar
    }, [setupObserver]);

    // --- Renderizado del componente ---

    return (
        <div className={styles.root}>
            <div className={styles.contentBox}>
                {/* Header */}
                <h1 className={styles.title}>Sobre Nosotros</h1>
                <h3 className="h4 text-center text-white">Nuestra Historia: La Esencia de Perfulandia</h3>
                <p className="lead text-center text-white">
                    Bienvenido a Perfulandia, un espacio nacido de una profunda pasión por el arte de la perfumería.
                    Creemos que un perfume es mucho más que un simple aroma; es una firma personal, un ancla para nuestros
                    recuerdos y una invisible pero poderosa forma de expresión. Nuestra historia no comienza en una gran
                    oficina, sino con una colección personal y un sueño: crear un lugar en Chile donde tanto los
                    conocedores más exigentes como los nuevos exploradores de fragancias pudieran encontrar algo especial.
                    Un lugar que no solo vendiera perfumes, sino que compartiera la magia y el relato que hay detrás de
                    cada frasco.
                </p>

                {/* Sección de Pilares (Se utiliza la clase .card del nuevo módulo) */}
                <h2 className="h3 text-center text-white mt-5">Nuestra Filosofía</h2>
                <p className="text-center text-white">En Perfulandia, nos movemos por tres pilares fundamentales:</p>

                <div className="row d-flex mt-2 mb-5">
                    {/* Primer Pilar */}
                    <div className="col-md-4 mt-1">
                        <div className={`card mb-4 h-100 opacity-90 ${styles.card}`}>
                            <div className="card-body d-flex flex-column">
                                <h5 className={`card-title text-center ${styles.cardTitle}`}>Pasión y Curaduría Experta</h5>
                                <p className="card-text p-1">
                                    No somos solo una tienda, somos aficionados y estudiosos de las fragancias. Cada perfume
                                    en nuestro catálogo ha sido seleccionado cuidadosamente por su calidad, originalidad y la
                                    historia que cuenta.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Segundo Pilar */}
                    <div className="col-md-4 mt-1">
                        <div className={`card mb-4 h-100 opacity-90 ${styles.card}`}>
                            <div className="card-body d-flex flex-column">
                                <h5 className={`card-title text-center ${styles.cardTitle}`}>Autenticidad Garantizada</h5>
                                <p className="card-text p-1">
                                    Entendemos la importancia de la confianza. Por eso, garantizamos que cada producto que
                                    ofrecemos es 100% auténtico. Trabajamos directamente con distribuidores oficiales para
                                    asegurar que recibas la calidad que mereces.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tercer Pilar */}
                    <div className="col-md-4 mt-1">
                        <div className={`card mb-4 h-100 opacity-90 ${styles.card}`}>
                            <div className="card-body d-flex flex-column">
                                <h5 className={`card-title text-center ${styles.cardTitle}`}>Una Comunidad de Amantes del Perfume</h5>
                                <p className="card-text p-1">
                                    Más que clientes, vemos a cada persona que nos visita como parte de una comunidad.
                                    Queremos ser tu guía en este fascinante universo, ayudándote a descubrir el aroma que te
                                    represente.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección de Línea de Tiempo */}
                <h2 className="h3 text-center text-white p-3 mt-5 mb-4">Línea de Tiempo de Perfulandia</h2>

                <div className={styles.timelineSection}>
                    <div className={styles.timeline} ref={timelineRef}>
                        {timelineData.map((item, index) => (
                            <TimelineItem
                                key={index}
                                item={item}
                                // Alternamos las posiciones: 0, 2, 4 son 'left'. 1, 3, 5 son 'right'.
                                position={index % 2 === 0 ? 'left' : 'right'}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SobreNosotros;


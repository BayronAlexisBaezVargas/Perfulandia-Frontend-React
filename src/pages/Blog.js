import React, { useEffect, useState } from 'react';

import blog1 from '../assets/blog1.jpg';
import blog2 from '../assets/blog2.png';
import blog3 from '../assets/blog3.jpg';
import blog4 from '../assets/blog4.webp';
import blog5 from '../assets/blog5.webp';

import styles from './Blog.modules.css';

const blogPosts = [
    {
        id: 'modalCaso1',
        category: 'Lujo & Exclusividad',
        readTime: '8',
        title: 'El Perfume Más Caro del Mundo',
        summary: "Sumérgete en la historia de 'Shumukh', una fragancia que redefine el concepto de lujo olfativo con su precio de $1.2 millones de dólares. Descubre qué secretos aromáticos justifican esta inversión extraordinaria.",
        imgSrc: blog1,
        modalContent: (
            <>
                <div className="mb-4">
                    <span className="badge bg-primary text-white px-3 py-2 me-2 rounded-pill">
                        Lujo & Exclusividad
                    </span>
                    <small className="text-muted">⏱ 8 min lectura</small>
                </div>
                <p className="fw-medium fs-5 mb-4 text-dark">
                    Cuando pensamos en perfumes de lujo, a menudo nos vienen a la mente nombres icónicos y precios
                    elevados, pero ¿cuál es el límite? La respuesta la tiene <strong>"Shumukh"</strong>, una fragancia que
                    trasciende la perfumería para convertirse en una obra de arte y opulencia.
                </p>
                <img src={blog1} className="img-fluid mb-4 rounded-3 shadow" alt="Perfume más caro del mundo" />
                <div className="alert alert-light border-0 shadow-sm mb-4">
                    <h5 className="text-primary fw-bold">Datos Fascinantes:</h5>
                    <ul className="lh-lg mb-0">
                        <li><strong>Precio:</strong> $1.2 millones de dólares</li>
                        <li><strong>Creador:</strong> Maestro perfumista Asghar Adam Ali</li>
                        <li><strong>Desarrollo:</strong> 3 años y casi 500 pruebas</li>
                        <li><strong>Duración:</strong> +12 horas en piel, 30 días en tela</li>
                    </ul>
                </div>
                <p className="lh-lg text-dark">
                    <strong>El Secreto de su Valor:</strong> La respuesta está en la fusión de tres elementos: una composición
                    olfativa excepcional, ingredientes de la más alta rareza y un frasco que es, en sí mismo, una pieza de
                    alta joyería. La fragancia contiene notas de sándalo, almizcle, rosa turca, y un rarísimo oud puro de
                    la India, conocido como "oro líquido" en la perfumería.
                </p>
            </>
        )
    },
    {
        id: 'modalCaso2',
        category: 'Ciencia & Innovación',
        readTime: '6',
        title: 'El Aroma del Espacio Exterior',
        summary: 'La NASA creó una fragancia única para entrenar astronautas. Explora cómo huele realmente el cosmos y qué revela sobre nuestros sentidos en condiciones extremas. Una aventura olfativa fuera de este mundo.',
        imgSrc: blog2,
        modalContent: (
            <>
                <div className="mb-4">
                    <span className="badge bg-primary text-white px-3 py-2 me-2 rounded-pill">
                        Ciencia & Innovación
                    </span>
                    <small className="text-muted">⏱ 6 min lectura</small>
                </div>
                <p className="fw-medium fs-5 mb-4 text-dark">
                    ¿A qué huele el espacio exterior? Aunque suene a ciencia ficción, es una pregunta que la NASA se tomó
                    muy en serio en la década de 2000, creando una herramienta única de entrenamiento para astronautas.
                </p>
                <img src={blog2} className="img-fluid mb-4 rounded-3 shadow" alt="Aroma del espacio" />
                <div className="alert alert-light border-0 shadow-sm mb-4">
                    <h5 className="text-primary fw-bold">Composición del Aroma Espacial:</h5>
                    <ul className="lh-lg mb-0">
                        <li><strong>Metal caliente</strong> - Partículas de alta energía</li>
                        <li><strong>Carne quemada</strong> - Hidrocarburos aromáticos policíclicos</li>
                        <li><strong>Frambuesas y ron</strong> - Formiato de etilo en nubes cósmicas</li>
                        <li><strong>Ozono</strong> - Reacciones químicas en vacío</li>
                    </ul>
                </div>
                <p className="lh-lg text-dark">
                    <strong>La Ciencia Detrás del Aroma:</strong> Según los astronautas, el espacio tiene un aroma peculiar que
                    se adhiere a trajes y herramientas. Esta curiosa combinación se debe a vibraciones de partículas de alta
                    energía, estrellas moribundas que producen los mismos compuestos del carbón, y la presencia de formiato
                    de etilo en las nubes de polvo cósmico.
                </p>
            </>
        )
    },
    // --- NUEVO BLOG 3 ---
    {
        id: 'modalCaso3',
        category: 'Historia & Clásicos',
        readTime: '7',
        title: 'Chanel No. 5: La Revolución de un Icono',
        summary: 'Viaja a 1921 y descubre cómo Coco Chanel y Ernest Beaux rompieron todas las reglas para crear la fragancia que definió el siglo XX. Un perfume que huele a "mujer" y no a "florero".',
        imgSrc: blog3,
        modalContent: (
            <>
                <div className="mb-4">
                    <span className="badge bg-primary text-white px-3 py-2 me-2 rounded-pill">
                        Historia & Clásicos
                    </span>
                    <small className="text-muted">⏱ 7 min lectura</small>
                </div>
                <p className="fw-medium fs-5 mb-4 text-dark">
                    En 1921, la perfumería estaba dominada por fragancias solifloras (un solo tipo de flor). Coco Chanel
                    buscaba algo radicalmente diferente: "un perfume de mujer con olor a mujer".
                </p>
                <img src={blog3} className="img-fluid mb-4 rounded-3 shadow" alt="Botella clásica de Chanel No. 5" />
                <div className="alert alert-light border-0 shadow-sm mb-4">
                    <h5 className="text-primary fw-bold">La Revolución Química:</h5>
                    <ul className="lh-lg mb-0">
                        <li><strong>Aldehídos:</strong> El perfumista Ernest Beaux usó una sobredosis de aldehídos, compuestos sintéticos que aportan un brillo "abstracto" y jabonoso.</li>
                        <li><strong>Complejidad:</strong> Más de 80 ingredientes, incluyendo rosa de mayo, jazmín de Grasse e ylang-ylang.</li>
                        <li><strong>El Frasco:</strong> Un diseño minimalista, casi de laboratorio, que contrastaba con las botellas ornamentadas de la época.</li>
                    </ul>
                </div>
                <p className="lh-lg text-dark">
                    El resultado fue una fragancia que no intentaba imitar a la naturaleza, sino crear una visión artística
                    de la feminidad moderna. Su estatus de icono se consolidó cuando Marilyn Monroe declaró que para dormir
                    solo usaba "unas gotas de Chanel No. 5". Más que un perfume, es un manifiesto de estilo.
                </p>
            </>
        )
    },
    // --- NUEVO BLOG 4 ---
    {
        id: 'modalCaso4',
        category: 'Ingredientes Exóticos',
        readTime: '5',
        title: 'Oro Líquido: El Misterio del Oud',
        summary: 'Conocido como "madera de agar", el Oud es uno de los ingredientes más preciados y complejos del mundo. Explora su sorprendente origen fúngico, su alto precio y su profundo aroma místico.',
        imgSrc: blog4,
        modalContent: (
            <>
                <div className="mb-4">
                    <span className="badge bg-primary text-white px-3 py-2 me-2 rounded-pill">
                        Ingredientes Exóticos
                    </span>
                    <small className="text-muted">⏱ 5 min lectura</small>
                </div>
                <p className="fw-medium fs-5 mb-4 text-dark">
                    El Oud, o madera de agar, es un ingrediente que evoca lujo y misterio. Su valor supera a menudo al del oro,
                    y su aroma es inconfundible: complejo, animal, amaderado y profundamente resinoso.
                </p>
                <img src={blog4} className="img-fluid mb-4 rounded-3 shadow" alt="Madera de agar (Oud)" />
                <div className="alert alert-light border-0 shadow-sm mb-4">
                    <h5 className="text-primary fw-bold">¿De Dónde Viene?</h5>
                    <ul className="lh-lg mb-0">
                        <li><strong>Árbol:</strong> Proviene del árbol *Aquilaria*, nativo del sudeste asiático.</li>
                        <li><strong>Infección:</strong> Lo fascinante es que el Oud solo se produce cuando el árbol es infectado por un hongo específico (*Phialophora parasitica*).</li>
                        <li><strong>Defensa:</strong> El árbol reacciona produciendo una resina oscura y aromática para combatir la infección. ¡Esa resina es el Oud!</li>
                    </ul>
                </div>
                <p className="lh-lg text-dark">
                    Debido a que solo un pequeño porcentaje de árboles *Aquilaria* se infecta naturalmente, el Oud silvestre
                    es increíblemente raro y caro. Hoy en día, gran parte del Oud proviene de plantaciones cultivadas
                    donde la infección se induce artificialmente. Es el pilar de la perfumería de Oriente Medio y ha
                    conquistado las marcas de lujo occidentales.
                </p>
            </>
        )
    },
    // --- NUEVO BLOG 5 ---
    {
        id: 'modalCaso5',
        category: 'Psicología Olfativa',
        readTime: '6',
        title: 'El Efecto Proust: Perfume y Memoria',
        summary: '¿Por qué un simple olor puede transportarte instantáneamente a la infancia? Analizamos la poderosa conexión neurológica entre el sistema límbico y el olfato, conocida como el "Efecto Proust".',
        imgSrc: blog5,
        modalContent: (
            <>
                <div className="mb-4">
                    <span className="badge bg-primary text-white px-3 py-2 me-2 rounded-pill">
                        Psicología Olfativa
                    </span>
                    <small className="text-muted">⏱ 6 min lectura</small>
                </div>
                <p className="fw-medium fs-5 mb-4 text-dark">
                    El "Efecto Proust" describe la capacidad de un olor para desencadenar un recuerdo vívido y emocional
                    del pasado. El término proviene de la novela de Marcel Proust, "En busca del tiempo perdido", donde
                    el olor de una magdalena mojada en té transporta al narrador a su infancia.
                </p>
                <img src={blog5} className="img-fluid mb-4 rounded-3 shadow" alt="Cerebro mostrando el sistema límbico y el bulbo olfatorio" />
                <div className="alert alert-light border-0 shadow-sm mb-4">
                    <h5 className="text-primary fw-bold">La Conexión Directa:</h5>
                    <ul className="lh-lg mb-0">
                        <li><strong>Anatomía:</strong> El bulbo olfatorio (que procesa los olores) tiene una conexión directa y única con el sistema límbico.</li>
                        <li><strong>Sistema Límbico:</strong> Incluye la <strong>amígdala</strong> (centro de la emoción) y el <strong>hipocampo</strong> (centro de la memoria).</li>
                        <li><strong>Sin Filtros:</strong> A diferencia de la vista o el oído, el olfato no pasa primero por el tálamo (el "conmutador" del cerebro). Va directo a la emoción y la memoria.</li>
                    </ul>
                </div>
                <p className="lh-lg text-dark">
                    Esta conexión neurológica explica por qué los olores son "máquinas del tiempo" tan potentes. El olor
                    del protector solar puede *ser* el verano, y una fragancia específica puede recordarnos
                    instantáneamente a una persona. La perfumería no solo es estética; es un arte que trabaja
                    directamente con el núcleo de nuestras emociones y recuerdos.
                </p>
            </>
        )
    }
];


// --- COMPONENTE MODAL (Sin cambios) ---
function InfoModal({ id, titleId, title, children, isOpen = false, onClose = () => {} }) {
    useEffect(() => {
        if (!isOpen) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');

        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);

        return () => {
            document.body.style.overflow = prevOverflow;
            document.body.classList.remove('modal-open');
            document.removeEventListener('keydown', handleKey);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            <div
                className="modal show d-block"
                id={id}
                tabIndex={-1}
                role="dialog"
                aria-labelledby={titleId}
                aria-modal="true"
                onClick={onClose}
            >
                <div className="modal-dialog modal-lg" role="document" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
                        <div className="modal-header bg-primary text-white border-0">
                            <h5 className="modal-title fw-semibold" id={titleId}>{title}</h5>
                            <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body bg-white p-4">
                            {children}
                        </div>

                        <div className="modal-footer bg-light border-0">
                            <button type="button" className="btn btn-dark" onClick={onClose}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal-backdrop fade show" onClick={onClose} />
        </>
    );
}

// --- COMPONENTE TARJETA (Sin cambios) ---
function CaseCard({ title, summary, imgSrc, onOpen, category, readTime }) {
    return (
        <div className={`card border-0 rounded-4 shadow-lg mb-5 overflow-hidden ${styles.cardHover}`}>
            <div className="row g-0 align-items-center">
                <div className="col-lg-6 order-lg-2">
                    <div className="p-4">
                        <img
                            src={imgSrc}
                            className={`img-fluid rounded-3 shadow ${styles.imageHover}`}
                            alt={`Imagen del ${title.toLowerCase()}`}
                        />
                    </div>
                </div>
                <div className="col-lg-6 order-lg-1">
                    <div className="card-body bg-light p-4">
                        <div className="mb-3">
                            <span className="badge bg-primary text-white px-3 py-2 me-2 rounded-pill">
                                {category}
                            </span>
                            <small className="text-muted">
                                ⏱ {readTime} min lectura
                            </small>
                        </div>

                        <h3 className="card-title fw-bold text-dark mb-3 border-bottom border-primary border-2 pb-2">
                            {title}
                        </h3>
                        <p className="card-text text-muted mb-4 lh-lg">
                            {summary}
                        </p>

                        <button type="button" className="btn btn-dark rounded-3" onClick={onOpen}>
                            Leer Artículo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- COMPONENTE PRINCIPAL (Refactorizado) ---
function Blog() {
    // Un solo estado para manejar qué modal está abierto (usando el 'id' del post)
    const [openModal, setOpenModal] = useState(null);

    // Buscamos el post activo basado en el ID que está en 'openModal'
    const activePost = blogPosts.find(post => post.id === openModal);

    return (
        <div className={styles.root}>
            {/* Header del Blog con Bootstrap */}
            <section className="bg-primary text-white py-5 mb-5 position-relative">
                {/* ... (sin cambios) ... */}
                <div className="bg-dark bg-opacity-25 position-absolute top-0 start-0 w-100 h-100"></div>
                <div className="container text-center position-relative">
                    <h1 className="display-2 fw-bold mb-4" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
                        Blog Perfulandia
                    </h1>
                    <p className="lead fs-4 mx-auto opacity-75" style={{maxWidth: '600px'}}>
                        Descubre las historias más fascinantes del mundo de las fragancias.
                        Desde curiosidades hasta tendencias exclusivas que transformarán tu percepción del arte olfativo.
                    </p>
                </div>
            </section>

            {/* Estadísticas con Bootstrap */}
            <section className="container mb-5">
                {/* ... (sin cambios) ... */}
                <div className="bg-dark text-white rounded-4 py-5 px-4">
                    <div className="row text-center">
                        <div className="col-md-4">
                            <div className="p-3">
                                <h2 className="display-4 fw-bold text-primary mb-2">50+</h2>
                                <p className="fs-5 mb-0">Artículos Publicados</p>
                            </div>
                        </div>
                        <div className="col-md-4 border-start border-end border-secondary d-none d-md-block">
                            <div className="p-3">
                                <h2 className="display-4 fw-bold text-primary mb-2">15k</h2>
                                <p className="fs-5 mb-0">Lectores Mensuales</p>
                            </div>
                        </div>
                        <div className="col-md-4 d-md-none">
                            <div className="p-3 border-top border-secondary mt-3 pt-4">
                                <h2 className="display-4 fw-bold text-primary mb-2">15k</h2>
                                <p className="fs-5 mb-0">Lectores Mensuales</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3">
                                <h2 className="display-4 fw-bold text-primary mb-2">98%</h2>
                                <p className="fs-5 mb-0">Satisfacción</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* === Artículos del Blog (MEJORADO) === */}
            {/* Usamos .map() para renderizar las tarjetas desde nuestro array de datos */}
            <section className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center text-dark fw-bold mb-5 display-5">
                            Artículos Destacados
                        </h2>

                        {blogPosts.map((post) => (
                            <CaseCard
                                key={post.id}
                                category={post.category}
                                readTime={post.readTime}
                                title={post.title}
                                summary={post.summary}
                                imgSrc={post.imgSrc}
                                onOpen={() => setOpenModal(post.id)}
                            />
                        ))}

                    </div>
                </div>
            </section>

            {/* Newsletter con Bootstrap */}
            <section className="container my-5">
                {/* ... (sin cambios) ... */}
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-lg rounded-4 bg-light">
                            <div className="card-body text-center p-5">
                                <h3 className="text-dark fw-bold mb-3 display-6">Mantente al día</h3>
                                <p className="lead text-muted mb-4 fs-5">
                                    Recibe los mejores artículos sobre fragancias directamente en tu bandeja de entrada
                                </p>
                                <div className="row g-3 align-items-center justify-content-center">
                                    <div className="col-md-7">
                                        <input
                                            type="email"
                                            className="form-control form-control-lg rounded-3 border-0 shadow-sm"
                                            placeholder="tu-email@ejemplo.com"
                                        />
                                    </div>
                                    <div className="col-md-auto">
                                        <button className="btn btn-dark btn-lg rounded-3 px-4">
                                            Suscribirme
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* === Modales con Bootstrap (MEJORADO) === */}
            {/* Renderizamos un solo Modal y le pasamos los datos del 'activePost' */}
            <InfoModal
                id={activePost?.id}
                titleId={`${activePost?.id}Label`}
                title={activePost?.title}
                isOpen={!!activePost} // Convertimos activePost (objeto o undefined) en un booleano
                onClose={() => setOpenModal(null)}
            >
                {/* El contenido del modal (JSX) viene directamente del objeto 'activePost' */}
                {activePost?.modalContent}
            </InfoModal>
        </div>
    );
}

export default Blog;









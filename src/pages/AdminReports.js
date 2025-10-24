// src/pages/AdminReports.js

import React, { useEffect } from 'react';
import { StarFill } from 'react-bootstrap-icons';
import styles from './AdminReports.module.css';

// --- Datos simulados de reseñas (Muchas para dar contexto) ---
const simulatedReviews = [
    { id: 1, user: 'Ana G.', rating: 5, comment: 'Excelente tienda, encontré mi fragancia favorita y el envío fue rápido y seguro. ¡Volveré a comprar!', date: '2025-10-20' },
    { id: 2, user: 'Marcelo P.', rating: 4, comment: 'Muy buena selección de perfumes, aunque me gustaría más opciones de nicho. El precio es competitivo.', date: '2025-10-18' },
    { id: 3, user: 'Sofía V.', rating: 5, comment: '¡Increíble servicio al cliente! Mi pedido llegó antes de lo esperado. 5 estrellas.', date: '2025-10-15' },
    { id: 4, user: 'Carlos M.', rating: 3, comment: 'El perfume llegó bien, pero la caja estaba ligeramente dañada. Sugiero mejorar el embalaje.', date: '2025-10-14' },
    { id: 5, user: 'Daniela R.', rating: 5, comment: 'La página de pago fue muy rápida y fácil. Me encanta Perfulandia.', date: '2025-10-12' },
    { id: 6, user: 'Javier S.', rating: 4, comment: 'Buena experiencia en general. El sistema de carrito es muy claro. Lo único es que no encontré mi perfume habitual.', date: '2025-10-10' },
    { id: 7, user: 'Luisa H.', rating: 5, comment: 'Absolutamente recomendable. La descripción del producto era muy precisa.', date: '2025-10-09' },
    { id: 8, user: 'Benjamín L.', rating: 3, comment: 'Necesitan más stock en los productos críticos. Quise comprar dos perfumes y uno estaba agotado.', date: '2025-10-07' },
    { id: 9, user: 'Gabriela C.', rating: 5, comment: '¡Mi nuevo perfume favorito! La durabilidad es excelente. Cinco estrellas sin duda.', date: '2025-10-05' },
    { id: 10, user: 'Ricardo Z.', rating: 4, comment: 'Llegó un día tarde, pero el perfume es original. Cuatro estrellas justas.', date: '2025-10-03' },
    { id: 11, user: 'Elena Q.', rating: 5, comment: 'Proceso de compra sin fallas. Gran trabajo, Perfulandia.', date: '2025-10-01' },
    { id: 12, user: 'Felipe A.', rating: 4, comment: 'La interfaz web es fácil de usar. Sugiero añadir más filtros de búsqueda.', date: '2025-09-28' },
];

// Componente auxiliar para renderizar el rating
const StarRating = ({ rating }) => {
    const stars = [];
    const maxStars = 5;
    for (let i = 1; i <= maxStars; i++) {
        stars.push(
            <StarFill
                key={i}
                // Color de la estrella activa o inactiva
                style={{ color: i <= rating ? '#ffc107' : '#560bad', marginRight: '3px' }}
            />
        );
    }
    return <div className={styles.starRating}>{stars}</div>;
};

// Componente de Tarjeta de Reseña
const ReviewCard = ({ review }) => (
    <div className={styles.reviewCard}>
        <div className="flex-grow-1">
            <p className={styles.reviewAuthor}>{review.user}</p>
            <p className={styles.reviewDate}>Fecha: {review.date}</p>
            <StarRating rating={review.rating} />
            <p>{review.comment}</p>
        </div>
    </div>
);

function AdminReports() {
    // Cálculo de promedio simulado
    const totalRatings = simulatedReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRatings / simulatedReviews.length).toFixed(1);

    // Conteo de reseñas por estrella
    const ratingCounts = simulatedReviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className={styles.reportsContainer}>
            <h2 className={styles.title}>Reportes de Opiniones y Reseñas</h2>

            {/* Tarjeta de Resumen */}
            <div className={styles.summaryCard}>
                <div>
                    <h3>Puntuación Promedio</h3>
                    <p className={styles.ratingText}>
                        {averageRating} / 5.0
                    </p>
                    <p className="text-white-50">{simulatedReviews.length} Reseñas en total</p>
                </div>

                {/* Distribución de Estrellas */}
                <div>
                    <h4>Distribución:</h4>
                    {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className="d-flex justify-content-end align-items-center text-white-50">
                            <span className="me-2">{star} Estrellas:</span>
                            <span style={{color: '#ffc107', fontWeight: 600}}>{ratingCounts[star] || 0}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Grid de Reseñas */}
            <h3 className="text-white mb-4">Reseñas Individuales</h3>
            <div className={styles.reviewGrid}>
                {simulatedReviews.map(review => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
}

export default AdminReports;
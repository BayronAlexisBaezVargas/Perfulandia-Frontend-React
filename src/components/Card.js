import React from 'react';

function Card(icono, titulo, descripcion, color) {
    const cardClase=`card text-center h-100 border-2 border-${color}`;
    return (
        <div className={cardClase}>
            <img
                className='card-img-top'
                src={icono}
                alt={`Imagen de ${titulo}`}
                style={{ height: '180px', objectFit: 'cover'}}
            />
            <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <p className="card-text">{descripcion}</p>
            </div>
        </div>
    );
}

export default Card;
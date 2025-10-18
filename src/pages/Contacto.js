import React, { useState } from 'react';

function Contacto() {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        mensaje: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
        // Aquí puedes agregar la lógica para enviar el formulario
    };

    return (
        <div className="container-fluid py-5" >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="row bg-white rounded-4 shadow-lg overflow-hidden">
                            {/* Sección de información */}
                            <div className="col-lg-5 bg-dark d-flex flex-column justify-content-center p-5">
                                <div className="text-white">
                                    <h2 className="fw-bold mb-4">¡Conectemos!</h2>
                                    <p className="lead mb-4">
                                        Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos lo antes posible.
                                    </p>

                                    <div className="d-flex align-items-center mb-3">
                                        <i className="bi bi-geo-alt-fill text-primary me-3 fs-5"></i>
                                        <span>Santiago, Chile</span>
                                    </div>

                                    <div className="d-flex align-items-center mb-3">
                                        <i className="bi bi-envelope-fill text-primary me-3 fs-5"></i>
                                        <span>contacto@perfulandia.cl</span>
                                    </div>

                                    <div className="d-flex align-items-center mb-4">
                                        <i className="bi bi-telephone-fill text-primary me-3 fs-5"></i>
                                        <span>+56 9 1234 5678</span>
                                    </div>

                                    <div className="d-flex gap-3">
                                        <a href="#" className="text-primary fs-4"><i className="bi bi-facebook"></i></a>
                                        <a href="#" className="text-primary fs-4"><i className="bi bi-instagram"></i></a>
                                        <a href="#" className="text-primary fs-4"><i className="bi bi-twitter"></i></a>
                                        <a href="#" className="text-primary fs-4"><i className="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                            </div>

                            {/* Formulario */}
                            <div className="col-lg-7 p-5">
                                <h3 className="fw-bold text-dark mb-4">Formulario de Contacto</h3>
                                <p className="text-muted mb-4">
                                    Cuéntanos cómo podemos ayudarte a encontrar la fragancia perfecta
                                </p>

                                <form onSubmit={handleSubmit} className="row g-4">
                                    <div className="col-12">
                                        <label htmlFor="nombre" className="form-label fw-semibold text-dark">
                                            Nombre Completo *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg border-2"
                                            id="nombre"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            placeholder="Tu nombre completo"
                                            required
                                            style={{ borderColor: '#e9ecef', transition: 'all 0.3s' }}
                                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="correo" className="form-label fw-semibold text-dark">
                                            Correo Electrónico *
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control form-control-lg border-2"
                                            id="correo"
                                            name="correo"
                                            value={formData.correo}
                                            onChange={handleChange}
                                            placeholder="tu@email.com"
                                            required
                                            style={{ borderColor: '#e9ecef', transition: 'all 0.3s' }}
                                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="telefono" className="form-label fw-semibold text-dark">
                                            Teléfono
                                        </label>
                                        <input
                                            type="tel"
                                            className="form-control form-control-lg border-2"
                                            id="telefono"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            placeholder="+56 9 1234 5678"
                                            style={{ borderColor: '#e9ecef', transition: 'all 0.3s' }}
                                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="mensaje" className="form-label fw-semibold text-dark">
                                            Mensaje *
                                        </label>
                                        <textarea
                                            className="form-control form-control-lg border-2"
                                            rows="5"
                                            id="mensaje"
                                            name="mensaje"
                                            value={formData.mensaje}
                                            onChange={handleChange}
                                            placeholder="Cuéntanos sobre tu consulta, preferencias de fragancias, o cualquier pregunta que tengas..."
                                            required
                                            style={{ borderColor: '#e9ecef', transition: 'all 0.3s', resize: 'vertical' }}
                                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className="btn btn-lg px-5 py-3 fw-semibold text-white border-0"
                                            style={{
                                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                transition: 'all 0.3s',
                                                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = 'translateY(-2px)';
                                                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = 'translateY(0)';
                                                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                                            }}
                                        >
                                            <i className="bi bi-send-fill me-2"></i>
                                            Enviar Mensaje
                                        </button>
                                    </div>

                                    <div className="col-12">
                                        <p className="text-muted small mb-0">
                                            * Campos obligatorios. Tu información está protegida y no será compartida.
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contacto;



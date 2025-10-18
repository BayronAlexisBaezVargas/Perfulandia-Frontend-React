import React from 'react';


// Te recomiendo nombrar el componente de forma descriptiva, por ejemplo, "SobreNosotros".
const SobreNosotros = () => {
    return (
        <div className="container my-5 bg-dark p-5 rounded-3">
            <h1 className="text-center text-white">Sobre Nosotros</h1>
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

            <h2 className="h3 text-center text-white">Nuestra Filosofía</h2>
            <p className="text-center text-white">En Perfulandia, nos movemos por tres pilares fundamentales:</p>

            <div className="row d-flex mt-2">
                <div className="col-md-4 mt-1">
                    <div className="card mb-4 h-100 opacity-75">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title text-center">Pasión y Curaduría Experta</h5>
                            <p className="card-text p-1">
                                No somos solo una tienda, somos aficionados y estudiosos de las fragancias. Cada perfume
                                en nuestro catálogo ha sido seleccionado cuidadosamente por su calidad, originalidad y la
                                historia que cuenta. Desde los clásicos atemporales hasta las joyas ocultas de casas de
                                diseño emergentes.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mt-1 opacity-75">
                    <div className="card mb-4 h-100">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title text-center">Autenticidad Garantizada</h5>
                            <p className="card-text p-1">
                                Entendemos la importancia de la confianza. Por eso, garantizamos que cada producto que
                                ofrecemos es 100% auténtico. Trabajamos directamente con distribuidores oficiales para
                                asegurar que recibas la calidad que mereces.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mt-1 opacity-75">
                    <div className="card mb-4 h-100">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title text-center">Una Comunidad de Amantes del Perfume</h5>
                            <p className="card-text p-1">
                                Más que clientes, vemos a cada persona que nos visita como parte de una comunidad.
                                Queremos ser tu guía en este fascinante universo, ayudándote a descubrir el aroma que te
                                represente y a compartir experiencias con otros apasionados como tú.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="text-center text-white p-3">Línea de Tiempo</h2>

            <div className="row d-flex mt-2">
                <div className="col-md-4 mt-1 opacity-75">
                    <div className="card mb-4 h-100">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title text-center">2021: El Nacimiento de un Sueño</h5>
                            <p className="card-text p-1">
                                Marcelo C., un apasionado coleccionista, funda Perfulandia como un proyecto personal.
                                Comienza a operar a través de redes sociales, ofreciendo una cuidada selección de
                                perfumes de diseñador a una pequeña comunidad de aficionados.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mt-1 opacity-75">
                    <div className="card mb-4 h-100">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title text-center">2022: La Primera Oficina y Bodega</h5>
                            <p className="card-text p-1">
                                Gracias a una increíble recepción, Perfulandia se establece en su primera oficina en
                                Santiago. Este paso nos permite profesionalizar la logística, ampliar el stock y
                                garantizar envíos más rápidos y seguros a todo el país.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mt-1 opacity-75">
                    <div className="card mb-4 h-100">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title text-center">2023 (Marzo): Expansión de Catálogo</h5>
                            <p className="card-text p-1">
                                Marcamos un antes y un después al incorporar las primeras 10 marcas de perfumería de
                                nicho, ofreciendo fragancias exclusivas y difíciles de encontrar en Chile, consolidando
                                nuestra reputación como curadores expertos.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mt-1 opacity-75">
                    <div className="card mb-4 h-100">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title text-center">2023 (Noviembre): Lanzamiento de Perfulandia.cl</h5>
                            <p className="card-text p-1">
                                Nace nuestro hogar digital. Lanzamos el sitio web oficial para ofrecer una experiencia de
                                compra superior, con descripciones detalladas, un sistema de pedidos eficiente y un blog
                                para compartir nuestra pasión por la perfumería.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mt-1 opacity-75">
                    <div className="card mb-4 h-100">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title text-center">2024: Nuestro Primer Evento Comunitario</h5>
                            <p className="card-text p-1">
                                Realizamos el primer workshop "Descubre tu Aroma" en Santiago, uniendo a más de 50
                                amantes de los perfumes. Este evento consolida nuestra visión de no ser solo una tienda,
                                sino un punto de encuentro para la comunidad.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mt-1 opacity-75">
                    <div className="card mb-4 h-100">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title text-center">2025: Mirando Hacia el Futuro</h5>
                            <p className="card-text p-1">
                                Hoy, con una comunidad de más de 10,000 clientes y un equipo en crecimiento, seguimos tan
                                comprometidos como el primer día. Continuamos en la búsqueda incansable de las próximas
                                joyas olfativas para seguir compartiendo este viaje contigo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SobreNosotros;


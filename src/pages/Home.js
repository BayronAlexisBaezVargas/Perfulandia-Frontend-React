import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import prducto1 from "../assets/1.webp";
import prducto2 from "../assets/2.webp";
import prducto3 from "../assets/3.webp";
import styles from "./Home.modules.css";

function Home(){
    return(
        <div className={styles.root}>
            <Hero />
            <div className="container my-5 bg-dark p-5 rounded-3 ">
                <h1 className="text-center mish text-white">Pagina Inicial</h1>
                <p className="lead text-center text-white">El mejor lugar para comprar tus perfumes favoritos</p>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <p className="text-white card-text text-center">En un mundo lleno de opciones, encontrar tu sello
                        personal es clave. En Perfulandia, simplificamos tu búsqueda de la fragancia ideal. </p>
                </div>
                <h2 className="text-center text-white py-5">Catalogo De Perfumes</h2>
                <div className="row d-flex mt-2 ">

                    <div className="col-md-4 mt-1 ">
                        <div className="card mb-4 h-100" style={{ backgroundImage: 'linear-gradient(90deg, #ffc107 0%, #f72585 100%)' }}>
                            <img height="250" className="card-img-top rounded-3" src={prducto1} alt=""/>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Mandarin sky</h5>
                                <p className="card-text"> Fragancia masculina de la casa de diseño árabe Armaf</p>
                                <Link to="/Productos" className="btn btn-light mt-auto text-dark">Ver más</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mt-1">
                        <div className="card mb-4 h-100 " style={{ backgroundImage: 'linear-gradient(90deg, #ffc107 0%, #f72585 100%)' }}>
                            <img height="250" className="card-img-top rounded-3" src={prducto2} alt=""/>
                            <div className="card-body d-flex flex-column ">
                                <h5 className="card-title">All Black</h5>
                                <p className="card-text">es un eau de toilette oriental especiado para hombre, con notas de
                                    cardamomo, tonka y cedro</p>
                                <Link  to="/Productos"  className="btn btn-light mt-auto text-dark" >Ver más </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mt-1">
                        <div className="card mb-4 h-100" style={{ backgroundImage: 'linear-gradient(90deg, #ffc107 0%, #f72585 100%)' }}>
                            <img height="250" className="card-img-top rounded-3" src={prducto3} alt=""/>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Bad Boy</h5>
                                <p className="card-text">redefine la masculinidad moderna con un atrevido contraste de
                                    frescura e intensidad. Es la celebración de un hombre que asume riesgos, sigue sus
                                    instintos y rechaza las convenciones</p>
                                <Link to="/Productos" className="btn btn-light mt-auto text-dark">Ver más</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;


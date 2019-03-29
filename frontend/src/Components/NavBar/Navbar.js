import React from 'react';
import { Link } from 'react-router'
import bilbo from '../../assets/img/bilbo.PNG';
import perfilImage from '../../assets/img/user.png'

const Navbar = (props) => (
    <div>
        <div className="row text-center">
            <a href="/"><img src={bilbo} id="titulo"></img></a>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/novelas">Novelas <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/series">Series Populares</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Acerca de Nosotros
                    </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/faq" >FAQ</a>
                            <a className="dropdown-item" href="/contacto" >Contactenos</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ADMIN
                    </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/admin/usuarios" >Manejo Usuarios</a>
                            <a className="dropdown-item" href="/admin/generos" >Manejo Generos</a>
                            <a className="dropdown-item" href="/admin/novelas" >Manejo Novelas</a>
                            <a className="dropdown-item" href="/admin/grupos" >Manejo Grupos</a>
                            <a className="dropdown-item" href="/admin/autores" >Manejo Autores</a>
                            <a className="dropdown-item" href="/admin/recomendaciones" >Manejo Recomendaciones</a>
                        </div>
                    </li>
                </ul>
                <ul className="navbar-nav my-2 my-lg-0">
                    <li className="nav-item">
                        <a className="nav-link" href="/registro">Registrarse</a>
                    </li>
                    <li className="nav-item">
                        <div className="row">
                            <a className="nav-link" href="/perfil">Perfil</a>
                            <a href="/perfil"><img src={perfilImage} height="40px" id="perfilPequeño" /></a>
                        </div>                </li>
                </ul>
            </div>
        </nav>
    </div>

);

export default Navbar;
import React from 'react';
import { Link } from 'react-router'
import bilbo from '../../assets/img/bilbo.PNG';
import perfilImage from '../../assets/img/user.png'
import {FormattedMessage} from 'react-intl';
import './NavBar.css'

const Navbar = (props) => (
    <main>
        <div className="row text-center">
            <a className="row imagen" href="/">
                <img alt="Home" src={bilbo} height="100px" id="titulo"></img>
                <h1>Bilbo Web</h1>
            </a>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/novelas"><FormattedMessage id="Novels"/> <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/series"><FormattedMessage id="Series"/></a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <FormattedMessage id="AboutUs"/>
                    </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/faq" >FAQ</a>
                            <a className="dropdown-item" href="/contacto" ><FormattedMessage id="Contact"/></a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ADMIN
                    </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/admin/usuarios" ><FormattedMessage id="ManageUser"/></a>
                            <a className="dropdown-item" href="/admin/generos" ><FormattedMessage id="ManageGenre"/></a>
                            <a className="dropdown-item" href="/admin/grupos" ><FormattedMessage id="ManageGroup"/></a>
                            <a className="dropdown-item" href="/admin/autores" ><FormattedMessage id="ManageAuthor"/></a>
                            <a className="dropdown-item" href="/admin/recomendaciones" ><FormattedMessage id="ManageRecom"/></a>
                        </div>
                    </li>
                </ul>
                <ul className="navbar-nav my-2 my-lg-0">
                    <li className="nav-item">
                        <a className="nav-link" href="/registro"><FormattedMessage id="Register"/></a>
                    </li>
                    <li className="nav-item">
                        <div className="row">
                            <a className="nav-link" href="/perfil"><FormattedMessage id="Profile"/></a>
                            <a href="/perfil"><img alt="profile" src={perfilImage} height="40px" id="perfilPequeño" /></a>
                        </div>                </li>
                </ul>
            </div>
        </nav>
    </main>

);

export default Navbar;
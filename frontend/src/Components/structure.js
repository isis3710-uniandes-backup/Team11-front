import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import Navbar from './NavBar/Navbar'
import Novelas from './Novelas/Novelas'
import Faq from './AboutUs/faq'
import Contactenos from './AboutUs/contactenos';
import SeriesPops from './Series/SeriesPops';
import Home from './Home/Home'
import Perfil from './Usuario/Perfil'
import AdminUsers from './Admin/Usuarios'
import AdminGroups from './Admin/Grupos'
import AdminRecomm from './Admin/Recomendaciones'
import AdminGenre from './Admin/Generos'
import AdminAutor from './Admin/Autores'
import NovelaDetail from './Novelas/NovelaDetail'

class Vista extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Navbar/>
                <Route path="/" exact component={Home}/>
                <Route path="/novelas" exact component={Novelas}/>
                <Route path="/faq" exact component={Faq}/>
                <Route path="/contacto" exact component={Contactenos}/>
                <Route path="/series" exact component={SeriesPops}/>
                <Route path="/perfil" exact component={Perfil}/>
                <Route path="/admin/usuarios" exact component={AdminUsers}/>
                <Route path="/admin/grupos" exact component={AdminGroups}/>
                <Route path="/admin/recomendaciones" exact component={AdminRecomm}/>
                <Route path="/admin/generos" exact component={AdminGenre}/>
                <Route path="/admin/autores" exact component={AdminAutor}/>
                <Route path="/novelas/:idNovela" exact component={NovelaDetail}/>
            </div>
        );
    }
}

export default Vista;
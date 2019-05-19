import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Navbar from './NavBar/Navbar'
import Novelas from './Novelas/Novelas'
import Faq from './AboutUs/faq'
import Contactenos from './AboutUs/contactenos';
import SeriesPops from './Series/SeriesPops';
import Home from './Home/Home'
import Registro from './Usuario/Registro'
import Login from './Usuario/Login'
import AdminUsers from './Admin/Usuarios'
import AdminGroups from './Admin/Grupos'
import AdminRecomm from './Admin/Recomendaciones'
import AdminGenre from './Admin/Generos'
import AdminAutor from './Admin/Autores'
import NovelaDetail from './Novelas/NovelaDetail'
import AuthPerf from './AuthPerf';

class Vista extends Component {
    
    render() {
        return(
            <div>
                <Navbar ADMIN={this.props.ADMIN} logged={this.props.logged}/>
                <Route path="/" exact component={Home}/>
                <Route path="/novelas" exact component={Novelas}/>
                <Route path="/faq" exact component={Faq}/>
                <Route path="/contacto" exact component={Contactenos}/>
                <Route path="/series" exact component={SeriesPops}/>
                <Route path="/perfil" render={(props)=><AuthPerf {...this.props}/>} />
                <Route path="/registro" exact component={Registro}/>
                <Route path="/login" render={(props)=><Login {...this.props}/>}/>
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

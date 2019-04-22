import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import iconUpdate from '../../assets/img/iconUpdate.PNG';
import iconDelete from '../../assets/img/iconDelete.PNG';

class NovelaDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        novela:{},
                        autores:[],
                        generos:[],
                        recomendaciones:[],
                        novelas:[],
                        publicaciones:[],
                        grupos:[],
                        comentarios:[],
                        usuarios:[]
                    };
    }

    renderAutores=()=>{
        let autors=[];
        if(this.state.novela.id!==undefined){
            this.state.autores.forEach((el)=>{
                if(this.state.novela.autores.includes(el.id)){
                    autors.push(el);
                }
            });
        }
        return autors.map((el,i)=><p key={i}>{el.nombre}</p>);
    }

    renderRecomedaciones=()=>{
        let novels=[];
        if(this.state.novela.id!==undefined){
            this.state.recomendaciones.forEach((el)=>{
                if(el.novela===this.state.novela.id){
                    let idBus=this.state.novelas.findIndex((elem)=>el.novelaRecomendada===elem.id);
                    if(idBus>-1){
                        novels.push(this.state.novelas[idBus]);
                    }
                }
            });
        }
        return novels.map((el,i)=><a href={'/novelas/'+el.id} key={i}>{el.titulo}</a>);
    }

    renderGeneros=()=>{
        let generos=[];
        this.state.generos.forEach((el)=>{
            if(el.novelas.includes(this.state.novela.id)){
                generos.push(el);
            }
        });

        return generos.map((el,i)=><p key={i}>{el.genero}</p>);
    }

    renderPublicaciones=()=>{
        let caps=[];
        this.state.publicaciones.forEach((el)=>{
            if(el.novela===this.state.novela.id){
                caps.push(el);
            }
        });

        return caps.map((el,i)=>{
            let idBus=this.state.grupos.findIndex((elem)=>el.fansub===elem.id);
            let grupo=""
            if(idBus>-1){
                grupo=this.state.grupos[idBus].nombre;
            }
            return(
                <tr key={i}>
                <td >{el.fecha}</td>
                <td>{grupo}</td>
                <td><a href={el.texto}>{el.titulo}</a></td>
                {/* <td><button><img src={iconUpdate}></img></button>
                <button><img src={iconDelete}></img></button></td> */}
                </tr>
            );
        });
    }

    renderComentarios=()=>{
        let comms=[];
        this.state.comentarios.forEach((el)=>{
            if(el.novela===this.state.novela.id){
                comms.push(el);
            }
        });

        return comms.map((el,i)=>{
            console.log(this.state.usuarios);
            let idBus=this.state.usuarios.findIndex((elem)=>el.usuario===elem.id);
            let usuario="";
            if(idBus>-1){
                usuario=this.state.usuarios[idBus].nombre;
            }
            return(
                <tr key={i}>
                <td ><strong>{usuario}</strong></td>
                <td>{el.comentario}</td>
                <td>{el.fecha}</td>
                {/* <td><button><img src={iconUpdate}></img></button>
                <button><img src={iconDelete}></img></button></td> */}
                </tr>
            );
        });
    }

    componentDidMount() {
        axios.get('http://localhost:3001/Novelas/'+this.props.match.params.idNovela)
            .then((response) => {
                this.setState({novela:response.data});
            });
        axios.get('http://localhost:3001/autores/')
            .then((response) => {
                this.setState({autores:response.data});
            });
        axios.get('http://localhost:3001/generos/')
            .then((response) => {
                this.setState({generos:response.data});
            });
        axios.get('http://localhost:3001/recomendaciones/')
            .then((response) => {
                this.setState({recomendaciones:response.data});
            });
        axios.get('http://localhost:3001/novelas/')
            .then((response) => {
                this.setState({novelas:response.data});
            });
        axios.get('http://localhost:3001/Capitulos/')
            .then((response) => {
                this.setState({publicaciones:response.data});
            });
        axios.get('http://localhost:3001/Fansubs/')
            .then((response) => {
                this.setState({grupos:response.data});
            });
        axios.get('http://localhost:3001/Comentarios/')
            .then((response) => {
                this.setState({comentarios:response.data});
            });
        axios.get('http://localhost:3001/Usuarios/')
            .then((response) => {
                this.setState({usuarios:response.data});
            });
    }

    render() {
        return (
            <div role="contentinfo">
               <div className="row">
                    <div className="inline col-4 marg-top-5vw">
                        <img alt="portada" src={this.state.novela.imagen}></img>
                        <h3>Autores</h3>
                          {this.renderAutores()}
                        <h3>Generos</h3>
                          {this.renderGeneros()}
                    </div>
                    <div className="inline col-8 marg-top-5vw">
                        <h2>{this.state.novela.titulo}</h2>
                        <h3>Descripción</h3>
                        <p className="col-12">{this.state.novela.descripcion}</p>
                        <h3>Recomendaciones</h3>
                        {this.renderRecomedaciones()}
                        <h3>Publicaciones</h3>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">Fecha</th>
                                <th scope="col">Grupo</th>
                                <th scope="col">Publicacion</th>
                                {/* <th scope="col">Opciones</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderPublicaciones()}
                            </tbody>
                        </table>
                        <h3>Comentarios</h3>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">Usuario</th>
                                <th scope="col">Comentario</th>
                                <th scope="col">Fecha</th>
                                {/* <th scope="col">Opciones</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderComentarios()}
                            </tbody>
                        </table>
                    </div>
               </div>
            </div>
        )
    }
}

export default NovelaDetail;

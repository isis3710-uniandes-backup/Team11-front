import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import iconUpdate from '../../assets/img/iconUpdate.PNG';
import iconDelete from '../../assets/img/iconDelete.PNG';
import {FormattedMessage} from 'react-intl';

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
                <td><a className="colorLinkCont" href={el.texto}>{el.titulo}</a></td>
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

    formatDate=(date)=> {
      var monthNames = [
        "01", "02", "03",
        "04", "05", "06", "07",
        "08", "09", "10",
        "11", "12"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
      var hour = date.getHours();
      var minute = date.getMinutes();

      return day + '/' + monthNames[monthIndex] + '/' + year+ ' '+hour+":"+minute;
    }

    postComment=()=>{

        let id=parseInt(document.getElementById('commentIdInput').value);
        let comment=document.getElementById('commentInput').value;
        let fech = new Date();
        let cap={
            id:id,
            novela:this.state.novela.id,
            estrellas:4.5,
            usuario:1,
            fecha:this.formatDate(fech),
            comentario:comment
        }

        axios.post('http://localhost:3001/Comentarios',cap);
    }

    render() {
        return (
            <div role="contentinfo">
               <div className="row">
                    <div className="inline col-4 marg-top-5vw">
                        <img alt="portada" src={this.state.novela.imagen}></img>
                        <h3><FormattedMessage id="Authors"/></h3>
                          {this.renderAutores()}
                        <h3><FormattedMessage id="Genres"/> </h3>
                          {this.renderGeneros()}
                    </div>
                    <div className="inline col-8 marg-top-5vw">
                        <h2>{this.state.novela.titulo}</h2>
                        <h3><FormattedMessage id="Description"/> </h3>
                        <p className="col-12">{this.state.novela.descripcion}</p>
                        <h3><FormattedMessage id="Recomendations"/> </h3>
                        <div className="colorLinkCont">
                        {this.renderRecomedaciones()}
                        </div>
                        <h3><FormattedMessage id="Publications"/> </h3>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col"><FormattedMessage id="DateEntry"/></th>
                                <th scope="col"><FormattedMessage id="GroupEntry"/></th>
                                <th scope="col"><FormattedMessage id="PublicationEntry"/></th>
                                {/* <th scope="col">Opciones</th> */}
                                </tr>
                            </thead>
                            <tbody className="colorLinkCont">
                                {this.renderPublicaciones()}
                            </tbody>
                        </table>
                        <h3><FormattedMessage id="Comments"/></h3>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col"><FormattedMessage id="User"/></th>
                                <th scope="col"><FormattedMessage id="Comments"/></th>
                                <th scope="col"><FormattedMessage id="DateEntry"/></th>
                                {/* <th scope="col">Opciones</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderComentarios()}
                            </tbody>
                        </table>
                        <form className="marg-bot-2vw">
                            <input aria-label="id2" type="text" id="commentIdInput" placeholder="id del comentario"/>
                            <input  aria-label="nombre2" type="textarea" id="commentInput" placeholder="comentario"/>
                            <button className="btn btn-info btnz" onClick={this.postComment}><FormattedMessage id="Publish"/></button>
                        </form>
                    </div>
               </div>
            </div>
        )
    }
}

export default NovelaDetail;

import React from 'react';
import axios from 'axios';
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
    componentWillUpdate(nextProps,nextState){
        localStorage.setItem('novelaDetail',JSON.stringify(nextState.novela));
        localStorage.setItem('autoresDetail',JSON.stringify(nextState.autores));
        localStorage.setItem('generosDetail',JSON.stringify(nextState.generos));
        localStorage.setItem('recomendacionesDetail',JSON.stringify(nextState.recomendaciones));
        localStorage.setItem('publicacionesDetail',JSON.stringify(nextState.publicaciones));
        localStorage.setItem('gruposDetail',JSON.stringify(nextState.grupos));
        localStorage.setItem('comentariosDetail',JSON.stringify(nextState.comentarios));
        localStorage.setItem('usuariosDetail',JSON.stringify(nextState.usuarios));
    }


    componentDidMount() {
        /**
         *                         novela:{},
                        autores:[],
                        generos:[],
                        recomendaciones:[],
                        novelas:[],
                        publicaciones:[],
                        grupos:[],
                        comentarios:[],
                        usuarios:[]
         */
        if(localStorage.getItem('usuariosDetail')&&localStorage.getItem('comentariosDetail')&&localStorage.getItem('gruposDetail')&&localStorage.getItem('publicacionesDetail')&&localStorage.getItem('novelasDetail')&&localStorage.getItem('recomendacionesDetail')&&localStorage.getItem('generosDetail')&&localStorage.getItem('autoresDetail')&&localStorage.getItem('novelaDetail')){
            this.setState({ novela: JSON.parse(localStorage.getItem('novelaDetail')) });
            this.setState({ autores: JSON.parse(localStorage.getItem('autoresDetail')) });
            this.setState({ generos: JSON.parse(localStorage.getItem('generosDetail')) });
            this.setState({ recomendaciones: JSON.parse(localStorage.getItem('recomendacionesDetail')) });
            this.setState({ publicaciones: JSON.parse(localStorage.getItem('publicacionesDetail')) });
            this.setState({ grupos: JSON.parse(localStorage.getItem('gruposDetail')) });
            this.setState({ comentarios: JSON.parse(localStorage.getItem('comentariosDetail')) });
            this.setState({ usuarios: JSON.parse(localStorage.getItem('usuariosDetail')) });
        }
        else{
            axios.get('https://backwebteam11.herokuapp.com/Novelas/'+this.props.match.params.idNovela)
            .then((response) => {
                this.setState({novela:response.data});
            });
        axios.get('https://backwebteam11.herokuapp.com/autores/')
            .then((response) => {
                this.setState({autores:response.data});
            });
        axios.get('https://backwebteam11.herokuapp.com/generos/')
            .then((response) => {
                this.setState({generos:response.data});
            });
        axios.get('https://backwebteam11.herokuapp.com/recomendaciones/')
            .then((response) => {
                this.setState({recomendaciones:response.data});
            });
        axios.get('https://backwebteam11.herokuapp.com/novelas/')
            .then((response) => {
                this.setState({novelas:response.data});
            });
        axios.get('https://backwebteam11.herokuapp.com/Capitulos/')
            .then((response) => {
                this.setState({publicaciones:response.data});
            });
        axios.get('https://backwebteam11.herokuapp.com/Fansubs/')
            .then((response) => {
                this.setState({grupos:response.data});
            });
        axios.get('https://backwebteam11.herokuapp.com/Comentarios/')
            .then((response) => {
                this.setState({comentarios:response.data});
            });
            let tok =localStorage.getItem('token'); 
            if(tok){
                axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
            }
        axios.get('https://backwebteam11.herokuapp.com/Usuarios/')
            .then((response) => {
                this.setState({usuarios:response.data});
            });
        }
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
            usuario:parseInt(localStorage.getItem('userid')),
            fecha:this.formatDate(fech),
            comentario:comment
        }
        let tok =localStorage.getItem('token'); 
        if(tok){
            axios.defaults.headers.common['Authorization'] = 
                    'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        }axios.post('https://backwebteam11.herokuapp.com/Comentarios',cap).then(res=>{
            localStorage.removeItem('comentariosDetail');
        });
    }

    render() {
        let tabla ="";
        console.log(this.state.usuarios);
        if(this.state.usuarios.length>0){
            tabla=(                        <table className="table">
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
        </table>);
        }
        return (
            <div role="contentinfo">
               <div className="row">
                    <div className="inline col-4 marg-top-5vw">
                        <img alt="portada" src={this.state.novela.imagen}></img>
                        <h2><FormattedMessage id="Authors"/></h2>
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
                        <h3 hidden={tabla===""}><FormattedMessage id="Comments"/></h3>
                        {tabla}
                        <form className="marg-bot-2vw" hidden={tabla===""}>
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

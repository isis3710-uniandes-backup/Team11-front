import React, {Component} from 'react';
import perfilImage from '../../assets/img/user.png'
import axios from 'axios'

class Perfil extends Component {

    constructor(props){
        super(props);
        this.state={
            user:{},
            grupos:[],
            grupo:"",
            novelas:[],
            listas:[]
        }
    }

    elemList=(el)=>{
        let novelas=[];
        for(let i =0; i<el.novelas.length;i++){
            this.state.novelas.forEach((elem)=>{
                if(elem.id===el.novelas[i]){
                    novelas.push(elem);
                }
            });
        }
        return (<div key={"llave"+el.id} className="card">
        <div className="card-header" id={"heading"+el.id}>
        <h5 className="mb-0">
            <button className="btn btn-link" data-toggle="collapse" data-target={"#collapse"+el.id} aria-expanded="true" aria-controls={"collapse"+el.id}>
                {el.titulo}
            </button>
        </h5>
        </div>

        <div id={"collapse"+el.id} className="collapse " aria-labelledby={"heading"+el.id} data-parent="#accordion">
        <div className="card-body">
            <table className="table table-striped">
                <tbody>
                    {novelas.map((elem)=><tr><td>{elem.titulo}</td></tr>)}
                </tbody>
            </table>
        </div>
        </div>
    </div>);
    }
    elemListFavoritos=()=>{
        let novelas=[];
        this.state.novelas.forEach((elem)=>{
            if(this.state.user.favoritos.includes(elem.id)){
                novelas.push(elem);
            }
        });
        console.log(this.state.user.favoritos);
        return (<div>
                    <table className="table table-striped">
                        <tbody>
                                {novelas.map((elem)=><tr><td>{elem.titulo}</td></tr>)}
                        </tbody>
                    </table>
                </div>);
    }

    componentDidMount(){
        axios.get('http://localhost:3001/Fansubs/')
        .then((response) => {
            var group = response.data;
            this.setState({grupos:group});
        });
        axios.get('http://localhost:3001/Usuarios/1')
        .then((response) => {
            var user = response.data;
            this.setState({user:user});
            user.playlists.forEach((el)=>{
                axios.get('http://localhost:3001/Playlists/'+el)
                .then((response) => {
                    var playlist = response.data;
                    var playlists=[...this.state.listas];
                    playlists.push(playlist);
                    this.setState({listas:playlists});     
                });
                
            });
        });
        axios.get('http://localhost:3001/Novelas/')
        .then((response) => {
            var novelas = response.data;
            this.setState({novelas:novelas});
        });

    }

    render() {
        let buttonGrupo1=(
            <div className="row">
                <p>
                    Grupo:
                </p>
                <select className="col-4 form-control" id="selectGenero">
                    <option value=""> </option>
                    {this.state.grupos.map((el)=><option value={el.id} key={el.id}>{el.nombre}</option>)}
                </select>
                <button type="button" className="btn btn-info">Unirse</button>   
            </div>
        );
        let buttonGrupo2=(
            <div className="text-left">
                <button type="button" className="btn btn-info">Crear</button>   
                <p color="red">Se necesita estar en un grupo para publicar releases</p>
            </div>
        );
        if(this.state.grupo!==""){
            buttonGrupo1=(
                <div className="row">
                    <p> 
                        Grupo: {this.state.grupo}
                    </p>
                    <button type="button" className="btn btn-info">Salir</button>   
                </div>  
            );
            buttonGrupo2=(
                <div className="text-left">
                    <button type="button" className="btn btn-info">Publicar release</button>   
                </div>
            );
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <img src={perfilImage} height="200px"/>
                    </div>
                    <div className="col-9">
                        <h4 className="text-left">Usuario Global</h4>
                        {buttonGrupo1}
                        {buttonGrupo2}
                        <div className="row"> 
                            <h5>Mis Listas:</h5>
                            <button type="button" className="btn btn-default" aria-label="Left Align">
                                <span className="glyphicon glyphicon-align-left" aria-hidden="true"></span>
                            </button>
                        </div>
                        <div className=" col-9 row"> 
                            <div className="col-12" id="accordion1">
                                {this.state.listas.map((el)=>this.elemList(el))}
                            </div>
                        </div>
                        <div className="row"> 
                            <h5>favoritos:</h5>
                            <button type="button" className="btn btn-default" aria-label="Left Align">
                                <span className="glyphicon glyphicon-align-left" aria-hidden="true"></span>
                            </button>
                        </div>
                        <div className=" col-9 row"> 
                            <div className="col-12" id="accordion2">
                                {this.elemListFavoritos()}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

};

export default Perfil;
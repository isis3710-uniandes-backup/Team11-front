import React, {Component} from 'react';
import perfilImage from '../../assets/img/user.png'
import axios from 'axios'
import iconUpdate from '../../assets/img/iconUpdate.PNG';
import iconDelete from '../../assets/img/iconDelete.PNG';

class Perfil extends Component {

    constructor(props){
        super(props);
        this.state={
            user:{},
            grupos:[],
            grupo:"",
            novelas:[],
            listas:[],
            actualList:{}
        }
    }

    deleteListaNovela=(idList,idNov)=>{
        let idBus=this.state.listas.findIndex((el)=>el.id===idList);
        let list=this.state.listas[idBus];
        for(let i =0;i<list.novelas.length;i++){
            if(list.novelas[i]===idNov){
                list.novelas.splice(i,1);
            }
        }
        axios.put('http://localhost:3001/Playlists/'+idList,list);
    }
    putListaNovela=()=>{
        let idNovela=parseInt(document.getElementById('selectNovelas').value);
        let list={...this.state.actualList};
        if(!list.novelas.includes(idNovela)){
            list.novelas.push(idNovela);
        }
        axios.put('http://localhost:3001/Playlists/'+list.id,list);
    }

    cambiarActual=(list)=>{
        this.setState({actualList:list});
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
            <button onClick={()=>this.cambiarActual(el)} type="button" className="btn btn-outline-success" data-toggle="collapse" data-target="#addNovelaForm" aria-label="Left Align">
                Agregar novela
            </button>
        </h5>
        </div>

        <div id={"collapse"+el.id} className="collapse " aria-labelledby={"heading"+el.id} data-parent="#accordion">
        <div className="card-body">
            <table className="table table-striped">
                <tbody>
                    {novelas.map((elem)=><tr><td><a href={"/novelas/"+elem.id}>{elem.titulo}</a>
                    <button onClick={()=>this.deleteListaNovela(el.id,elem.id)}><a href=""><img src={iconDelete}></img></a></button>
                    </td></tr>)}
                </tbody>
            </table>
        </div>
        </div>
    </div>);
    }
    elemListFavoritos=()=>{
        let novelas=[];
        this.state.novelas.forEach((elem)=>{
            if(this.state.user.favoritos!==undefined){
                if(this.state.user.favoritos.includes(elem.id)){
                    novelas.push(elem);
                }
            }
        });
        return (<div>
                    <table className="table table-striped">
                        <tbody>
                                {novelas.map((elem)=><tr><td>
                                    <a href={"/novelas/"+elem.id}>{elem.titulo}</a>
                                    <a href=""><button onClick={()=>this.deleteFavorito(elem.id)}><img src={iconDelete}></img></button></a>
                                    </td></tr>)}
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

    postLista=()=>{
        let listname=document.getElementById('listNameInput').value;
        let listid=parseInt(document.getElementById('listIdInput').value);
        let list={
            id:listid,
            titulo:listname,
            tipo:1,
            descripcion:"listalista",
            anioCreacion:2019,
            novelas:[]
            };
        axios.post('http://localhost:3001/Playlists',list);
        let user={...this.state.user};
        user.playlists.push(listid);
        axios.put('http://localhost:3001/Usuarios/'+user.id,user);
    }

    deleteFavorito=(idNov)=>{
        let user=this.state.user;
        for(let i =0;i<user.favoritos.length;i++){
            if(user.favoritos[i]===idNov){
                
                user.favoritos.splice(i,1);
            }
        }
        axios.put('http://localhost:3001/Usuarios/'+user.id,user);
    }

    addFavorito=()=>{
        let user=this.state.user;
        let idNov=parseInt(document.getElementById('selectNovelas2').value);
        console.log(user,idNov);
        if(!user.favoritos.includes(idNov)){
            user.favoritos.push(idNov);
        }
        axios.put('http://localhost:3001/Usuarios/'+user.id,user);
    }

    createGrupo=()=>{
        let groupName=document.getElementById('groupNameInput').value;
        let groupId=parseInt(document.getElementById('groupIdInput').value);
        let groupUrl=document.getElementById('groupUrlInput').value;
        let grupo={
            id:groupId,
            nombre:groupName,
            url:groupUrl,
            novelas:[]
        }
        axios.post('http://localhost:3001/Fansubs',grupo);
        let user = this.state.user;
        user.grupo=groupId;
        axios.put('http://localhost:3001/Usuarios/'+user.id,user);
    }

    exitGrupo=()=>{
        let user = this.state.user;
        user.grupo=-1;
        axios.put('http://localhost:3001/Usuarios/'+user.id,user);
    }

    unirseGrupo=()=>{
        let user = this.state.user;
        user.grupo=parseInt(document.getElementById('selectGrupo').value);
        axios.put('http://localhost:3001/Usuarios/'+user.id,user);
    }

    render() {
        let buttonGrupo1=(
            <div className="row">
                <p>
                    Grupo:
                </p>
                <select className="col-4 form-control" id="selectGrupo">
                    <option value=""> </option>
                    {this.state.grupos.map((el)=><option value={el.id} key={el.id}>{el.nombre}</option>)}
                </select>
                <a href=""><button type="button" onClick={this.unirseGrupo} className="btn btn-info">Unirse</button></a>   
            </div>
        );
        let buttonGrupo2=(
            <div className="text-left">
                <button type="button" className="btn btn-info" data-toggle="collapse" data-target="#createGroupForm">Crear</button>   
                <div className="collapse" id="createGroupForm">
                    <form>
                        <input type="text" id="groupIdInput" placeholder="id del grupo"/>
                        <input type="text" id="groupNameInput" placeholder="nombre de grupo"/>
                        <input type="text" id="groupUrlInput" placeholder="url de grupo"/>
                        <button className="btn btn-info" onClick={this.createGrupo}>Agregar Lista</button>
                    </form>
                </div>
                <p color="red">Se necesita estar en un grupo para publicar releases</p>
            </div>
        );
        let idBus = this.state.grupos.findIndex((el)=>el.id===this.state.user.grupo);
        console.log(idBus,this.state.user);
        let nombreGrupo="";
        if(idBus>-1){
             nombreGrupo=this.state.grupos[idBus].nombre;
        }
        if(this.state.user.grupo>-1){
            buttonGrupo1=(
                <div className="row">
                    <p> 
                        Grupo: {nombreGrupo}
                    </p>
                    <a href=""><button type="button" onClick={this.exitGrupo} className="btn btn-info">Salir</button></a>   
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
                            <button type="button" className="btn btn-outline-success" data-toggle="collapse" data-target="#addListaForm" aria-label="Left Align">
                                Crear Lista
                            </button>
                        </div>
                        <div className="collapse" id="addListaForm">
                            <form>
                                <input type="text" id="listIdInput" placeholder="id de lista"/>
                                <input type="text" id="listNameInput" placeholder="nombre de Lista"/>
                                <button className="btn btn-info" onClick={this.postLista}>Agregar Lista</button>
                            </form>
                        </div>
                        <div className="collapse" id="addNovelaForm">
                            <form>
                                <select id="selectNovelas">
                                    {this.state.novelas.map((el)=><option key={el.titulo} value={el.id}>{el.titulo}</option>)}
                                </select>
                                <button className="btn btn-info" onClick={this.putListaNovela}>Agregar Novela a {this.state.actualList.titulo}</button>
                            </form>
                        </div>
                        <div className=" col-9 row"> 
                            <div className="col-12" id="accordion1">
                                {this.state.listas.map((el)=>this.elemList(el))}
                            </div>
                        </div>
                        <div className="row"> 
                            <h5>favoritos:</h5>
                            <button type="button" className="btn btn-outline-success" data-toggle="collapse" data-target="#addFavoritoForm" aria-label="Left Align">
                                Agregar favorito
                            </button>
                        </div>
                        <div className="collapse" id="addFavoritoForm">
                            <form>
                                <select id="selectNovelas2">
                                    {this.state.novelas.map((el)=><option key={el.titulo} value={el.id}>{el.titulo}</option>)}
                                </select>
                                <button className="btn btn-info" onClick={this.addFavorito}>Agregar Novela a Favoritos</button>
                            </form>
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
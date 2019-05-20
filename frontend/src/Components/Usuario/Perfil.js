import React, {Component} from 'react';
import perfilImage from '../../assets/img/user.png'
import axios from 'axios'
import iconDelete from '../../assets/img/iconDelete.PNG';
import {FormattedMessage} from 'react-intl';

class Perfil extends Component {

    constructor(props){
        super(props);
        this.state={
            user:{},
            grupos:[],
            grupo:"",
            novelas:[],
            listas:[],
            actualList:{},
            textId:"",
            errorText:""
        }
        console.log(this.props);
        if(this.props.ADMIN){
            window.location="/";
        }
    }

    componentWillUpdate(nextProps,nextState){
        localStorage.setItem('user',JSON.stringify(nextState.user));
        localStorage.setItem('grupos',JSON.stringify(nextState.grupos));
        localStorage.setItem('novelas',JSON.stringify(nextState.novelas));
        localStorage.setItem('listas',JSON.stringify(nextState.listas));
        localStorage.setItem('actualList',JSON.stringify(nextState.actualList));
        localStorage.setItem('textId',JSON.stringify(nextState.textId));
        localStorage.setItem('errorText',JSON.stringify(nextState.errorText));
        localStorage.setItem('grupo',JSON.stringify(nextState.grupo));

    }

    deleteListaNovela=(idList,idNov)=>{
        let idBus=this.state.listas.findIndex((el)=>el.id===idList);
        let list=this.state.listas[idBus];
        for(let i =0;i<list.novelas.length;i++){
            if(list.novelas[i]===idNov){
                list.novelas.splice(i,1);
            }
        }
        axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        axios.put('https://backwebteam11.herokuapp.com/Playlists/'+idList, list);
    }
    putListaNovela=(event)=>{
        event.preventDefault();
        let idNovela=parseInt(document.getElementById('selectNovelas').value);
        let list={...this.state.actualList};
        if(!list.novelas.includes(idNovela)){
            list.novelas.push(idNovela);
        }
        axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        axios.put('https://backwebteam11.herokuapp.com/Playlists/'+list.id,list).then(prueb=>{
                window.location.reload();});
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
        <h3 className="mb-0">
            <button className="btn btn-link btnz" data-toggle="collapse" data-target={"#collapse"+el.id} aria-expanded="true" aria-controls={"collapse"+el.id}>
                {el.titulo}
            </button>
            <button onClick={()=>this.cambiarActual(el)} type="button" className="btn btn-outline-success btnz" data-toggle="collapse" data-target="#addNovelaForm" aria-label="Left Align">
                <FormattedMessage id="AddNovel"/>
            </button>
        </h3>
        </div>

        <div id={"collapse"+el.id} className="collapse " aria-labelledby={"heading"+el.id} data-parent="#accordion">
        <div className="card-body">
            <table className="table table-striped">
                <tbody>
                    {novelas.map((elem)=><tr key={elem.id}><td ><a className="linkNv" href={"/novelas/"+elem.id}>{elem.titulo}</a>
                    <button onClick={()=>this.deleteListaNovela(el.id,elem.id)}><a href=""><img aria-label="delete"src={iconDelete}></img></a></button>
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
                                {novelas.map((elem)=><tr key={elem.id}><td>
                                    <a className="linkNv" href={"/novelas/"+elem.id}>{elem.titulo}</a>
                                    <a href=""><button onClick={()=>this.deleteFavorito(elem.id)}><img aria-label="delete" src={iconDelete}></img></button></a>
                                    </td></tr>)}
                        </tbody>
                    </table>
                </div>);
    }

    componentDidMount(){
        /**             user:{},
            grupos:[],
            grupo:"",
            novelas:[],
            listas:[],
            actualList:{},
            textId:"",
            errorText:"" */
        if (localStorage.getItem('errorText')&&localStorage.getItem('textId')&&localStorage.getItem('actualList')&&localStorage.getItem('listas')&&localStorage.getItem('novelas')&&localStorage.getItem('grupo')&&localStorage.getItem('user')&&localStorage.getItem('grupos')) {
            console.log('t');
            this.setState({ user: JSON.parse(localStorage.getItem('user')) });
            this.setState({ grupos: JSON.parse(localStorage.getItem('grupos')) });
            this.setState({ grupo: JSON.parse(localStorage.getItem('grupo')) });
            this.setState({ novelas: JSON.parse(localStorage.getItem('novelas')) });
            this.setState({ listas: JSON.parse(localStorage.getItem('listas')) });
            this.setState({ actualList: JSON.parse(localStorage.getItem('actualList')) });
            this.setState({ textId: JSON.parse(localStorage.getItem('textId')) });
            this.setState({ errorText: JSON.parse(localStorage.getItem('errorText')) });

        }
        else{
            axios.get('https://backwebteam11.herokuapp.com/Fansubs/')
            .then((response) => {
                var group = response.data;
                this.setState({grupos:group});
            });
            axios.defaults.headers.common['Authorization'] = 
                                    'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
            axios.get('https://backwebteam11.herokuapp.com/Usuarios/'+this.props.userid)
            .then((response) => {
                var user = response.data;
                this.setState({user:user});
                user.playlists.forEach((el)=>{
                    axios.get('https://backwebteam11.herokuapp.com/Playlists/'+el)
                    .then((response) => {
                        var playlist = response.data;
                        var playlists=[...this.state.listas];
                        playlists.push(playlist);
                        this.setState({listas:playlists});
                    });
    
                });
            });
            axios.get('https://backwebteam11.herokuapp.com/Novelas/')
            .then((response) => {
                var novelas = response.data;
                this.setState({novelas:novelas});
            });
        }
    }

    postLista=(event)=>{
        event.preventDefault();
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
        axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        axios.post('https://backwebteam11.herokuapp.com/Playlists',list);
        let user1={...this.state.user};
        user1.playlists.push(listid);
        var play = this.state.listas;
        play.push(list);
        axios.put('https://backwebteam11.herokuapp.com/Usuarios/'+user1.id,user1).then(prueb=>{
                this.setState({user:user1,listas:play})
                window.location.reload();});
    }

    deleteFavorito=(idNov)=>{
        let user=this.state.user;
        for(let i =0;i<user.favoritos.length;i++){
            if(user.favoritos[i]===idNov){

                user.favoritos.splice(i,1);
            }
        }
        axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        axios.put('https://backwebteam11.herokuapp.com/Usuarios/'+user.id,user);
    }

    addFavorito=()=>{
        let user=this.state.user;
        let idNov=parseInt(document.getElementById('selectNovelas2').value);
        if(!user.favoritos.includes(idNov)){
            user.favoritos.push(idNov);
        }
        axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        axios.put('https://backwebteam11.herokuapp.com/Usuarios/'+user.id,user);
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
        let user = this.state.user;
        user.grupo=groupId;
        axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        axios.post('https://backwebteam11.herokuapp.com/Fansubs',grupo);
        axios.put('https://backwebteam11.herokuapp.com/Usuarios/'+user.id,user);
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
    postRelease=()=>{
        let releaseName=document.getElementById('releaseNameInput').value;
        let releaseId=parseInt(document.getElementById('releaseIdInput').value);
        let releaseUrl=document.getElementById('releaseUrlInput').value;
        let fech = new Date();
        let cap={
            id:releaseId,
            titulo:releaseName,
            texto:releaseUrl,
            novela:parseInt(document.getElementById('selectNovelas3').value),
            fansub:this.state.user.grupo,
            fecha:this.formatDate(fech)
        }
        axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        axios.post('https://backwebteam11.herokuapp.com/Capitulos',cap);
    }



    exitGrupo=()=>{
        let user = this.state.user;
        user.grupo=-1;
        axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        axios.put('https://backwebteam11.herokuapp.com/Usuarios/'+user.id,user);
    }

    unirseGrupo=()=>{
        let user = this.state.user;
        user.grupo=parseInt(document.getElementById('selectGrupo').value);
        axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        axios.put('https://backwebteam11.herokuapp.com/Usuarios/'+user.id,user);
    }

    changeHandler=(data)=>{
      let errorText=""
      if(isNaN(data.currentTarget.value)){
          errorText="Asigne un id numerico"
      }
      this.setState({textId:data.currentTarget.value,
                      errorText:errorText});
    }

    render() {
        let buttonGrupo1=(
            <div className="row">
                <p>
                    <FormattedMessage id="Group"/>:
                </p>
                <select aria-label="selectgrupo" className="col-4 form-control" id="selectGrupo">
                    <option value=""> </option>
                    {this.state.grupos.map((el)=><option value={el.id} key={el.id}>{el.nombre}</option>)}
                </select>
                <a href=""><button type="button" onClick={this.unirseGrupo} className="btn btn-info btnz"><FormattedMessage id="Join"/></button></a>
            </div>
        );
        let buttonGrupo2=(
            <div className="text-left">
                <button type="button" className="btn btn-info btnz" data-toggle="collapse" data-target="#createGroupForm"><FormattedMessage id="Create"/></button>
                <div className="collapse" id="createGroupForm">
                    <form>
                        <input aria-label="id2" type="text" id="groupIdInput" placeholder="id del grupo"/>
                        <input  aria-label="nombre2" type="text" id="groupNameInput" placeholder="nombre de grupo"/>
                        <input aria-label="url2" type="text" id="groupUrlInput" placeholder="url de grupo"/>
                        <button className="btn btn-info btnz" onClick={this.createGrupo}><FormattedMessage id="AddList"/></button>
                    </form>
                </div>
                <p color="red"><FormattedMessage id="GroupMessage"/></p>
            </div>
        );
        let idBus = this.state.grupos.findIndex((el)=>el.id===this.state.user.grupo);
        let nombreGrupo="";
        if(idBus>-1){
             nombreGrupo=this.state.grupos[idBus].nombre;
        }
        if(this.state.user.grupo>-1){
            buttonGrupo1=(
                <div className="row marg-bot-2vw">
                    <div className="col-md-4 align-middle">
                    <p>
                        <FormattedMessage id="Group"/>: {nombreGrupo}
                    </p>
                    </div>
                    <a href=""><button type="button" onClick={this.exitGrupo} className="btn btn-info btnz"><FormattedMessage id="Exit"/></button></a>
                </div>
            );
            buttonGrupo2=(
                <div className="text-left marg-bot-2vw">
                    <button type="button" className="btn btn-info btnz" data-toggle="collapse" data-target="#PublishReleaseForm" aria-label="Left Align"><FormattedMessage id="PublishRelease"/></button>
                    <div className="collapse" id="PublishReleaseForm">
                        <form>
                            <select aria-label="select3" id="selectNovelas3">
                                {this.state.novelas.map((el)=><option key={el.titulo} value={el.id}>{el.titulo}</option>)}
                            </select>
                            <input aria-label="id" onChange={this.changeHandler} type="text" id="releaseIdInput" placeholder="id de release" value={this.state.textId}/>
                            <input aria-label="nombre" type="text" id="releaseNameInput" placeholder="nombre de release"/>
                            <input aria-label="nombre" type="text" id="releaseUrlInput" placeholder="url de release"/>
                            <button className="btn btn-info btnz" onClick={this.postRelease}><FormattedMessage id="PublishRelease"/></button>
                        </form>
                        <p className="posErr">{this.state.errorText}</p>
                    </div>
                </div>
            );
        }
        return (
            <div role="contentinfo" className="container">
                <div className="row">
                    <div className="col-3 marg-top-5vw">
                        <img aria-label="image" src={perfilImage} height="200px"/>
                    </div>
                    <div className="col-9 marg-top-5vw">
                        <h2 className="text-left">{this.state.user.nombre}</h2>
                        {buttonGrupo1}
                        {buttonGrupo2}
                        <div className="row marg-bot-2vw">
                            <h3><FormattedMessage id="MyLists"/>:</h3>
                            <button type="button" className="btn btn-outline-success btnz" data-toggle="collapse" data-target="#addListaForm" aria-label="Left Align">
                                <FormattedMessage id="CreateList"/>
                            </button>
                        </div>
                        <div className="collapse marg-bot-2vw" id="addListaForm">
                            <form>
                                <input aria-label="id" type="text" id="listIdInput" placeholder="id de lista"/>
                                <input aria-label="nombre" type="text" id="listNameInput" placeholder="nombre de Lista"/>
                                <button className="btn btn-info btnz" onClick={this.postLista}><FormattedMessage id="AddList"/></button>
                            </form>
                        </div>
                        <div className="collapse marg-bot-2vw" id="addNovelaForm">
                            <form>
                                <select aria-label="select1" id="selectNovelas">
                                    {this.state.novelas.map((el)=><option key={el.titulo} value={el.id}>{el.titulo}</option>)}
                                </select>
                                <button className="btn btn-info btnz" onClick={this.putListaNovela}><FormattedMessage id="AddNovelTo"/> {this.state.actualList.titulo}</button>
                            </form>
                        </div>
                        <div className="col-9 row marg-bot-2vw">
                            <div className="col-12" id="accordion1">
                                {this.state.listas.map((el)=>this.elemList(el))}
                            </div>
                        </div>
                        <div className="row marg-bot-2vw">
                            <h3><FormattedMessage id="Favorites"/>:</h3>
                            <button type="button" className="btn btn-outline-success btnz" data-toggle="collapse" data-target="#addFavoritoForm" aria-label="Left Align">
                                <FormattedMessage id="AddFavorite"/>
                            </button>
                        </div>
                        <div className="collapse" id="addFavoritoForm">
                            <form>
                                <select aria-label="select2" id="selectNovelas2">
                                    {this.state.novelas.map((el)=><option key={el.titulo} value={el.id}>{el.titulo}</option>)}
                                </select>
                                <button className="btn btn-info btnz" onClick={this.addFavorito}><FormattedMessage id="AddNovelToFavorites"/></button>
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

import React from 'react';
import axios from 'axios'
import {FormattedMessage} from 'react-intl';

class AdminUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        usuarios:[],
                        grupos:[],
                        actualUser:{}
                    };
    }

    cambiarActual=(user)=>{
        this.setState({actualUser:user});
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);        
        axios.get('http://localhost:3001/Usuarios')
            .then((response) => {
                var state = this.state;
                var usuarios = response.data;
                state.usuarios=usuarios;
                this.setState(state);
            });
        axios.get('http://localhost:3001/Fansubs')
            .then((response) => {
                var state = this.state;
                var grupos = response.data;
                state.grupos=grupos;
                this.setState(state);
            });
    }

    rendUsuarios=()=>{
        let rows=this.state.usuarios.map((el,i)=>{
            let indexGrupo=this.state.grupos.findIndex((elem)=>el.grupo===elem.id);
            let nombreGrupo=indexGrupo>-1?this.state.grupos[indexGrupo].nombre:'Sin grupo'
            return(
                <tr key={i}>
                    <th scope="row">{i}</th>
                    <td>{el.nombre}</td>
                    <td>{nombreGrupo}</td>
                    <td>
                        <button onClick={()=>this.cambiarActual(el)} className="btn btn-outline-success btnz" type="button" data-toggle="collapse" data-target="#editForm"><FormattedMessage id="Edit"/></button>
                    </td>
                    <td>
                        <form>
                            <a href="" onClick={()=>this.deleteUsuario(el.id)} className="btn btn-outline-success btnz" type="button" ><FormattedMessage id="Delete"/></a>
                        </form>
                    </td>
                </tr>
            );
        });
        return rows;
    }

    postUsuario=()=>{
        let username=document.getElementById('usernameInput').value;
        let userid=parseInt(document.getElementById('idInput').value);
        let user={
            id:userid,
            nombre:username,
            playlists:[],
            favoritos:[],
            grupo:-1
        }
        axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);        
        axios.post('http://localhost:3001/Usuarios',user);
    }

    putUsuario=()=>{
        let username=document.getElementById('editUsernameInput').value;
        let user={...this.state.actualUser};
        user.nombre=username;
        axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);        
        axios.put('http://localhost:3001/Usuarios/'+user.id,user);
    }

    deleteUsuario=(idUser)=>{
        axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);        
        axios.delete('http://localhost:3001/Usuarios/'+idUser);
    }

    render() {
        return (
            <div className="heightWeb" role="contentinfo">
                <h1><FormattedMessage id="ListUsersAdmin"/></h1>
                <button className="btn btn-info btnz" type="button" data-toggle="collapse" data-target="#addForm"><FormattedMessage id="AddAdmin"/></button>
                <div className="collapse" id="addForm">
                    <form>
                        <input aria-label="userid" type="text" id="idInput" placeholder="id de usuario"/>
                        <input aria-label="username" type="text" id="usernameInput" placeholder="nombre de usuario"/>
                        <button className="btn btn-info btnz" onClick={this.postUsuario}><FormattedMessage id="AddAdmin"/></button>
                    </form>
                </div>
                <div className="collapse" id="editForm">
                    <form>
                        <p><FormattedMessage id="EditUserofId"/>: {this.state.actualUser.id}</p>
                        <input type="text" id="editUsernameInput" placeholder={this.state.actualUser.nombre}/>
                        <button className="btn btn-info btnz" onClick={this.putUsuario}><FormattedMessage id="EditAdmin"/></button>
                    </form>
                </div>
                <div className="row">
                    <div className="col-md-1"/>
                    <div className="col-md-10">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col"><FormattedMessage id="User"/></th>
                                <th scope="col"><FormattedMessage id="Group"/></th>
                                <th scope="col"><FormattedMessage id="Edit"/></th>
                                <th scope="col"><FormattedMessage id="Delete"/></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.rendUsuarios()}
                        </tbody>
                    </table>
                    </div>
                    <div className="col-md-1"/>
                </div>
            </div>
        )
    }
}

export default AdminUsers;

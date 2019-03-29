import React from 'react';
import axios from 'axios'
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
                        <button onClick={()=>this.cambiarActual(el)} className="btn btn-outline-success" type="button" data-toggle="collapse" data-target="#editForm">Editar</button>
                    </td>
                    <td>
                        <form>
                            <a href="" onClick={()=>this.deleteUsuario(el.id)} className="btn btn-outline-success" type="button" >Borrar</a>
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
        axios.post('http://localhost:3001/Usuarios',user);
    }

    putUsuario=()=>{
        let username=document.getElementById('editUsernameInput').value;
        let user={...this.state.actualUser};
        user.nombre=username;
        axios.put('http://localhost:3001/Usuarios/'+user.id,user);
    }

    deleteUsuario=(idUser)=>{
        axios.delete('http://localhost:3001/Usuarios/'+idUser);
    }

    render() {
        return (
            <div>
                <h1>Lista Usuarios</h1>
                <button className="btn btn-info" type="button" data-toggle="collapse" data-target="#addForm">Añadir</button>
                <div className="collapse" id="addForm">
                    <form>
                        <input type="text" id="idInput" placeholder="id de usuario"/>
                        <input type="text" id="usernameInput" placeholder="nombre de usuario"/>
                        <button className="btn btn-info" onClick={this.postUsuario}>Agregar Usuario</button>
                    </form>
                </div>
                <div className="collapse" id="editForm">
                    <form>
                        <p>Editar usuario de id: {this.state.actualUser.id}</p>
                        <input type="text" id="editUsernameInput" placeholder={this.state.actualUser.nombre}/>
                        <button className="btn btn-info" onClick={this.putUsuario}>Editar Usuario</button>
                    </form>
                </div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Grupo</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.rendUsuarios()}
                    </tbody>
                    </table>
            </div>
        )
    }
}

export default AdminUsers;
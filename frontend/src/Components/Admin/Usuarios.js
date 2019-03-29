import React from 'react';
import axios from 'axios'
class AdminUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
                        usuarios:[],
                        grupos:[]
                    };
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
                    <td>editar</td>
                    <td>eliminar</td>
                </tr>
            );
        });
        return rows;
    }

    render() {
        return (
            <div>
                <h1>Lista Usuarios</h1>
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
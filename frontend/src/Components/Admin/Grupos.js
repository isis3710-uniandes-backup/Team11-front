import React from 'react';
import axios from 'axios'
class AdminGroups extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
                        grupos:[]
                    };
    }


    componentDidMount() {
        axios.get('http://localhost:3001/Fansubs')
            .then((response) => {
                var state = this.state;
                var grupos = response.data;
                state.grupos=grupos;
                this.setState(state);
            }); 
    }

    rendGrupos=()=>{
        let rows=this.state.grupos.map((el,i)=>{
            return(
                <tr key={i}>
                    <th scope="row">{i}</th>
                    <td>{el.nombre}</td>
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
                <h1>Lista Grupos</h1>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Grupo</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.rendGrupos()}
                    </tbody>
                    </table>
            </div>
        )
    }
}

export default AdminGroups;
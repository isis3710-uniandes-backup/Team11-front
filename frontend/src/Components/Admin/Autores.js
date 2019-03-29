import React from 'react';
import axios from 'axios'
class AdminAutor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
                        autores:[]
                    };
    }


    componentDidMount() {
        axios.get('http://localhost:3001/Autores')
            .then((response) => {
                var state = this.state;
                var autores = response.data;
                state.autores=autores;
                this.setState(state);
            }); 
    }

    rendGrupos=()=>{
        let rows=this.state.autores.map((el,i)=>{
            return(
                <tr key={i}>
                    <td scope="row">{i}</td>
                    <td>{el.nombre}</td>
                    <td>{el.idioma}</td>
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
                <h1>Lista Autores</h1>
                <button className="btn btn-info" type="button">Añadir</button>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Autor</th>
                        <th scope="col">Idioma</th>
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

export default AdminAutor;
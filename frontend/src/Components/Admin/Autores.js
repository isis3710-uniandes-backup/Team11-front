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

    postAutores=()=>{
        let autor=document.getElementById('Input').value;
        let id=parseInt(document.getElementById('idInput').value);
        let lang=document.getElementById('languageInput').value;
        let genre={id:id,nombre:autor,idioma:lang,novelas:[1,2]};
        axios.post('http://localhost:3001/Autores',genre);
    }

    render() {
        return (
            <div>
                <h1>Lista Autores</h1>
                <button className="btn btn-info" type="button" data-toggle="collapse" data-target="#addForm">Añadir</button>
                <div className="collapse" id="addForm">
                    <form>
                        <input type="text" id="idInput" placeholder="id del autor"/>
                        <input type="text" id="Input" placeholder="nombre del autor"/>
                        <input type="text" id="languageInput" placeholder="idioma del autor"/>
                        <button className="btn btn-info" onClick={this.postAutores}>Agregar autores</button>
                    </form>
                </div>
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
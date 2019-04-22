import React from 'react';
import axios from 'axios'
class AdminGenre extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
                        generos:[]
                    };
    }


    componentDidMount() {
        axios.get('http://localhost:3001/Generos')
            .then((response) => {
                var state = this.state;
                var generos = response.data;
                state.generos=generos;
                this.setState(state);
            }); 
    }

    postGeneros=()=>{
        let genero=document.getElementById('genreInput').value;
        let id=parseInt(document.getElementById('idInput').value);
        let genre={id:id,genero:genero,novelas:[]};
        axios.post('http://localhost:3001/Generos',genre);
    }
    
    rendGeneros=()=>{
        let rows=this.state.generos.map((el,i)=>{
            return(
                <tr key={i}>
                    <th scope="row">{i}</th>
                    <td>{el.genero}</td>
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
                <h1>Lista Generos</h1>
                <button className="btn btn-info btnz" type="button" data-toggle="collapse" data-target="#addForm">Añadir</button>
                <div className="collapse" id="addForm">
                    <form>
                        <input type="text" id="idInput" placeholder="id de genero"/>
                        <input type="text" id="genreInput" placeholder="nombre de genero"/>
                        <button className="btn btn-info btnz" onClick={this.postGeneros}>Agregar Genero</button>
                    </form>
                </div>
                <div className="row">
                    <div className="col-md-1"/>
                    <div className="col-md-10">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Genero</th>
                                    <th scope="col">Editar</th>
                                    <th scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.rendGeneros()}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-1"/>
                </div>
            </div>
        )
    }
}

export default AdminGenre;
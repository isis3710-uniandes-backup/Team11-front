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
                <button className="btn btn-info" type="button">Añadir</button>
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
        )
    }
}

export default AdminGenre;
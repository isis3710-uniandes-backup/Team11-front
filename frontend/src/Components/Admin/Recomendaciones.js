import React from 'react';
import axios from 'axios'
class AdminRecomm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
                        recomendaciones:[],                  
                    };
    }


    componentDidMount() {
        axios.get('http://localhost:3001/Recomendaciones')
            .then((response) => {
                var state = this.state;
                var recon = response.data;
                state.recomendaciones=recon;
                this.setState(state);
            }); 
    }

    rendRecon=()=>{
        let rows=this.state.recomendaciones.map((el,i)=>{
            return(
                <tr key={i}>
                    <th scope="row">{i}</th>
                    <td>{el.novela}</td>
                    <td>{el.novelaRecomendada}</td>
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
                <h1>Lista Recomendaciones</h1>
                <button className="btn btn-info" type="button">Añadir</button>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Novela que recomienda</th>
                        <th scope="col">Novela recomendada</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.rendRecon()}
                    </tbody>
                    </table>
            </div>
        )
    }
}

export default AdminRecomm;
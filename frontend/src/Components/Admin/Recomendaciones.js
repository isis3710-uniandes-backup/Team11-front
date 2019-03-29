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

    postRecomendacion=()=>{
        let id=parseInt(document.getElementById('idInput').value);
        let novel=parseInt(document.getElementById('Input').value);
        let novel2=parseInt(document.getElementById('Input2').value);
        let genre=    {
            id:id,
            novelaRecomendada:novel2,
            novela:novel
        };
        axios.post('http://localhost:3001/Recomendaciones',genre);
    }

    render() {
        return (
            <div>
                <h1>Lista Recomendaciones</h1>
                <button className="btn btn-info" type="button" data-toggle="collapse" data-target="#addForm">Añadir</button>
                <div className="collapse" id="addForm">
                    <form>
                        <input type="text" id="idInput" placeholder="id de recomendacion"/>
                        <input type="text" id="Input" placeholder="id de novela que recomienda"/>
                        <input type="text" id="Input2" placeholder="id de novela recomendada"/>
                        <button className="btn btn-info" onClick={this.postRecomendacion}>Agregar recomedacion</button>
                    </form>
                </div>
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
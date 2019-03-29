import React from 'react';
import Publicacion from './Publicacion';
import axios from 'axios'
//const getNovelas;
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pagina: 0, tablasPublicaciones: [[]] };
    }

    toPagina(p) {
        var state = this.state;
        state.pagina = p;
        this.setState(state);
    }

    componentDidMount() {
        axios.get('http://localhost:3001/Capitulos')
            .then((response) => {
                var state = this.state;
                var caps = response.data;
                state.pagina = 0;
                // pueden cambiar el tamaño de partion aca
                state.tablasPublicaciones = this.getTablasNovela(caps,10);
                return state;
            })
            .then((newState) => {
                this.setState(newState);
            });
    }

    getTablasNovela(publicaciones,tamanioTabla) {
        let numTablas = Math.ceil(publicaciones.length / tamanioTabla);
        let tabla = [];

        for (let i = 0; i < numTablas - 1; i++) {
            tabla.push(publicaciones.slice((i * tamanioTabla), ((i + 1) * tamanioTabla)));
        }
        tabla.push(publicaciones.slice((numTablas - 1) * tamanioTabla));
        return tabla;
    }

    render() {
        var A = [];
        for (let i = 0; i < this.state.tablasPublicaciones.length; i++) {
            A.push(i);
        }
        return (
            <div>
                <table className="table" id="tablaDeHome">
                    <thead>
                        <tr>
                            <th scope="col">Titulo Novela</th>
                            <th scope="col">Publicación</th>
                            <th scope="col">Grupo</th>
                            <th scope="col">Fecha</th>
                        </tr>
                    </thead>
                    <tbody >
                        {this.state.tablasPublicaciones[this.state.pagina].map((cap) => <Publicacion key={cap.id} data={cap} />)}
                    </tbody>
                </table>
                {A.map((i) => <button key={i} onClick={() => this.toPagina(i)}>{i + 1}</button>)}
            </div>
        )
    }
}

export default Home;
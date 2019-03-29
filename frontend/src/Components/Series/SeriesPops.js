import React from 'react';
import Novelas from '../Novelas/Novelas';
import axios from 'axios'

//const getNovelas;
class SeriesPops extends Novelas {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.get('http://localhost:3001/Novelas')
            .then((response) => {
                var state = this.state;
                var novelas = response.data;
                novelas.sort((a, b) => b.ranking - a.ranking);
                state.pagina = 0;
                // pueden cambiar el tamaño de partion aca
                state.tablasNovela = this.getTablasNovela(novelas,5);
                return state;
            })
            .then((newState) => {
                this.setState(newState);
            });
        axios.get('http://localhost:3001/Novelas')
            .then((response) => {
                console.log(response+"yesss");
                var gen = response.data.map((el)=>[el.genero,el.id,el.novelas]);
                this.setState({generos:gen});
            });
        axios.get('http://localhost:3001/Autores')
            .then((response) => {
                var aut = response.data.map((el)=>[el.nombre,el.id,el.novelas]);
                this.setState({autores:aut});
            });
    }
}

export default SeriesPops;
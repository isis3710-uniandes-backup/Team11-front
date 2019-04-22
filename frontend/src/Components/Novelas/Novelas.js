import React from 'react';
import Novela from './Novela';
import axios from 'axios'
import {FormattedMessage} from 'react-intl';

class Novelas extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pagina: 0, 
                       tablasNovela: [[]],
                       generos:[],
                       autores:[],
                       novelas:[],
                       novelasAct:[]
                    };
    }

    toPagina(p) {
        var state = this.state;
        state.pagina = p;
        this.setState(state);
    }

    findNovelas=()=>{
        let novSearch=document.getElementById('searchNovela').value;
        let data=[...this.state.novelas];
        let novelas=[...this.state.novelas];
        for(let i =data.length-1;i>-1;i--){
            if(!data[i].titulo.toLowerCase().includes(novSearch.toLowerCase())){
                novelas.splice(i,1);
            }
        }
        var state = this.state;
        state.pagina = 0;
        // pueden cambiar el tamaño de partion aca
        state.novelasAct=novelas;
        state.tablasNovela = this.getTablasNovela(novelas,5);
        this.setState(state);
    }

    filtrarNovelasHandler=()=>{
        let idGen=document.getElementById('selectGenero').value;
        let idTip=document.getElementById('selectTipo').value;
        let idAut=document.getElementById('selectAutor').value;

        let data=[...this.state.novelas];
        let novelas=[...this.state.novelas];
        let gene=[];
        let aut=[];
        let idBusGen=this.state.generos.findIndex((el)=>{
            return ""+el[1]===idGen
        });
        if(idBusGen>-1){
            gene=[...this.state.generos[idBusGen][2]]
        }
        for(let i =data.length-1;i>-1;i--){
            if(idBusGen>-1){
                if(!gene.includes(data[i].id)){
                    novelas.splice(i,1);
                }
            }
        }
        let idBusAut=this.state.autores.findIndex((el)=>{
            return ""+el[1]===idAut
        });
        if(idBusAut>-1){
            aut=[...this.state.autores[idBusAut][2]]
        }
        data=[...novelas];
        for(let i =data.length-1;i>-1;i--){
            if(idBusAut>-1){
                if(!aut.includes(data[i].id)){
                    novelas.splice(i,1);
                }
            }

        }
        data=[...novelas];
        for(let i =data.length-1;i>-1;i--){
            if(idTip!=="all"){
                if(data[i].tipo!==idTip){
                    novelas.splice(i,1);
                }
            }
        }

        var state = this.state;
        state.pagina = 0;
        // pueden cambiar el tamaño de partion aca
        state.novelasAct=novelas;
        state.tablasNovela = this.getTablasNovela(novelas,5);
        this.setState(state);
    }

    componentDidMount() {
        axios.get('http://localhost:3001/Novelas')
            .then((response) => {
                var state = this.state;
                var novelas = response.data;
                state.novelas=novelas;
                state.novelasAct=novelas;
                state.pagina = 0;
                // pueden cambiar el tamaño de partion aca
                state.tablasNovela = this.getTablasNovela(novelas,5);
                this.setState(state);
            });
        axios.get('http://localhost:3001/Generos')
            .then((response) => {
                var gen = response.data.map((el)=>[el.genero,el.id,el.novelas]);
                this.setState({generos:gen});
            });
        axios.get('http://localhost:3001/Autores')
            .then((response) => {
                var aut = response.data.map((el)=>[el.nombre,el.id,el.novelas]);
                this.setState({autores:aut});
            });
        
    }

    getTablasNovela(novelas,tamanioTablasNovela) {
        let numTablas = Math.ceil(novelas.length / tamanioTablasNovela);
        let tablasNovela = [];

        for (let i = 0; i < numTablas - 1; i++) {
            tablasNovela.push(novelas.slice((i * tamanioTablasNovela), ((i + 1) * tamanioTablasNovela)));
        }
        tablasNovela.push(novelas.slice((numTablas - 1) * tamanioTablasNovela));
        return tablasNovela;
    }

    render() {
        var A = [];
        for (let i = 0; i < this.state.tablasNovela.length; i++) {
            A.push(i);
        }
        return (
            <div>
                <div className="row busq">
                    <div className="col-md-1"/>
                    <button role="button" type="button" className="btn btn-info btn-outline-info" id="botonFiltro" data-toggle="collapse" data-target="#filterForm">
                        <FormattedMessage id="Filter"/> 
                    </button>
                    <input role="searchbox" className="form-control col-1 mr-sm-2" type="search" placeholder="Search" id="searchNovela" aria-label="Search"></input>
                    <button role="button" className="btn btn-outline-success my-2 my-sm-0" onClick={this.findNovelas}><FormattedMessage id="Search"/> </button>
                </div>
                <div id="filterForm" className="collapse">
                        <p><FormattedMessage id="Genre"/> </p>
                        <select aria-label="Genero" className="form-control" id="selectGenero">
                            <option value="all">All</option>
                            {this.state.generos.map((el)=><option value={el[1]} key={el[1]}>{el[0]}</option>)}
                        </select>
                        <p><FormattedMessage id="Type"/> </p>
                        <select aria-label="tipo" className="form-control" id="selectTipo">
                            <option value="all">All</option>
                            <option value="Web">Web</option> 
                            <option value="Fisico">Physical </option>
                        </select>
                        <p><FormattedMessage id="Author"/> </p>
                        <select aria-label="autor" className="form-control" id="selectAutor">
                            <option value="all">All</option>
                            {this.state.autores.map((el)=><option value={el[1]} key={el[1]}>{el[0]}</option>)}
                        </select>
                        <button onClick={this.filtrarNovelasHandler} className="btn btn-outline-success my-2 my-sm-0"><FormattedMessage id="ApplyFilter"/></button>
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <table role="table" id="tablaNovelas">
                            <thead>
                                <tr role="row">
                                    <th>Portada</th>
                                    <th className='lang'><FormattedMessage id="Language"/></th>
                                    <th className="titl"><FormattedMessage id="Title"/></th>
                                </tr>
                            </thead>
                            {this.state.tablasNovela[this.state.pagina].map((novela) => <tbody key={novela.id}><Novela data={novela} /></tbody>)}
                        </table>
                    <div/>
                    <div className="col-md-1"></div>
                </div>
                </div>
                {A.map((i) => <button role="button"  key={i} onClick={() => this.toPagina(i)}>{i + 1}</button>)}
            </div>
        )
    }
}

export default Novelas;
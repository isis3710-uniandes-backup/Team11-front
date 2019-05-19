import React from 'react';
import Novela from './Novela';
import axios from 'axios'
import { FormattedMessage } from 'react-intl';
import * as d3 from "d3";

class Novelas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pagina: 0,
            tablasNovela: [[]],
            generos: [],
            autores: [],
            novelas: [],
            novelasAct: []
        };
    }

    
    toPagina(p) {
        var state = this.state;
        state.pagina = p;
        this.setState(state);
    }

    findNovelas = () => {
        let novSearch = document.getElementById('searchNovela').value;
        let data = [...this.state.novelas];
        let novelas = [...this.state.novelas];
        for (let i = data.length - 1; i > -1; i--) {
            if (!data[i].titulo.toLowerCase().includes(novSearch.toLowerCase())) {
                novelas.splice(i, 1);
            }
        }
        var state = this.state;
        state.pagina = 0;
        // pueden cambiar el tamaño de partion aca
        state.novelasAct = novelas;
        state.tablasNovela = this.getTablasNovela(novelas, 5);
        this.setState(state);
    }

    filtrarNovelasHandler = () => {
        let idGen = document.getElementById('selectGenero').value;
        let idTip = document.getElementById('selectTipo').value;
        let idAut = document.getElementById('selectAutor').value;

        let data = [...this.state.novelas];
        let novelas = [...this.state.novelas];
        let gene = [];
        let aut = [];
        let idBusGen = this.state.generos.findIndex((el) => {
            return "" + el[1] === idGen
        });
        if (idBusGen > -1) {
            gene = [...this.state.generos[idBusGen][2]]
        }
        for (let i = data.length - 1; i > -1; i--) {
            if (idBusGen > -1) {
                if (!gene.includes(data[i].id)) {
                    novelas.splice(i, 1);
                }
            }
        }
        let idBusAut = this.state.autores.findIndex((el) => {
            return "" + el[1] === idAut
        });
        if (idBusAut > -1) {
            aut = [...this.state.autores[idBusAut][2]]
        }
        data = [...novelas];
        for (let i = data.length - 1; i > -1; i--) {
            if (idBusAut > -1) {
                if (!aut.includes(data[i].id)) {
                    novelas.splice(i, 1);
                }
            }

        }
        data = [...novelas];
        for (let i = data.length - 1; i > -1; i--) {
            if (idTip !== "all") {
                if (data[i].tipo !== idTip) {
                    novelas.splice(i, 1);
                }
            }
        }

        var state = this.state;
        state.pagina = 0;
        // pueden cambiar el tamaño de partion aca
        state.novelasAct = novelas;
        state.tablasNovela = this.getTablasNovela(novelas, 5);
        this.setState(state);
    }

    componentDidMount() {
                /*
                    pagina: 0,
            tablasNovela: [[]],
            generos: [],
            autores: [],
            novelas: [],
            novelasAct: []
        */
        if (localStorage.getItem('novelasAct')&&localStorage.getItem('novelas')&&localStorage.getItem('autores')&&localStorage.getItem('generos')&&localStorage.getItem('paginaNovela')&&localStorage.getItem('tablasNovela')) {
            console.log(localStorage.getItem('tablasNovela'));
            this.setState({ pagina: JSON.parse(localStorage.getItem('paginaNovela')) });
            this.setState({ tablasNovela: JSON.parse(localStorage.getItem('tablasNovela')) });
            this.setState({ generos: JSON.parse(localStorage.getItem('generos')) });
            this.setState({ autores: JSON.parse(localStorage.getItem('autores')) });
            this.setState({ novelas: JSON.parse(localStorage.getItem('novelas')) });
            this.setState({ novelasAct: JSON.parse(localStorage.getItem('novelasAct')) });

        }
        else{
            axios.get('http://localhost:3001/Novelas')
            .then((response) => {
                var state = this.state;
                var novelas = response.data;
                state.novelas = novelas;
                state.novelasAct = novelas;
                state.pagina = 0;
                // pueden cambiar el tamaño de partion aca
                state.tablasNovela = this.getTablasNovela(novelas, 5);
                this.setState(state);
            });
        axios.get('http://localhost:3001/Generos')
            .then((response) => {
                var gen = response.data.map((el) => [el.genero, el.id, el.novelas]);
                this.setState({ generos: gen });
            });
        axios.get('http://localhost:3001/Autores')
            .then((response) => {
                var aut = response.data.map((el) => [el.nombre, el.id, el.novelas]);
                this.setState({ autores: aut });
            });

        }
    }

    getTablasNovela(novelas, tamanioTablasNovela) {
        let numTablas = Math.ceil(novelas.length / tamanioTablasNovela);
        let tablasNovela = [];

        for (let i = 0; i < numTablas - 1; i++) {
            tablasNovela.push(novelas.slice((i * tamanioTablasNovela), ((i + 1) * tamanioTablasNovela)));
        }
        tablasNovela.push(novelas.slice((numTablas - 1) * tamanioTablasNovela));
        return tablasNovela;
    }

    createTablaGeneros() {
        var data = [];
        axios.get('http://localhost:3001/Generos')
            .then((response) => {
                data = response.data;
                console.log(data);

                const canvas = d3.select("#canvas");
                const width = 700;
                const height = 500;
                const margin = { top: 10, left: 100, bottom: 40, right: 10 };
                const iwidth = width - margin.left - margin.right;
                const iheight = height - margin.top - margin.bottom;

                const svg = canvas.append("svg");
                svg.attr("width", width);
                svg.attr("height", height);

                let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

                const y = d3.scaleLinear()
                    .domain([0, 3])
                    .range([iheight, 0]);

                const x = d3.scaleBand()
                    .domain(data.map(d => d.genero))
                    .range([0, iwidth])

                const bars = g.selectAll("rect").data(data);

                bars.enter().append("rect")
                    .attr("class", "bar")
                    .style("fill", "steelblue")
                    .attr("x", d => x(d.genero))
                    .attr("y", d => y(d.novelas.length))
                    .attr("height", d => iheight - y(d.novelas.length))
                    .attr("width", x.bandwidth())

                g.append("g")
                    .classed("x--axis", true)
                    .call(d3.axisBottom(x))
                    .attr("transform", `translate(0, ${iheight})`);

                g.append("g")
                    .classed("y--axis", true)
                    .call(d3.axisLeft(y));

                document.getElementById("botontonton").innerHTML="";
            })

    }
    componentWillUpdate(nextProps,nextState){
        /*
                    pagina: 0,
            tablasNovela: [[]],
            generos: [],
            autores: [],
            novelas: [],
            novelasAct: []
        */
       console.log(nextState);
        localStorage.setItem('paginaNovela',JSON.stringify(nextState.pagina));
        localStorage.setItem('tablasNovela',JSON.stringify(nextState.tablasNovela));
        localStorage.setItem('generos',JSON.stringify(nextState.generos));
        localStorage.setItem('autores',JSON.stringify(nextState.autores));
        localStorage.setItem('novelas',JSON.stringify(nextState.novelas));
        localStorage.setItem('novelasAct',JSON.stringify(nextState.novelasAct));


    }
    render() {
        var A = [];
        for (let i = 0; i < this.state.tablasNovela.length; i++) {
            A.push(i);
        }
        return (
            <div role="contentinfo" className="novs">
                <div className="row busq">
                    <div className="col-md-1" />
                    <button type="button" className="btn btn-info btn-outline-info filt btnz" id="botonFiltro" data-toggle="collapse" data-target="#filterForm">
                        <FormattedMessage id="Filter" />
                    </button>
                    <input role="searchbox" className="form-control col-1 mr-sm-2 serc" type="search" placeholder="Search" id="searchNovela" aria-label="Search"></input>
                    <button className="btn btn-outline-success my-2 my-sm-0 busB" onClick={this.findNovelas}><FormattedMessage id="Search" /> </button>
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <div id="filterForm" className="collapse">
                            <p><FormattedMessage id="Genre" /> </p>
                            <select aria-label="Genero" className="form-control" id="selectGenero">
                                <option value="all">All</option>
                                {this.state.generos.map((el) => <option value={el[1]} key={el[1]}>{el[0]}</option>)}
                            </select>
                            <p><FormattedMessage id="Type" /> </p>
                            <select aria-label="tipo" className="form-control" id="selectTipo">
                                <option value="all">All</option>
                                <option value="Web">Web</option>
                                <option value="Fisico">Physical </option>
                            </select>
                            <p><FormattedMessage id="Author" /> </p>
                            <select aria-label="autor" className="form-control" id="selectAutor">
                                <option value="all">All</option>
                                {this.state.autores.map((el) => <option value={el[1]} key={el[1]}>{el[0]}</option>)}
                            </select>
                            <button onClick={this.filtrarNovelasHandler} className="btn btn-outline-success my-2 my-sm-0 btnz"><FormattedMessage id="ApplyFilter" /></button>
                        </div>
                    </div>
                    <div className="col-md-1" />
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <table role="table" id="tablaNovelas">
                            <thead>
                                <tr role="row">
                                    <th><FormattedMessage id="PortraitNovel" /></th>
                                    <th className='lang'><FormattedMessage id="Language" /></th>
                                    <th className="titl"><FormattedMessage id="Title" /></th>
                                </tr>
                            </thead>
                            {this.state.tablasNovela[this.state.pagina].map((novela) => <tbody key={novela.id}><Novela data={novela} /></tbody>)}
                        </table>
                    </div>
                    <div className="col-md-1"></div>
                </div>
                <div className="marg-bot-2vw">
                    {A.map((i) => <button key={i} onClick={() => this.toPagina(i)}>{i + 1}</button>)}
                </div>
                <div id="canvas">
                    <div id="botontonton">
                        <button className="btn btn-primary" onClick={this.createTablaGeneros}>informacion interesante</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Novelas;

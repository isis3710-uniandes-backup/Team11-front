import React from 'react';
import Publicacion from './Publicacion';
import axios from 'axios'
import { FormattedMessage } from 'react-intl';
import * as d3 from "d3";

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
        if (localStorage.getItem('pagina')&&localStorage.getItem('tablasPublicaciones')) {
            console.log('t');
            this.setState({ pagina: JSON.parse(localStorage.getItem('pagina')) });
            this.setState({ tablasPublicaciones: JSON.parse(localStorage.getItem('tablasPublicaciones')) });
        }
        else{
            console.log('f');
            axios.get('http://localhost:3001/Capitulos')
            .then((response) => {
                var state = this.state;
                var caps = response.data;
                state.pagina = 0;
                // pueden cambiar el tamaño de partion aca
                state.tablasPublicaciones = this.getTablasNovela(caps, 10);
                return state;
            })
            .then((newState) => {
                this.setState(newState);
            });
        }
    }

    getTablasNovela(publicaciones, tamanioTabla) {
        let numTablas = Math.ceil(publicaciones.length / tamanioTabla);
        let tabla = [];

        for (let i = 0; i < numTablas - 1; i++) {
            tabla.push(publicaciones.slice((i * tamanioTabla), ((i + 1) * tamanioTabla)));
        }
        tabla.push(publicaciones.slice((numTablas - 1) * tamanioTabla));
        return tabla;
    }

    async tablaNovelasMasGustadas() {
        let data = [];
        var favs = {};
        var nombr = {};
        var rta = {};
        await axios.get('http://localhost:3001/Novelas')
            .then((response) => {
                data = response.data;
                for (let a of data) {
                    nombr[a.id] = a.titulo;
                }
                //console.log(nombr);

            });
        axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1)
        axios.get('http://localhost:3001/Usuarios')
            .then((response) => {
                data = response.data;
                for (let b of data) {
                    for (let a of b.favoritos) {
                        if (typeof favs[a] === "undefined") {
                            favs[a] = 1;
                        }
                        favs[a] += 1;
                    }

                }
                //console.log(favs);
                for (let key in nombr) {
                    if (favs.hasOwnProperty(key)) {
                        rta[nombr[key]] = favs[key];
                    }
                }

                // set the dimensions and margins of the graph
                var width = 450
                var height = 450
                var margin = 40

                // The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
                var radius = Math.min(width, height) / 2 - margin

                var svg = d3.select("#canvas")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                // Create dummy data
                var data = { a: 9, b: 20, c: 30, d: 8, e: 12 }

                // set the color scale
                var color = d3.scaleOrdinal()
                    .domain(rta)
                    .range(d3.schemeSet2);
                // Compute the position of each group on the pie:
                var pie = d3.pie()
                    .value(function (d) { return d.value; })
                var data_ready = pie(d3.entries(rta))
                // Now I know that group A goes from 0 degrees to x degrees and so on.

                // shape helper to build arcs:
                var arcGenerator = d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius)

                // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
                svg
                    .selectAll('mySlices')
                    .data(data_ready)
                    .enter()
                    .append('path')
                    .attr('d', arcGenerator)
                    .attr('fill', function (d) { return (color(d.data.key)) })
                    .attr("stroke", "black")
                    .style("stroke-width", "2px")
                    .style("opacity", 0.7)

                // Now add the annotation. Use the centroid method to get the best coordinates
                svg
                    .selectAll('mySlices')
                    .data(data_ready)
                    .enter()
                    .append('text')
                    .text(function (d) { return d.data.key })
                    .attr("transform", function (d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
                    .style("text-anchor", "middle")
                    .style("font-size", 17)

            });
            document.getElementById("botontonton").innerHTML="";

    }

    componentWillUpdate(nextProps,nextState){
        localStorage.setItem('pagina',JSON.stringify(nextState.pagina));
        localStorage.setItem('tablasPublicaciones',JSON.stringify(nextState.tablasPublicaciones));
    }


    render() {
        var A = [];
        for (let i = 0; i < this.state.tablasPublicaciones.length; i++) {
            A.push(i);
        }
        return (
            <div role="contentinfo" className="heightWeb">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <table className="table tablaPub" id="tablaDeHome">
                            <thead>
                                <tr>
                                    <th scope="col"><FormattedMessage id="TitleNovelEntry" /></th>
                                    <th scope="col"><FormattedMessage id="PublicationEntry" /></th>
                                    <th scope="col"><FormattedMessage id="GroupEntry" /></th>
                                    <th scope="col"><FormattedMessage id="DateEntry" /></th>
                                </tr>
                            </thead>
                            <tbody >
                                {this.state.tablasPublicaciones[this.state.pagina].map((cap) => <Publicacion key={cap.id} data={cap} />)}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-1"></div>
                </div>
                {A.map((i) => <button key={i} onClick={() => this.toPagina(i)}>{i + 1}</button>)}
                <div className="row"></div>
                <div id="canvas">
                    <div id="botontonton" hidden={!this.props.logged}>
                        <button className="btn btn-primary" onClick={this.tablaNovelasMasGustadas}>informacion interesante</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;

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
        localStorage.setItem("graph", "asd")
    }

    toPagina(p) {
        var state = this.state;
        state.pagina = p;

        this.setState(state);
    }

    componentDidMount() {
        if (localStorage.getItem('pagina') && localStorage.getItem('tablasPublicaciones')) {
            console.log('t');
            this.setState({ pagina: JSON.parse(localStorage.getItem('pagina')) });
            this.setState({ tablasPublicaciones: JSON.parse(localStorage.getItem('tablasPublicaciones')) });
        }
        else {
            console.log('f');
            axios.get('https://backwebteam11.herokuapp.com/Capitulos')
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
        localStorage.setItem("graph", "das")
        let data = [];
        var favs = {};
        var nombr = {};
        var rta = {};
        await axios.get('https://backwebteam11.herokuapp.com/Novelas')
            .then((response) => {
                data = response.data;
                for (let a of data) {
                    nombr[a.id] = a.titulo;
                }
                //console.log(nombr);

            });
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1)
        axios.get('https://backwebteam11.herokuapp.com/Usuarios')
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
                console.log(rta);

                var width = 1000
                var height = 500
                var margin = 40

                // The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
                var radius = Math.min(width, height) / 2 - margin

                // append the svg object to the div called 'my_dataviz'
                var svg = d3.select("#canvas")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                    .text("TITULOOOOOOOOOOOO");

                // Create dummy data

                // set the color scale
                var color = d3.scaleOrdinal()
                    .domain([rta])
                    .range(d3.schemeDark2);

                // Compute the position of each group on the pie:
                var pie = d3.pie()
                    .sort(null) // Do not sort group by size
                    .value(function (d) { return d.value; })
                var data_ready = pie(d3.entries(rta))

                // The arc generator
                var arc = d3.arc()
                    .innerRadius(radius * 0.5)         // This is the size of the donut hole
                    .outerRadius(radius * 0.8)

                // Another arc that won't be drawn. Just for labels positionning
                var outerArc = d3.arc()
                    .innerRadius(radius * 0.9)
                    .outerRadius(radius * 0.9)

                // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
                svg
                    .selectAll('allSlices')
                    .data(data_ready)
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function (d) { return (color(d.data.key)) })
                    .attr("stroke", "white")
                    .style("stroke-width", "2px")
                    .style("opacity", 0.7)

                // Add the polylines between chart and labels:
                svg
                    .selectAll('allPolylines')
                    .data(data_ready)
                    .enter()
                    .append('polyline')
                    .attr("stroke", "black")
                    .style("fill", "none")
                    .attr("stroke-width", 1)
                    .attr('points', function (d) {
                        var posA = arc.centroid(d) // line insertion in the slice
                        var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
                        var posC = outerArc.centroid(d); // Label position = almost the same as posB
                        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                        return [posA, posB, posC]
                    })

                // Add the polylines between chart and labels:
                svg
                    .selectAll('allLabels')
                    .data(data_ready)
                    .enter()
                    .append('text')
                    .text(function (d) { console.log(d.data.key); return d.data.key + ", #favoritos " + d.data.value })
                    .attr('transform', function (d) {
                        var pos = outerArc.centroid(d);
                        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                        return 'translate(' + pos + ')';
                    })
                    .style('text-anchor', function (d) {
                        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                        return (midangle < Math.PI ? 'start' : 'end')
                    })
                svg.append('text')
                    .attr('class', 'toolCircle')
                    .attr('dy', 0) // hard-coded. can adjust this to adjust text vertical alignment in tooltip
                    .html('Más gustados') // add text to the circle.
                    .style('font-size', '2em')
                    .style('text-anchor', 'middle');

            });
        document.getElementById("botontonton").innerHTML = "";

    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('pagina', JSON.stringify(nextState.pagina));
        localStorage.setItem('tablasPublicaciones', JSON.stringify(nextState.tablasPublicaciones));
    }


    render() {
        var A = [];
        for (let i = 0; i < this.state.tablasPublicaciones.length; i++) {
            A.push(i);
        }
        console.log(localStorage.getItem("graph") === "asd");
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
                <h4 hidden={true}>Novelas más gustadas</h4>
                <div id="canvas">
                    <div id="botontonton" hidden={!this.props.logged}>
                        <button className="btn btn-primary" onClick={this.tablaNovelasMasGustadas}>Novelas más gustadas</button>
                        <h5></h5>

                    </div>
                </div>
            </div>
        )
    }
}

export default Home;

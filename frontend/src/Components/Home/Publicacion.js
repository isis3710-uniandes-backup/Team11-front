import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';



class Publicacion extends Component {

    constructor(props) {
        super(props);
        this.state = { tituloNovela: "", nombreGrupo: "" };
    }


    componentDidMount(){
        axios.get('http://localhost:3001/Novelas/'+this.props.data.novela)
        .then((response) => {
            var nov = response.data;
            this.setState({tituloNovela:nov.titulo})
        });

        axios.get('http://localhost:3001/Fansubs/'+this.props.data.fansub)
        .then((response) => {
            var group = response.data;
            this.setState({nombreGrupo:group.nombre})
        })
    }
    render(){
        return(
            <tr>
                <td>
                    <Link to={{
                        pathname:"/novelas/"+this.props.data.novela,
                    }}>{this.state.tituloNovela}</Link>
                </td>
                <td>
                    <a href={this.props.data.texto}>{this.props.data.titulo}</a>
                </td>
                <td>
                    {this.state.nombreGrupo}
                </td>
                <td>
                    {this.props.data.fecha}
                </td>
            </tr>
        )
    }
}

export default Publicacion;

import React, {Component} from 'react';
import axios from 'axios'

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
                <td scope="row">
                    {this.state.tituloNovela}
                </td>
                <td>
                    {this.props.data.titulo}
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
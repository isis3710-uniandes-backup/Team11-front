import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';



class Publicacion extends Component {

    constructor(props) {
        super(props);
        this.state = { tituloNovela: "", nombreGrupo: "" };
    }


    componentDidMount(){
        if (localStorage.getItem('tituloNovela'+this.props.data.id)&&localStorage.getItem('nombreGrupo'+this.props.data.id)) {
            console.log('t');
            this.setState({ tituloNovela: JSON.parse(localStorage.getItem('tituloNovela'+this.props.data.id)) });
            this.setState({ nombreGrupo: JSON.parse(localStorage.getItem('nombreGrupo'+this.props.data.id)) });
        }
        else{
            axios.get('https://backwebteam11.herokuapp.com/Novelas/'+this.props.data.novela)
            .then((response) => {
                var nov = response.data;
                this.setState({tituloNovela:nov.titulo})
            });
    
            axios.get('https://backwebteam11.herokuapp.com/Fansubs/'+this.props.data.fansub)
            .then((response) => {
                var group = response.data;
                this.setState({nombreGrupo:group.nombre})
            })
        }
    }
    componentWillUpdate(nextProps,nextState){
        console.log(nextState);
        localStorage.setItem('tituloNovela'+nextProps.data.id,JSON.stringify(nextState.tituloNovela));
        localStorage.setItem('nombreGrupo'+nextProps.data.id,JSON.stringify(nextState.nombreGrupo));
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

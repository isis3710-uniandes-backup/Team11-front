import React from 'react';
import axios from 'axios'
import {FormattedMessage} from 'react-intl';

class AdminGenre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        generos:[],
                        actualGen:{}
                    };
    }


    cambiarActual=(recom)=>{
        this.setState({actualGen:recom});
    }

    componentDidMount() {
        axios.get('http://localhost:3001/Generos')
            .then((response) => {
                var state = this.state;
                var generos = response.data;
                state.generos=generos;
                this.setState(state);
            });
    }

    postGeneros=()=>{
        let genero=document.getElementById('genreInput').value;
        let id=parseInt(document.getElementById('idInput').value);
        let genre={id:id,genero:genero,novelas:[]};
        axios.post('http://localhost:3001/Generos',genre);
    }

    putUsuario=()=>{
        let username=document.getElementById('editUsernameInput').value;
        let user={...this.state.actualGen};
        user.genero=username;
        axios.put('http://localhost:3001/Generos/'+user.id,user);
    }

    deleteUsuario=(idUser)=>{
        axios.delete('http://localhost:3001/Generos/'+idUser);
    }


    rendGeneros=()=>{
        let rows=this.state.generos.map((el,i)=>{
            return(
                <tr key={i}>
                    <th scope="row">{i}</th>
                    <td>{el.genero}</td>
                    <td>
                        <button onClick={()=>this.cambiarActual(el)} className="btn btn-outline-success btnz" type="button" data-toggle="collapse" data-target="#editForm"><FormattedMessage id="Edit"/></button>
                    </td>
                    <td>
                        <form>
                            <a href="" onClick={()=>this.deleteUsuario(el.id)} className="btn btn-outline-success btnz" type="button" ><FormattedMessage id="Delete"/></a>
                        </form>
                    </td>
                </tr>
            );
        });
        return rows;
    }

    render() {
        return (
            <div className="heightWeb" role="contentinfo">
                <h1><FormattedMessage id="ListGenresAdmin"/></h1>
                <button className="btn btn-info btnz" type="button" data-toggle="collapse" data-target="#addForm"><FormattedMessage id="AddAdmin"/></button>
                <div className="collapse" id="addForm">
                    <form>
                        <input  aria-label="id" type="text" id="idInput" placeholder="id de genero"/>
                        <input  aria-label="nombre" type="text" id="genreInput" placeholder="nombre de genero"/>
                        <button className="btn btn-info btnz" onClick={this.postGeneros}><FormattedMessage id="AddAdmin"/></button>
                    </form>
                </div>
                <div className="collapse" id="editForm">
                    <form>
                        <p><FormattedMessage id="EditUserofId"/>: {this.state.actualGen.id}</p>
                        <input type="text" id="editUsernameInput" placeholder="genero"/>
                        <button className="btn btn-info btnz" onClick={this.putUsuario}><FormattedMessage id="EditAdmin"/></button>
                    </form>
                </div>
                <div className="row">
                    <div className="col-md-1"/>
                    <div className="col-md-10">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Genero</th>
                                    <th scope="col"><FormattedMessage id="Edit"/></th>
                                    <th scope="col"><FormattedMessage id="Delete"/></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.rendGeneros()}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-1"/>
                </div>
            </div>
        )
    }
}

export default AdminGenre;

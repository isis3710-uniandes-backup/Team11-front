import React from 'react';
import axios from 'axios';
import {FormattedMessage} from 'react-intl';

class AdminRecomm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        recomendaciones:[],
                        actualRecom:{}
                    };
    }

    cambiarActual=(recom)=>{
        this.setState({actualRecom:recom});
    }


    componentDidMount() {
        axios.get('http://localhost:3001/Recomendaciones')
            .then((response) => {
                var state = this.state;
                var recon = response.data;
                state.recomendaciones=recon;
                this.setState(state);
            });
    }

    rendRecon=()=>{
        let rows=this.state.recomendaciones.map((el,i)=>{
            return(
                <tr key={i}>
                    <th scope="row">{i}</th>
                    <td>{el.novela}</td>
                    <td>{el.novelaRecomendada}</td>
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

    postRecomendacion=()=>{
        let id=parseInt(document.getElementById('idInput').value);
        let novel=parseInt(document.getElementById('Input').value);
        let novel2=parseInt(document.getElementById('Input2').value);
        let genre=    {
            id:id,
            novelaRecomendada:novel2,
            novela:novel
        };
        axios.post('http://localhost:3001/Recomendaciones',genre);
    }

    putUsuario=()=>{
        let username=document.getElementById('editUsernameInput').value;
        let novel=document.getElementById('editNovelInput').value;
        let user={...this.state.actualRecom};
        user.novela=username;
        user.novelaRecomendada=novel;
        axios.put('http://localhost:3001/Recomendaciones/'+user.id,user);
    }

    deleteUsuario=(idUser)=>{
        axios.delete('http://localhost:3001/Recomendaciones/'+idUser);
    }

    render() {
        return (
            <div className="heightWeb" role="contentinfo">
                <h1><FormattedMessage id="ListRecomendationsAdmin"/></h1>
                <button className="btn btn-info btnz" type="button" data-toggle="collapse" data-target="#addForm"><FormattedMessage id="AddAdmin"/></button>
                <div className="collapse" id="addForm">
                    <form>
                        <label for="idInput">Id recom</label><input type="text" id="idInput" placeholder="id de recomendacion" label="idRecom"/>
                        <label for="Input">Id Nov Recomien</label><input type="text" id="Input" placeholder="id de novela que recomienda" label="idNovRecomi"/>
                        <label for="Input2">Id Nov Recomen</label><input type="text" id="Input2" placeholder="id de novela recomendada"/>
                        <button className="btn btn-info btnz" onClick={this.postRecomendacion}><FormattedMessage id="AddAdmin"/></button>
                    </form>
                </div>
                <div className="collapse" id="editForm">
                    <form>
                        <p><FormattedMessage id="EditUserofId"/>: {this.state.actualRecom.id}</p>
                        <input type="text" id="editUsernameInput" placeholder="Novela"/>
                        <input type="text" id="editNovelInput" placeholder="Novela que recomienda"/>
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
                                    <th scope="col"><FormattedMessage id="RecomendedNovelAdmin"/></th>
                                    <th scope="col"><FormattedMessage id="NovelThatWasRecomendedAdmin"/></th>
                                    <th scope="col"><FormattedMessage id="Edit"/></th>
                                    <th scope="col"><FormattedMessage id="Delete"/></th>
                                </tr>
                            </thead>
                        <tbody>
                            {this.rendRecon()}
                        </tbody>
                        </table>
                    </div>
                    <div className="col-md-1"/>
                    </div>
            </div>
        )
    }
}

export default AdminRecomm;

import React from 'react';
import axios from 'axios'
import {FormattedMessage} from 'react-intl';

class AdminGroups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        grupos:[],
                        actualGroup:{}
                    };
    }

    cambiarActual=(recom)=>{
        this.setState({actualGroup:recom});
    }

    componentDidMount() {
        axios.get('https://backwebteam11.herokuapp.com/Fansubs')
            .then((response) => {
                var state = this.state;
                var grupos = response.data;
                state.grupos=grupos;
                this.setState(state);
            });
    }

    putUsuario=(event)=>{
        event.preventDefault();
        let username=document.getElementById('editUsernameInput').value;
        let user={...this.state.actualGroup};
        user.nombre=username;
        let tok = localStorage.getItem('token')
        if(tok){
        axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        axios.put('https://backwebteam11.herokuapp.com/Fansubs/'+user.id,user).then(res=>window.location.reload());
        }
    }

    deleteUsuario=(idUser,event)=>{
        event.preventDefault();
        let tok = localStorage.getItem('token')
        if(tok){
        axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('token').substring(1, localStorage.getItem('token').length - 1);
        axios.delete('https://backwebteam11.herokuapp.com/Fansubs/'+idUser).then(res=>window.location.reload());
        }
    }

    rendGrupos=()=>{
        let rows=this.state.grupos.map((el,i)=>{
            return(
                <tr key={i}>
                    <th scope="row">{i}</th>
                    <td>{el.nombre}</td>
                    <td>
                        <button onClick={()=>this.cambiarActual(el)} className="btn btn-outline-success btnz" type="button" data-toggle="collapse" data-target="#editForm"><FormattedMessage id="Edit"/></button>
                    </td>
                    <td>
                        <form>
                            <a href="" onClick={(event)=>this.deleteUsuario(el.id,event)} className="btn btn-outline-success btnz" type="button" ><FormattedMessage id="Delete"/></a>
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
                <h1><FormattedMessage id="ListGroupsAdmin"/></h1>
                <div className="collapse" id="editForm">
                    <form>
                        <p><FormattedMessage id="EditUserofId"/>: {this.state.actualGroup.id}</p>
                        <input  aria-label="grupo" type="text" id="editUsernameInput" placeholder="grupo"/>
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
                                    <th scope="col"><FormattedMessage id="Group"/></th>
                                    <th scope="col"><FormattedMessage id="Edit"/></th>
                                    <th scope="col"><FormattedMessage id="Delete"/></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.rendGrupos()}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-1"/>
                </div>
            </div>
        )
    }
}

export default AdminGroups;

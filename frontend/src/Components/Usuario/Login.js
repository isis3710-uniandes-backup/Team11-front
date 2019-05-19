import React from 'react';
import './login.css'
import axios from 'axios'
import {FormattedMessage} from 'react-intl';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            exito:false
        }
        if(this.props.logged){
            if(this.props.ADMIN){
                window.location="/";
            }
            else{
                window.location="perfil";
            }
        }
        console.log('el token actual es:'+ localStorage.getItem("token"));
    }

    login=()=>{  
        let username1=document.getElementById('usernameInput').value;
        let password1=document.getElementById('passwordInput').value;
        let dats={
            username:username1,
            password:password1
        }
        console.log("Se envia request login");
        let actualizar=this.props.actualizar;
        axios.post('http://localhost:3001/login',dats).then((response)=>{
            let bool=(response.status===200);
            if(bool){
                localStorage.setItem('token',JSON.stringify(response.data.token));
                localStorage.setItem('userid',JSON.stringify(response.data.userid));
                if(response.data.userid==='admin'){
                    actualizar(response.data.token,response.data.userid,true);
                }
            }
            else{
                alert('Usuario o contraseña incorrecto');
            }
        }).catch((e)=>{
            console.log(e);
            console.log(dats);
            alert("Usuario o contraseña incorrecto");
        });
    }
    render() {
        return (
            <div>
                <form>
                    <input type="text" placeholder="Usuario" name="usuario" id='usernameInput'></input>
                    <input type="password" placeholder="Constraseña" name="contrasena" id='passwordInput'></input>
                    <button className='btn btn-info' onClick={this.login}><FormattedMessage id="Login"/></button>
                </form>
            </div>
        )
    }
}

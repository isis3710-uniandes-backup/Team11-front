import React from 'react';
import './login.css'
import axios from 'axios'
import {FormattedMessage} from 'react-intl';

export default class Registro extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            exito:false
        }

        console.log('el token actual es:'+ localStorage.getItem("token"));
    }

    registro(){  
        let username1=document.getElementById('usernameInput').value;
        let password1=document.getElementById('passwordInput').value;
        let mail=document.getElementById('usernameInput').value;
        console.log("username"+username1);
        console.log("password"+password1);
        let dats={
            username:username1,
            password:password1
        }
        console.log("Se envia request login");
        axios.post('http://localhost:3001/login',dats).then((response)=>{
            let bool=(response.status===200);
            if(bool){
                alert(JSON.stringify(response.data));
                localStorage.setItem('token',JSON.stringify(response.data.token));
                localStorage.setItem('userid',JSON.stringify(response.data.userid));
            }});
    }
    render() {
        return (
            <div>
                <form>
                    <p><FormattedMessage id="Username"/></p>
                    <input type="text" placeholder="Usuario" name="usuario" id="userInput"></input>
                    <p><FormattedMessage id="mail"/></p>
                    <input type="text" placeholder="Correo" name="correo" id="mailInput"></input>
                    <p><FormattedMessage id="password"/></p>
                    <input type="password" placeholder="Constraseña" name="contrasena" id="passwordInput"></input>
                    <button className='btn btn-info' onClick={this.registro}><FormattedMessage id="register"/></button>
                </form>
            </div>
        )
    }
}

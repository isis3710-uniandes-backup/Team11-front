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
        let username1=document.getElementById('userInput').value;
        let password1=document.getElementById('passwordInput').value;
        let mail=document.getElementById('mailInput').value;
        console.log("username"+username1);
        console.log("password"+password1);
        let usu={
            nombre:username1,
            correo:mail,
            password:password1,
            playlists: [],
            favoritos: [],
            grupo: -1
        }
        let didit=false;
        console.log("Se envia request registro");
        axios.post('http://localhost:3001/usuarios',usu).then((response)=>{
            let bool=(response.status===200);
            if(bool){
                alert("Cuenta creada exitosamente");
                didit=true;
            }}).then(en=>{
                if(!didit){
                    alert("Correo o nombre de usuario ya en uso");
                }
            });
        

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
                    <button className='btn btn-info' onClick={this.registro}><FormattedMessage id="Register"/></button>
                </form>
            </div>
        )
    }
}

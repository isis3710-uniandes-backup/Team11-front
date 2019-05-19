import React from 'react';
import './login.css'

export default class Registro extends React.Component {
    
    render() {
        return (
            <div>
                <form action="">
                    <input type="text" placeholder="Usuario" name="usuario"></input>
                    <input type="text" placeholder="Nombre" name="nombre"></input>
                    <input type="text" placeholder="correo" name="correo"></input>
                    <input type="password" placeholder="Constraseña" name="contrasena"></input>
                    <input type="submit" value="Ingresar"></input>
                </form>
            </div>
        )
    }
}

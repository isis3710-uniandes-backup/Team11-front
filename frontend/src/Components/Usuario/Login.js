import React from 'react';
import './login.css'

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <form action="">
                    <input type="text" placeholder="Usuario" name="usuario"></input>
                    <input type="password" placeholder="Constraseña" name="contrasena"></input>
                    <input type="submit" value="Ingresar"></input>
                </form>
            </div>
        )
    }
}

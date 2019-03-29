import React from 'react';
import {Link} from 'react-router-dom'

const Novela = (props) => (
    <tr>
        <td><img src={props.data.imagen}></img></td>
        <td>{props.data.idioma}</td>
        <td>
            <Link to={{
                pathname:"/novelas/"+props.data.id,
            }}>{props.data.titulo}</Link>
            <p><strong>Descripcion</strong></p>
            <p>{props.data.descripcion}</p>
        </td>
    </tr>
);

export default Novela;
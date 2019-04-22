import React from 'react';
import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl';

const Novela = (props) => (
    <tr role="row">
        <td><img role="img" alt="FotoNovela" src={props.data.imagen}></img></td>
        <td>{props.data.idioma}</td>
        <td>
            <Link to={{
                pathname:"/novelas/"+props.data.id,
            }}>{props.data.titulo}</Link>
            <p><strong><FormattedMessage id="Description"/></strong></p>
            <p >{props.data.descripcion}</p>
        </td>
    </tr>
);

export default Novela;
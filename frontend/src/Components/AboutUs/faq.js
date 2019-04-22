import React from 'react';
import {FormattedMessage} from 'react-intl';

const Faq = (props) => (
    <div role="contentinfo" id="faq">
        <h2>FAQ</h2>
        <h3><strong><FormattedMessage id="pregunta1"/></strong></h3>
        <p><FormattedMessage id="respuesta1"/></p>
        <h3><strong><FormattedMessage id="pregunta2"/></strong></h3>
        <p><FormattedMessage id="respuesta2"/></p>
        <h3><strong><FormattedMessage id="pregunta3"/></strong></h3>
        <p><FormattedMessage id="respuesta3"/></p>
    </div>

);

export default Faq;

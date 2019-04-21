import React, { Component } from 'react';
import Vista from './Components/structure'
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import {IntlProvider, addLocaleData} from 'react-intl';
import esLocaleData from 'react-intl/locale-data/es';
import localeEsMessages from "./locales/es";
import enLocaleData from 'react-intl/locale-data/en';
import localeEnMessages from "./locales/en";

class App extends Component {
  render() {
    addLocaleData(esLocaleData);
    addLocaleData(enLocaleData);

    const language =
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      navigator.userLanguage;

    const messages = language.startsWith('es')?localeEsMessages:localeEnMessages;

    return (
      <div className="App">
        <BrowserRouter>
          <IntlProvider locale={language} messages= {messages}>
            <Vista/>
          </IntlProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

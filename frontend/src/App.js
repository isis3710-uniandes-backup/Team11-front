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
  constructor(props){
    super(props);
    this.state={
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyIiwiaWF0IjoxNTU4MjQxNzQ4LCJleHAiOjE1NTgzMjgxNDh9.WzxdTtj6JrAE_h79gX-ktBJrCMoEtpo5PoLX1xnxnzU',
      userid:'2',
      ADMIN:false,
      logged:true
    }
  }
  componentDidMount(){
    try{
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyIiwiaWF0IjoxNTU4MjQxNzQ4LCJleHAiOjE1NTgzMjgxNDh9.WzxdTtj6JrAE_h79gX-ktBJrCMoEtpo5PoLX1xnxnzU');
    localStorage.setItem('userid', '2');}
    catch(e){
      console.log(e);
    }
  }
  /*componentWillUpdate(nextProps, nextState){
      localStorage.setItem('token', this.state.token);
      localStorage.setItem('userid', this.state.userid);
  }*/
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
            <Vista {...this.state}/>
          </IntlProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Vista from './Components/structure'
import {BrowserRouter} from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Vista/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

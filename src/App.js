import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import LoadComponents from './components/componentLoader/LoadComponents';

function App ()  {
  return (
        <div className="App">
          <LoadComponents />
        </div>

       
  );
}

export default App;

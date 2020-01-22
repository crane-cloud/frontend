import React from 'react';
import './App.css';
import Content from '../ResourceCard/Example';

/* These below are for showing purposes */
const resources = [
  {
    "name": "Nodes",
    "resourceNumber": 7
  },
  {
    "name": "Secrets",
    "resourceNumber": 3
  }
]


function App() {
  return <div><Content resources={resources}/></div>
}

export default App;

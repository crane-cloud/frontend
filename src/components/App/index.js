import React from 'react';
import './App.css';
import Footer from '../Footer/';
import Content from '../ResourceCard/Example';

/* These below are for showing purposes */
/* THIS IS GOING TO BE REMOVED IN THE DASHBOARD FEATURE */
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
  return <div>
    <div className="Disposable">
      <Content resources={resources}/>
    </div>
    <Footer />
    </div>
}

export default App;

import React from 'react';
import './App.css';
import Footer from '../Footer/';
import Content from '../ResourceCard/Example';
import ClusterResources from '../ClusterResources/';

/* These below are for showing purposes */
/* THIS IS GOING TO BE REMOVED IN THE DASHBOARD FEATURE */

function App() {
  return <div>
    <div className="Disposable">
      <div><ClusterResources /></div>
    </div>
    <Footer />
  </div>
}

export default App;
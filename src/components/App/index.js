/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import './App.css';
import Footer from '../Footer';
import ClusterResources from '../ClusterResources';
// import NavBar from '../NavBar';

/* These below are for showing purposes */
/* THIS IS GOING TO BE REMOVED IN THE DASHBOARD FEATURE */

function App() {
  return <div>
    {/* <NavBar /> */}
    <div className="Disposable">
      <div>
        <ClusterResources />
      </div>
    </div>
    <Footer />
  </div>;
}

export default App;
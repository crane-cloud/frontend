import React from 'react';
import './App.css';
import SideNav from '../SideNav';
// import Content from '../ResourceCard/Example';
import ClusterResources from '../ClusterResources/';

/* These below are for showing purposes */
/* THIS IS GOING TO BE REMOVED IN THE DASHBOARD FEATURE */

function App() {
  return <div className='index'>
    <div className='row-nav'></div>

    <div className='row-main'>
      <div className='side-nav'><SideNav/></div>
      <div className='content'><div className="Disposable"><ClusterResources/></div></div>
    </div>  
  </div>;
}

export default App;

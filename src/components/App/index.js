import React from 'react';
import './App.css';
import ClusterList from '../ClustersList';
// import Content from '../ResourceCard/Example';
import ClusterResources from '../ClusterResources';

/* These below are for showing purposes */
/* THIS IS GOING TO BE REMOVED IN THE DASHBOARD FEATURE */

function App() {
  return (
    <div className="Index">
      <div className="RowNav" />

      <div className="RowMain">
        <ClusterList/>
        {/* <div className="Content"><div className="Disposable"><ClusterResources /></div></div> */}
      </div>
    </div>
  );
}

export default App;

/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import './App.css';
import SideNav from '../SideNav';
import ClusterResources from '../ClusterResources';
import InformationBar from '../InformationBar';

function App() {
  return (
    <div>
      {/* <div className="Disposable"> */}
      {/* <div><ClusterResources /></div> */}
      {/* </div>
    <Footer /> */}
      <div className="RowMain">
        <div className="SideNave">
          <SideNav />
        </div>
        <div className="Content">
          <div className="Disposable">
            <ClusterResources />
          </div>
        </div>
      </div>
      <InformationBar />
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import SideNav from '../SideNav';
// import Content from '../ResourceCard/Example';
import ClusterResources from '../ClusterResources/';
import PrimaryButton from '../PrimaryButton/';
import SecondaryButton from '../SecondaryButton/';

function App() {
  return <div className='Index'>
    <div className='RowNav'></div>

    <div className='RowMain'>
      <div className='SideNave'><SideNav/></div>
      <div className='Content'><div className="Disposable"><ClusterResources/></div></div>
    </div>  
  </div>;
}

export default App;
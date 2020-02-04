import React from 'react';
import './App.css';
import Footer from '../Footer/';
import ClusterResources from '../ClusterResources/';
import PrimaryButton from '../PrimaryButton/';
import SecondaryButton from '../SecondaryButton/';

function App() {
  return <div>
    {/* <div className="Disposable">
      <div><ClusterResources /></div>
    </div>
    <Footer /> */}
    <PrimaryButton
      label="Reset" />
    <SecondaryButton
      label="Reset" />
  </div>
}

export default App;

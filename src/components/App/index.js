import React from 'react';
import './App.css';
import Footer from '../Footer/';
import ClusterResources from '../ClusterResources/';
import InputText from '../InputText/';


function App() {
  return <div>
    {/* <div className="Disposable"> */}
      {/* <div><ClusterResources /></div> */}
    {/* </div>
    <Footer /> */}
    <InputText
      placeholder="Email Address"
      // onChange={ this.handleChange } 
      />

  </div>
}

export default App;

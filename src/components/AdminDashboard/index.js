import React from 'react';
import './AdminDashboard.css';
import Footer from '../Footer/';
import ClusterResources from '../ClusterResources/';
import NavBar from '../NavBar/';


class AdminDashboard extends React.Component{
  render(){
    return (
      <div>
        <NavBar />
        
        <div className="Disposable">
          <div><ClusterResources /></div>
        </div>
        {/* <Footer /> */}
      </div>
    )
  }
}

export default AdminDashboard;

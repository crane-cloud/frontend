/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import './AdminDashboard.css';
// import Footer from '../Footer';
// import ClusterResources from '../ClusterResources';
import NavBar from '../NavBar';
import TableList from '../TableList';

class AdminDashboard extends React.Component {
  constructor(props){
    super(props);
    this.state={
      responseData:[
        {'name': 'Derek', 'status': 'Pending', 'Ready':'Half', 'age': '2 Days ago'},
        {'name': 'owen', 'status': 'Running', 'Ready':'Quarter', 'age': '3 Hrs ago'},
        {'name': 'makair', 'status': 'CrashLoopBackOff', 'Ready':'Full', 'age': '46 Days ago'},
      ]
    };
  }
  render() {
    return (
      <div>
        <NavBar />

        <div className="Disposable">
          <div>
            <TableList data={this.state.responseData}/>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default AdminDashboard;

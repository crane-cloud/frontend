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
        {'name': 'Derek', 'status': 'Ready', 'age': '2 Days ago'},
        {'name': 'owen', 'status': 'Unknown', 'age': '3 Hrs ago'},
        {'name': 'makair', 'status': 'Ready', 'age': '46 Days ago'},
      ]
    }
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

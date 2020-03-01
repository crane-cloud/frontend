import React, { Component } from 'react';
import NavBar from '../NavBar';
import SideNav from '../SideNav';
import './DeploymentsPage.css';
import InformationBar from '../InformationBar';

export default class DeploymentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="DeploymentsPageContainer">
        <NavBar />
        <div className="DeploymentsPageMain">
          <div className="DeploymentsPageSideNav">
            <SideNav />
          </div>
          <div className="DeploymentsPageMainContent">
            <InformationBar header="Deployments" />
            <div className="DeploymentsPageTableSection">
              <div className="DeploymentsPageTable">
                <table>
                  <thead className="uppercase extra-bold">
                    <tr>
                      <th>name</th>
                      <th>ready</th>
                      <th>age</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>man city</td>
                      <td>1st</td>
                      <td>champs lig</td>
                    </tr>
                    <tr>
                      <td>pool</td>
                      <td>2nd</td>
                      <td>champs lig</td>
                    </tr>
                    <tr>
                      <td>man u</td>
                      <td>3rd</td>
                      <td>europa</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

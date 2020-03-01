import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getDeployments from '../../redux/actions/getDeployments';
import NavBar from '../NavBar';
import SideNav from '../SideNav';
import './DeploymentsPage.css';
import InformationBar from '../InformationBar';

class DeploymentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.getDeployments();
  }


  render() {
    console.log(this.props.deployments);
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
                  <thead className="uppercase">
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

DeploymentsPage.propTypes = {
  getDeployments: PropTypes.func.isRequired,
  deployments: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = (state) => ({
  deployments: state.deployments
});

export default connect(mapStateToProps, { getDeployments })(DeploymentsPage);

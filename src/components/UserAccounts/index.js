import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getUsersList from '../../redux/actions/usersActions';
import './UserAccounts.css';
import Header from '../Header';
import { BigSpinner } from '../SpinnerComponent';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';


class UserAccounts extends Component {
  componentDidMount() {
    const { getUsersList } = this.props;
    getUsersList();
  }


  render() {
    const { users, isFetched, isRetrieving } = this.props;
    const clusterName = localStorage.getItem('clusterName');
    const { match: { params } } = this.props;

    return (
      <div className="MainPage">
        <div className="TopBarSection"><Header /></div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideNav clusterName={clusterName} clusterId={params.clusterID} />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar header="User Accounts" showBtn={false} />
            </div>
            <div className="ContentSection">
              <div className="ResourcesTable">
                <table className="UsersTable">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                  {
                    isRetrieving ? (
                      <tr className="TableLoading">
                        <div className="SpinnerWrapper">
                          <BigSpinner />
                        </div>
                      </tr>
                    ) : (
                      <tbody>
                        {isFetched && users !== undefined && (
                          (users.map((user) => (
                            <tr>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.roles[0].name}</td>
                            </tr>
                          )))
                        )}
                      </tbody>
                    )
                  }
                </table>
                {(isFetched && users.length === 0) && (
                  <div className="NoContentDiv">
                    <p>No Users Available</p>
                  </div>
                )}
                {(!isRetrieving && !isFetched) && (
                  <div className="NoContentDiv">
                    <p>
                      Oops! Something went wrong!

                      Failed to retrieve Available Users.
                    </p>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

// inititate props
UserAccounts.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  isRetrieving: PropTypes.bool,
  isFetched: PropTypes.bool,
  getUsersList: PropTypes.func.isRequired
};

// assigning defaults
UserAccounts.defaultProps = {
  users: [],
  isRetrieving: false,
  isFetched: false,
};

export const mapStateToProps = (state) => {
  const { isRetrieving, users, isFetched } = state.UsersListReducer;
  return { isRetrieving, users, isFetched };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUsersList
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAccounts);

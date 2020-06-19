import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getUsersList from '../../redux/actions/users';
import './UserAccounts.css';
import Header from '../Header';
import Spinner from '../Spinner';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';


class UserAccounts extends Component {
  componentDidMount() {
    const { getUsersList } = this.props;
    getUsersList();
  }


  render() {
    const { users, isFetched, isFetching } = this.props;
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
              <div className={isFetching ? 'ResourcesTable LoadingResourcesTable' : 'ResourcesTable'}>
                <table className="UsersTable">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  {
                    isFetching ? (
                      <tbody>
                        <tr className="TableLoading">
                          <td>
                            <div className="SpinnerWrapper">
                              <Spinner size="big" />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        {isFetched && users !== undefined && (
                          (users.map((user) => (
                            <tr key={users.indexOf(user)}>
                              <td>{user.name}</td>
                              <td>{user.roles[0].name}</td>
                              <td>{user.email}</td>
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
                {(!isFetching && !isFetched) && (
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
  isFetching: PropTypes.bool,
  isFetched: PropTypes.bool,
  getUsersList: PropTypes.func.isRequired
};

// assigning defaults
UserAccounts.defaultProps = {
  users: [],
  isFetching: false,
  isFetched: false,
};

const mapStateToProps = (state) => {
  const { isFetching, users, isFetched } = state.usersListReducer;
  return { isFetching, users, isFetched };
};

const mapDispatchToProps = {
  getUsersList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAccounts);

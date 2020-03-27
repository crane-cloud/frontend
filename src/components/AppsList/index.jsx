
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAppsList from '../../redux/actions/appsListActions';
import AppsCard from '../AppsCard';
import { BigSpinner } from '../SpinnerComponent';
import './AppsList.css';


class AppsList extends Component {
  componentDidMount() {
    const { params, getAppsList } = this.props;
    getAppsList(params.projectID);
  }

  render() {
    const { apps, isRetrieved, isRetrieving } = this.props;
    return (
      <div className="AppsList">
        {
          isRetrieving ? (
            <div className="TableLoading">
              <div className="SpinnerWrapper">
                <BigSpinner />
              </div>
            </div>
          ) : (
            <div className="AppList">
              {isRetrieved ? (apps.apps.map((app) => (
                <div key={app.id} className="AppCardItem">
                  <AppsCard
                    name={app.name}
                    status
                    url={app.url}
                  />
                </div>
              )))
                : (
                  <div className="NoAppsDiv">You haven’t deployed any apps. Click the create button to get started.</div>
                )}
            </div>
          )
        }

      </div>
    );
  }
}

// inititate props
AppsList.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.object),
  isRetrieved: PropTypes.bool,
  isRetrieving: PropTypes.bool
};

// assigning defaults
AppsList.defaultProps = {
  apps: [],
  isRetrieved: false,
  isRetrieving: true
};

export const mapStateToProps = (state) => {
  const { isRetrieving, apps, isRetrieved } = state.AppsListReducer;
  return { isRetrieving, apps, isRetrieved };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAppsList
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppsList);

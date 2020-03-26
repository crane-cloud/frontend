
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAppsList from '../../redux/actions/appsListActions';
import AppsCard from '../AppsCard';
import { BigSpinner } from '../SpinnerComponent';
import './AppsList.css';

const myapps = [
  {
    title: 'Flask',
    status: 'true',
    url: 'http://www.flaskapp.com'
  },
  {
    title: 'Bootstrap',
    status: 'true',
    url: 'http://www.flaskapp.com'
  },
  {
    title: 'nginx',
    status: 'false',
    url: 'http://www.flaskapp.com/asdfam/asdf/asdfas/asd/fas/df/as/df/as/df/asd/'
  },
  {
    title: 'Postgres',
    status: 'true',
    url: 'http://www.flaskapp.com'
  },
  {
    title: 'React',
    status: 'true',
    url: 'http://www.flaskapp.com'
  }
];
class AppsList extends React.Component {
  componentDidMount() {
    const { match, getAppsList } = this.props;
    if (match !== undefined) {
      getAppsList(match.params);
    }
    const projectId = "93ac9f44-717b-4ee9-91cc-1c8a4ac0ae58";
    getAppsList(projectId);
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
                    status={ true }
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



import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getAppsList from '../../redux/actions/appsListActions';
import AppCard from '../AppCard';
import { BigSpinner } from '../SpinnerComponent';
import './AppsList.css';
import crane from '../../assets/images/craneLogo.png';


class AppsList extends Component {
  componentDidMount() {
    const { getAppsList } = this.props;
    getAppsList();
  }

  render() {
    const { apps, isRetrieved, isRetrieving } = this.props;

    return (
      <div className="AppList">
        {
          isRetrieving ? (
            <div className="TableLoading">
              <div className="SpinnerWrapper">
                <BigSpinner />
              </div>
            </div>
          ) : (
            <div>
              {isRetrieved ? (apps.apps.map((app) => (
                <Link to={{ pathname: `/apps/${app.id}/resources` }} key={app.id}>
                  <div key={app.id} className="AppCardItem">
                    <AppCard
                      name={app.name}
                      description={app.description}
                      icon={crane}
                    />
                  </div>
                </Link>
              )))
                : (
                  <div className="EmptyList">
                    <h3>No Apps Available</h3>
                  </div>
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
  const { isRetrieving, apps, isRetrieved } = state.AppsReducer;
  return { isRetrieving, apps, isRetrieved };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAppsList
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppsList);


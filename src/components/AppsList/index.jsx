import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAppsList from '../../redux/actions/appsList';
import AppsCard from '../AppsCard';
import Spinner from '../Spinner';
import './AppsList.css';


class AppsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rerender: false
    };

    this.renderAfterDelete = this.renderAfterDelete.bind(this);
  }

  componentDidMount() {
    const { params: { projectID }, getAppsList } = this.props;
    getAppsList(projectID);
  }

  componentDidUpdate(prevProps, prevState) {
    const { params: { projectID }, getAppsList, newAppCreated } = this.props;
    const { rerender } = this.state;

    if (newAppCreated !== prevProps.newAppCreated) {
      getAppsList(projectID);
    }

    if (rerender !== prevState.rerender) {
      getAppsList(projectID);
    }
  }

  renderAfterDelete() {
    const { rerender } = this.state;
    this.setState({
      rerender: !rerender
    });
  }

  render() {
    const { apps, isRetrieved, isRetrieving } = this.props;
    console.log(apps);
    return (
      <>
        {
          isRetrieving ? (
            <div className="TableLoading">
              <div className="SpinnerWrapper">
                <Spinner size="big" />
              </div>
            </div>
          ) : (
            <div className="AppList">
              {isRetrieved && apps.apps !== undefined && (
                apps.apps.map((app) => (
                  <div key={app.id} className="AppCardItem">
                    <AppsCard
                      name={app.name}
                      status
                      url={app.url}
                      appId={app.id}
                      hasDeleted={this.renderAfterDelete}
                    />
                  </div>
                )))}
            </div>
          )

        }
        {(isRetrieved && apps.apps.length === 0) && (
          <div className="NoResourcesMessage">
            You haven’t created any Apps yet.
            Click the create button to get started.
          </div>
        )}
        {(!isRetrieving && !isRetrieved) && (
          <div className="NoResourcesMessage">
            Oops! Something went wrong!
            Failed to retrieve Apps.
          </div>
        )}
      </>
    );
  }
}

// inititate props
AppsList.propTypes = {
  apps: PropTypes.shape({
    apps: PropTypes.arrayOf(PropTypes.object)
  }),
  isRetrieved: PropTypes.bool,
  isRetrieving: PropTypes.bool,
  getAppsList: PropTypes.func.isRequired,
  newAppCreated: PropTypes.bool.isRequired,
  params: PropTypes.shape({
    projectID: PropTypes.string.isRequired
  }).isRequired
};

// assigning defaults
AppsList.defaultProps = {
  apps: {},
  isRetrieved: false,
  isRetrieving: true
};

const mapStateToProps = (state) => {
  const { isRetrieving, apps, isRetrieved } = state.appsListReducer;
  return { isRetrieving, apps, isRetrieved };
};

const mapDispatchToProps = {
  getAppsList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppsList);

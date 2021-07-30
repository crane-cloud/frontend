import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import getAppsList from "../../redux/actions/appsList";
import { ReactComponent as ButtonPlus } from "../../assets/images/buttonplus.svg";
import AppsCard from "../AppsCard";
import Spinner from "../Spinner";
import styles from "./AppsList.module.css";

class AppsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rerender: false,
    };

    this.renderAfterDelete = this.renderAfterDelete.bind(this);
  }

  componentDidMount() {
    const {
      params: { projectID },
      getAppsList,
    } = this.props;
    getAppsList(projectID);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      params: { projectID },
      getAppsList,
      newAppCreated,
    } = this.props;
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
      rerender: !rerender,
    });
  }

  render() {
    const { apps, isRetrieved, isRetrieving, params } = this.props;
    const sortedApps = apps.apps.sort((a, b) => b.date_created < a.date_created ? 1: -1);
    
    return (
      <>
        {isRetrieving ? (
          <div className={styles.NoResourcesMessage}>
            <div className={styles.SpinnerWrapper}>
              <Spinner size="big" />
            </div>
          </div>
        ) : (
          <div className={styles.AppList}>
            {isRetrieved &&
              sortedApps !== undefined &&
              sortedApps.map((app) => (
                <div key={app.id} className="AppCardItem">
                  <AppsCard
                    name={app.name}
                    appStatus={app.app_running_status}
                    url={app.url}
                    appId={app.id}
                    otherData={params}
                    hasDeleted={this.renderAfterDelete}
                  />
                </div>
              ))}
          </div>
        )}
        {isRetrieved && apps.apps.length === 0 && (
          <div className={styles.NoResourcesMessage}>
            You haven’t created any apps yet. Click the &nbsp; <ButtonPlus className={styles.ButtonPlusSmall} /> &nbsp; button to deploy an app.
          </div>
        )}
        {!isRetrieving && !isRetrieved && (
          <div className={styles.NoResourcesMessage}>
            Oops! Something went wrong! Failed to retrieve Apps.
          </div>
        )}
      </>
    );
  }
}

// inititate props
AppsList.propTypes = {
  apps: PropTypes.shape({
    apps: PropTypes.arrayOf(PropTypes.object),
  }),
  isRetrieved: PropTypes.bool,
  isRetrieving: PropTypes.bool,
  getAppsList: PropTypes.func.isRequired,
  newAppCreated: PropTypes.bool.isRequired,
  params: PropTypes.shape({
    projectID: PropTypes.string.isRequired,
  }).isRequired,
};

// assigning defaults
AppsList.defaultProps = {
  apps: {},
  isRetrieved: false,
  isRetrieving: true,
};

const mapStateToProps = (state) => {
  const { isRetrieving, apps, isRetrieved } = state.appsListReducer;
  return { isRetrieving, apps, isRetrieved };
};

const mapDispatchToProps = {
  getAppsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppsList);

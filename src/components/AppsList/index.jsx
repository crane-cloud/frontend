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
      Searchword: props.word,
      SearchList: [],
    };

    this.renderAfterDelete = this.renderAfterDelete.bind(this);
    this.searchThroughApps = this.searchThroughApps.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      word,
    } = this.props;
    const { rerender } = this.state;

    if (newAppCreated !== prevProps.newAppCreated) {
      getAppsList(projectID);
    }

    if (rerender !== prevState.rerender) {
      getAppsList(projectID);
    }
    if (word !== prevProps.word) {
      this.searchThroughApps();
    }
  }

  searchThroughApps() {
    const { apps, word } = this.props;
    let searchResult = [];
    apps.apps.forEach((element) => {
      if (element.name.toLowerCase().includes(word.toLowerCase())) {
        searchResult.push(element);
      }
    });
    this.setState({
      SearchList: searchResult.sort((a, b) =>
        b.date_created > a.date_created ? 1 : -1
      ),
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  renderAfterDelete() {
    const { rerender } = this.state;
    this.setState({
      rerender: !rerender,
    });
  }

  render() {
    const { SearchList } = this.state;
    const {
      apps,
      isRetrieved,
      isRetrieving,
      params,
      word,
      message,
      openComponent,
    } = this.props;
    const allApps = apps.apps;
    const sortedApps = allApps?.sort((a, b) =>
      b.date_created < a.date_created ? 1 : -1
    );
    return (
      <div>
        {isRetrieving ? (
          <div className={styles.NoResourcesMessage}>
            <div className={styles.SpinnerWrapper}>
              <Spinner size="big" />
            </div>
          </div>
        ) : word !== "" ? (
          <div className={styles.AppList}>
            {isRetrieved &&
              !isRetrieving &&
              SearchList.map((app) => (
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
        ) : (
          <div className={styles.AppList}>
            {apps.apps.length !== 0 &&
              !isRetrieving &&
              isRetrieved &&
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
        {isRetrieved && sortedApps?.length === 0 && (
          <div className={styles.NoAppsError}>
            {message ? (
              message
            ) : (
              <div className={styles.NoAppsResourcesMessage}>
                You haven’t created any apps yet. Click the &nbsp;{" "}
                <ButtonPlus
                  className={styles.ButtonPlusSmall}
                  onClick={openComponent}
                />{" "}
                &nbsp; button to deploy an app.
              </div>
            )}
          </div>
        )}
        {!isRetrieving && !isRetrieved && (
          <div className={styles.NoResourcesMessage}>
            Oops! Something went wrong! Failed to retrieve Apps.
          </div>
        )}
      </div>
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
  getAppsList: PropTypes.func,
  newAppCreated: PropTypes.bool,
  message: PropTypes.string,
  params: PropTypes.shape({
    projectID: PropTypes.string.isRequired,
  }).isRequired,
};

// assigning defaults
AppsList.defaultProps = {
  apps: { apps: [] },
  isRetrieved: false,
  isRetrieving: true,
  message: false,
};

export const mapStateToProps = (state) => {
  const { isRetrieving, apps, isRetrieved } = state.appsListReducer;
  return { isRetrieving, apps, isRetrieved };
};

const mapDispatchToProps = {
  getAppsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppsList);

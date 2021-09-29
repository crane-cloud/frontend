/* eslint-disable linebreak-style */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Databases.css";
import Header from "../Header";
import InformationBar from "../InformationBar";
import Spinner from "../Spinner";
import SideNav from "../SideNav";
import ResourceCard from "../ResourceCard";
import getDatabases from "../../redux/actions/getDatabases";

class Databases extends React.Component {
  componentDidMount() {
    const { getDatabases } = this.props;
    getDatabases();
  }

  render() {
    const {
      databases,
      isFetchingDatabases,
      databasesFetched,
      match: { params },
    } = this.props;
    let clusterName = localStorage.getItem("clusterName");

    return (
      <div className="MainPage">
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideNav clusterName={clusterName} clusterId={params.clusterID} />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              {databases !== 0 ? (
                <InformationBar
                  header={`Number of databases ${databases.total_database_count}`}
                  showBtn={false}
                />
              ) : (
                <InformationBar
                  header="Loading..."
                  showBtn={false}
                />
              )}
            </div>
            <div className="ContentSection">
              {isFetchingDatabases ? (
                <div className="ResourceSpinnerWrapper">
                  <Spinner size="big" />
                </div>
              ) : (
                <>
                  {databasesFetched && databases !== undefined && (
                    <div className="ClusterContainer">
                      <ResourceCard
                        title="MYSQL"
                        count={databases.dbs_stats_per_flavour.mysql_db_count}
                      />
                      <ResourceCard
                        title="POSTGRESQL"
                        count={
                          databases.dbs_stats_per_flavour.postgres_db_count
                        }
                      />
                    </div>
                  )}
                </>
              )}
              {databasesFetched && databases.length === 0 && (
                <div className="NoResourcesMessage">
                  <p>No Databases available</p>
                </div>
              )}
              {!isFetchingDatabases && !databasesFetched && (
                <div className="NoResourcesMessage">
                  <p>
                    Oops! Something went wrong! Failed to retrieve databases
                    information.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Databases.propTypes = {
  databases: PropTypes.arrayOf(PropTypes.object),
  isFetchingDatabases: PropTypes.bool,
  databasesFetched: PropTypes.bool,
  clusterName: PropTypes.string,
  getDatabases: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      clusterID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

Databases.defaultProps = {
  databases: [],
  isFetchingDatabases: false,
  databasesFetched: false,
  clusterName: "",
};

const mapStateToProps = (state) => {
  const { isFetchingDatabases, databasesFetched, databases } =
    state.databasesReducer;
  return {
    isFetchingDatabases,
    databasesFetched,
    databases,
  };
};

const mapDispatchToProps = {
  getDatabases,
};

export default connect(mapStateToProps, mapDispatchToProps)(Databases);

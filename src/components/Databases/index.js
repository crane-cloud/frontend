import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import "./Databases.css";
import Header from "../Header";
import InformationBar from "../InformationBar";
import Spinner from "../Spinner";
import SideNav from "../SideNav";
import ResourceCard from "../ResourceCard";
import getDatabases from "../../redux/actions/getDatabases";

const Databases = (props) => {
  const [clusterName, setClusterName] = useState("");
  const { getDatabases } = props;
  useEffect(() =>
  {
    setClusterName(localStorage.getItem("clusterName"))
    getDatabases();
  }, [getDatabases])

  return (
    <div className="MainPage">
      <div className="TopBarSection">
        <Header />
      </div>
      <div className="MainSection">
        <div className="SideBarSection">
          <SideNav clusterName={clusterName} clusterId={props.match.params.clusterID} />
        </div>
        <div className="MainContentSection">
          <div className="InformationBarSection">
            {props.databases.length !== 0 ? (
              <InformationBar
                header={`Number of databases ${props.databases.total_database_count}`}
                showBtn={false}
              />
            ) : (
              <InformationBar header="Loading..." showBtn={false} />
            )}
          </div>
          <div className="ContentSection">
            {props.isFetchingDatabases ? (
              <div className="ResourceSpinnerWrapper">
                <Spinner size="big" />
              </div>
            ) : (
              <>
                {props.databasesFetched && props.databases.length !== undefined && (
                  <div className="ClusterContainer">
                    <ResourceCard
                      title="MYSQL"
                      count={props.databases.dbs_stats_per_flavour.mysql_db_count}
                    />
                    <ResourceCard
                      title="POSTGRESQL"
                      count={props.databases.dbs_stats_per_flavour.postgres_db_count}
                    />
                  </div>
                )}
              </>
            )}
            {props.databasesFetched && props.databases.length === 0 && (
              <div className="NoResourcesMessage">
                <p>No Databases available</p>
              </div>
            )}
            {!props.isFetchingDatabases && !props.databasesFetched && (
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

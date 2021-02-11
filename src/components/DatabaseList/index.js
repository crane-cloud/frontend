import React from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
import Header from "../Header";
import InformationBar from "../InformationBar";
import SideNav from "../SideNav";
// import Status from "../Status";
// import tellAge from "../../helpers/ageUtility";
import Spinner from "../Spinner";



class DatabaseList extends React.Component {

  render() {

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
              <InformationBar header="Databases" showBtn={false} />
            </div>
            <div className="ContentSection">
              <div
                className={
                  isRetrieving
                    ? "ResourcesTable LoadingResourcesTable"
                    : "ResourcesTable"
                }
              >
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Age</th>
                    </tr>
                  </thead>
                  {isRetrieving ? (
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
                      {isFetched &&
                        databases !== undefined &&
                        databases.map((database) => (
                          <tr key={databases.indexOf(database)}>
                            <td>{database.metadata.name}</td>
                            <td>
                              <Status status={database.status.phase} />
                            </td>
                            <td>{tellAge(database.metadata.creationTimestamp)}</td>
                          </tr>
                        ))}
                    </tbody>
                  )}
                </table>

                {isFetched && databases.length === 0 && (
                  <div className="NoResourcesMessage">
                    <p>No Volume Claims Available</p>
                  </div>
                )}
                {!isRetrieving && !isFetched && (
                  <div className="NoResourcesMessage">
                    <p>
                      Oops! Something went wrong! Failed to retrieve Volume
                      Claims.
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

export default DatabaseList;

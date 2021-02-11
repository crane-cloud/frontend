import React from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
import Header from "../Header";
import InformationBar from "../InformationBar";
import SideNav from "../SideNav";
import Status from "../Status";
import Spinner from "../Spinner";

var databases = [];

class DatabaseList extends React.Component {

  render() {
    const isRetrieving = false;
    const isFetched = true;
    return (
      <div className="MainPage">
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideNav />
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
                      <th>Url</th>
                      <th>Name</th>
                      <th>Size</th>
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
                            <td>{database.url}</td>
                            <td>{database.name}</td>
                            <td>{database.size}</td>
                            <td>
                              <Status status={database.status} />
                            </td>
                            <td>{database.age}</td>
                          </tr>
                        ))}
                    </tbody>
                  )}
                </table>

                {isFetched && databases.length === 0 && (
                  <div className="NoResourcesMessage">
                    <p>No Databases Available</p>
                  </div>
                )}
                {!isRetrieving && !isFetched && (
                  <div className="NoResourcesMessage">
                    <p>
                      Oops! Something went wrong! Failed to retrieve Databases.
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

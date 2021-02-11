import React from "react";
import Header from "../Header";
import InformationBar from "../InformationBar";
// import SideNav from "../SideNav";
import Status from "../Status";
import Spinner from "../Spinner";

var databases = [
    {
        "url": "africakla1.cranecloud.io",
        "name": "AirQo-users",
        "size": 0.1,
        "status": true,
        "time": "28 seconds ago"
    },
    {
        "url": "africa2.cranecloud.io",
        "name": "AirQo-devices",
        "size": 32,
        "status": false,
        "time": "4 days ago"
    },
    {
        "url": "defaultafrica.cranecloud.io",
        "name": "VotingApp-db",
        "size": 5,
        "status": true,
        "time": "5 minutes ago"
    },
];

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
            {/* <SideNav /> */}
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar header="Databases" showBtn={true} />
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
                            <td>{database.time}</td>
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

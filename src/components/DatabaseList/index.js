import React from 'react';
import Header from '../Header';
import InformationBar from '../InformationBar';
// import SideNav from "../SideNav";
import Status from '../Status';
import Spinner from '../Spinner';
import './DatabaseList.css';

const databases = [
  {
    type: 'PostgreSQL',
    name: 'AirQo-users',
    size: 0.1,
    status: true,
    time: '28 seconds ago'
  },
  {
    type: 'MYSQL',
    name: 'AirQo-devices',
    size: 32,
    status: false,
    time: '4 days ago'
  },
  {
    type: 'PostgreSQL',
    name: 'VotingApp-db',
    size: 5,
    status: true,
    time: '5 minutes ago'
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
              <InformationBar header="Databases" showBtn />
            </div>
            <div className="ContentSection">
              <div
                className={
                  isRetrieving
                    ? 'ResourcesTable LoadingResourcesTable'
                    : 'ResourcesTable'
                }
              >
                <div className="DatabaseTable">
                  <div className="DatabaseTableHead">
                    <div className="DatabaseTableRow">
                      <div className="DatabaseTableHeadCell">Name</div>
                      <div className="DatabaseTableHeadCell">Type</div>
                      <div className="DatabaseTableHeadCell">Size</div>
                      <div className="DatabaseTableHeadCell">Status</div>
                      <div className="DatabaseTableHeadCell">Age</div>
                    </div>
                  </div>
                  {isRetrieving ? (
                    <div className="DatabaseTableBody">
                      <div className="TableLoading DatabaseTableRow">
                        <div className="DatabaseTableCell">
                          <div className="SpinnerWrapper">
                            <Spinner size="big" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='DatabaseTableBody'>
                      {isFetched
                        && databases !== undefined
                        && databases.map((database) => (
                          <div className="DatabaseTableRow" key={databases.indexOf(database)}>
                            <div className="DatabaseTableCell">{database.name}</div>
                            <div className="DatabaseTableCell">{database.type}</div>
                            <div className="DatabaseTableCell">{database.size}</div>
                            <div className="DatabaseTableCell">
                              <Status status={database.status} />
                            </div>
                            <div className="DatabaseTableCell">{database.time}</div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {isFetched && databases.lengdiv === 0 && (
                  <div className="NoResourcesMessage">
                    <p>No Databases Available</p>
                  </div>
                )}
                {!isRetrieving && !isFetched && (
                  <div className="NoResourcesMessage">
                    <p>
                      Oops! Somediving went wrong! Failed to retrieve Databases.
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

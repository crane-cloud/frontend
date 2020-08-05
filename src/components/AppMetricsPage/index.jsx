import React from 'react';
import PropTypes from 'prop-types';
import InformationBar from '../InformationBar';
import Header from '../Header';
import SideBar from '../SideBar';
import './AppMetricsPage.css';

class AppMetricsPage extends React.Component {

  render() {
    const { appName, appUrl, liveAppStatus }  = this.props.location;
    const {projectID, userID} = this.props.match.params;
    
    return (
      <div className="Page">
        <div className="TopBarSection"><Header /></div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar userId={userID} projectName={appName} />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar
                header={appUrl}
                status={liveAppStatus}
              />
            </div>
            <div className="ContentSection">
              {/* <AppsList params={params} newAppCreated={isCreated} /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AppMetricsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default AppMetricsPage;

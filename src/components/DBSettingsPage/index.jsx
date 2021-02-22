import React from 'react';
// import { Redirect } from 'react-router-dom';
import InformationBar from '../InformationBar';
import Header from '../Header';
import PrimaryButton from '../PrimaryButton';
// import Spinner from '../Spinner';
// import Modal from '../Modal';
import SideNav from '../SideNav';
// import Feedback from '../Feedback';
// import DeleteWarning from '../DeleteWarning';
import './DBSettingsPage.css';

class DBSettingsPage extends React.Component {
  render() {
    return (
      <div className="Page">
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideNav />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar header="Settings" />
            </div>
            <div className="ContentSection">
              <div />
              <div className="DeleteButtonDiv">
                <PrimaryButton
                  label="Reset Database"
                  className="DeleteBtn"
                />
                <div>Deletes all tables and data, but the database remains.</div>
              </div>
              <div className="DeleteButtonDiv">
                <PrimaryButton
                  label="Delete Database"
                  className="DeleteBtn"
                />
                <div>Destroys the entire database, deleting all tables and data.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DBSettingsPage;

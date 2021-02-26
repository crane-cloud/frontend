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

const DBSettingsPage = () => (
  <div className="Page">
    {/* {isUpdated || isDeleted ? this.renderRedirect() : null} */}
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
          <div>
            <div className="DatabaseDetail">

              <div className="DBDetailRow">
                <div className="DBThead">Type</div>
                <div className="DBTDetail">PostgreSQL</div>
              </div>
              <div className="DBDetailRow">
                <div className="DBThead">Host</div>
                <div className="DBTDetail">2334-fnhhg-db.cranecloud.io</div>
              </div>
              <div className="DBDetailRow">
                <div className="DBThead">Name</div>
                <div className="DBTDetail">gjng84iZkfkQ</div>
              </div>
              <div className="DBDetailRow">
                <div className="DBThead">User</div>
                <div className="DBTDetail">mvnjdlaq33</div>
              </div>
              <div className="DBDetailRow">
                <div className="DBThead">Port</div>
                <div className="DBTDetail">5432</div>
              </div>
              <div className="DBDetailRow">
                <div className="DBThead">Password</div>
                <div className="DBTDetail">njknf_Q7Hijkfj90Ajnv</div>
              </div>
              <div className="DBDetailRow">
                <div className="DBThead">URI</div>
                <div className="DBTDetail">https://fr-bd59b-default-rtdb.africa-kla1.cranecloud.io</div>
              </div>
              <div className="DBDetailRow">
                <div className="DBThead">Size</div>
                <div className="DBTDetail">3.6MB</div>
              </div>
              <div className="DBDetailRow">
                <div className="DBThead">Created</div>
                <div className="DBTDetail">2021-09-13T17:57:29</div>
              </div>
            </div>
          </div>
          <div className="DBButtons">
            <div className="DBDetailRow">
              <PrimaryButton
                label="Reset Database"
                className="ResetBtn"
              />
              <div className="buttonText">Deletes all tables and data, but the database remains.</div>
            </div>
            <div className="DBDetailRow">
              <PrimaryButton
                label="Delete Database"
                className="DBDeleteBtn"
              />
              <div className="buttonText">Destroys the entire database, deleting all tables and data.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DBSettingsPage;

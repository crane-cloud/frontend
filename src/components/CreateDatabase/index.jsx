import React from 'react';
// import { Redirect } from 'react-router-dom';
import Header from '../Header';
import PrimaryButton from '../PrimaryButton';
// import Spinner from '../Spinner';
// import Modal from '../Modal';
import SideNav from '../SideNav';
import Select from '../Select';
import CancelButton from '../CancelButton';
import './CreateDatabase.css';

const flavours = [
  { name: 'MYSQL' },
  { name: 'PostgreSQL' },
  { name: 'MongoDB' },
  { name: 'MariaDB' }
];
const CreateDatabase = () => (
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
          <div className="InformationBar">
            <div className="InformationBarWithButton">
              <div className="InfoHeader">Create database</div>
              <div className="RoundAddButtonWrap">
                <CancelButton />
              </div>
            </div>
          </div>
        </div>
        <div className="ContentSection">
          <div>
            <div className="DatabaseForm">

              <div className="DBFormElements">
                <Select
                  required
                  placeholder="Database Type"
                  options={flavours}
                //   onChange={this.handleSelectChange}
                />
                <div />
                <div className="DBButtons">
                  <div className="DBDetailRow">
                    <PrimaryButton
                      label="Create"
                      className="CreateBtn"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CreateDatabase;

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './AppsPage.css';
import InformationBar from '../InformationBar';
import AppsList from '../AppsList';
import Header from '../Header';

const AppsPage = (props) =>
//   const { user: { accessToken } } = props;
//   localStorage.setItem('token', accessToken);
  (
    <div className="Page">
      <div className="TopRow">
        <Header />
        <InformationBar header="Apps" showBtn />
      </div>
      <div className="MainRow">
        <AppsList />
      </div>
      <div className="FooterRow">
        <p>
          Copyright © 2020 Crane Cloud.
          All Rights Reserved.

        </p>
      </div>
    </div>
  );
const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps, null)(withRouter(AppsPage));

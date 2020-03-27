import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './AppsPage.css';
import BackButton from '../../assets/images/backButton.svg';
import InformationBar from '../InformationBar';
import AppsList from '../AppsList';
import Header from '../Header';

const AppsPage = (props) => {
  const { user: { accessToken, data } } = props;
  const { match: { params } } = props;
  const userId = data.id;
  localStorage.setItem('token', accessToken);
  return (
    <div className="Page">
      <div className="TopRow">
        <Header />
        <InformationBar
          header={(
            <Link to={{ pathname: `/users/${userId}/projects/` }}>
              <div className="BackDiv">
                <img src={BackButton} alt="Back Button" />
                {' '}
                <p>&nbsp; Apps</p>
              </div>
            </Link>
          )}
          showBtn
        />
      </div>
      <div className="MainRow">
        <AppsList params={params} />
      </div>
      <div className="FooterRow">
        <p>
          Copyright © 2020 Crane Cloud.
          <br />
          All Rights Reserved.

        </p>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps, null)(withRouter(AppsPage));

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './ClusterPage.css';
import InformationBar from '../InformationBar';
import ClustersList from '../ClustersList';
import Header from '../Header';

const ClusterPage = (props) => {

  return (
    <div className="Page">
      <div className="TopRow">
        <Header />
        <InformationBar header="Select Infrastructure" showBtn />
      </div>
      <div className="MainRow">
        <ClustersList />
      </div>
      <div className="FooterRow">
        <p>Copyright © 2020 Crane Cloud. All Rights Reserved.</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps, null)(withRouter(ClusterPage));

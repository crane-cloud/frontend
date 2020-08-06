import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PrimaryButton from '../PrimaryButton';
import DotsImg from '../../assets/images/3dots.svg';
import deleteApp, { clearState } from '../../redux/actions/deleteApp';
import Spinner from '../Spinner';
import Modal from '../Modal';
import AppStatus from '../AppStatus';
import Feedback from '../Feedback';
import DeleteWarning from '../DeleteWarning';
import './AppsCard.css';

const AppsCard = (props) => {
  const [openDeleteAlert, setDeleteAlert] = useState(false);
  const [openDropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);

  const {
    clearState, name, appStatus, url, appId, otherData,
    isDeleted, isDeleting, isFailed, message, hasDeleted
  } = props;

  const toggleDropDown = () => {
    if (openDropDown) {
      setDropDown(false);
    } else {
      setDropDown(true);
    }
  };

  const handleDeleteApp = (appId) => {
    const {
      deleteApp
    } = props;

    deleteApp(appId);
  };


  const showDeleteAlert = () => {
    setDeleteAlert(true);
  };

  const hideDeleteAlert = () => {
    clearState();
    setDeleteAlert(false);
    if (isDeleted) {
      hasDeleted();
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropDown(false);
    }
  };

  // componentWillMount & componentWillUnmount
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    // returned function will be called on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => (
    hideDeleteAlert()
  ), [isDeleted]); // eslint-disable-line
  
  return (
    <div className="AppCard">
      <div className="AppCardHeader">
        <div className="AppNameSection">
          <Link to={{ pathname: `/users/${otherData.userID}/projects/${otherData.projectID}/apps/${appId}/metrics`, appName: name, liveAppStatus: appStatus, appUrl: url }} key={otherData.projectID}>
            {name}
          </Link>
        </div>
        <div className="AppIconsSection">
          <div className="StatusData">
            <AppStatus appStatus={appStatus} />
          </div>
        </div>
      </div>
    </div>
  );
};

// inititate props
AppsCard.propTypes = {
  isDeleted: PropTypes.bool,
  isDeleting: PropTypes.bool,
  isFailed: PropTypes.bool,
  name: PropTypes.string.isRequired,
  appStatus: PropTypes.string.isRequired, // this is static
  url: PropTypes.string.isRequired,
  appId: PropTypes.string.isRequired,
  deleteApp: PropTypes.func.isRequired,
  hasDeleted: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};

// assigning defaults
AppsCard.defaultProps = {
  isDeleted: false,
  isDeleting: false,
  isFailed: false
};


const mapStateToProps = (state) => {
  const {
    isDeleting, isDeleted, isFailed, message
  } = state.deleteAppReducer;
  return {
    isDeleting, isDeleted, isFailed, message
  };
};


const mapDispatchToProps = {
  deleteApp, clearState
};

export default connect(mapStateToProps, mapDispatchToProps)(AppsCard);

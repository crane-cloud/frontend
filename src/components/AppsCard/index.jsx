import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DotsImg from '../../assets/images/3dots.svg';
import deleteApp from '../../redux/actions/deleteAppActions';
import './AppsCard.css';
import Status from '../Status';

class AppsCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteApp = this.handleDeleteApp.bind(this);
  }

  handleDeleteApp(e, appId) {
    const { deleteApp } = this.props;
    e.preventDefault();
    deleteApp(appId);
  }


  render() {
    const {
      name, status, url, appId
    } = this.props;
    return (
      <div className="AppCard">
        <div className="AppCardHeader">
          <table className="AppTable">
            <tr>
              <td className="AppName">{name}</td>
              <td className="OtherData">
                <div className="StatusData">
                  <Status status={status} />
                  <div className="AppDropDown">
                    <img src={DotsImg} alt="three dots" className="DropDownImg" />
                    <div className="AppDropDownContent">
                      <div onClick={(e) => this.handleDeleteApp(e, appId)}>Delete</div>
                      <div>Update</div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div className="AppUrlText">Url :</div>
        <div className="AppUrl"><a target="_blank" rel="noopener noreferrer" href={url}>{url}</a></div>
      </div>
    );
  }
}

// inititate props
AppsCard.propTypes = {
  isDeleted: PropTypes.bool,
  isDeleting: PropTypes.bool
};

// assigning defaults
AppsCard.defaultProps = {
  isDeleted: false,
  isDeleting: false
};


const mapStateToProps = (state) => {
  const { isDeleting, isDeleted } = state.deleteAppReducer;
  return { isDeleting, isDeleted };
};


export const mapDispatchToProps = (dispatch) => ({
  deleteApp: (appId) => dispatch(deleteApp(appId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppsCard);

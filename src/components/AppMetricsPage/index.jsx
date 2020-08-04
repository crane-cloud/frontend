import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import createApp, { clearState } from '../../redux/actions/createApp';
import PrimaryButton from '../PrimaryButton';
import BlackInputText from '../BlackInputText';
import Modal from '../Modal';
import RemoveIcon from '../../assets/images/remove.svg';
import InformationBar from '../InformationBar';
import AppsList from '../AppsList';
import Header from '../Header';
import Spinner from '../Spinner';
import Feedback from '../Feedback';
import Checkbox from '../Checkbox';
import Tooltip from '../Tooltip';
import SideBar from '../SideBar';
import Tabs from '../Tabs';
import Select from '../Select';
import './AppMetricsPage.css';

class AppMetricsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { clearState } = this.props;
    clearState();
  }

  componentDidUpdate(prevProps) {
    const { isCreated } = this.props;

    if (isCreated !== prevProps.isCreated) {
      this.hideForm();
    }
  }

  render() {
    
    return (
      <div className="Page">
        <div className="TopBarSection"><Header /></div>
        <div className="MainSection">
          <div className="SideBarSection">
            {/* <SideBar userId={userId} projectName={projectData} /> */}
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar
                showBtn
                btnAction={this.showForm}
              />
            </div>
            <div className="ContentSection">
              {/* <AppsList params={params} newAppCreated={isCreated} /> */}
            </div>
          </div>
        </div>

        {/* Modal for creating a new app
        Its triggered by the value of state.openModal */}
        
      </div>
    );
  }
}

AppMetricsPage.propTypes = {
  isCreated: PropTypes.bool.isRequired,
  isCreating: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  clearState: PropTypes.func.isRequired,
  createApp: PropTypes.func.isRequired,
  errorCode: PropTypes.number,
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  user: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default AppMetricsPage;

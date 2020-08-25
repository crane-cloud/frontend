import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InformationBar from '../InformationBar';
import Header from '../Header';
import Spinner from '../Spinner';
import SideBar from '../SideBar';
import './ProjectMemoryPage.css';

class ProjectMemoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      match: { params }
    } = this.props;

    console.log(params);

    const { name } = this.props.location;
    const { appID } = params;

    return (
      <div className="Page">
        <div className="TopBarSection"><Header /></div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={name}
              params={params}
              pageRoute={this.props.location.pathname} />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar
                header="Memory"
              />
            </div>
            <div className="ContentSection">
              hey
            </div>
          </div>
        </div>


      </div>
    );
  }
}

ProjectMemoryPage.propTypes = {

};

ProjectMemoryPage.defaultProps = {

};

const mapStateToProps = (state) => {

};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMemoryPage);

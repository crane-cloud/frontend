import React, { Component } from 'react';
import SideNavigation from './navigation/sideNav';
import NamespaceDetails from './NamespaceDetails';
import TopNav from '../admin_dashboard/general_components/TopNav';

import '../../assets/css/namespace.css';

class Namespace extends Component {
  render() {
    const { nameSpace } = this.props.location.state;

    return (
      <div>
        <TopNav />
        <div className="container">
          <div className="col-md-9 ml-sm-auto col-lg-10 px-4 my-5">
            <NamespaceDetails nameSpace={nameSpace}/>
            <SideNavigation />
          </div>
        </div>
      </div>
    );
  }
}

export default Namespace;

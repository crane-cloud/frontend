import React, { Component } from "react";

import DeploymentsMain from "./components/deploymentsMain";
import UserTopNav from "../../TopNav/UserTopNav";
import UserSideNav from "../../SideNav/UserSideNav";

export default class Deployment extends Component {
    render() {
        return (
            <div>
                < UserTopNav />
                <div className="container-fluid">
                    <UserSideNav />
                    <DeploymentsMain depID={this.props.match.params.deploymentID} />
                </div>
            </div>
        );
    }
}

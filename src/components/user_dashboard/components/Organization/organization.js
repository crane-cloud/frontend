import React , { Component } from "react";

import UserTopNav from "../TopNav/UserTopNav"; 
import UserSideNav from "../SideNav/UserSideNav";
import OrganizationsMain from "./components/organizationsMain/organizationsMain";

export default class UserOrganization extends Component{

    orgID  = this.props.match.params.orgID;

    render(){
        return (
            <div>
                <UserTopNav />
                <div className="container-fluid">
                    <UserSideNav />
                    <OrganizationsMain orgID={this.orgID}/>
                </div>
            </div>
        );
    }
}
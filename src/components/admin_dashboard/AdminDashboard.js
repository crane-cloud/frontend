import React , { Component } from "react";

import TopNav from "./general_components/TopNav";
import SideNav from "./general_components/sideNav";
import DashboardMain from "./general_components/DashboardMain/DashboardMain";

export default class AdminDashboard extends Component{

    render(){
        return (
            <div>
                <TopNav />
                <div className="container-fluid">
                    <SideNav />
                    <DashboardMain />
                </div>
            </div>
        );
    }
}
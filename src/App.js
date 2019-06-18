import { Component, createElement } from "react";

import AdminDashboard from "./components/admin_dashboard/AdminDashboard"

export default class App extends Component{
    render(){
        return createElement(AdminDashboard);
    }

    componentDidMount(){}

   
}
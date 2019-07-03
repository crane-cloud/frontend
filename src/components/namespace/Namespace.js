import React, { Component } from 'react';
import TopNavigation from "./navigation/TopBar";
import SideNavigation from "./navigation/SideBar";
import NamespaceDetails from "./NamespaceDetails";

import "../../assets/css/namespace.css";

class Namespace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "React"
        }
    }

    render() {
        console.log(this.props.match.params.namespaceId)
        return (
            <div>
                <TopNavigation />
                <div className="container">
                    <div className="col-md-9 ml-sm-auto col-lg-10 px-4 my-5">
                        <NamespaceDetails />
                        <SideNavigation />
                    </div>  
                </div>
            </div>
        )
    }
}

export default Namespace;

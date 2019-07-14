import React , { Component } from "react";

import Header from "./components/header/header";
import LandingContent from "./components/LandingContent/landingContent";

import "./mainSection.css";

export default class MainSection extends Component{
    render(){
        return (
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <Header />
                <h2 className="text-center headingMargin ">Your Osprey Cloud</h2>
                <LandingContent />
            </main>);
    }

}
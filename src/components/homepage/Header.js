import React , { Component } from "react";
import { Link } from "react-router-dom";

export default class HeaderNav extends Component{

    render(){
        return ( 
            <nav className="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow navbar-expand-lg">
                <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">Osprey Cloud</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarText">
                    <div className="navbar-nav mx-auto">
                        <Link className="nav-item nav-link active" to="/">Home <span className="sr-only">(current)</span></Link>
                        <Link className="nav-item nav-link text-white" to="/">Features</Link>
                        <Link className="nav-item nav-link text-white" to="/">Pricing</Link>
                    </div>

                    <ul className="navbar-nav px-3 ml-auto">
                        <li className="nav-item text-nowrap">
                            <Link className="nav-link text-white" to="/login">Sign in</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}



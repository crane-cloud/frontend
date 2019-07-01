import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../../../assets/scss/TopBarNav.scss";

export default class TopNavigation extends Component {

    render() {
        return (
            <div className="topNavBar">
                <nav>
                    <div className="navWide">
                        <div className="wideDiv">
                        <Link to="/admin-dashboard" >Dashboard</Link>
                            <Link to="/billing" >Billing</Link>
                            <Link to="sign-in" >Sign Out</Link>
                        </div>
                    </div>
                    <div className="navNarrow">
                        <div className="narrowLinks">
                        <Link to="/admin-dashboard" >Dashboard</Link>
                            <Link to="/billing" >Billing</Link>
                            <Link to="sign-in" >Sign Out</Link>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }

    burgerToggle = () => {
        let linksEl = document.querySelector('.narrowLinks');
        if (linksEl.style.display === 'block') {
            linksEl.style.display = 'none';
        } else {
            linksEl.style.display = 'block';
        }
    }
}

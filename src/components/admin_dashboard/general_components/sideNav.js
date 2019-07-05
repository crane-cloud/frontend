import React , { Component } from "react";
import { Link } from 'react-router-dom';


export default class SideNav extends Component{

    render(){
        return (
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link className="nav-link active" to="/admin-dashboard">
                      <span data-feather="home"></span>
                      Dashboard <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <span data-feather="file"></span>
                      Monitoring
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <span data-feather="shopping-cart"></span>
                      Errors
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/organizations">
                      <span data-feather="shopping-cart"></span>
                      Organizations
                    </Link>
                  </li>
                </ul>
    
                { /*  start of divider */ }
                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  <span>Users</span>
                  <a className="d-flex align-items-center text-muted" href="#">
                    <span data-feather="plus-circle"></span>
                  </a>
                </h6>
                { /*  end of divider */ }

                <ul className="nav flex-column mb-2">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <span data-feather="file-text"></span>
                      Billing
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <span data-feather="file-text"></span>
                      All users
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
        );
    }
}
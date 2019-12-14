import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class UserTopNav extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow navbar-expand-lg">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Crane Cloud</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarText">
          <div className="navbar-nav mx-auto">
            <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
            <a className="nav-item nav-link text-white" href="#">Features</a>
            <a className="nav-item nav-link text-white" href="#">Pricing</a>
          </div>

          <ul className="navbar-nav px-3 ml-auto">
            <li className="nav-item text-nowrap">
              <Link className="nav-link text-white" to="/login">Sign out</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(UserTopNav);

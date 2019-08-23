import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo} from '../../assets/img/logo.svg';
import { ReactComponent as Ham} from '../../assets/img/ham.svg';
import { ReactComponent as Exit} from '../../assets/img/exit.svg';

import "../../assets/css/auth.css";
import '../../assets/css/style.css';
import '../../assets/scss/home.scss';

class HeaderComponent extends Component {
  state = {
    expand: false
  }

  render() {
    return (
        <header>
          <Link to="/"><Logo className="logo" alt="Crane_Cloud"/></Link>

          <nav>
            <a href="#" onClick={this.handleNavExpand} className="hide-desktop">
              <Ham alt="toggle-menu" className="menu" id="menu" />
            </a>

            <ul className={this.state.expand ? "show-desktop" : "show-desktop hide-mobile"} id="nav">
              <li onClick={this.handleNavExpand} id="exit" className="exit-btn hide-desktop">
                <Exit alt="exit menu" />
              </li>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/login" className="btn-sign-in">Sign In</Link></li>
            </ul>
          </nav>
        </header>
    );
  }

  handleNavExpand = () => {
    const currentState = this.state.expand;
    this.setState({ expand: !currentState})
  }
}

export default HeaderComponent;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo} from '../../assets/img/logo.svg';
import { ReactComponent as Ham} from '../../assets/img/ham.svg';
import { ReactComponent as Exit} from '../../assets/img/exit.svg';
import { ReactComponent as Server} from '../../assets/img/server.svg';
import { ReactComponent as Scroll} from '../../assets/img/scroll.svg';


import "../../assets/css/signin.css";
import '../../assets/css/style.css';
import '../../assets/scss/home.scss';

class HomePage extends Component {
  state = {
    expand: false
  }

  render() {
    return (
      <div className="home-container">
        <header>
          <Logo className="logo" alt="Crane_Cloud"/>

          <nav>
            <a href="#" onClick={this.handleNavExpand} className="hide-desktop">
              <Ham alt="toggle-menu" className="menu" id="menu" />
            </a>

            <ul className={this.state.expand ? "show-desktop" : "show-desktop hide-mobile"} id="nav">
              <li onClick={this.handleNavExpand} id="exit" className="exit-btn hide-desktop">
                <Exit alt="exit menu" />
              </li>
              <li><Link to="#">home</Link></li>
              <li><Link to="#">services</Link></li>
              <li><Link to="#">about</Link></li>
              <li><Link to="/login" className="btn-sign-in">Sign In</Link></li>
            </ul>
          </nav>
        </header>

        <section>
          <Server className="server" alt="server graphic"/>
          <h1>Managed Kubernetes platform for the modern era</h1>
          <p className="subhead">Scale with your need. Pay only for what you use.</p>
          <Scroll className="scroll hide-mobile show-desktop" />
        </section>
      </div>

    );
  }

  handleNavExpand = () => {
    const currentState = this.state.expand;
    this.setState({ expand: !currentState})
  }
}

export default HomePage;

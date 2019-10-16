import React, { Component } from 'react';
import { ReactComponent as Server } from '../../assets/img/server.svg';
import { ReactComponent as Scroll } from '../../assets/img/scroll.svg';
import HeaderComponent from './header';

import '../../assets/css/auth.css';
import '../../assets/css/style.css';
import '../../assets/scss/home.scss';

class HomePage extends Component {
  state = {
    expand: false
  }

  render() {
    return (
      <div className="home-container">
        <HeaderComponent />
        <section>
          <Server className="server" alt="server graphic" />
          <h1>Managed Kubernetes platform on premise and mulitple public clouds.</h1>
          <p className="subhead">Scale with your need. Pay only for what you use.</p>
          <Scroll className="scroll hide-mobile show-desktop" />
        </section>
      </div>
    );
  }

  handleNavExpand = () => {
    const currentState = this.state.expand;
    this.setState({ expand: !currentState });
  }
}

export default HomePage;

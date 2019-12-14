import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { ReactComponent as Cloud } from '../../assets/img/cloud.svg';
import HeaderComponent from './header';

import '../../assets/css/auth.css';
import '../../assets/css/style.css';
import '../../assets/scss/home.scss';

class HomePage extends Component {
  render() {
    return (
      <div className="home-container">
        <HeaderComponent />
        <div className='landing'>
          <Row className='home-grid'>
            <Col xs='12' sm='12' md='12' lg='7' className='col-left'>
              <div className='medium'>
                <Cloud className="cloud" alt="cloud graphic" />
              </div>
              <h1>Managed Kubernetes<br />platform on premise<br />& mulitple public clouds.</h1>
              <p className="subhead">Scale with your need. Pay only for what you use.</p>
              <Button className='btn-get-started'>Get Started</Button>
            </Col>
            <Col xs='12' sm='12' md='0' lg='5' className='col-right'>
              <Cloud className="cloud" alt="cloud graphic" />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default HomePage;

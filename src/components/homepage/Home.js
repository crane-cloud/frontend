import React, { Component } from 'react';
import HeaderNav from "./Header";
import Footer from './Footer';
import "../../assets/css/signin.css";
import '../../assets/css/style.css';

class HomePage extends Component {  
  render() {
    return (
      <div>
        <HeaderNav/>
        <div id="home">
          <div className="landing-text">
            <h1>OSPREY CLOUD</h1>
            <h3>Easy, user-centered Cloud Platform</h3>
            {/* <button className="btn btn-secondary btn-lg"><a href="./pages/login.html">Get Started</a></button> */}
          </div>
        </div>

        <div className="padding">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <img src="../..Assets/images/image1.png" alt="" />
              </div>
              <div className="col-sm-6 text-center">
                <h2>Try It Out Today</h2>
                <p className="lead"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                <p className="lead"> It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <h4>Save Money</h4>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <img src="../../Assets/image/dollar2.png" className="image-responsive" alt=""/>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <h4>Zero downtime</h4>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <img src="../..Assets/image/lightning.jpeg" className="image-responsive" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div id="fixed">
        </div>

        <div className="padding">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <h4>Tailored Solutions</h4>
                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. </p>
                <p> It has survived not only five centuries, but also the leap into electronic typesetting.</p>
              </div>
              <div className="col-sm-6">
                <img src="../..Assets/image/image5.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default HomePage;

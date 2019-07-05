import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="container-fluid text-center">
      <div className="row">
        <div className="col-sm-6">
          <h3>Contact Us</h3>
          <br />
          <h4>Our address and contact info here.</h4>
        </div>
        <div className="col-sm-6">
          <h3>Connect with us</h3>
          <a href="#" className="fa fa-facebook"></a>
          <a href="#" className="fa fa-twitter"></a>
          <a href="#" className="fa fa-google"></a>
          <a href="#" className="fa fa-github"></a>
          {/* <a href="#" className="fa fa-youtube"></a> */}
        </div>
      </div>
    </footer>
    );
  }
}
 
export default Footer;

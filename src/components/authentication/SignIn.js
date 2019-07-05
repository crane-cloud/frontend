import React, { Component } from 'react';
import { Link } from "react-router-dom";

import "../../assets/css/signin.css";

class SignInForm extends Component {
    constructor() {
      super();

      this.state = {
        email: "",
        password: ""
      }
    }

    handleChange = (e) => {
      let target = e.target;
      let value = target.type === "checkbox" ? target.checked : target.value;
      let name = target.name;

      this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      if (this.state.email == "admin@email.com" && this.state.password == "1234") {
        window.location = "/admin-dashboard";
      }
    }

    render() {
        return (
            <div className="FormCenter">

                <form className="FormFields" onSubmit={this.handleSubmit}>
 
                     <div className="FormField">
                        <label className="FormField__Label" htmlFor="email">E-mail Address</label>
                        <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="name">Password</label>
                        <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    </div>

                    <div className="FormField">
                        <button className="FormField__Button mr-20">Sign In</button><Link to="/sign-up" className="FormField__Link">Create an account</Link>
                    </div>

                </form>

            </div>
        );
    }
}

export default SignInForm;

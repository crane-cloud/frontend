import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BASE_URL } from '../../config';

import "../../assets/css/signin.css";
import axios from 'axios';

class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            hasAgreed: false
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
        const { password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            alert("passwords dont match")
            return;
        } else if (this.state.hasAgreed !== true) {
            return;
        } else {
            console.log('The form was submitted with the following data:');
            console.log(this.state);
            this.registerUser();

        }
    }

    registerUser = () => {
        const { name, email, password, confirmPassword } = this.state;

        axios.post(BASE_URL + '/register', {
            name: name,
            email: email,
            password: password

        })
            .then((response) => {
                // handle JWT response here
                console.log(response);
            })
            .catch((error) => {
                console.log(error)
            })

    }

    render() {
        const { name, email, password, confirmPassword } = this.state;
        return (
            <div className="FormCenter">

                <form className="FormFields" onSubmit={this.handleSubmit}>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="name">Full Name</label>
                        <input type="text" id="name" className="FormField__Input" placeholder="Enter your full name" name="name" value={name} onChange={this.handleChange} required autoFocus />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="email">E-mail Address</label>
                        <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={email} onChange={this.handleChange} required />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="password">Password</label>
                        <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={password} onChange={this.handleChange} required />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="password">Confirm password</label>
                        <input type="password" className="FormField__Input" placeholder="Enter your password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} required />
                    </div>

                    <div className="FormField">
                        <label className="FormField__CheckboxLabel">
                            <input type="checkbox" className="FormField__Checkbox" name="hasAgreed" value={this.state.hasAgreed} onChange={this.handleChange} />I agree to the <a href="" className="FormField__TermsLink">terms of service</a>
                        </label>
                    </div>

                    <div className="FormField">
                        <button className="FormField__Button mr-20">Sign Up</button> <Link to="/login" className="FormField__Link">I'm already a member</Link>
                    </div>

                </form>

            </div>

        );
    }
}

export default SignUpForm;
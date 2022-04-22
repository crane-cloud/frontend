import React from 'react';
import { shallow } from 'enzyme';
import Header from "../Header";
import RegisterPage from './index';

describe('<RegisterPage/> Component', () => {
    const handleOnChange = jest.fn(); 
    const toGithubauth = jest.fn();
    const validateEmail = jest.fn();
    const handleSubmit = jest.fn();
    
  const RegisterPageComponent = shallow(<RegisterPage />);

  it(' component should match the snapshot', () => {
    expect(RegisterPageComponent).toMatchSnapshot();
    expect(RegisterPageComponent).toBeDefined();
    expect(handleOnChange).toBeDefined();
    expect(toGithubauth).toBeDefined();
    expect(validateEmail).toBeDefined();
    expect(handleSubmit).toBeDefined();
  });

  it('should have an email field', () => {
    expect(RegisterPageComponent.find('InputText[name="email"]').length).toEqual(1);
  });

  it('should have proper props for email field', () => {
    expect(RegisterPageComponent.find('InputText[name="email"]').props()).toEqual({
      onChange: expect.any(Function),
      placeholder: "Email Address",
      required: true,
      value: "",
      name:"email"
    }); 
  });

  it('should have a password field', () => { 
    expect(RegisterPageComponent.find('InputPassword[name="password"]').length).toEqual(1);
    });
  it('should have proper props for password field', () => { 
    expect(RegisterPageComponent.find('InputPassword[name="password"]').props()).toEqual({
        onChange: expect.any(Function),
        placeholder: 'Password',
        required: true,
        value: "",
        name:"password"
      });
   });

  
  it('should have proper props for submit button', () => { 
    expect(RegisterPageComponent.find('.SignupBtn').props()).toEqual({
        onClick: expect.any(Function),
        className: "SignupBtn AuthBtn",     
        label:"Register"
      });
   });
   
});
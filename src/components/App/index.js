import React from 'react';
import './App.css';
import Footer from '../Footer/';
import Content from '../ResourceCard/';
import ClusterResources from '../ClusterResources/';
import Button from '../ButtonComponent';

/* These below are for showing purposes */
/* THIS IS GOING TO BE REMOVED IN THE DASHBOARD FEATURE */

// LogIn a user
const logIn = () =>{
  alert ("User is logged in Successfully")
}

// Register a user
const registerUser = () =>{
  alert ("User is registered in Successfully")
}

const loginName="Login"


const App = () => {
  return (
  <div>
    {/* login button */}
    <Button
      buttonName={loginName} 
      onClick={logIn}
    />

     {/* Register button */}
     <Button 
      buttonName="Register"
      onClick= {registerUser}
      />


    
    <div className="Disposable">
      <div><ClusterResources /></div>
    </div>
    <Footer />
  </div>
  );
}

export default App;

import React from "react";
// import UserServices  from "../../service/userService/UserServices";
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
const base_url="http://localhost:9090/login";

const Login=()=>{
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    
   
    // Handling the email change
    const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
    };
    
    // Handling the password change
    const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
    };
    
    // Handling the form submission
    const handleSubmit = (e) => {
    e.preventDefault();
    if (email==='' || password === '') {
    setError(true);
    } else {
        const user={email,password}
    axios.post(base_url,user)
    .then((response)=>{
        console.log(response);
        if (response==="")
            {
                
                console.log("invalid username and password");
            }
        else
        {console.log(response)}
    })
    .catch((error)=>{
        console.log("invalid email or password");
        setError(true);
    })
    setError(false);
    }
    }
    
    // Showing success message
    const successMessage = () => {
    return (
    <div
    className="success"
    style={{
    display: submitted ? '' : 'none',
    }}>
    <h1>User successfully registered!!</h1>
    </div>
    );
    };
    
    // Showing error message if error is true
    const errorMessage = () => {
    return (
    <div
    className="error"
    style={{
    display: error ? '' : 'none',
    }}>
    <h1>Please enter all the fields</h1>
    </div>
    );
    };
    
    return (
    <div >
    
    <h1>User Login</h1>
    
    
    {/* Calling to the methods */}
    {/* <div className="messages">
    {errorMessage()}
    {successMessage()}
    </div> */}
    
    <form class="needs-validation" novalidate>
      <div class="col-md-4">
      <label for="email" class="form-label">Email</label>
        <input type="text" class="form-control" id="email" value={email} required onChange={handleEmail}/>
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>
      <div class="col-md-4">
      <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" value={password} required onChange={handlePassword}/>
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>
      <div class="col-md-4">
        <button class="btn btn-primary" type="submit" onClick={handleSubmit}>Login</button>
      </div>
    </form>
    </div>
    );
}

export default Login;
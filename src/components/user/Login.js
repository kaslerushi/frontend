import React from "react";
import { useState,useRef,useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from "../../api/axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const Login=()=>{

  const {setAuth} = useContext(AuthContext);
  const history=useHistory();  
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const errorRef= useRef('');
  const startRef= useRef('');

  const [error,setError]=useState('');

  useEffect(()=>{
    startRef.current.focus();
  },[])

  useEffect(()=>{
    setError('');
  },[email,password])

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const user={email,password};
      const response=axios.post("/login",user);
      const data=(await response).data;
      console.log(response);
      console.log(data);
      setAuth(data);
      history.replace("/");
    }catch(err){
      if(!err?.response){
        setError('No Server Response');
      }else{
        setError('Login Failed')
      }
      errorRef.current.focus();
      
    }
};

    return (
      <>
          <div>
            <h2 className="col-3 offset-4">LOGIN FORM</h2>
            <form onSubmit={handleSubmit}>
              <div className="col-3 offset-4">
              <label htmlFor="email" className="form-label label">Email</label>
                <input ref={startRef} type="text" placeholder='Enter Email-ID' className="form-control" id="email" 
                      value={email} required onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div className="col-3 offset-4">
              <label htmlFor="password" className="form-label label">Password</label>
                <input type="password" placeholder='Enter password' className="form-control" id="password" 
                      value={password} required onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <p ref={errorRef} className={error?"col-5 offset-4 error":"offscreen"}> {error} </p>
              <div className="col-3 offset-5">
                <button disabled={email==='' || password==='' ?true:false}
                        className="btn btn-primary submit" type="submit">Login</button>
              </div>
              <div className="col-4 offset-4">
                <p>Want to create a new account ? ...click below</p>
                <Link to="/register">Create Account</Link>
              </div>
            </form>
          </div>
      </>
    )
}

export default Login;
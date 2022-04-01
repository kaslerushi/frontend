  import React from 'react';
  import { useState,useRef, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import axios from "../../api/axios";
  import Select from 'react-select';

  const Register=()=>{

  const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,18}$/;

  const errorRef= useRef('');
  const startRef= useRef('');

  // const roles=[
  //   {lable:'customer',value:'CUSTOMER'},
  //   {lable:'farmer',value:'FARMER'},
  //   {lable:'admin',value:'ADMIN'}
  // ]
  const [role, setRole] = useState('CUSTOMER');

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [matchPwd,setMatchPwd]=useState(false);

  const [error,setError]=useState('');
  const [successful,setSuccessful]=useState(false);
  
  useEffect(()=>{
    startRef.current.focus();
  },[])

  useEffect(()=>{
    setError('');
    if(EMAIL_REGEX.test(email)){
      setValidEmail(true)
    }else{
      setValidEmail(false)
    };

    if(PWD_REGEX.test(password)){
      setValidPwd(true)
    }else{
      setValidPwd(false)
    };
  },[email,password])

  useEffect(()=>{
    if(confirmPassword === password){
      setMatchPwd(true)
    }else{
      setMatchPwd(false)
    }
  },[password,confirmPassword])

  const handleSubmit = async(e) => {
      e.preventDefault();
      const result=EMAIL_REGEX.test(email) && PWD_REGEX.test(password);
      if(!result) {
        setError('invalid email or password');
        errorRef.current.focus();
      } else {
        const user={role,fname,lname,email,password,confirmPassword}
        console.log(user);
        try{
          const response=await axios.post("/register",user);
          console.log(response?.data);
          setSuccessful(true);
        }catch(err){
          console.log(err);
          setSuccessful(false);
          if(!err?.response){
            setError('No Server Response');
          }else if(err.response?.status === 409){
            setError('Email Taken');
          }else{
            setError('Registration Failed')
          }
          errorRef.current.focus();
        }
      }
  };

  // const handleRole=(e)=>{
   
  //   console.log(e);
  // }

return (
      <>
        {successful?(
            <div className="col-5 offset-4">
              <h4>Successful Registration</h4>
              <Link to="/login">Login Page</Link>
            </div>
            ):(
            <div>
              <h2 className="col-3 offset-4">REGISTRATION FORM</h2>
              <form onSubmit={handleSubmit}>
                {/* <div className="col-3 offset-4"> */}
                  {/* <label htmlFor="s1" className="form-label label">Are you a ?</label> */}
                  {/* <Select options={roles} defaultValue={roles[0]} onChange={(e)=>{setRole(e.value)}}/> */}
                  {/* <select id="s1" defaultValue={roles[]} className="form-select" onChange={handleRole}>
                    {roles.map((r)=>{<option id={r.lable} value={r.value}>{r.lable}</option>})} */}
                  {/* </select>
                </div> */}
                <div className="col-3 offset-4">
                  <label ref={startRef} htmlFor="fname"  className="form-label label">First name</label>
                  <input type="text" placeholder='Enter first name' className="form-control" id="fname"
                        value={fname} required onChange={(e)=>setFname(e.target.value)} />
                </div>
                <div className="col-3 offset-4">
                  <label htmlFor="lname" className="form-label label">Last name</label>
                  <input type="text" placeholder='Enter last name' className="form-control" id="lname" 
                        value={lname} required onChange={(e)=>setLname(e.target.value)}/>
                </div>
                <div className="col-3 offset-4">
                <label htmlFor="email" className="form-label label">Email</label>
                  <input type="text" placeholder='Enter Email-ID' className="form-control" id="email" 
                        value={email} required onChange={(e)=>setEmail(e.target.value)} 
                        onFocus={()=>setEmailFocus(true)} onBlur={()=>setEmailFocus(false)}/>
                  <p className={emailFocus&&!validEmail?"instructions":"offscreen"}>email must be valid and unique</p>
                  <p className={!emailFocus&&!validEmail&&email?"error":"offscreen"}>invalid email</p>
                </div>
                <div className="col-3 offset-4">
                <label htmlFor="password" className="form-label label">Password</label>
                  <input type="password" placeholder='Enter password' className="form-control" id="password" 
                        value={password} required onChange={(e)=>setPassword(e.target.value)}
                        onFocus={()=>setPwdFocus(true)} onBlur={()=>setPwdFocus(false)}/>
                  <p className={pwdFocus&&!validPwd?"instructions":"offscreen"}>
                  Must include uppercase and lowercase letters,<br/> a number and a special character.</p>
                  <p className={!pwdFocus&&!validPwd&&password?"error":"offscreen"}>invalid password</p>
                </div>
                <div className="col-3 offset-4">
                <label htmlFor="confirmPassword" className="form-label label">Confirm Password</label>
                  <input type="password" placeholder='Enter password' className="form-control" id="confirmPassword" 
                        value={confirmPassword} required onChange={(e)=>setConfirmPassword(e.target.value)}/>
                  <span className={matchPwd?"offscreen":"pwd"}>Password is not matching</span>
                </div>
                <div>
                  <p ref={errorRef} className={error?"col-5 offset-4 error":"offscreen"}> {error} </p>
                </div>
                <div className="col-4 offset-5">
                  <button disabled={fname==='' || lname==='' || email==='' || password==='' || !matchPwd ?true:false}
                          className="btn btn-lg btn-primary submit" type="submit">Submit</button>
                </div>
              </form>
            </div>
          )
        }
      </>
    );
}

export default Register;

  import { useState,useRef } from 'react';
import { Link } from 'react-router-dom';
  import axios from "../../api/axios";
  

  export default function Register() {
  const errorRef= useRef('');
  const userRef= useRef('');

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error,setError]=useState('');
  const [successful,setSuccessful]=useState(false);

  const handleFname = (e) => {
    setFname(e.target.value);
  };

  const handleLname = (e) => {
    setLname(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
      e.preventDefault();
      if (fname === '' || lname === '' || email==='' || password === '' ) {
        setError('cannot leave the fields empty');
      } else {
        const user={fname,lname,email,password,confirmPassword}
        try{
          const response=await axios.post("/register",user);
          console.log(response);
          setSuccessful(true);
        }catch(error){
          console.log(error);
        }
      }
  };

    return (
        
{successful?(<div>
              <span ref={errorRef} className="col-3 offset-4" style={{color:"red"}}>{error}</span>
              <h2 className="col-3 offset-4">REGISTRATION FORM</h2>
              <form onSubmit={handleSubmit} >
                <div className="col-3 offset-4">
                  <label htmlFor="fname"  className="form-label">First name</label>
                  <input ref={userRef} type="text" placeholder='Enter first name' className="form-control" id="fname"
                        value={fname} required autofocus onChange={handleFname} />
                </div>
                <div className="col-3 offset-4">
                <label htmlFor="lname" className="form-label">Last name</label>
                  <input type="text" placeholder='Enter last name' className="form-control" id="lname" 
                        value={lname} required onChange={handleLname}/>
                </div>
                <div className="col-3 offset-4">
                <label htmlFor="email" className="form-label">Email</label>
                  <input type="text" placeholder='Enter Email-ID' className="form-control" id="email" 
                        value={email} required onChange={handleEmail}/>
                </div>
                <div className="col-3 offset-4">
                <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" placeholder='Enter password' className="form-control" id="password" 
                        value={password} required onChange={handlePassword}/>
                </div>
                <div className="col-3 offset-4">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input type="password" placeholder='Enter password' className="form-control" id="confirmPassword" 
                        value={confirmPassword} required onChange={handleConfirmPassword}/>
                </div>
                <div className="col-3 offset-4">
                  <button className="btn btn-primary" type="submit">Submit</button>
                </div>
              </form>
            </div>):(
              <div>
                <h4>Successful Registration</h4>
                <Link to="/login">Login Page</Link>
              </div>
            )
    );
  }
































// import React from "react";
// import { Link } from "react-router-dom";
// import { useRef, useState, useEffect } from "react";
// import {AddUser} from "../../service/userService/UserServices"
// import { Form } from "react-bootstrap";
// addEmployee(emp).then((result)=>{
//     console.log(result.data);
//     this.props.history.push("/")
// })

// const Register=()=>{

//     const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
//     const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//     const EMAIL_REGEX=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//     const MOBNO_REGEX=/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;

//     const userRef = useRef();
//     const errRef = useRef();

//     const [fname,setFname] = useState('')
//     const [fnameFocus, setFnameFocus] = useState(false)
//     // const [validFname, setValidFname] = useState(false);

//     const [lname,setLname] = useState('')
//     const [lnameFocus, setLnameFocus] = useState(false)
//     // const [validLname, setValidLname] = useState(false);

//     const [mobNo,setMobNo] = useState('')
//     const [mobNoFocus, setMobNoFocus] = useState(false)
//     const [validMobNo, setValidMobNo] = useState(false)

//     const [email,setEmail] = useState('')
//     const [emailFocus, setEmailFocus] = useState(false)
//     const [validEmail, setValidEmail] = useState(false)

//     const [pwd,setPwd] = useState('')
//     const [pwdFocus, setPwdFocus] = useState(false)
//     const [validPwd, setValidPwd] = useState(false)

//     const [matchPwd,setMatchPwd] = useState('')
//     const [validMatch, setValidMatch] = useState(false)
//     const [matchFocus, setMatchFocus] = useState(false)

//     const [errMsg, setErrMsg] = useState('');
//     const [success, setSuccess] = useState(false);
    
//     useEffect(() => {
//         userRef.current.focus();
//     }, [])

//     useEffect(() => {
//         setValidEmail(EMAIL_REGEX.test(email));
//     }, [email])

//     useEffect(() => {
//         setValidMobNo(MOBNO_REGEX.test(mobNo));
//     }, [mobNo])

//     useEffect(() => {
//         setValidPwd(PWD_REGEX.test(pwd));
//         setValidMatch(pwd === matchPwd);
//     }, [pwd, matchPwd])

//     useEffect(() => {
//         setErrMsg('');
//     }, [email, pwd, matchPwd])

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // if button enabled with JS hack
//         const v1 = USER_REGEX.test(email);
//         const v2 = PWD_REGEX.test(pwd);
//         if (!v1 || !v2) {
//             setErrMsg("Invalid Entry");
//             return;
//         }
//         try {
//             const response = AddUser(fname,lname,email,mobNo,pwd).then((response)=>{
//                     console.log(response.data);
//                 })
//             console.log(fname,lname,email,mobNo,pwd)
//             console.log(JSON.stringify(response))
//             setSuccess(true);
//             //clear state and controlled inputs
//             //need value attrib on inputs htmlFor this
//             setFname('');
//             setLname('');
//             setMobNo('');
//             setEmail('');
//             setPwd('');
//             setMatchPwd('');
//         } catch (err) {
//             if (!err.response) {
//                 setErrMsg('No Server Response');
//             } else if (err.response.status === 409) {
//                 setErrMsg('email Taken');
//             } else {
//                 setErrMsg('Registration Failed')
//             }
//             errRef.current.focus();
//         }
//     }


//     return(
// <>
// {success ? 
//     (
//         <section>
//             <h1>Success!</h1>
//             <p>
//                 <Link to="/login">
//                     Go To LoginPage
//                 </Link>
//             </p>
//         </section>
//     ) : (
//         <section>
//     <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
//         <h1>Register Form</h1>
//         <Form onSubmit={handleSubmit}>
//                     <label htmlFor="fname">
//                         First name:    
//                     </label>
//                     <input type="text" id="fname" value={fname} autoComplete="off" placeholder="Your name"
//                             ref={userRef} onChange={(e) => setFname(e.target.value)} required
//                             onFocus={() => setFnameFocus(true)} onBlur={() => setFnameFocus(false)}/>
//                     <label htmlFor="lname">
//                         Last name:    
//                     </label>
//                     <input type="text" id="lname" value={lname} autoComplete="off" placeholder="Your sirname"
//                             onChange={(e) => setLname(e.target.value)} required
//                             onFocus={() => setLnameFocus(true)} onBlur={() => setLnameFocus(false)}/>
//                     <label htmlFor="mobNo">
//                         Mobile No:    
//                     </label>
//                     <input type="text" id="mobNo" value={mobNo} autoComplete="off" placeholder="Enter mobile number"
//                             onChange={(e) => setMobNo(e.target.value)} required
//                             onFocus={() => setMobNoFocus(true)} onBlur={() => setMobNoFocus(false)} 
//                              aria-invalid={validMobNo ? "false" : "true"}
//                             aria-describedby="mobNoNote" />
//                     <p id="mobNoNote" className={mobNoFocus && mobNo && !validMobNo ? "instructions" : "offscreen"}>
//                         Must contain 10 digits<br />
//                     </p>
//                     <label htmlFor="email">
//                         Email-id:    
//                     </label>
//                     <input type="text" id="email" value={email} autoComplete="off" placeholder="Enter Email-id"
//                              onChange={(e) => setEmail(e.target.value)} required
//                             onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)}
//                             aria-invalid={validEmail ? "false" : "true"}
//                             aria-describedby="emailidnote" />
//                     <p id="emailidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
//                         Must end with @xyz.com<br />
//                     </p>
//                     <label htmlFor="pwd">
//                        Password:    
//                     </label>
//                     <input type="password" id="pwd" value={pwd} autoComplete="off" placeholder="Enter password"
//                     onChange={(e) => setPwd(e.target.value)} required
//                     aria-invalid={validPwd ? "false" : "true"}
//                     aria-describedby="pwdnote"
//                     onFocus={() => setPwdFocus(true)}
//                     onBlur={() => setPwdFocus(false)}/>
                
//                     <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
//                         8 to 24 characters.<br />
//                         Must include uppercase and lowercase letters, a number and a special character.<br />
//                         Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
//                     </p>
//                     <label htmlFor="matchPwd">
//                         Re-enter-password    
//                     </label>
//                     <input type="password" value={matchPwd} autoComplete="off" placeholder="re-enter password"
//                             onChange={(e) => setMatchPwd(e.target.value)} required
//                             aria-invalid={validMatch ? "false" : "true"}
//                             aria-describedby="confirmnote"
//                             onFocus={() => setMatchFocus(true)}
//                             onBlur={() => setMatchFocus(false)}/>
//                     <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
//                         Must match with the first password input field.
//                     </p>
            
//                     <button disabled={!validEmail || !validPwd || !validMatch ? true : false}>Submit</button>
            
//                     <h5>Already Registered</h5>
                
//                     <Link to="/login">
//                         Go to login page
//                     </Link>
                
//         </Form>
//         </section>
        
//     )
//  }
// </>
// );
// }

// export default Register;
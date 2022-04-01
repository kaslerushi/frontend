import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./header/Navbar";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home=()=>{
    const {auth}=useContext(AuthContext);
    console.log(auth)
    return(
        <>
            <Navbar/>
            <p>hii {auth.fname}</p>
        </>
    );
}
                                                
export default Home;
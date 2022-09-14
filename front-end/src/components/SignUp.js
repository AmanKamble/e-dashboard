import React, { useState , useEffect } from 'react';
import {useNavigate} from "react-router-dom";

const SignUp = ()=>{
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/')
        }
    },[])

    const collectData = async ()=>{
        console.log(name,email,password);
        let result = await fetch("http://localhost:5000/signup",{
            method:'post',
            body: JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        localStorage.setItem("user",JSON.stringify(result));
        navigate('/');
    }

    return(
        <div className='signup'>
            <h1>Register</h1>
            <input className='inputBox' type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Full Name" />

            <input className='inputBox' type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" />

            <input className='inputBox' type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" />
            <button onClick={collectData} className='signUpButton' type='button'>Sign Up</button>
        </div>
    )
}

export default SignUp;
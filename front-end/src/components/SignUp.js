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
        // <div className='signup'>
        //     <h1>Register</h1>
        //     <input className='inputBox' type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Full Name" />

        //     <input className='inputBox' type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" />

        //     <input className='inputBox' type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" />
        //     <button onClick={collectData} className='signUpButton' type='button'>Sign Up</button>
        // </div>
        <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Register Form</h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="">
              <div className="p-2 w-50">
                <div className="relative">
                  <label for="name" className="leading-7 text-sm text-gray-600"  >Full Name</label>
                  <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Full Name"  id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-50">
                <div className="relative">
                  <label for="email"  className="leading-7 text-sm text-gray-600">Email</label>
                  <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email"  id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-50">
                <div className="relative">
                  <label for="password" className="leading-7 text-sm text-gray-600">Password</label>
                  <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  />
                </div>
              </div>
              <div className="p-2 w-50">
                <button className="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg" onClick={collectData} >Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default SignUp;
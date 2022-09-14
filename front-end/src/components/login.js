import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    }, [])
    
    const handleLogin = async () => {
        console.warn(email, password)
        let result = await fetch("http://localhost:5000/login", {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result);
        if (result.name) {
            localStorage.setItem("user", JSON.stringify(result));
            navigate('/')
        } else {
            alert("please enter correct detail");
        }
    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <input className='inputBox' type="text" onChange={(e) => { setEmail(e.target.value) }} placeholder="E-mail" value={email} />
            <input className='inputBox' type="text" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" value={password} />
            <button onClick={handleLogin} className='signUpButton' type='button'>Login</button>

        </div>
    )
}

export default Login;
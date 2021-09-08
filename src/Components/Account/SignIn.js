import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { signIn } from '../Fetch';
import { useHistory } from 'react-router-dom';

import '../../App.css';
/**
 * SignIn component that allows users to enter their credentials and sign in into website
 */
const SignIn = () => {
    const [cookie, setCookie, removeCookie] = useCookies(['userToken']);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [logged, setLogged] = useState(false)
    let history = useHistory();

    const handleSubmit = () => {
        if((email && email !== '') && (password && password !== '')){
            setError('');
            signIn(email, password, setCookie, setError, setLogged);
        } else {
            setError('All fields must be filled')
        }
    }
    
    useEffect(()=>{
        if (logged)
            history.push('/');
    }, [logged])

    return (
        <div>
            <div className='Form' style={{ marginLeft: '40%', marginTop: '1%' }}>
                <label> Email </label><input type = 'email' value = {email} onChange = {(e)=>setEmail(e.target.value)} />
                <label> Password </label><input type = 'password' value = {password} onChange = {(e)=>setPassword(e.target.value)} />
                <button type = 'button' className = 'NavButton' onClick = {()=>handleSubmit()} > SUBMIT </button>
                <h3 className = 'Error'> {error} </h3>
            </div>
        </div>
    );
}

export default SignIn;
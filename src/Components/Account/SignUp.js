import React, { useState } from 'react';
import { signUp } from '../Fetch';

import '../../App.css';
/**
 *  SignUp component allows new users to Register new accounts. User has to fill in their data such as name, surname, phone number, email and password
 */
const SignUp = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [response, setResponse] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if ((name && name !== '') && (surname && surname !== '') && (phoneNumber && phoneNumber !== '') && (email && email !== '')
            && (password && password !== '') && (repeatPassword && repeatPassword !== '')) {
            if(password === repeatPassword){
                signUp(name, surname, phoneNumber, email, password, setResponse);
                setName(''); setSurname(''); setPhoneNumber(''); setEmail(''); setPassword(''); setRepeatPassword(''); setError('');
            } else {
                setError('Password doesnt match!');
                setResponse('');
            }
        } else {
            setError('All fields must be filled!');
            setResponse('');
        }
    }

    return (
        <div className = 'Form' style = {{marginLeft: '40%', marginTop: '1%'}}>
            <label>Name</label> <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            <label>Surname</label> <input type='text' value={surname} onChange={(e) => setSurname(e.target.value)} />
            <label>Phone number</label> <input type='text' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <label>Email</label> <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Password</label> <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <label>Repeat password</label> <input type='password' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
            <button type='button' className='NavButton' onClick={() => handleSubmit()}> SUBMIT </button>
            <h3 className = 'Error'> {error} </h3>
            <h3> {response} </h3>
        </div>
        
    );
}

export default SignUp;
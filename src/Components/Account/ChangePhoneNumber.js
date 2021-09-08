import { useState } from 'react';
import { changePhoneNumber } from '../Fetch';

import '../../App.css';
/**
 * ChangePhoneNumber component that allows users to change their phone numbers.
 * @param {any} props
 *              cookie - cookie containing user token with JWT and user email
 */
const ChangePhoneNumber = (props) => {
    const [newPhone, setNewPhone] = useState();
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = () => {
        if(newPhone !== null && password !== ''){
            changePhoneNumber(newPhone, password, props.cookie.userToken.token, setResponse);
            setNewPhone(); setPassword(''); setError('');
        } else {
            setResponse('');
            setError('All fields must be filled');
        }

    }

    return (
        <div>
            <div className = 'Form'>
                <label> New phone number    </label> <input type = 'number' value = {newPhone} onChange = {(e) => setNewPhone(e.target.value)} />
                <label> Password            </label> <input type = 'password' value = {password} onChange = {(e) => setPassword(e.target.value)} />
                <button type = 'button' className = 'NavButton' onClick = {()=>handleSubmit()}> SUBMIT </button>
                <h3 className = 'Error'> {error} </h3>
                <h3> {response} </h3>
            </div>
        </div>
    );

}

export default ChangePhoneNumber;
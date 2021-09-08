import { useState } from 'react';
import { changePassword } from '../Fetch';
import '../../App.css';
/**
 * ChangePassword which allows users to change their passwords
 * @param {any} props 
 *              cookie - cookie with user token containing JWT and user email
 */
const ChangePassword = (props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [repeatOld, setRepeatOld] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNew, setRepeatNew] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if((oldPassword === repeatOld && oldPassword !== '') && (newPassword === repeatNew && newPassword !== '')){
            changePassword(oldPassword, newPassword, props.cookie.userToken.token, setResponse);
            setOldPassword(''); setRepeatOld(''); setNewPassword(''); setRepeatNew(''); setError('');
        } else {
            setResponse('');
            if (oldPassword === '' || newPassword === '') setError('All fields must be filled');
            if (oldPassword !== repeatOld) setError('Old passwords doesnt match');
            if (newPassword !== repeatNew) setError('New passwords doesnt match');
        }
    }

    return (
        <div>
            <div className = 'Form'>
                <label> Old password        </label> <input type = 'password' value = {oldPassword} onChange = {(e)=>setOldPassword(e.target.value)} />
                <label> Repeat old password </label> <input type = 'password' value = {repeatOld} onChange = {(e)=>setRepeatOld(e.target.value)} />
                <label> New password        </label> <input type = 'password' value = {newPassword} onChange = {(e)=>setNewPassword(e.target.value)} />
                <label> Repeat new password </label> <input type = 'password' value = {repeatNew} onChange = {(e)=>setRepeatNew(e.target.value)} />
                <button type = 'button' className = 'NavButton' onClick = {()=>handleSubmit()}> SUBMIT </button>
                <h3 className = 'Error'> {error} </h3>
                <h3> {response} </h3>
            </div>
        </div>
    );
}

export default ChangePassword;
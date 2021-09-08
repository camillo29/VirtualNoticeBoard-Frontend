import {useEffect, useState} from 'react'
import { useCookies } from 'react-cookie';
import { getUser } from '../Fetch'
import ChangePassword from './ChangePassword';
import ChangePhoneNumber from './ChangePhoneNumber';
import personIcon from '../../Resources/personIcon.png';
import phoneIcon from '../../Resources/phoneIcon.png';
import emailIcon from '../../Resources/emailIcon.png';
import '../../App.css';

/**
 * Account component that displays users information and renders ChangePassword and ChangePhoneNumber components
 */
const Account = () => {
	const [cookie, setCookie, removeCookie] = useCookies(['userToken']);
	const [user, setUser] = useState('');

	useEffect(() => {
		if(cookie.userToken)
			getUser(cookie.userToken.email, cookie.userToken.token, setUser);
	}, [])

	if (user.hasOwnProperty('message') || !cookie.userToken) {
		return <h1> NOT AUTHORIZED </h1>
	}
	else {
		return (
			<div>
				<h1> ACCOUNT </h1>
				<div className = 'Account' style = {{textAlign: 'center'}}>
					<h3><img src = {personIcon} /> {user.name} {user.surname} </h3>
					<h3><img src = {emailIcon} /> {user.email} </h3>
					<h3><img src = {phoneIcon} /> {user.phoneNumber} </h3>
				</div>
				<div style = {{marginTop: '3%'}}>
					<div style = {{float: 'left', width: '50%'}}>
						<div style = {{marginLeft: '40%'}}>
							<h2> CHANGE PASSWORD </h2>
							<ChangePassword cookie = {cookie}/>
						</div>

					</div>
					<div style = {{float: 'right', width: '50%'}}>
						<div style={{ marginRight: '40%' }}>
							<h2> CHANGE PHONE NUMBER </h2>
							<ChangePhoneNumber cookie={cookie} />
						</div>
					</div>
				</div>
			</div>
		);
	}
	
}

export default Account;
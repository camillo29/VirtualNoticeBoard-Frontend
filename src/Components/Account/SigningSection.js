import React, {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { Link, useHistory } from 'react-router-dom';
import { getUserRole } from '../Fetch';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import '../../App.css'
/**
 * SigningSection is a component that decides what content to render based on if user is signed in or not and wheter user is admin or client.
 * User is not signed in - component renders Sign in and Sign up links.
 * User is signed in - component renders Account, My announcements and My addresses links as well as Sign out button
 * Signed user is admin - component renders the above and Manage Announcements links
 */
const SigningSection = () => {
	const [cookie, setCookie, removeCookie] = useCookies(['userToken']);
	const [role, setRole] = useState('');
	const [isOpen, setOpen] = useState(false);
	const [adminIsOpen, setAdminIsOpen] = useState(false);
	const toggle = () => setOpen(!isOpen);
	const adminToggle = () => setAdminIsOpen(!adminIsOpen)
	let history = useHistory();

	const handleSignOut = () => {
		removeCookie('userToken');
		history.push('/');
	}

	useEffect(()=>{
		if(cookie.userToken){
			getUserRole(cookie.userToken.token, setRole);
			console.log(role);
		}
	}, [cookie.userToken])

	const displayAdminContent = () => {
		if(cookie.userToken && role === 'ADMIN'){
			return (
				<>
					<ButtonDropdown isOpen={adminIsOpen} toggle={adminToggle}>
						<DropdownToggle caret color="primary" tag="button" type="button" className='NavButton'>
							ADMIN SECTION
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem><Link to="/manageAnnouncements" style={{ color: 'gray' }}> Manage announcements </Link></DropdownItem>
						</DropdownMenu>
					</ButtonDropdown>
				</>
			);
		}
	}

	if (cookie.userToken){
			return (
				<>
					<ButtonDropdown isOpen={isOpen} toggle={toggle}>
						<DropdownToggle caret color="primary" tag="button" type="button" className='NavButton'>
							ACCOUNT
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem><Link to="/account" style={{ color: 'gray' }}> Account details </Link></DropdownItem>
							<DropdownItem><Link to="/myAnnouncements" style={{ color: 'gray' }}> My announcements </Link></DropdownItem>
							<DropdownItem><Link to="/manageAddresses" style={{ color: 'gray' }}>My addresses</Link></DropdownItem>
						</DropdownMenu>
					</ButtonDropdown>
					{displayAdminContent()}
					<button type = 'button' className = 'NavButton' onClick = {()=>handleSignOut()}> SIGN OUT </button>
				</>
			);
		}
	else{
			return (
				<>
					<Link to = "/signIn" className = 'NavButton'> SIGN IN HERE </Link>
					<Link to = "/signUp" className = 'NavButton'> SIGN UP HERE </Link>
				</>
			);
		}
}

export default SigningSection;
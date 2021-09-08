import React, {useState} from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import SigningSection from './Account/SigningSection';

/**
 * NavBar component renders navigation menu on top of the website, allowing users to change pages
 * @param {any} props
 *              Cookie - cookie with user token containing JWT and email
 */
const NavBar = (props) => {
    const [isOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!isOpen);

    const decideDropDownContent = () => {
        if (props.cookie.userToken) return (<DropdownItem><Link to="/createAnnouncement" style={{ color: 'gray' }}>Make new announcement</Link></DropdownItem>);
        else return (<DropdownItem disabled>Make new annoucement</DropdownItem>);
    }


    return (
        <div>
            <Link to = "/" className = 'NavButton'>                 MAIN PAGE          </Link>
            <Link to = "/about" className='NavButton'>              ABOUT PAGE         </Link>
            <ButtonDropdown isOpen={isOpen} toggle={toggle}>
                <DropdownToggle caret color="primary" tag="button" type="button" className = 'NavButton' style = {{marginRight: '15px'}}>
                   ANNOUCEMENTS
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem><Link to ="/announcements" style = {{color: 'gray'}}> View announcements </Link></DropdownItem>
                    {decideDropDownContent()}
                </DropdownMenu>
            </ButtonDropdown>
            <SigningSection />
        </div>
    );
 }

export default NavBar;
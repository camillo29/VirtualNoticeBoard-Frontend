import '../../App.css';
import { Link } from 'react-router-dom';
import {useCookies} from 'react-cookie'
/**
 * Announcement component renders single announcement info such as title, description, address, and decides if details button should be displayed
 * @param {any} props
 *              announcement - Announcement object containing needed information to display
 *              admin - Information about user role (ADMIN/CLIENT) in form of bool value (true/false)
 */
const Announcement = (props) => {
    const [cookie, setCookies, removeCookies] = useCookies(['userToken']);

    const returnStreetIfItExists = () => {
        if (props.announcement.address.street) 
            return(
                props.announcement.address.street + ',' 
            );
        else return '';
    }

    const returnAdminInfo = () => {
        if (props.admin) {
            return (
                <p> Author: {props.announcement.user.person.name} {props.announcement.user.person.surname}</p>
            );
        } else return '';
    }

    const decideDetailsContent = () => {
        if (cookie.userToken) return <Link to={{ pathname: "/announcementDetails", state: { id: props.announcement.id } }} className='NavButton'> DETAILS </Link>
        else return <h4> Sign in to see details! </h4>
    }
    return (
        <div className = 'Announcement'>    
            <h2> {props.announcement.title} </h2>
            <p> {props.announcement.description} </p>
            <p> _______________________________ </p>
            <p> {props.announcement.address.city} in {props.announcement.address.province} ({props.announcement.address.country}) </p>
            {returnAdminInfo()}
            {decideDetailsContent()}
        </div>
    );
}

export default Announcement;
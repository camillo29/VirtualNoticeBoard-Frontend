import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getAnnouncementById } from '../Fetch';
import { useCookies } from 'react-cookie';

import addressIcon from '../../Resources/addressIcon.png';
import phoneIcon from '../../Resources/phoneIcon.png';
import emailIcon from '../../Resources/emailIcon.png';
import personIcon from '../../Resources/personIcon.png';

import '../../App.css'
/**
 * AnnouncementDetails component displays all the details of the announcement like complete address and announcement author contact information
 * @param {any} props
 *              location.state?.id - ID of the announcement to fetch
 */
const AnnouncementDetails = (props) => {
    const location = useLocation();
    const announcementId = location.state?.id;
    const [announcement, setAnnouncement] = useState('');
    const [cookie, setCookie, removeCookie] = useCookies(['userToken']);

    const returnStreetIfItExists = () => {
        if (announcement.street)
            return (
                announcement.street + ','
            );
        else return '';
    }

    useEffect(()=>{
        getAnnouncementById(setAnnouncement, announcementId, cookie.userToken.token);
    }, [])

    

    return (
        <div className = 'AnnouncementDetails'>
            <h2> {announcement.title} </h2>
            <div style = {{float: 'left', width: '50%'}}>
                <p> {announcement.description} </p>
            </div>
            <div style = {{float: 'right', width: '50%'}}>
                <h3> Where? </h3>
                <p><img src = {addressIcon} />{returnStreetIfItExists()} {announcement.city} in {announcement.province} ({announcement.country}) </p>
                <h3>Contact the announcer </h3>
                <h4><img src = {personIcon} />{announcement.name} {announcement.surname}</h4>
                <p><img src = {phoneIcon} /> {announcement.phoneNumber} </p>
                <p><img src = {emailIcon} /> {announcement.email} </p>
                <Link to='/announcements' className='NavButton'> BACK TO ANNOUNCEMENTS </Link>
            </div>
            
        </div>
    );
}

export default AnnouncementDetails;
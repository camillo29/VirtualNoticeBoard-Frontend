import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getUserAnnouncements, removeAnnouncement } from '../Fetch';
import Announcement from './Announcement';
import '../../App.css';
/**
 *  MyAnnouncements component lets user to view their own announcements and if they want to remove them from website. 
 */
const MyAnnouncements = () => {
    const [cookie, setCookie, removeCookie] = useCookies(['userToken']);
    const [announcements, setAnnouncements] = useState([]);
    const [refresh, setRefresh] = useState(false);
    
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');

    useEffect(()=>{
        getUserAnnouncements(setAnnouncements, setError, cookie.userToken.token);
    }, [refresh])

    const handleRemove = (ann) =>{
        removeAnnouncement(cookie.userToken.token, ann, setResponse, setRefresh, refresh)
    }

    return (
        <div>
            <h1> MY ANNOUNCEMENTS </h1>
            <div className='Announcements'>
                {announcements.map((ann)=>{
                    return (
                        <div>
                            <Announcement announcement = {ann}/>
                            <h1 className = 'Error'> {error} </h1>
                            <h1> {response} </h1>
                            <button type = 'button' className = 'NavButton' onClick = {()=>handleRemove(ann)}>REMOVE ANNOUNCEMENT</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );

}

export default MyAnnouncements;
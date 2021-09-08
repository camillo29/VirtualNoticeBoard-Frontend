import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getAnnouncements, removeAnnouncement, getUserRole } from '../Fetch';
import Announcement from '../Announcements/Announcement';
/**
 * ManageAnnouncements is a component which allows admin to manage users announcements (removing them). Rendered only if signed user is admin
 */
const ManageAnnouncements = () => {
    const [cookie, setCookie, removeCookie] = useCookies(['userToken']);
    const [announcements, setAnnouncements] = useState([]);
    const [role, setRole] = useState('');
    const [response, setResponse] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(()=>{
        getAnnouncements(setAnnouncements);
        if(cookie.userToken)
            getUserRole(cookie.userToken.token, setRole);
    }, [refresh, cookie.userToken])

    const handleRemove = (ann) => {
        removeAnnouncement(cookie.userToken.token, ann, setResponse, setRefresh, refresh);
    }

    if (cookie.userToken && role === 'ADMIN') {
        return (
            <div>
                <h1> MANAGE ANNOUNCEMENTS </h1>
                <div className='Announcements'>
                    {announcements.map((ann) => {
                        return (
                            <div key={ann.id}>
                                <Announcement announcement={ann} admin={true} />
                                <button type='button' className='NavButton' onClick={() => handleRemove(ann)}> REMOVE ANNOUNCEMENT </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
    else return (<h1> NOT AUTHORIZED </h1>);
}

export default ManageAnnouncements;
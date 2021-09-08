import React, {useEffect, useState} from 'react';
//import { useSelector, useDispatch } from 'react-redux'
import { getAnnouncements } from '../Fetch';
import Announcement from './Announcement';
import SearchBar from './SearchBar';

import '../../App.css';
/**
 * Announcements component used to display list of all announcements. Renders search bar component.
 */
function Announcements(){
    const [announcements, setAnnouncements] = useState([]);
    const [refresh, setRefresh] = useState(false);
    //const announcementsList = useSelector((state) => state.announcementList.list);
    //const dispatch = useDispatch();

    useEffect(()=>{
        getAnnouncements(setAnnouncements);
    }, [refresh])

    return(
        <div>
             <h1> ANNOUCEMENTS </h1>
            <SearchBar announcements={announcements} setAnnouncements={setAnnouncements} setRefresh = {setRefresh} refresh = {refresh}/>
             <div className = 'Announcements'>
                 {announcements.map((announcement)=>{
                    return (
                        <div key = {announcement.id}>
                            <Announcement announcement = {announcement} admin = {false}/>
                        </div>
                    );
                 })}
             </div>
        </div>
       );
}

export default Announcements;
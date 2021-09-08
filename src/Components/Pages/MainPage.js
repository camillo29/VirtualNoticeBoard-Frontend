import React, {useState, useEffect} from 'react';
//import Announcement from '../Announcements/Announcement';
import { debugInitialFill, debugCheckIfDataExists } from '../Fetch';

import '../../App.css'
/**
 * Main page of the website component. First page user will see entering the website.
 * This will show either button to fill database with initial data or information about client and admin signing credential as DEBUG
 */
const MainPage = () =>{
    const [dataExists, setDataExists] = useState();
    const [refresh, setRefresh] = useState(false);
        /*const displayAnnouncements = () => {
            if (this.props.content) {
                return (
                    <div>
                        {this.props.content.map((announcement) => {
                            return (
                                <div key = {announcement.id}>
                                   <Announcement announcement = {announcement} />
                                </div>
                            );
                        })}
                    </div>
                );
            }
            else return '';
        }*/

        useEffect(()=>{
            debugCheckIfDataExists(setDataExists, setRefresh, refresh);
        }, [refresh])

        const decideDebugContent = () => {
            if (dataExists === false)
                return <button type='button' className='NavButton' onClick={() => debugInitialFill()}> Fill database </button>
            else if(dataExists === true) return (
                <>
                    <p>admin =  "email": "jan_kowalski@op.pl" "password": "zaq1@WSX"</p>
                    <p>client = "email": "piotr_drewno@op.pl" "password": "zaq1@WSX"</p>
                </>
                );
        }

        return (
            <div>
            <h1> MAIN PAGE </h1>  
                {decideDebugContent()}
                {/*displayAnnouncements()*/}
            </div>
        );
}

export default MainPage;
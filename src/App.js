import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector} from 'react-redux'
import { useCookies } from 'react-cookie';

import MainPage from './Components/Pages/MainPage';
import About from './Components/Pages/About';
import ErrorPage from './Components/Pages/ErrorPage';
import ManageMyAddresses from './Components/Pages/ManageMyAddresses';
import Announcements from './Components/Announcements/Announcements';
import MakeNewAnnoucement from './Components/Announcements/MakeNewAnnouncement';
import MyAnnouncements from './Components/Announcements/MyAnnouncements';
import AnnouncementDetails from './Components/Announcements/AnnouncementDetails';
import NavBar from './Components/NavBar';
import SignUp from './Components/Account/SignUp';
import Account from './Components/Account/Account';
import SignIn from './Components/Account/SignIn';
import ManageAnnouncements from './Components/AdminPages/ManageAnnouncements';

import './App.css';
/**
 * Core of the application, specifies all the routes with React Router allowing website to be multi paged 
 */
function App() {
    const announcementsList = useSelector((state) => state.announcementList.list);
    const [cookie, setCookie, removeCookie] = useCookies(['userToken']);

    useEffect(()=>{
        document.title = "Virtual Notice Board";
    }, [])

    return (
        <div className = 'App'>
            <div className = 'Header'>
                  <NavBar cookie = {cookie}/>
            </div>
            <div className = 'Main'>
                <Switch>
                    <Route exact path = "/" >               <MainPage /*content = {announcementsList}*//>   </Route>
                    <Route path = "/about">                 <About/>                                        </Route>
                    <Route path = "/announcements">         <Announcements />                               </Route>
                    <Route path = "/createAnnouncement">    <MakeNewAnnoucement />                          </Route>
                    <Route path = "/signUp">                <SignUp />                                      </Route>
                    <Route path = "/signIn">                <SignIn />                                      </Route>
                    <Route path = "/account">               <Account />                                     </Route>
                    <Route path = "/manageAddresses">       <ManageMyAddresses />                           </Route>
                    <Route path = "/manageAnnouncements">   <ManageAnnouncements />                         </Route>
                    <Route path = "/myAnnouncements">       <MyAnnouncements />                             </Route>
                    <Route path = "/announcementDetails">   <AnnouncementDetails />                         </Route>
                    <Route path = '*'>                      <ErrorPage />                                   </Route>
                </Switch>
            </div>
            <div className = 'Footer'>
                  <p style={{ color: 'white' }}> Author: Kamil Świątek  (<a href= 'https://github.com/camillo29' style = {{color: 'white'}}>GITHUB</a>)</p>
            </div>
        </div>
  );
}

export default App;

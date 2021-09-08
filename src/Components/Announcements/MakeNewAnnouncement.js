import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import Address from '../Objects/Address';
import { getAddresses, getTypes, createAnnouncement } from '../Fetch';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import '../../App.css'
/**
 * MakeNewAnnouncement component allows users to create their own announcements provided they have added address, choosed type and they fill in all needed information like title or description. 
 * Contains link to ManageAddresses component.
 */
const MakeNewAnnoucement = () => {
    const [cookie, setCookie, removeCookie] = useCookies(['userToken']);
    //DETAILS
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    //ADDRESS
    const [address, setAddress] = useState('');
    //TYPE
    const [type, setType] = useState('');
    //DATA
    const [addresses, setAddresses] = useState([]);
    const [types, setTypes] = useState([]);

    //OTHER
    const [error, setError] = useState('');
    const [response, setResponse] = useState('');

    useEffect(() => {
        getAddresses(setAddresses, cookie.userToken.token);
        getTypes(setTypes);
    }, []);

    const handleSubmit = () => {
        if (title !== '' && description !== '' && address!=='' && type !== '') {
            createAnnouncement(address, title, description, type, cookie.userToken.token, setResponse);
            setTitle(''); setDescription(''); setAddress(''); setType('');
        } else setError('All required fields must be filled!');
    }

    const displayChoosedAddress = () => {
        if (address !== '' && address !==null)
            return (
                <Address address = {address} />
            );
        else return (<h3 style = {{marginTop: '1%'}}> Choose address from the list </h3>);
    }

    return (
        <div>
            <Autocomplete
                options={addresses}
                getOptionLabel={(option) => option.country + ', ' + option.province + ', ' + option.street + ' ' + option.city}
                style={{ width: '40%', margin: '0 auto', marginTop: '1%' }}
                onChange={(event, value) => setAddress(value)}
                renderInput={(params) =>
                    <TextField {...params} label="Address" variant="outlined" />}
            />
            <Autocomplete
                options={types}
                getOptionLabel={(option) => option.name}
                style={{ width: '40%', margin: '0 auto', marginTop: '1%' }}
                onChange={(event, value) => setType(value)}
                freeSolo
                renderInput={(params) =>
                    <TextField {...params} label="Announcement type" variant="outlined" />}
            />
            {displayChoosedAddress()}
            <div className='Form' style={{ margin: '0 auto', marginTop: '1%', width: '40%'}}>
                <label> Title </label> <input type = 'text' value = {title} onChange = {(e)=>setTitle(e.target.value)} />
                <label> Announcement description </label> <textarea type='text' style={{ marginTop: '5px' }} rows="4" cols="50" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type = 'button' className = 'NavButton' onClick = {()=>handleSubmit()}> SUBMIT </button>
                <h2 className = 'Error'> {error} </h2>
                <h2> {response} </h2>
            </div>
            <h3> Your address not on a list? Add new one here {'->'} <Link to="/manageAddresses" className="NavButton"> MANAGE ADDRESSES </Link> </h3>
        </div>
   );
}

export default MakeNewAnnoucement;
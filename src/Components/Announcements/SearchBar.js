import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {getTypes} from '../Fetch';

import '../../App.css';
/**
 * SearchBar component allows users to filter Announcements list by title/description phrases and/or types of announcements and/or by city/province
 * @param {any} props
 *              Announcements - Array containing announcement objects
 *              setAnnouncements - Setter function allowing to mutate above array
 *              setRefresh - Setter function that signals announcements list refresh needed for the useEffect in parent component
 *              refresh - current refresh value (bool)
 */
const SearchBar = (props) => {
    const [search, setSearch] = useState('');
    const [searchAddress, setSearchAddress] = useState('');
    const [type, setType] = useState('');
    const [types, setTypes] = useState([]);

    useEffect(()=>{
        getTypes(setTypes);
    }, [])

    const handleSearch = () => {
        var tmpAnnouncements = props.announcements;
        if(type !== null && type !== '')
            tmpAnnouncements = tmpAnnouncements.filter(announcement => announcement.type.name.includes(type.name));
        if(search !== '')
            tmpAnnouncements = tmpAnnouncements.filter(announcement => announcement.title.toLowerCase().includes(search.toLowerCase()) || announcement.description.toLowerCase().includes(search.toLowerCase()));
        if(searchAddress !== '')
            tmpAnnouncements = tmpAnnouncements.filter(announcement => announcement.address.city.toLowerCase().includes(searchAddress.toLowerCase()) || announcement.address.province.toLowerCase().includes(searchAddress.toLowerCase()));
        props.setAnnouncements(tmpAnnouncements);
        if ((type === '' || type === null) && search === '' && searchAddress === '') props.setRefresh(!props.refresh);
    }
    
    return (
        <div>
            <div className = 'Form' style = {{marginLeft: '30%'}}>
                <label>Enter phrase from title or description</label> <input type = 'text' value = {search} style = {{width: '200%'}} onChange = {(e)=>setSearch(e.target.value)} />
                <label>Enter city or province</label> <input type='text' value={searchAddress} style={{ width: '200%' }} onChange = {(e)=>setSearchAddress(e.target.value)} />
            </div> 
            <Autocomplete
                    options={types}
                    getOptionLabel={(option) => option.name}
                    style={{ width: '20%', margin: '0 auto', marginTop: '1%' }}
                    onChange={(event, value) => setType(value)}
                    renderInput={(params) =>
                        <TextField {...params} label="Type" variant="outlined" />}
                />
            <button type = 'button' className = 'NavButton' onClick = {()=>handleSearch()}> SEARCH </button>
        </div>
    );
}

export default SearchBar;
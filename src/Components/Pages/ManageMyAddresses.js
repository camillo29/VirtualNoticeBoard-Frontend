import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getAddresses, removeAddress, addAddress } from '../Fetch';
import {useHistory} from 'react-router-dom'
import Address from '../Objects/Address';

import '../../App.css';
/**
 *  ManageMyAddresses component lets user to manage their addresses like adding new ones or deleting existsing ones. If any announcement is tied to the deleted address, it will be deleted as well, Backend handles it. 
 */
const ManageMyAddresses = () => {
    const [cookie, setCookie, removeCookie] = useCookies(['userToken']);
    const [addresses, setAddresses] = useState([]);

    //new address
    const [country, setCountry] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    //
    let history = useHistory();
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(()=>{
        if(cookie.userToken)
            getAddresses(setAddresses, cookie.userToken.token);
        else {
            removeCookie('userToken');
            history.push('/');
        }
    }, [refresh])

    const handleRemove = (address) => {
        removeAddress(address, cookie.userToken.token, setRefresh, refresh);
    }

    const handleSubmit = () => {
        if (country !== '' && province !== '' && city !== '') {
            addAddress(country, province, city, street, cookie.userToken.token, setResponse, setRefresh, refresh);
            setCountry(''); setProvince(''); setCity(''); setStreet(''); setError('');
        } else {
            setError('Fields have to be filled!');
            setResponse('');
        }
    }

    

    if (!cookie.userToken)
        return (
            <h1> NOT AUTHORISED </h1>
        );

    else
        return (
            <div>
                <h1> MANAGE ADDRESSES </h1>
                <div className = 'Addresses'>
                    {addresses.map((address)=>{
                        return (
                            <div key={address.id} className = 'Address'>
                                <Address address = {address} />
                                <button type = 'button' className = 'NavButton' onClick = {()=>handleRemove(address)}> REMOVE ADDRESS </button>
                            </div>
                        );
                    })}
                </div>
                <h2> ADD NEW ADDRESS </h2>
                <div className = 'Form' style = {{width: '30%', margin: '0 auto'}}>
                    <label> Country </label> <input type = 'text' value = {country} onChange = {(e) => setCountry(e.target.value)} />
                    <label> Province </label> <input type = 'text' value = {province} onChange = {(e) => setProvince(e.target.value)} />
                    <label> City </label> <input type = 'text' value = {city} onChange = {(e) => setCity(e.target.value)} />
                    <label> Street </label> <input type = 'text' value = {street} onChange = {(e) => setStreet(e.target.value)} />
                    <button type = 'button' className = 'NavButton' onClick = {()=>handleSubmit()}> SUBMIT </button>
                </div>
                <h1 className='Error'> {error} </h1>
                <h1> {response} </h1>
            </div>
        );
}



export default ManageMyAddresses;
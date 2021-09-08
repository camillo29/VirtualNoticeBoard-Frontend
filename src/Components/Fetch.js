import { fillList } from './Slices/AnnouncementsSlice';

/**
 * Querry to fetch all announcements
 * @param {any} setAnnouncements Announcements array setter
 */
export const getAnnouncements = (setAnnouncements) => {
    const url = 'http://localhost:8080/api/AnnouncementController/announcements';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            setAnnouncements(result);
        })
}

/**
 * Querry to add new user
 * @param {any} name Name of the user
 * @param {any} surname Surname of the user
 * @param {any} phoneNumber User's phone number
 * @param {any} email User's email
 * @param {any} password  User's password
 * @param {any} setResponse Setter for the server response
 */
export const signUp = (name, surname, phoneNumber, email, password, setResponse) => {
    const url = 'http://localhost:8080/api/UserController/signUp';
    let payload = {
        name: name,
        surname: surname,
        phoneNumber: phoneNumber,
        email: email,
        password: password
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }, body: JSON.stringify(payload),
    }
    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            setResponse(result.message);
        })
}

/**
 * Querry to sign in user and save Jason Web Token in cookie
 * @param {any} email user's email
 * @param {any} password user's password
 * @param {any} setCookie function for creating cookie
 * @param {any} setError setter for error response
 * @param {any} setLogged setter for redictering user to main page after success
 */
export const signIn = (email, password, setCookie, setError, setLogged) => {
    const url = 'http://localhost:8080/api/UserController/signIn';
    let payload = {
        email: email,
        password: password,
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-type':'application/json',
            'Accept': 'application/json'
        }, body: JSON.stringify(payload),
    }
    let dt = new Date();
    dt.setMinutes(dt.getMinutes() + 15);

    fetch(url, options)
        .then(response=>response.json())
        .then(result=>{
            if (result.hasOwnProperty('message')) setError(result.message);
            else {
                setCookie('userToken', { token: result.token, email: result.email }, { expires: dt, path: '/' })
                setLogged(true);
                }
        })
}

/**
 * Querry to get user by email
 * @param {any} email User's email
 * @param {any} token User's JW token
 * @param {any} setUser Setter for server response
 */
export const getUser = (email, token, setUser) => {
    const url = 'http://localhost:8080/api/UserController/getUserByMail/' + email;
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'token': token
        }
    }

    fetch(url, options)
        .then(response=>response.json())
        .then(result => {
            setUser(result);
        })
}

/**
 * Querry to fetch user addresses
 * @param {any} setAddresses Setter for server response
 * @param {any} token User's JW token
 */
export const getAddresses = (setAddresses, token) => {
    const url = 'http://localhost:8080/api/AddressController/addressesByUser';
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'token': token
        }
    }

    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            setAddresses(result);
        })
}

/**
 * Querry to fetch all announcement types
 * @param {any} setTypes Setter to save server response
 */
export const getTypes = (setTypes) => {
    const url = 'http://localhost:8080/api/TypeController/types';
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
        }
    }

    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            setTypes(result);
        })
}

/**
 * Querry to create new announcement
 * @param {any} address Address chosed by user
 * @param {any} title Title of the announcement
 * @param {any} description Description of the announcement
 * @param {any} type Type of the announcement chosed by user
 * @param {any} token User's JW token
 * @param {any} setResponse
 */
export const createAnnouncement = (address, title, description, type, token, setResponse) => {
    const url = 'http://localhost:8080/api/AnnouncementController/createAnnouncement';
    let payload = {
        address: address,
        title: title,
        description: description,
        type: type,
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'token': token,
        }, body: JSON.stringify(payload)
    }

    fetch(url, options)
        .then(response=>response.json())
        .then(result => {
            setResponse(result.message);
            return;
        })
}

/**
 * Debug querry that allows calls server to fill database with initial data 
 */
export const debugInitialFill = () => {
    const url = 'http://localhost:8080/api/DebugController/initialFill';
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
        }
    }
    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            return;
        })
}

/**
 * Querry to remove address from database
 * @param {any} address Address to remove
 * @param {any} token User's JW token
 * @param {any} setRefresh Function signaling useEffect to refresh page
 * @param {any} refresh Current refresh value (bool)
 */
export const removeAddress = (address, token, setRefresh, refresh) => {
    const url = 'http://localhost:8080/api/AddressController/removeAddress';
    let payload = {
        address:address    
    }
    const options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'token': token
        },body: JSON.stringify(payload)
    }

    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            setRefresh(!refresh);
            return;
        })
}

/**
 * Querry for adding new address
 * @param {any} country Country (String)
 * @param {any} province Province (String)
 * @param {any} city City (String)
 * @param {any} street Street (String, Optional)
 * @param {any} token User's JW token
 * @param {any} setResponse Server response setter
 * @param {any} setRefresh Refresh value setter
 * @param {any} refresh Current refresh value (bool)
 */
export const addAddress = (country, province, city, street, token, setResponse, setRefresh, refresh) => {
    const url = 'http://localhost:8080/api/AddressController/createAddress';
    let payload = {
        country: country,
        province: province,
        city: city, 
        street: street
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'token': token
        }, body: JSON.stringify(payload)
    }
    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            setResponse(result.message);
            setRefresh(!refresh)
            return;
        })
}

/**
 * Querry for getting logged user's role
 * @param {any} token User's JW token
 * @param {any} setRole Server response setter
 */
export const getUserRole = (token, setRole) => {
    const url = 'http://localhost:8080/api/UserController/getRole';
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'token': token
        }
    }
    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            setRole(result.message);
        })
}

/**
 * Querry for removing announcement
 * @param {any} token User's JW token
 * @param {any} announcement Announcement to remove
 * @param {any} setResponse Server response setter
 * @param {any} setRefresh Refresh setter
 * @param {any} refresh Refresh current value (bool)
 */
export const removeAnnouncement = (token, announcement, setResponse, setRefresh, refresh) => {
    const url = 'http://localhost:8080/api/AnnouncementController/removeAnnouncement';
    let payload = {
        announcementId: announcement.id
    }
    const options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'token': token
        }, body: JSON.stringify(payload)
    }
    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            setResponse(result.message);
            setRefresh(!refresh);
        })
}

/**
 * Querry that checks if database have basic data inside
 * @param {any} setDataExists Server response setter
 * @param {any} setRefresh Refresh setter
 * @param {any} refresh Current refresh value (bool)
 */
export const debugCheckIfDataExists = (setDataExists, setRefresh, refresh) => {
    const url = 'http://localhost:8080/api/DebugController/checkIfDataExists';
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
        }
    }
    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            if (result.message === 'false') setDataExists(false)
            else setDataExists(true);
            setRefresh(!refresh);
            return;
        })
}

/**
 * Querry that fetches signed user announcements
 * @param {any} setAnnouncements Server response setter
 * @param {any} setError Error setter
 * @param {any} token User's JW token
 */
export const getUserAnnouncements = (setAnnouncements, setError, token) => {
    const url = 'http://localhost:8080/api/AnnouncementController/announcementsByUser';
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'token': token
        }
    }
    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            if (result.hasOwnProperty('message')) setError(result.message);
            else setAnnouncements(result);
            return;
        })

}

/**
 * Querry for getting specific announcement by ID
 * @param {any} setAnnouncement Server response setter
 * @param {any} annId Announcement's ID to fetch
 * @param {any} token User's JW token
 */
export const getAnnouncementById = (setAnnouncement, annId, token) => {
    const url = 'http://localhost:8080/api/AnnouncementController/announcement/' + annId;
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'token': token
        }
    }
    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            setAnnouncement(result);
            return;
        })
}

/**
 * Querry allowing user to change password
 * @param {any} oldPassword Old password for verification
 * @param {any} newPassword New password for update
 * @param {any} token User's JW token
 * @param {any} setResponse Server response setter
 */
export const changePassword = (oldPassword, newPassword, token, setResponse) => {
    const url = 'http://localhost:8080/api/UserController/changePassword';
    let payload = {
        oldPassword: oldPassword,
        newPassword: newPassword
    }
    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'token': token
        }, body: JSON.stringify(payload)
    }
    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            setResponse(result.message);
            return;
        })
}

/**
 * Querry allowing user to change phone number
 * @param {any} newPhoneNumber Phone number to update
 * @param {any} password Password for verification
 * @param {any} token User's JW token
 * @param {any} setResponse Server response setter
 */
export const changePhoneNumber = (newPhoneNumber, password, token, setResponse) => {
    const url = 'http://localhost:8080/api/UserController/changePhoneNumber';
    let payload = {
        newPhoneNumber: newPhoneNumber,
        password: password,
    }
    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'token': token
        }, body: JSON.stringify(payload)
    }
    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            setResponse(result.message);
            return;
        })
}
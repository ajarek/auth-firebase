import {fetchMethod} from './fetchMethod'
const updateUserUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCMKT92lcL-zfLubUcdoraW87_xm8-JDP4'

export const updateUser = (displayName, photoUrl) => {
   const token = localStorage.getItem('token')
    return fetchMethod('POST', updateUserUrl, {
        idToken: token,
        displayName,
        photoUrl,
        returnSecureToken: true,
    });
}
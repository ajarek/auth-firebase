import {fetchMethod} from './fetchMethod'
const  DELETE_USER_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyCMKT92lcL-zfLubUcdoraW87_xm8-JDP4'

export const deleteUser = () => {
   const token = localStorage.getItem('token')
    return fetchMethod('POST',  DELETE_USER_URL, {
        idToken: token
    });
}
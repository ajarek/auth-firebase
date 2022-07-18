import {fetchMethod} from './fetchMethod'
const getUserDataUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCMKT92lcL-zfLubUcdoraW87_xm8-JDP4'

export const getUserData = (idToken) => {
    return fetchMethod('POST', getUserDataUrl, {
        idToken
    });
}
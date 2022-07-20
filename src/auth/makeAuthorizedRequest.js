import {fetchMethod} from './fetchMethod';

export const makeAuthorizedRequest = (token,method, url) => {
    if (token) {
    const containsQuestionMark = url.indexOf('?') !== -1
    const urlWithToken = `${url}${containsQuestionMark ? '&' : '?'}auth=${token}`
    return fetchMethod(method,urlWithToken)
    }

}
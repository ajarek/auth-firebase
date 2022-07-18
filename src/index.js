import {signIn} from './auth/signIn';
import {signUp} from './auth/signUp';
import {Form} from './components/form';
import {getUserData} from './auth/getUserData';
import {BoardUser} from './components/boardDownloadData';
import {updateUser} from './auth/updateUser';
//sigIn 
const renderFormSignIn = () => {
const form = new Form("Sign In","sign-in","resultSignIn");
document.querySelector('#root').appendChild(form.render());
eventSubmit()
}

const formLogin=(e)=>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signIn(email, password).then(res => {
        if(res.error) {
        console.log(res.error.message);
        document.querySelector('.resultSignIn').innerHTML=res.error.message;
        }
        else {
            document.querySelector('.resultSignIn').innerHTML=`LOGGED IN : ${res.email.split('@')[0].toUpperCase()}`
            localStorage.setItem('token', res.idToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            clearForm(e.target);
            
        }
       
    })
    
}

const eventSubmit=()=>{
    document.querySelector('#sign-in').addEventListener('submit', formLogin);
}

//signUp
const renderFormSignUp = () => {
const form = new Form("Sign Up","sign-up","resultSignUp");
document.querySelector('#root').appendChild(form.render());
 eventSave()
}

const formSignUp=(e)=>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signUp(email, password).then(res => {
        if(res.error) {
        console.log(res.error.message);
        document.querySelector('.resultSignUp').innerHTML=res.error.message;
        
        }
        else {
            console.log(res);
            document.querySelector('.resultSignUp').innerHTML=`SIGNED UP : ${res.email.split('@')[0].toUpperCase()};`
            clearForm(e.target);
        }
    })
}

const eventSave=()=>{
    document.querySelector('#sign-up').addEventListener('submit', formSignUp);
}

//read User Data
const renderUserData = () => {
    const board=new BoardUser("User Data","btnUserData","data");
    document.querySelector('body').appendChild(board.render());
    eventUserData();
}

const readUserData = () => {
    const token = localStorage.getItem('token');
    getUserData(token).then(res => {
        if(res.error) {
        console.log(res.error.message);
        document.querySelector('.data').innerHTML=res.error.message;
        }
        else {
            console.log(res);
            document.querySelector('.data').innerHTML=`
            display Name:${res.users[0].displayName}<br>
            photo Url:<img src="${res.users[0].photoUrl}"><br>
            user email:${res.users[0].email}<br>  
            local id:${res.users[0].localId}<br>
            last login at:${new Date(Number(res.users[0].lastLoginAt)).toLocaleString('pl')}<br>
            created at:${new Date(Number(res.users[0].createdAt)).toLocaleString('pl')}<br>`
        }
    })
}

const eventUserData=()=>{
    document.querySelector('#btnUserData').addEventListener('click', readUserData);
}
//update User
const renderUpdateUser = () => {
    const board=new BoardUser("Update User","btnUpdateUser","update");
    document.querySelector('body').appendChild(board.render());
    eventUpdateUser();
}

const updateUserData = () => {
    updateUser('Jennie', 'https://randomuser.me/api/portraits/men/75.jpg').then(res => {
        if(res.error) {
        console.log(res.error.message);
        document.querySelector('.update').innerHTML=res.error.message;
        }
        else {
            console.log(res);
            document.querySelector('.update').innerHTML=`
            display name:${res.displayName}<br>
            photo url:${res.photoUrl}<br>
            `
        }
    })
}
const eventUpdateUser=()=>{
    document.querySelector('#btnUpdateUser').addEventListener('click', updateUserData);
}

//clear Form
const clearForm = (form) => {
    form.reset();
}

const initializeApp = () => {
    renderFormSignIn();
    renderFormSignUp();
    renderUserData();
    renderUpdateUser();
}

initializeApp();    
    
    
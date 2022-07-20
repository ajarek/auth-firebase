import {signIn} from './auth/signIn';
import {signUp} from './auth/signUp';
import {Form} from './components/form';
import {getUserData} from './auth/getUserData';
import {BoardUser} from './components/boardDownloadData';
import {updateUser} from './auth/updateUser';
import {DataForm} from './components/dataUpdateForm';
import {sendPasswordResetEmail} from './auth/sendPasswordResetEmail';
import {deleteUser} from './auth/deleteUser';
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
        document.querySelector('.resultSignUp').innerHTML=res.error.message;      
        }
        else {
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
    const board=new BoardUser("data");
    document.querySelector('body').appendChild(board.render());
    eventUserData();
}

const readUserData = () => {
    const token = localStorage.getItem('token');
    getUserData(token).then(res => {
        if(res.error) {
        document.querySelector('.data').innerHTML=res.error.message;
        }
        else {
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
const updateUserData = (e) => {
    const tokenControl = localStorage.getItem('token');
    if(tokenControl){
    e.preventDefault();
    document.querySelector('body').innerHTML='';
    const form = new DataForm("name","foto");
    document.querySelector('body').append(form.render());
    eventSubmitUpdateUserData()
    }
    else{
        alert("You need to sign in first");
    }
}
const eventUpdateUserData=()=>{
    document.querySelector('#btnUpdateUser').addEventListener('click', updateUserData);
}

const renderSubmitUpdateUser = () => {
    const board=new BoardUser("update");
    document.querySelector('body').appendChild(board.render());
    eventUpdateUserData();
}

const  submitUpdateUserData = (e) => {
    e.preventDefault();
    updateUser(`${e.target[0].value}`, `${e.target[1].value}`).then(res => {
        if(res.error) {
        document.querySelector('.updateData').innerHTML=res.error.message;
        }
        else {
            document.querySelector('.updateData').innerHTML=`
            Updated correctly :<br>
            display name:${res.displayName}<br>
            photo url:${res.photoUrl}<br>
            `
            clearForm(e.target);
        }
    })
}
const eventSubmitUpdateUserData=()=>{
    document.querySelector('#formUpdateUser').addEventListener('submit', submitUpdateUserData);
}

//clear Form
const clearForm = (form) => {
    form.reset();
}
//logout
const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    document.querySelector('.resultSignIn').innerHTML=`LOGGED OUT`;
    document.querySelector('.resultSignUp').innerHTML=`SIGNED UP`;
    document.querySelector('.data').innerHTML=''
   
}

const eventLogout=()=>{
    document.querySelector('#btnLogout').addEventListener('click', logout);
}

//reset password
const resetPassword = () => {
    const email = prompt("Enter your email");
    sendPasswordResetEmail(email).then(res => {
        if(res.error) {
        document.querySelector('.resultSignIn').innerHTML=res.error.message;
        }
        else {
            document.querySelector('.resultSignIn').innerHTML=`Email sent`
        }
    })
}

const eventResetPassword=()=>{
    document.querySelector('#btnResetPassword').addEventListener('click', resetPassword);
}

//delete User
const deleteUserAccount = () => {
    const tokenControl = localStorage.getItem('token');
    if(tokenControl){
    deleteUser().then(res => {
        if(res.error) {
        document.querySelector('.resultSignIn').innerHTML=res.error.message;
        }
        else {
            document.querySelector('.resultSignIn').innerHTML=`User deleted`
        }
    })
    }
    else{
        alert("You need to sign in first");
    }
}

const eventDeleteUserAccount=()=>{
    document.querySelector('#btnDeleteUser').addEventListener('click', deleteUserAccount);
}
const initializeApp = () => {
    renderFormSignIn();
    renderFormSignUp();
    renderUserData();
    renderSubmitUpdateUser();
    eventUpdateUserData();
    eventLogout();
    eventResetPassword();
    eventDeleteUserAccount();
}

initializeApp();    
    
    
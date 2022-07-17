import {signIn} from './auth/signIn';
import {signUp} from './auth/signUp';
import {Form} from './components/form';

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
            console.log(res);
            document.querySelector('.resultSignIn').innerHTML=`LOGGED IN : ${res.email.split('@')[0].toUpperCase()}<br>
            email : ${res.email}<br>
            expires at : ${res.expiresIn}<br>
            local id: ${res.localId}`
            localStorage.setItem('token', res.idToken);
            localStorage.setItem('refreshToken', res.refreshToken);

            clearForm(e.target);
           
        }
       
    })
    
}

const eventSubmit=()=>{
    document.querySelector('#sign-in').addEventListener('submit', formLogin);
}
renderFormSignIn();

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
renderFormSignUp();

//clearForm
const clearForm = (form) => {
    form.reset();
}


    
    
    
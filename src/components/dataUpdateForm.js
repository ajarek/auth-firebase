import {Input} from "./input";
export class DataForm{
    constructor(name,foto){
        this.name=name;
        this.foto=foto;
    }
    render(){
        const dataForm=document.createElement("form");
        const h4=document.createElement("h4");
        h4.innerHTML="Update User";
        dataForm.classList.add("form-inline","mb-2","mr-auto","d-flex","flex-column","justify-content-evenly","align-items-center" );
        dataForm.style.height="100vh";
        dataForm.id="formUpdateUser";
        const name= new Input("text","name","form-control");
        const foto= new Input("text","foto","form-control");
        const btn=document.createElement("button");
        btn.classList.add("btn","btn-primary","mr-2");
        btn.id ='submitUpdateUserData'
        btn.innerHTML="Submit";
        const info=document.createElement("div");
        info.classList.add("updateData");
        const a = document.createElement("a");
        a.classList.add("btn","btn-warning","mr-2");
        a.innerText="Home";
        a.setAttribute("href","/");
        dataForm.append(h4,name.render(),foto.render(),btn,info,a);
        return dataForm;
   
}
}
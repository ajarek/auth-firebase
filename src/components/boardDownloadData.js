export class BoardUser{
    constructor(text,id,classData){
        this.text = text;
        this.id = id;
        this.classData = classData;
        
    }
    render(){
        const container = document.createElement("div");
        container.classList.add("d-flex","flex-column","align-items-center");
        const btn= document.createElement("button");
        btn.classList.add("btn","btn-success","mb-4");
        btn.id=this.id;
        btn.innerHTML = this.text;
        const data= document.createElement("div");
        data.classList.add(this.classData);
        container.append(btn,data);
        return container;
    }
}
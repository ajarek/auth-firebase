export class BoardUser{
    constructor(classData){
        this.classData = classData;
        
    }
    render(){
        const container = document.createElement("div");
        container.classList.add("d-flex","flex-column","align-items-center" ,"px-3","mb-3") 
        const data= document.createElement("div");
        data.classList.add(this.classData);
        container.append(data);
        return container;
    }
}
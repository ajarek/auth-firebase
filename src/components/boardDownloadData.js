export class BoardUser{
    constructor(classData){
        this.classData = classData;
        
    }
    render(){
        const container = document.createElement("div");
        container.classList.add("d-flex","flex-column","align-items-center");  
        const data= document.createElement("div");
        data.classList.add(this.classData);
        container.append(data);
        return container;
    }
}
// function Logger(constructor: Function){
//     console.log("Logging...");
//     console.log(constructor);
    
// }
// @Logger class Controller{
// public id=1;
// }
// const controller = new Controller();


function addProperty(constructor: Function){
    constructor.prototype.myProperty="Hello";
}

@addProperty
class MyClass{
    myProperty!: string;
}

const myInstance=new MyClass();
console.log((myInstance as any).myProperty);


// Factory of decorators

// function Logger(logString: string){
//     return function (constructor: Function){
//         console.log(logString);
//     }
// }
// @Logger("Logging-controller")
// class Controller{
//     public id=1;
// }

// HTML INTEGRATION

interface IDecoration{
    parent:string;
    template:string;
}
function ControllerDecoration(config: IDecoration){
    return function <T extends {new (...args: any[]):{
        content:string} }>(
            originalConstructor:T
        ){
            return class extends originalConstructor{
                private element:HTMLElement;
                private parent: HTMLElement;
                constructor(...args:any[]){
                    super(...args);
                    this.parent=document.getElementById(config.parent)!;
                    this.element=document.createElement(config.template);
                    this.element.innerHTML=this.content;
                    this.parent.appendChild(this.element);
                }
            }
    }
}
@ControllerDecoration({
    parent:'app',
    template: "H1",
})
class Controller{
    public content='My custom controller';
};
const controller=new Controller();
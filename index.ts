// function Logger(constructor: Function){
//     console.log("Logging...");
//     console.log(constructor);
    
// }
// @Logger class Controller{
// public id=1;
// }
// const controller = new Controller();


// function addProperty(constructor: Function){
//     constructor.prototype.myProperty="Hello";
// }

// @addProperty
// class MyClass{
//     myProperty!: string;
// }

// const myInstance=new MyClass();
// console.log((myInstance as any).myProperty);


// ----------------------------------// 

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

// ----------------------------------//

// HTML INTEGRATION

// interface IDecoration{
//     parent:string;
//     template:string;
// }
// function ControllerDecoration(config: IDecoration){
//     return function <T extends {new (...args: any[]):{
//         content:string} }>(
//             originalConstructor:T
//         ){
//             return class extends originalConstructor{
//                 private element:HTMLElement;
//                 private parent: HTMLElement;
//                 constructor(...args:any[]){
//                     super(...args);
//                     this.parent=document.getElementById(config.parent)!;
//                     this.element=document.createElement(config.template);
//                     this.element.innerHTML=this.content;
//                     this.parent.appendChild(this.element);
//                 }
//             }
//     }
// }
// @ControllerDecoration({
//     parent:'app',
//     template: "H1",
// })
// class Controller{
//     public content='My custom controller';
// };
// const controller=new Controller();



// ----------------------------------//



// Decorators of the methods

// target--prototype of the object
// name-name of the method 
// descriptor--property descriptor of the method 

// function LogMethod(target: any, name:string, descriptor: PropertyDescriptor){

//     console.log(`Method "${name} of the class "${target.constructor.name}" is called`);

// }
// class MyClass{
//     @LogMethod
//     myMethod(){
//         console.log('Hello World!');
//     }
   
// }
// let obj=new MyClass();
// obj.myMethod;

// ----------------------------------//


// Validation of the type of data

// function ValidateString(
//     target: any,
//     propertyName: string,
//     descriptor: PropertyDescriptor
// ) {
//     const originalMethod = descriptor.value;

//     descriptor.value = function (...args: any[]) {
//         if (typeof args[0] !== 'string') {
//             throw new Error('Invalid input. Expected a string');
//         }
//         return originalMethod.apply(this, args);
//     };
// }

// class MyClass {
//     @ValidateString 
//     public print(value: string) {
//         console.log(`Received value: ${value}`);
//     }
// }

// const instance = new MyClass();
// instance.print("Hello"); 
// // instance.print(42); 


// ----------------------------------//

// TAX


// function AddTax(taxPercent:number){
//     return (_:any, _2:string, descriptor: PropertyDescriptor)=>{
//         const method=descriptor.value as Function;
//         return{
//             configurable:true,
//             enumerable:false,
//             get(){
//                 return (...args:any[])=>{
//                     const result=method.apply(this, args);    
//                 return result+(result/100)*taxPercent;           }
//             }
//         }
//     }
// }
// class Payment{
//     @AddTax(20)
//     pay(money: number):number{
//         return money;
//     }
// }
// const payment=new Payment();
// console.log(`Amount with tax: `, payment.pay(100));


// ----------------------------------//

// Decorators of the parameters 


// function CheckEmail(target: any, methodName: string, position: number){
// if(!target[methodName].validation){
//     target[methodName].validation={};
// }
//     Object.assign(target[methodName].validation,{
//         [position]: (value:string)=>{
//             if(value.includes('@')){
//                 return value;
//             }
//             throw new Error('No valid field')
//         }
//     })
    
// }
// function Validation(
//     target: any,
//     propertyName: string,
//     descriptor: PropertyDescriptor
// ) {
//     const method = descriptor.value;

//     descriptor.value = function (...args: any[]) {
//         if (method.validation) {
//            args.forEach((item,index)=>{
//             if (method.validation[index]){
//                 args[index]=method.validation[index](item);
//             }
//            })
//         }
//         return method.apply(this, args);
//     };
// }
// class Person{
//     @Validation
//     setEmail(@CheckEmail email: string){
//         console.log(email);
        
//     }
// }
// const person = new Person();

// person.setEmail('test@gmail.com'); // Ok
// person.setEmail('testgmail.com'); // No valid field



// ----------------------------------//

// Decorators of the properties


// interface ValidatorConfig {
//     [property: string]: {
//       [validatableProp: string]: ('required' | 'positive')[];
//     };
//   }
  
//   const registeredValidators: ValidatorConfig = {};
  

//   function Required(target: any, propName: string) {
//     registeredValidators[target.constructor.name] = {
//     ...registeredValidators[target.constructor.name],
// [propName]: ['required'],
//     };
//     }
    
//     function PositiveNumber(target: any, propName: string) {
//     registeredValidators[target.constructor.name] = {
//     ...registeredValidators[target.constructor.name],
//     [propName]: ['positive'],
//     };
//     }
    
//     function validate(obj: any) {
//         const objValidatorConfig = registeredValidators[obj.constructor.name];
//         if (!objValidatorConfig) {
//           return true;
//         }
//         let isValid = true;
//         for (const prop in objValidatorConfig) {
//           for (const validator of objValidatorConfig[prop]) {
//             switch (validator) {
//               case 'required':
//                 isValid = isValid && !!obj[prop];
//                 break;
//               case 'positive':
//                 isValid = isValid && obj[prop] > 0;
//                 break;
//             }
//           }
//         }
//         return isValid;
//        }

//        class Person {
//         @Required
//         name: string;
//         @PositiveNumber
//         age: number;
       
//         constructor(n: string, a: number) {
//           this.name = n;
//           this.age = a;
//         }
     
    
//     }

//     const person = new Person('', -1);

// if (!validate(person)) {
//  console.log('Validation error!');
// } else {
//  console.log('Validation ok!');
// }
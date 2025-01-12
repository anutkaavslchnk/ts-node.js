// function Logger(constructor: Function){
//     console.log("Logging...");
//     console.log(constructor);
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
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
function ValidateString(target, propertyName, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (typeof args[0] !== 'string') {
            throw new Error('Invalid input. Expected a string');
        }
        return originalMethod.apply(this, args);
    };
}
var MyClass = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _print_decorators;
    return _a = /** @class */ (function () {
            function MyClass() {
                __runInitializers(this, _instanceExtraInitializers);
            }
            MyClass.prototype.print = function (value) {
                console.log("Received value: ".concat(value));
            };
            return MyClass;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _print_decorators = [ValidateString];
            __esDecorate(_a, null, _print_decorators, { kind: "method", name: "print", static: false, private: false, access: { has: function (obj) { return "print" in obj; }, get: function (obj) { return obj.print; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var instance = new MyClass();
instance.print("Hello"); // Works fine
// instance.print(42); // Throws error: Invalid input. Expected a string

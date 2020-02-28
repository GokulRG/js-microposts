/*jshint esversion: 8 */
// This is how we import or use a module
const person = require('./mymodule1'); 
// This is the same way you can also bring in a node_module. But in case of node modules you just specify the 
// name and not the path. The default path is the node modules folder. So you can do something like,
// const express = require('express');

// Import ES2015 module. This is how you import multiple things from a module
// import { person as es2015person, sayHello, sayGoodbye } from './mymodule2';

// If you want to import everything from a module
import * as module2 from './mymodule2';

// How you import a default export
// import greeting from './mymodule2';  without the braces

console.log(person.name); // prints the name that you have exported from your module.
console.log(module2.person.age); //prints the age of the person from es2015 module.
console.log(module2.sayHello());
console.log(module2.sayGoodbye());
console.log(module2.default); // If you have a default export, you can access it like so.


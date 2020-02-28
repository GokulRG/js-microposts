// This is ES2015 syntax and not CommonJS. So this is how modules need to be written as per the new syntax
// So this information will also be avaiable to other Js files in the project
export const person = {
    name: 'Brendon',
    age: 30
};

export function sayHello() {
    console.log(`hello ${person.name}`);
}

export const sayGoodbye = () => {
    console.log(`goodbye ${person.name}`);
};

// If we export default like this, we don't have to use the curly braces while we import it
const greeting = 'Hello World';
export default greeting;
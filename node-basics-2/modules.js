//const person = require('./people');
//console.log(`I'm ${person.people[0]} I am ${person.edad[0]} old`); // prints 'Jean'

const {people, edad} = require('./people');
const os = require('os'); //already built in node

console.log(`I'm ${people[0]} I am ${edad[0]} old`)
console.log(`This is ${os.platform()}`);

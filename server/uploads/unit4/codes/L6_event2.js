var events = require('events');
var eventEmitter = new events.EventEmitter();

var listner1 = function listner1() {
   console.log('listner1 executed.');
}

var listner2 = function listner2() {
  console.log('listner2 executed.');
}

eventEmitter.on('connection', listner1);

eventEmitter.on('connection', listner2);

eventEmitter.emit('connection');

eventEmitter.removeListener('connection', listner1);
console.log("Listner1 will not listen now.");

eventEmitter.emit('connection');

console.log("Program Ended.");
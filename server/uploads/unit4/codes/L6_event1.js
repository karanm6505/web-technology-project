var events = require('events');

var em = new events.EventEmitter();

//Define FirstEvent
em.addListener('FirstEvent', function (data) {
    console.log('First subscriber: ' + data);
});

//Define SecondEvent
em.on('SecondEvent', function (data) {
    console.log('Second subscriber: ' + data);
});

// Fire FirstEvent
em.emit('FirstEvent', 'This is my first Node.js event emitter example.');

// Fire SecondEvent
em.emit('SecondEvent', 'This is my second Node.js event emitter example.');


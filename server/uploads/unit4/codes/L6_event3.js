var events = require('events');

var em = new events.EventEmitter();

em.emit('Event');

em.on('Event', function () {
    console.log('Event Triggered');
});




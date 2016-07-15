var tape = require('tape');
var rule = require('../index.js');

tape('Logeo de root correctamente detectado', function (t) {
    var rootLoginEvent = require('./fixtures/rootLoginEvent.json');
    rule.fn(rootLoginEvent,function (err,message){
        t.equal(message.subject,'Root user login in to the console','Detected root user login');
        t.end();
    });
});
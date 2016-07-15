var tape = require('tape');
var rule = require('../index.js');

tape('Logeo de root detectado', function (t) {
    var rootLoginEvent = require('./fixtures/rootLoginEvent.json');
    rule.fn(rootLoginEvent,function (err,message){
        t.ok(message.subject,'Detected root user login');        
        t.end();
    });
});
tape('Logeo de usuario root correcto', function (t) {
    var rootLoginEvent = require('./fixtures/rootIPLoginEvent.json');
    rule.fn(rootLoginEvent,function (err,message){
        t.ok(message.subject,'Detected root user login success  - no mensaje');    
        t.end();
    });
});
tape('Logeo de otro usuario detectado', function (t) {
    var rootLoginEvent = require('./fixtures/otherUserLoginEvent.json');
    rule.fn(rootLoginEvent,function (err,message){
        t.ok(message.subject,'Detected other user login - no mensaje');    
        t.end();
    });
});

